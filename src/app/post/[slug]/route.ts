import { getPost, getRelatedPosts } from "@/lib/content";
import { renderPost } from "@/lib/render";

export const revalidate = 300;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return new Response("Not found", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  }
  const related = await getRelatedPosts(post.id);
  return new Response(renderPost(post, related), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
