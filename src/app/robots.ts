import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/_wf/"] },
    sitemap: "https://www.wearezinc.com/sitemap.xml",
  };
}
