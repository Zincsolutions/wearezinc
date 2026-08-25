import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getAllPosts, isContentConfigured } from "@/lib/content";

const SITE = "https://www.wearezinc.com";
const COMPONENT_LAST_MODIFIED: Record<string, string> = {
  index: "2026-08-25",
  "solutions/ecommerce-acceleration": "2026-08-25",
  "solutions/website-design-development": "2026-08-25",
};

export const revalidate = 3600;

function normalizeLastModified(value?: string | null) {
  if (!value) return undefined;

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const manifest: { pages: string[] } = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public/_wf/manifest.json"), "utf8")
  );

  const staticEntries: MetadataRoute.Sitemap = manifest.pages.map((p) => {
    const html = fs.readFileSync(
      path.join(process.cwd(), "public/_wf", `${p}.html`),
      "utf8"
    );
    const capturedDate = html.match(/Last Published: ([^-]+?) -->/)?.[1]?.trim();

    return {
      url: p === "index" ? SITE : `${SITE}/${p}`,
      lastModified: normalizeLastModified(
        COMPONENT_LAST_MODIFIED[p] || capturedDate
      ),
      changeFrequency: "monthly",
      priority: p === "index" ? 1 : 0.7,
    };
  });

  const baseEntries: MetadataRoute.Sitemap = [
    ...staticEntries,
    { url: `${SITE}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Keep local and CI builds reproducible without copying production secrets.
  // Production always has these variables and therefore emits post URLs too.
  if (!isContentConfigured()) return baseEntries;

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/post/${p.slug}`,
    lastModified: normalizeLastModified(p.updated_at || p.publish_date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...baseEntries,
    ...postEntries,
  ];
}
