import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { ContentHero } from "@/components/site/content-hero";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { COMPARISONS } from "@/lib/comparisons";
import { buildWebPageSchema, serializeSchema } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

const TITLE = "Website Platform Comparisons | Straight Answers | ZINC";
const DESCRIPTION =
  "Fair comparisons of the choices behind an AI-native website: Webflow or AI-native, WordPress or AI-native, Dispatch or a DIY agent workflow, agent editing or a headless CMS.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/compare" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const CARDS = [
  { href: "/solutions/webflow-ai-website-migration", from: "Platform", title: "Webflow or AI-native?", text: "A straight answer from a Webflow partner that moved its own site." },
  { href: "/solutions/wordpress-ai-website-migration", from: "Platform", title: "WordPress or AI-native?", text: "No plugins to patch, and when staying on WordPress is smarter." },
  ...COMPARISONS.map((c) => ({ href: `/compare/${c.slug}`, from: "Workflow", title: c.card.title, text: c.card.text })),
];

const SCHEMA = buildWebPageSchema({ name: "Comparisons", description: DESCRIPTION, path: "/compare", pageType: "CollectionPage" });

export default function CompareHub() {
  return (
    <div className="site">
      <Navbar />
      <main className="main-wrapper offering-page offering-refresh">
        <ScrollReveal />
        <ContentHero
          tagline="Comparisons"
          title="Straight answers to the choices that shape your website."
          lede="Every comparison here is written so you could decide against us. If staying put is the smarter spend, we would rather you know now."
        />
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="paths_grid">
              {CARDS.map((c, i) => (
                <a key={c.href} href={c.href} className="paths_card" data-reveal="" style={{ "--i": i % 3 } as CSSProperties}>
                  <span className="paths_from">{c.from}</span>
                  <span className="paths_title">{c.title}</span>
                  <span className="paths_text">{c.text}</span>
                  <span className="paths_go" aria-hidden="true">Read the comparison &gt;</span>
                </a>
              ))}
            </div>
          </div></div></div>
        </section>
        <KeepExploring
          groups={[
            { heading: "Websites", links: [EXPLORE.aiNative, EXPLORE.migration, EXPLORE.enterprise] },
            { heading: "Learn", links: [EXPLORE.glossary, EXPLORE.realChange, EXPLORE.postDispatch] },
            { heading: "Take the next step", links: [EXPLORE.planner, EXPLORE.assessment, EXPLORE.contact] },
          ]}
        />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(SCHEMA) }} />
      <SiteAnalytics />
    </div>
  );
}
