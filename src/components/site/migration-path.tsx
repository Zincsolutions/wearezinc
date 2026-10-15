import type { CSSProperties, ReactNode } from "react";
import { FaqItems, type FaqItem } from "@/components/site/faq";
import { FitCheckForm } from "@/components/site/fit-check-form";
import { InShort } from "@/components/site/in-short";
import { KeepExploring, type ExploreGroup } from "@/components/site/keep-exploring";
import { MigrationMethod } from "@/components/site/migration-method";
import { OfferingHeroVisual } from "@/components/site/offering-hero-visual";
import { OwnMigrationProof } from "@/components/site/own-migration-proof";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { TrustStrip } from "@/components/site/trust-strip";

// One template for every "<platform> to AI-native" migration path, so each
// page shares the method, proof, and structure, and differs only where the
// platform does: why teams leave, what each platform feature becomes, and
// when staying is the smarter call. Data lives in src/lib/migration-paths.tsx.

export type PathCard = { title: string; text: string };
export type PathData = {
  slug: string;
  platform: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  h1: string;
  lede: string;
  inShort: ReactNode;
  why?: { tagline: string; heading: string; text?: string; cards: PathCard[] };
  compare?: { tagline: string; heading: string; text?: string; stay: { heading: string; items: string[]; link?: { href: string; label: string } }; move: { heading: string; items: string[] }; both?: { heading: string; text: string } };
  features: { heading: string; text: string; rows: { feature: string; destination: string }[] };
  keep: string[];
  stay?: { heading: string; text: string; items: string[]; link?: { href: string; label: string } };
  form: { heading: string; text: string; formName: string; submitLabel?: string };
  faqs: FaqItem[];
  faqHeading?: string;
  explore: ExploreGroup[];
};

const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

const Intro = ({ tagline, heading, text }: { tagline: string; heading: string; text?: string }) => (
  <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
    <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div>
    <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
    {text ? <p className="text-size-medium">{text}</p> : null}
  </div></div>
);

const Checklist = ({ items }: { items: string[] }) => (
  <ul role="list" className="path_checklist">
    {items.map((it) => <li key={it}>{it}</li>)}
  </ul>
);

export function MigrationPath({ data }: { data: PathData }) {
  return (
    <main className="main-wrapper offering-page offering-refresh">
      <ScrollReveal />
      <header className="section_aeo-hero color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="header46_component offering-hero"><div className="max-width-large">
            <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {data.tagline} &lt;</div></div>
            <div className="margin-bottom margin-small hero-seq__item"><h1 className="heading-style-h1">{data.h1}</h1></div>
            <p className="text-size-medium hero-seq__item">{data.lede}</p>
            <div className="margin-top margin-medium hero-seq__item"><div className="button-group">
              <a href="#preview" className="button w-button">{data.form.submitLabel ?? "Get a Free Migration Preview"} &gt;</a>
              <a href="#method" className="button is-link is-icon w-inline-block"><div>How the Move Works</div><ArrowIcon /></a>
            </div></div>
          </div>
          <OfferingHeroVisual variant="migration" /></div>
        </div></div></div>
      </header>

      <InShort>{data.inShort}</InShort>

      <TrustStrip lead="25+ years of strategy, design, and digital delivery for brands including:" />

      {data.why ? (
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline={data.why.tagline} heading={data.why.heading} text={data.why.text} />
              <div className="w-layout-grid layout249_list">
                {data.why.cards.map((c, i) => (
                  <div key={c.title} className="layout249_item" data-reveal="" style={{ "--i": i } as CSSProperties}>
                    <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.title}</strong></h3></div>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div></div></div>
        </section>
      ) : null}

      {data.compare ? (
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <Intro tagline={data.compare.tagline} heading={data.compare.heading} text={data.compare.text} />
            <div className="path_compare">
              <div className="path_compare-col" data-reveal="">
                <h3 className="heading-style-h4">{data.compare.stay.heading}</h3>
                <Checklist items={data.compare.stay.items} />
                {data.compare.stay.link ? <a href={data.compare.stay.link.href} className="faq-link">{data.compare.stay.link.label} &gt;</a> : null}
              </div>
              <div className="path_compare-col is-move" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
                <h3 className="heading-style-h4">{data.compare.move.heading}</h3>
                <Checklist items={data.compare.move.items} />
                <a href="#preview" className="faq-link">Get a free migration preview &gt;</a>
              </div>
            </div>
            {data.compare.both ? (
              <div className="offering-definition" data-reveal="">
                <strong>{data.compare.both.heading}</strong>
                {data.compare.both.text}
              </div>
            ) : null}
          </div></div></div>
        </section>
      ) : null}

      <section className="section_aeo-4 path_features">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <Intro tagline={`What happens to your ${data.platform} features`} heading={data.features.heading} text={data.features.text} />
          <div className="stack_table-wrap" data-reveal="">
            <table className="stack_table path_table">
              <caption className="u-sr-only">{`Where each ${data.platform} feature goes in the migration`}</caption>
              <thead><tr><th scope="col">{`On ${data.platform}`}</th><th scope="col">After the move</th></tr></thead>
              <tbody>
                {data.features.rows.map((r) => (
                  <tr key={r.feature}>
                    <th scope="row" className="stack_pick path_feature">{r.feature}</th>
                    <td className="stack_why">{r.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div></div></div>
      </section>

      <section className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="path_keep">
            <div data-reveal="">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; What you keep &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Your design, content, and URLs come with you.</h2></div>
              <p className="text-size-medium">The site moves page for page onto Astro or Next.js on Cloudflare, Vercel, or Netlify. We recommend the stack because we sell none of them.</p>
            </div>
            <div data-reveal="" style={{ "--i": 1 } as CSSProperties}>
              <Checklist items={data.keep} />
              <a href="/solutions/ai-dispatch" className="faq-link">How Dispatch keeps you in control &gt;</a>
            </div>
          </div>
        </div></div></div>
      </section>

      <MigrationMethod />

      <OwnMigrationProof compact />

      {data.stay ? (
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="path_keep">
              <div data-reveal="">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Straight answer &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{data.stay.heading}</h2></div>
                <p className="text-size-medium">{data.stay.text}</p>
              </div>
              <div data-reveal="" style={{ "--i": 1 } as CSSProperties}>
                <Checklist items={data.stay.items} />
                {data.stay.link ? <a href={data.stay.link.href} className="faq-link">{data.stay.link.label} &gt;</a> : null}
              </div>
            </div>
          </div></div></div>
        </section>
      ) : null}

      <section id="preview" className="section_layout19">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout19_component"><div className="w-layout-grid layout19_content">
            <div className="layout19_content-left" data-reveal="">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Free preview &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{data.form.heading}</h2></div>
              <p className="text-size-medium">{data.form.text}</p>
            </div>
            <div className="layout19_image-wrapper" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
              <FitCheckForm formName={data.form.formName} />
            </div>
          </div></div>
        </div></div></div>
      </section>

      <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="faq2_component">
            <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{data.faqHeading ?? `Questions about leaving ${data.platform}.`}</h2></div>
            </div></div>
            <div className="faq2_list" data-reveal=""><FaqItems items={data.faqs} /></div>
          </div>
        </div></div></div>
      </section>

      <KeepExploring groups={data.explore} />
    </main>
  );
}
