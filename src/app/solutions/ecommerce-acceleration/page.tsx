import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { EcomContent } from "./content";
import { StripParallax } from "./parallax";
import "@/components/site/site.css";
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

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZINC",
  url: "https://www.wearezinc.com",
  logo: "https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png",
  description:
    "ZINC is an AI-driven digital strategy and design agency: AI enablement, answer engine optimization (AEO), web design and development, ecommerce, branding, and marketing systems.",
};

export default function EcommerceAccelerationPage() {
  return (
    <div className="site">
      {/* Geist/Geist Mono under their real family names, same source as the
          static pages — the extracted CSS references them literally. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <script
        dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('gsap-js');" }}
      />
      <Navbar />
      <EcomContent />
      <StripParallax />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <Script src="/js/reveal.js" strategy="afterInteractive" />
      <SiteAnalytics />
    </div>
  );
}
