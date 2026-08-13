import { createClient } from "@supabase/supabase-js";

// Anon key on purpose: RLS guarantees only published content is readable,
// so drafts can never leak through these queries.
const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
);

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
  "id,name,slug,post_body,post_summary,seo_title,meta_description,main_image,thumbnail_image,publish_date,featured,post_categories(categories(name))";

export async function getPost(slug: string): Promise<PostRow | null> {
  const { data, error } = await db
    .from("posts")
    .select(POST_SELECT)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getPost(${slug}): ${error.message}`);
  return data ? flatten(data as unknown as JoinedPost) : null;
}

export async function getRelatedPosts(postId: string, limit = 3): Promise<PostRow[]> {
  const { data: rel, error } = await db
    .from("post_related")
    .select("related_post_id")
    .eq("post_id", postId);
  if (error) throw new Error(`getRelatedPosts: ${error.message}`);
  const ids = (rel ?? []).map((r) => r.related_post_id);
  if (!ids.length) return [];
  const { data, error: e2 } = await db
    .from("posts")
    .select(POST_SELECT)
    .in("id", ids)
    .limit(limit);
  if (e2) throw new Error(`getRelatedPosts: ${e2.message}`);
  return (data as unknown as JoinedPost[]).map(flatten);
}

export async function getAllPosts(): Promise<PostRow[]> {
  const { data, error } = await db
    .from("posts")
    .select(POST_SELECT)
    .order("publish_date", { ascending: false });
  if (error) throw new Error(`getAllPosts: ${error.message}`);
  return (data as unknown as JoinedPost[]).map(flatten);
}

export async function getCategories(): Promise<{ name: string; slug: string }[]> {
  const { data, error } = await db.from("categories").select("name,slug").order("name");
  if (error) throw new Error(`getCategories: ${error.message}`);
  return data ?? [];
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
