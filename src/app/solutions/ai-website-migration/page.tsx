import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { MigrationContent } from "./content";
import { StripParallax } from "@/components/site/strip-parallax";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";

// Built from the section archetypes already componentized on the other
// solutions pages (see content.tsx); page.css is the ecommerce page's
// extracted Webflow CSS plus the layout210 rules from the website-design page.

const TITLE = "AI Website Migration Services | ZINC";
const DESCRIPTION =
  "Your move to AI-native, handled by ZINC. We migrate your website with your design and content intact, configure our governance platform, Dispatch, and prepare your team to take over.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-website-migration" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/og/home.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI Website Migration",
  description: DESCRIPTION,
  path: "/solutions/ai-website-migration",
  serviceType: "Website migration from CMS platforms to AI-native Astro and Next.js stacks with Dispatch governance",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function AiWebsiteMigrationPage() {
  return (
    <div className="site">
      <Navbar />
      <MigrationContent />
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
