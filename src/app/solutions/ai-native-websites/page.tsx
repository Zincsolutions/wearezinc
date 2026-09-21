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
import "@/components/site/offering.css";
import "./page.css";

// AI-native websites: the broad explanation behind the homepage's
// "Explore AI-Native Websites" path. Conversation-led benefits, an
// illustrative Request / Preview / Approve / Publish walkthrough, Dispatch
// as the governance layer, the migration overview, team support, FAQs, and
// the website assessment enquiry. Copy from the Sept 21, 2026 package.

const TITLE = "AI-Native Websites & AI Integration | ZINC";
const DESCRIPTION =
  "Keep the website you love and change how you run it. ZINC moves your site to a foundation your team can update by asking an AI agent, with our governance platform, Dispatch, providing visibility and control.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/ai-native-websites" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/og/home.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "AI-Native Websites",
  description: DESCRIPTION,
  path: "/solutions/ai-native-websites",
  serviceType:
    "AI-native website migration, new builds, and AI agent integration, governed by Dispatch",
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
