import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { StripParallax } from "@/components/site/strip-parallax";
import { CleanupContent } from "./content";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

const TITLE = "AI-Built Website Cleanup | Secure, Findable, Governed | ZINC";
const DESCRIPTION =
  "Built your site fast with an AI builder? ZINC finds what puts the business at risk, from lost leads to exposed keys and invisible pages, fixes it, and makes the site safe to keep building with AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-built-website-cleanup" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI-Built Website Cleanup",
  description: DESCRIPTION,
  path: "/solutions/ai-built-website-cleanup",
  serviceType: "Security, lead path, SEO, accessibility, and code review and remediation for websites built with AI builders, with Dispatch governance",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function AiBuiltCleanupPage() {
  return (
    <div className="site">
      <Navbar />
      <CleanupContent />
      <StripParallax />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(SERVICE_SCHEMA) }} />
      <SiteAnalytics />
    </div>
  );
}
