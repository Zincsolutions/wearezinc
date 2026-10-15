import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { PageContent } from "./content";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/offering.css";
import "./page.css";
import "@/components/site/aeo-blocks.css";

// Componentized from the Webflow capture (Oct 2026) via
// scripts/componentize-page.py, following website-design-development. Shell,
// FAQ, and reveal come from the shared site components. The static twin in
// public/_wf stays as the archive; this route takes precedence over its rewrite.

const TITLE = "AI Automation & Workflow Services | ZINC";
const DESCRIPTION =
  "Design and implement AI-powered automations and marketing workflows that cut busywork and scale output without scaling headcount.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/automation-workflows" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI Workflows & Automation",
  description: DESCRIPTION,
  path: "/solutions/automation-workflows",
  serviceType: "AI workflow automation for CMS, CRM, and marketing operations",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function AutomationWorkflowsPage() {
  return (
    <div className="site">
      <Navbar />
      <PageContent />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(SERVICE_SCHEMA) }}
      />
      <SiteAnalytics />
    </div>
  );
}
