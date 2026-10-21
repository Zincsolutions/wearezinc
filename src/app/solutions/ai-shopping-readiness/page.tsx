import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { StripParallax } from "@/components/site/strip-parallax";
import { AiShoppingContent } from "./content";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "../ecommerce-acceleration/page.css";
import "@/components/site/aeo-blocks.css";

// AI Shopping Readiness: split out of E-commerce Acceleration on Oct 20,
// 2026. Shares that page's styles (page.css) and building blocks (parts.tsx).

const TITLE = "AI Shopping Readiness for Shopify | Free AI Shopping Check | ZINC";
const DESCRIPTION =
  "Shoppers ask AI assistants to find, compare, and buy. ZINC tests how assistants see your Shopify store, separates what Shopify already handles, and fixes product facts, policies, channels, and the path to checkout. Starts with a free check.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-shopping-readiness" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI Shopping Readiness",
  description: DESCRIPTION,
  path: "/solutions/ai-shopping-readiness",
  serviceType: "AI shopping readiness and agentic commerce for Shopify: product data, policies, AI channel settings, structured data, and purchase-path testing",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function AiShoppingReadinessPage() {
  return (
    <div className="site">
      <Navbar />
      <AiShoppingContent />
      <StripParallax />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(SERVICE_SCHEMA) }} />
      <SiteAnalytics />
    </div>
  );
}
