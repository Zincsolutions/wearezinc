import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { OverviewContent } from "./content";
import { StripParallax } from "@/components/site/strip-parallax";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "./page.css";

// AI-native websites overview: the hub page for the AI-native website story
// (enable, migrate, or build; Dispatch as the safety net; the services that
// follow). Built from the same section archetypes as the other solutions
// pages so it inherits the site's look and feel unchanged.

const TITLE = "AI-Native Websites | Migration, Builds & Governance | ZINC";
const DESCRIPTION =
  "ZINC helps companies enable, migrate, or build websites their own AI agents can run, governed by Dispatch. Keep your design, content, and URLs. Gain a website your team improves by asking.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-native-websites" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI-Native Websites",
  description: DESCRIPTION,
  path: "/solutions/ai-native-websites",
  serviceType:
    "AI-native website enablement, migration, and builds on Astro and Next.js, governed by Dispatch",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function AiNativeWebsitesPage() {
  return (
    <div className="site">
      <Navbar />
      <OverviewContent />
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
