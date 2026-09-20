import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { WordPressContent } from "./content";
import { StripParallax } from "@/components/site/strip-parallax";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "./page.css";

// Built from the same section archetypes as the ecommerce-acceleration page
// (header46 hero, layout207, layout249, layout19, layout210, faq2, cta7).
// page.css is the ecommerce extract plus the layout210 rules from the
// website-design-development extract; nav/footer come from the shared shell.

const TITLE = "WordPress to AI Website Migration | Keep Your Site, Move Beyond WordPress | ZINC";
const DESCRIPTION =
  "Move your business website beyond WordPress. ZINC preserves your design, content, and URLs, replaces the plugin functions you rely on, and connects the site to Dispatch so your team can improve it with AI.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/wordpress-ai-website-migration" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "WordPress to AI Website Migration",
  description: DESCRIPTION,
  path: "/solutions/wordpress-ai-website-migration",
  serviceType: "Migration of WordPress websites to AI-native Astro and Next.js stacks with Dispatch governance",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function WordPressAiWebsiteMigrationPage() {
  return (
    <div className="site">
      <Navbar />
      <WordPressContent />
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
