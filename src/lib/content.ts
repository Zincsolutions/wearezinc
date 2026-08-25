import { createClient } from "@supabase/supabase-js";

// Anon key on purpose: RLS guarantees only published content is readable,
// so drafts can never leak through these queries.
export const isContentConfigured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

const db = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase content is not configured. Copy .env.example to .env.local and add approved development values."
    );
  }

  return createClient(url, key, { auth: { persistSession: false } });
};

export type PostRow = {
  id: string;
  name: string;
  slug: string;
  post_body: string | null;
  post_summary: string | null;
  seo_title: string | null;
  meta_description: string | null;
  main_image: string | null;
  thumbnail_image: string | null;
  publish_date: string | null;
  updated_at: string;
  featured: boolean;
  categories: string[];
};

type JoinedPost = Omit<PostRow, "categories"> & {
  post_categories: { categories: { name: string } | null }[];
};

const flatten = (p: JoinedPost): PostRow => ({
  ...p,
  categories: p.post_categories
    .map((c) => c.categories?.name)
    .filter((n): n is string => !!n),
});

const POST_SELECT =
  "id,name,slug,post_body,post_summary,seo_title,meta_description,main_image,thumbnail_image,publish_date,updated_at,featured,post_categories(categories(name))";

export async function getPost(slug: string): Promise<PostRow | null> {
  const { data, error } = await db()
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getPost(${slug}): ${error.message}`);
  return data ? flatten(data as unknown as JoinedPost) : null;
}

export async function getRelatedPosts(postId: string, limit = 3): Promise<PostRow[]> {
  const { data: rel, error } = await db()
    .from("post_related")
    .select("related_post_id")
    .eq("post_id", postId);
  if (error) throw new Error(`getRelatedPosts: ${error.message}`);
  const ids = (rel ?? []).map((r) => r.related_post_id);
  if (!ids.length) return [];
  const { data, error: e2 } = await db()
    .from("posts")
    .select(POST_SELECT)
    .in("id", ids)
    .limit(limit);
  if (e2) throw new Error(`getRelatedPosts: ${e2.message}`);
  return (data as unknown as JoinedPost[]).map(flatten);
}

// Matches the old Webflow listing: sort-order ascending with un-numbered posts
// first (those sub-sorted newest-first by publish date), numbered ties oldest-first.
export async function getAllPosts(): Promise<PostRow[]> {
  const { data, error } = await db().from("posts").select(POST_SELECT + ",sort_order");
  if (error) throw new Error(`getAllPosts: ${error.message}`);
  type WithSort = JoinedPost & { sort_order: number | null };
  const posts = (data as unknown as WithSort[]).slice();
  posts.sort((a, b) => {
    if (a.sort_order == null && b.sort_order == null)
      return (b.publish_date ?? "").localeCompare(a.publish_date ?? "");
    if (a.sort_order == null) return -1;
    if (b.sort_order == null) return 1;
    if (a.sort_order !== b.sort_order) return a.sort_order - b.sort_order;
    return (a.publish_date ?? "").localeCompare(b.publish_date ?? "");
  });
  return posts.map(flatten);
}

// Template's original pill order (Webflow item order, not alphabetical).
const CATEGORY_ORDER = ["Insights", "News", "Resources", "Ecommerce", "Web Design"];

export async function getCategories(): Promise<{ name: string; slug: string }[]> {
  const { data, error } = await db().from("categories").select("name,slug");
  if (error) throw new Error(`getCategories: ${error.message}`);
  return (data ?? []).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a.name);
    const bi = CATEGORY_ORDER.indexOf(b.name);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
}

export const formatDate = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : "";
