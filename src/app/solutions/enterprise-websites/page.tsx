import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { StripParallax } from "@/components/site/strip-parallax";
import { EnterpriseContent } from "./content";
import { FAQ_ITEMS } from "./faq-items";
import { buildServiceSchema, serializeSchema, textFromHtml } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";

// Enterprise Websites & CMS: destination for the homepage's "Explore
// Enterprise Websites" path. Webflow Enterprise expertise, practical AI
// integration inside the platform, and an ongoing partnership. Copy from
// the Sept 21, 2026 implementation package.

const TITLE = "Webflow Enterprise & AI CMS Solutions | ZINC";
const DESCRIPTION =
  "Get more from Webflow Enterprise and the systems your business relies on. ZINC brings strategy, design, development, and practical AI integration to enterprise websites and CMS platforms.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/solutions/enterprise-websites" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    images: ["https://www.wearezinc.com/og/home.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SERVICE_SCHEMA = buildServiceSchema({
  name: "Enterprise Websites & CMS",
  description: DESCRIPTION,
  path: "/solutions/enterprise-websites",
  serviceType: "Enterprise website design, development, Webflow Enterprise, CMS and AI integration",
  faqs: FAQ_ITEMS.map((item) => ({ question: item.q, answer: textFromHtml(item.a) })),
});

export default function EnterpriseWebsitesPage() {
  return (
    <div className="site">
      <Navbar />
      <EnterpriseContent />
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
