import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { DispatchContent } from "./content";
import { StripParallax } from "@/components/site/strip-parallax";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "./page.css";

// Dispatch: rebuilt Sept 22, 2026 from the Dispatch messaging
// recommendations. Governance-led: control-first hero, the new operating
// model, governance features, BYOA, the CMS safety net, three paths, AEO as
// a supporting capability, why ZINC, FAQs, and an enquiry.

const TITLE = "Dispatch: AI Website Governance & Management | ZINC";
const DESCRIPTION =
  "Run an AI-powered website without losing control. ZINC connects your agents, team, repository, and host through Dispatch for approvals, attribution, monitoring, and one-click restore.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-dispatch" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/og/home.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "Dispatch: AI Website Governance",
  description: DESCRIPTION,
  path: "/solutions/ai-dispatch",
  serviceType:
    "Connecting websites to Dispatch, the management layer for AI-powered websites, with roles, approvals, and an operating playbook",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function AiDispatchPage() {
  return (
    <div className="site">
      <Navbar />
      <DispatchContent />
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
