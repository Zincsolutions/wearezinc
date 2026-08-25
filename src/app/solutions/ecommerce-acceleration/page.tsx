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
import "./page.css";

// Componentized from the Webflow capture (Phase B, page 2). Markup is a
// mechanical conversion (see content.tsx); styles are the auto-extracted
// subset of the compiled Webflow CSS (page.css); nav/footer come from the
// shared shell; FAQ + reveals replace the Webflow interaction runtime.

const TITLE = "Ecommerce Acceleration | Shopify, BigCommerce & AI Growth | ZINC";
const DESCRIPTION =
  "ZINC helps ecommerce brands improve strategy, design, UX, integrations, content, and growth using Shopify, BigCommerce, and AI-enhanced workflows.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ecommerce-acceleration" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI-Powered Ecommerce Acceleration",
  description: DESCRIPTION,
  path: "/solutions/ecommerce-acceleration",
  serviceType: "Ecommerce strategy, design, development, integration, and optimization",
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
