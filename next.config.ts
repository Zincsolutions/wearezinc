import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

// Static pages ported from the Webflow capture (see scripts/port-webflow.mjs).
const manifest: { pages: string[] } = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "public/_wf/manifest.json"), "utf8")
);

const nextConfig: NextConfig = {
  // bundle the HTML templates into the serverless functions for the blog routes
  outputFileTracingIncludes: {
    "/post/[slug]": ["./src/templates/**"],
    "/blog": ["./src/templates/**"],
    "/sitemap.xml": ["./public/_wf/manifest.json"],
  },
  async rewrites() {
    return manifest.pages.map((p) => ({
      source: p === "index" ? "/" : `/${p}`,
      destination: `/_wf/${p}.html`,
    }));
  },
  async redirects() {
    return [
      // canonical host: apex -> www, matching the old site's behavior
      {
        source: "/:path*",
        has: [{ type: "host", value: "wearezinc.com" }],
        destination: "https://www.wearezinc.com/:path*",
        permanent: true,
      },
      // /thomabravo stays at its original root URL (highest-traffic page).
      // Safety net for the briefly-used preview path:
      { source: "/work/thomabravo", destination: "/thomabravo", permanent: true },
      // duplicate Partners page dropped
      { source: "/partners-3", destination: "/partners/partners-2", permanent: true },
      // dropped test pages
      { source: "/blog-cats", destination: "/blog", permanent: true },
      { source: "/lander-1", destination: "/", permanent: true },
      { source: "/lander-2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
