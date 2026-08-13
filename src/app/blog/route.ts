import { getAllPosts, getCategories } from "@/lib/content";
import { renderBlog } from "@/lib/render";

export const revalidate = 300;

export async function GET() {
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  return new Response(renderBlog(posts, categories), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
