import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { ContentHero } from "@/components/site/content-hero";
import { InShort } from "@/components/site/in-short";
import { PlannerTool } from "@/components/site/planner-tool";
import { MigrationMethod } from "@/components/site/migration-method";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { buildWebPageSchema, serializeSchema } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/forms.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

const TITLE = "Free Website Migration Planner | URL Inventory in Seconds | ZINC";
const DESCRIPTION =
  "Enter your website and see every URL in your sitemap by template, the platform you run on, and which addresses will need a redirect decision before a migration. Free, no sign-up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/migration-planner" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SCHEMA = buildWebPageSchema({
  name: "Free Website Migration Planner",
  description: DESCRIPTION,
  path: "/migration-planner",
  extra: [
    {
      "@type": "WebApplication",
      "@id": "https://www.wearezinc.com/migration-planner#app",
      name: "ZINC Migration Planner",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      url: "https://www.wearezinc.com/migration-planner",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
});

export default function MigrationPlannerPage() {
  return (
    <div className="site">
      <Navbar />
      <main className="main-wrapper offering-page offering-refresh">
        <ScrollReveal />
        <ContentHero
          tagline="Free migration planner"
          title="Know exactly what you are moving."
          lede="Rankings go missing when URLs go missing. Before you move a website, enter it here and see every address in your sitemap by template, and which ones will need a redirect decision."
        >
          <PlannerTool />
        </ContentHero>
        <InShort>
          <p>The planner reads your public sitemap and returns a <strong>URL inventory by template</strong>, the platform your site appears to run on, and the addresses that will need a redirect rule or a decision in a migration.</p>
          <p>It is the first step of every ZINC migration: nothing gets designed until every URL has a plan.</p>
        </InShort>
        <MigrationMethod tagline="What happens next" heading="The inventory is step one. Here are the other five." />
        <KeepExploring
          groups={[
            { heading: "Migration paths", links: [EXPLORE.wordpress, { href: "/solutions/webflow-ai-website-migration", title: "Webflow or AI-native?", note: "A straight answer from a Webflow partner." }, EXPLORE.migration] },
            { heading: "Learn", links: [EXPLORE.glossary, EXPLORE.compare, EXPLORE.realChange] },
            { heading: "Take the next step", links: [EXPLORE.preview, EXPLORE.assessment, EXPLORE.contact] },
          ]}
        />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(SCHEMA) }} />
      <SiteAnalytics />
    </div>
  );
}
