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
import "./page.css";

// Rebuilt from the existing solutions-page archetypes (header46, layout207,
// layout249, layout19, layout210, faq2, cta7). Styles are the ecommerce
// page's extracted Webflow subset plus the layout210 rules from the
// website-design page (page.css); nav/footer come from the shared shell.

const TITLE = "Dispatch, the Management Layer for AI-Powered Websites | ZINC";
const DESCRIPTION =
  "Dispatch gives your team the visibility, approvals, attribution, and one-click restore that make it safe to let an AI agent run your website. ZINC connects every migrated site to Dispatch and runs its own site the same way.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-dispatch" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb4592_z_dispatch_01.1.webp"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "Dispatch Website Governance Setup",
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
