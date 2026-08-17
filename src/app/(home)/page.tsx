import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { SliderBehavior } from "@/components/site/slider-behavior";
import { PageContent } from "./content";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "./page.css";

// Homepage, componentized from the Webflow capture (Phase B) via
// scripts/componentize-page.py. New archetypes vs earlier pages: the
// testimonial slider (SliderBehavior) and the purecounter stat count-ups
// (self-hosted vendor bundle + the page's original init, /js/home-counters.js).

const TITLE = "ZINC | AI-Driven Digital Strategy & Design Agency";
const DESCRIPTION =
  "ZINC brings 25+ years of strategy, design, and technology together to help brands stay visible in the AI era. AI enablement, web design, ecommerce & more.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com" },
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

export default function HomePage() {
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
      <SliderBehavior root=".testimonial7_slider" />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
      />
      <Script src="/js/reveal.js" strategy="afterInteractive" />
      <Script src="/js/home-counters.js" strategy="afterInteractive" />
      <SiteAnalytics />
    </div>
  );
}
