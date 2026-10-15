import type { CSSProperties } from "react";
import { FaqItems } from "@/components/site/faq";
import { ContentHero } from "@/components/site/content-hero";
import { InShort } from "@/components/site/in-short";
import { KeepExploring } from "@/components/site/keep-exploring";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import type { Comparison } from "@/lib/comparisons";

// Layout for /compare/* pages. Content lives in src/lib/comparisons.tsx.
export function ComparisonPage({ data }: { data: Comparison }) {
  return (
    <main className="main-wrapper offering-page offering-refresh">
      <ScrollReveal />
      <ContentHero tagline={data.tagline} title={data.h1} lede={data.lede}>
        <div className="button-group">
          <a href="#compare" className="button w-button">See the Comparison &gt;</a>
          <a href="/free-website-assessment" className="button is-link w-button">Get a Straight Answer for Your Site &gt;</a>
        </div>
      </ContentHero>

      <InShort>{data.inShort}</InShort>

      <section id="compare" className="compare">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="stack_table-wrap" data-reveal="">
            <table className="stack_table compare_table">
              <caption className="u-sr-only">{`${data.a} compared with ${data.b}`}</caption>
              <thead><tr><th scope="col"><span className="u-sr-only">Question</span></th><th scope="col">{data.a}</th><th scope="col">{data.b}</th></tr></thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="stack_pick compare_label">{r.label}</th>
                    <td className="stack_why" data-label={data.a}>{r.a}</td>
                    <td className="stack_why compare_b" data-label={data.b}>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="path_compare compare_choose">
            <div className="path_compare-col" data-reveal="">
              <h2 className="heading-style-h4">{data.chooseAHeading}</h2>
              <ul role="list" className="path_checklist">{data.chooseA.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div className="path_compare-col is-move" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
              <h2 className="heading-style-h4">{data.chooseBHeading}</h2>
              <ul role="list" className="path_checklist">{data.chooseB.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
          {data.bothNote ? (
            <div className="offering-definition" data-reveal="">
              <strong>{data.bothNote.heading}</strong>
              {data.bothNote.text}
            </div>
          ) : null}
        </div></div></div>
      </section>

      <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="faq2_component">
            <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Questions worth asking.</h2></div>
            </div></div>
            <div className="faq2_list" data-reveal=""><FaqItems items={data.faqs} /></div>
          </div>
        </div></div></div>
      </section>

      <KeepExploring groups={data.explore} />
    </main>
  );
}
