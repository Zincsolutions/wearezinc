import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // The backing /_wf/ documents carry an X-Robots-Tag noindex header. They
    // remain crawlable so search engines can actually observe that directive.
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.wearezinc.com/sitemap.xml",
  };
}
