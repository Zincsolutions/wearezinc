import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { AssessmentContent } from "./content";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

const TITLE = "Free Website Assessment | See What AI Tells Your Customers | ZINC";
const DESCRIPTION =
  "Free, human-reviewed website assessment: how AI assistants and search see your business, where you are losing leads, and your best next step. No logins, no obligation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/free-website-assessment" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SCHEMA = buildServiceSchema({
  name: "Free Website Assessment",
  description: DESCRIPTION,
  path: "/free-website-assessment",
  serviceType: "Free human-reviewed website assessment covering AI assistant visibility, search, lead conversion, and platform recommendation",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function FreeWebsiteAssessmentPage() {
  return (
    <div className="site">
      <Navbar />
      <AssessmentContent />
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(SCHEMA) }} />
      <SiteAnalytics />
    </div>
  );
}
