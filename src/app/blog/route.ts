import { getAllPosts, getCategories } from "@/lib/content";
import { renderBlog } from "@/lib/render";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const raw =
    url.searchParams.get("190f5589_page") ?? url.searchParams.get("page") ?? "1";
  const page = Math.max(1, parseInt(raw, 10) || 1);

  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  return new Response(renderBlog(posts, categories, page), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
