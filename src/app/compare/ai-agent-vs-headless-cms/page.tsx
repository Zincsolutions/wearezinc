import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { ComparisonPage } from "@/components/site/comparison-page";
import { getComparison } from "@/lib/comparisons";
import { buildWebPageSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

const DATA = getComparison("ai-agent-vs-headless-cms");
const PATH = `/compare/${DATA.slug}`;

export const metadata: Metadata = {
  title: DATA.metaTitle,
  description: DATA.metaDescription,
  alternates: { canonical: `https://www.wearezinc.com${PATH}` },
  openGraph: { title: DATA.metaTitle, description: DATA.metaDescription, type: "article", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: DATA.metaTitle, description: DATA.metaDescription },
};

const SCHEMA = buildWebPageSchema({
  name: DATA.h1,
  description: DATA.metaDescription,
  path: PATH,
  faqs: DATA.faqs.map((f) => ({ question: f.q, answer: textFromHtml(f.a) })),
});

export default function Page() {
  return (
    <div className="site">
      <Navbar />
      <ComparisonPage data={DATA} />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(SCHEMA) }} />
      <SiteAnalytics />
    </div>
  );
}
