import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { EcomContent } from "./content";
import { StripParallax } from "@/components/site/strip-parallax";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/offering.css";
import "./page.css";

// E-commerce Acceleration: rebuilt Sept 21, 2026 from the implementation
// brief (see content.tsx). Styles are the page's auto-extracted Webflow CSS
// subset (page.css) plus the shared offering styles.

const TITLE = "E-commerce Acceleration | Shopify, BigCommerce & AI | ZINC";
const DESCRIPTION =
  "Improve your storefront, product discovery, and commerce operations with ZINC’s strategy, design, development, integrations, and practical AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ecommerce-acceleration" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/og/home.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "E-commerce Acceleration",
  description: DESCRIPTION,
  path: "/solutions/ecommerce-acceleration",
  serviceType: "E-commerce strategy, Shopify and BigCommerce design and development, product discovery, integrations, and AI-assisted operations",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function EcommerceAccelerationPage() {
  return (
    <div className="site">
      <Navbar />
      <EcomContent />
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
