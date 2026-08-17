import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { StripParallax } from "@/components/site/strip-parallax";
import { PageContent } from "./content";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "./page.css";

// Componentized from the Webflow capture (Phase B) via
// scripts/componentize-page.py. Shell, FAQ, parallax, marquee, and reveal
// come from the shared site components.

const TITLE = "Website Design and Development, Webflow, Shopify, Wordpress";
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

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZINC",
  url: "https://www.wearezinc.com",
  logo: "https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png",
  description:
    "ZINC is an AI-driven digital strategy and design agency: AI enablement, answer engine optimization (AEO), web design and development, ecommerce, branding, and marketing systems.",
};

export default function WebsiteDesignDevelopmentPage() {
  return (
    <div className="site">
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
      <PageContent />
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
