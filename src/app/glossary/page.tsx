import type { Metadata } from "next";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { ContentHero } from "@/components/site/content-hero";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { TERMS } from "@/lib/glossary";
import { buildWebPageSchema, serializeSchema } from "@/lib/schema";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "@/components/site/offering.css";
import "@/components/site/solutions-archetypes.css";
import "@/components/site/offering-refresh.css";
import "@/components/site/aeo-blocks.css";

const TITLE = "AI Website Glossary | AI-Native, AEO, Governance Terms | ZINC";
const DESCRIPTION =
  "Plain-language definitions of AI-native websites, AI website migration and governance, AEO, llms.txt, MCP, agentic commerce, and the other terms behind running a website with AI.";
const PATH = "/glossary";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `https://www.wearezinc.com${PATH}` },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website", images: ["https://www.wearezinc.com/og/home.png"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SCHEMA = buildWebPageSchema({
  name: "AI Website Glossary",
  description: DESCRIPTION,
  path: PATH,
  extra: [
    {
      "@type": "DefinedTermSet",
      "@id": `https://www.wearezinc.com${PATH}#terms`,
      name: "AI Website Glossary",
      hasDefinedTerm: TERMS.map((t) => ({
        "@type": "DefinedTerm",
        "@id": `https://www.wearezinc.com${PATH}#${t.id}`,
        name: t.term,
        description: t.more ? `${t.definition} ${t.more}` : t.definition,
        inDefinedTermSet: `https://www.wearezinc.com${PATH}#terms`,
      })),
    },
  ],
});

export default function GlossaryPage() {
  return (
    <div className="site">
      <Navbar />
      <main className="main-wrapper offering-page offering-refresh">
        <ScrollReveal />
        <ContentHero
          tagline="Glossary"
          title="Run your website with AI. Speak the language first."
          lede="The terms behind AI-native websites, migrations, and governance, in plain English. Each one links to the page that goes deeper."
        />
        <section className="glossary">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <nav className="glossary_index" aria-label="Glossary terms">
              {TERMS.map((t) => <a key={t.id} href={`#${t.id}`}>{t.term.replace(/ \(.*\)$/, "")}</a>)}
            </nav>
            <div className="glossary_list">
              {TERMS.map((t) => (
                <div key={t.id} id={t.id} className="glossary_item">
                  <h2 className="heading-style-h5">{t.term}</h2>
                  <div>
                    <p className="glossary_def">{t.definition}</p>
                    {t.more ? <p className="glossary_more">{t.more}</p> : null}
                    {t.href ? <a href={t.href} className="faq-link">{t.linkLabel} &gt;</a> : null}
                  </div>
                </div>
              ))}
            </div>
          </div></div></div>
        </section>
        <KeepExploring
          groups={[
            { heading: "Websites", links: [EXPLORE.aiNative, EXPLORE.migration, EXPLORE.enterprise] },
            { heading: "Control and visibility", links: [EXPLORE.dispatch, EXPLORE.realChange, EXPLORE.postStructure] },
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
