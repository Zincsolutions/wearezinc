import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { StripParallax } from "@/components/site/strip-parallax";
import { MigrationPath } from "@/components/site/migration-path";
import { getMigrationPath } from "@/lib/migration-paths";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

// Migration path page: content in src/lib/migration-paths.tsx, layout in
// src/components/site/migration-path.tsx.
const PATH = getMigrationPath("webflow-ai-website-migration");
const URL = `https://www.wearezinc.com/solutions/${PATH.slug}`;

export const metadata: Metadata = {
  title: PATH.metaTitle,
  description: PATH.metaDescription,
  alternates: { canonical: URL },
  openGraph: {
    title: PATH.metaTitle,
    description: PATH.metaDescription,
    type: "website",
    images: ["https://www.wearezinc.com/og/home.png"],
  },
  twitter: { card: "summary_large_image", title: PATH.metaTitle, description: PATH.metaDescription },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: `${PATH.platform} to AI-Native Website Migration`,
  description: PATH.metaDescription,
  path: `/solutions/${PATH.slug}`,
  serviceType: `Website migration from ${PATH.platform} to an AI-native Astro or Next.js stack with Dispatch governance`,
  faqs: PATH.faqs.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function MigrationPathPage() {
  return (
    <div className="site">
      <Navbar />
      <MigrationPath data={PATH} />
      <StripParallax />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(SERVICE_SCHEMA) }}
      />
      <SiteAnalytics />
    </div>
  );
}
