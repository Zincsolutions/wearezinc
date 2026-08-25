import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { SliderBehavior } from "@/components/site/slider-behavior";
import { PageContent } from "./content";
import { FAQ3_ITEMS } from "./faq-items";
import { buildHomeSchema, serializeSchema, textFromHtml } from "@/lib/schema";
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

const HOME_SCHEMA = buildHomeSchema(
  FAQ3_ITEMS.map((item) => ({
    question: textFromHtml(item.question),
    answer: textFromHtml(item.answer),
  }))
);

export default function HomePage() {
  return (
    <div className="site">
      <Navbar />
      <PageContent />
      <SliderBehavior root=".testimonial7_slider" />
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(HOME_SCHEMA) }}
      />
      <Script src="/js/home-counters.js" strategy="afterInteractive" />
      <SiteAnalytics />
    </div>
  );
}
