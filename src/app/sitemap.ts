import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "@/lib/content";

const SITE = "https://www.wearezinc.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const manifest: { pages: string[] } = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public/_wf/manifest.json"), "utf8")
  );

  const staticEntries: MetadataRoute.Sitemap = manifest.pages.map((p) => ({
    url: p === "index" ? SITE : `${SITE}/${p}`,
    changeFrequency: "monthly",
    priority: p === "index" ? 1 : 0.7,
  }));

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/post/${p.slug}`,
    lastModified: p.publish_date ?? undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...postEntries,
  ];
}
