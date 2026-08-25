import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { StripParallax } from "@/components/site/strip-parallax";
import { PageContent } from "./content";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "./page.css";

// Componentized from the Webflow capture (Phase B) via
// scripts/componentize-page.py. Shell, FAQ, parallax, marquee, and reveal
// come from the shared site components.

const TITLE = "AI Website Design & Development | Webflow, Shopify, WordPress | ZINC";
const DESCRIPTION =
  "AI-optimized website design & development for B2B, SaaS, and ecommerce. ZINC builds intelligent sites on Webflow, Shopify, WordPress that grow your business.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/website-design-development" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI-Optimized Website Design & Development",
  description: DESCRIPTION,
  path: "/solutions/website-design-development",
  serviceType: "Website design, development, and answer engine optimization",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function WebsiteDesignDevelopmentPage() {
  return (
    <div className="site">
      <Navbar />
      <PageContent />
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
