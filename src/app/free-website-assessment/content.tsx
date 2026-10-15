import type { CSSProperties } from "react";
import { AssessmentForm } from "@/components/site/assessment-form";
import { FaqItems } from "@/components/site/faq";
import { InShort } from "@/components/site/in-short";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { StepNumber } from "@/components/site/step-number";
import { TrustStrip } from "@/components/site/trust-strip";
import { ASSESSMENT_TURNAROUND } from "@/lib/assessment";
import { FAQ_ITEMS } from "./faq-items";

// The free website assessment: the single front door every campaign (X,
// email, social, ads) points to. Two buyers, one page: owner-led businesses
// and mid-market marketing teams. Survival first (customers ask AI before
// they visit), then a simple, low-risk step.

const GETS = [
  { title: "How AI sees you.", text: "Whether assistants like ChatGPT and Google’s AI answers can find your business, understand what you do, and recommend you, and where they get it wrong." },
  { title: "What search sees.", text: "The pages, titles, and technical basics that help or hurt you in search, and the few fixes that matter most." },
  { title: "Where leads slip away.", text: "Forms, calls to action, mobile problems, and dead ends that quietly cost you inquiries every week." },
  { title: "Your best next move.", text: "Improve what you have, move to a better platform, or redesign. A straight recommendation, in plain language." },
];

const STEPS = [
  { n: "01 · Send", title: "Send us your website.", text: "Two minutes. No logins, no files, no obligation." },
  { n: "02 · Review", title: "A strategist reviews it.", text: "A senior person at ZINC, not a bot, looks at your site the way customers and AI do." },
  { n: "03 · Receive", title: "Get your assessment.", text: `A short written assessment within ${ASSESSMENT_TURNAROUND}, plus an optional 20-minute walkthrough.` },
];

export function AssessmentContent() {
  return (
    <main className="main-wrapper offering-page offering-refresh">
      <ScrollReveal />
      <header className="section_aeo-hero color-scheme-1 assessment-hero">
        <div className="padding-global"><div className="container-large"><div className="assessment-hero_pad">
          <div className="assessment-hero_grid">
            <div className="assessment-hero_copy">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Free website assessment &lt;</div></div>
              <div className="margin-bottom margin-small hero-seq__item"><h1 className="heading-style-h1">Your customers are asking AI. Find out what it tells them.</h1></div>
              <p className="text-size-medium hero-seq__item">More people now ask ChatGPT and Google’s AI answers who to hire before they ever visit a website. Send us yours, and we will show you what AI and your customers see today, what is holding you back, and the fastest way to fix it.</p>
              <ul role="list" className="assessment-hero_points hero-seq__item">
                <li>Free, from a team with 25+ years of building websites</li>
                <li>Reviewed by a person, delivered within {ASSESSMENT_TURNAROUND}</li>
                <li>No logins, no obligation, no hard sell</li>
              </ul>
            </div>
            <div id="assessment-form" className="assessment-hero_form hero-seq__item">
              <div className="assessment-hero_form-head">
                <h2 className="heading-style-h5">Get your free assessment</h2>
                <p>Takes about two minutes.</p>
              </div>
              <AssessmentForm />
            </div>
          </div>
        </div></div></div>
      </header>

      <InShort>
        <p>The free website assessment shows a business, <strong>in plain language,</strong> how AI assistants and search engines see its website, where it is losing leads, and the best next step: improve, migrate, or redesign.</p>
        <p>A senior ZINC strategist reviews every site by hand. It is free, needs no logins, and arrives within {ASSESSMENT_TURNAROUND}.</p>
      </InShort>

      <TrustStrip lead="25+ years of strategy, design, and digital delivery for brands including:" />

      <section className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Why now &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">The way people find businesses changed. Most websites did not.</h2></div>
              <p className="text-size-medium">Your next customer may never type your name into a search box. They ask an assistant, get an answer, and act on it. If your website is not built to be read, trusted, and recommended, someone else gets the call. The good news: the businesses that adjust now get a real head start.</p>
            </div></div>
            <div className="margin-bottom margin-small" data-reveal=""><div className="text-style-tagline">&gt; What you get &lt;</div></div>
            <div className="w-layout-grid layout249_list is-four">
              {GETS.map((g, i) => (
                <div key={g.title} className="layout249_item" data-reveal="" style={{ "--i": i } as CSSProperties}>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{g.title}</strong></h3></div>
                  <p>{g.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div></div></div>
      </section>

      <section className="section_aeo-6 color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; How it works &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Three steps. One clear answer.</h2></div>
            </div></div>
            <div className="w-layout-grid layout249_list">
              {STEPS.map((s, i) => (
                <div key={s.title} className="layout249_item" data-reveal="" style={{ "--i": i } as CSSProperties}>
                  <div className="margin-bottom margin-xsmall"><StepNumber value={s.n} /></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{s.title}</strong></h3></div>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <div className="offering-links">
              <a href="#assessment-form" className="button w-button">Get My Free Assessment &gt;</a>
            </div>
          </div>
        </div></div></div>
      </section>

      <section className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
            <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Who it is for &lt;</div></div>
            <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Whether you run the business or run the website.</h2></div>
          </div></div>
          <div className="path_compare">
            <div className="path_compare-col" data-reveal="">
              <h3 className="heading-style-h4">Growing businesses</h3>
              <ul role="list" className="path_checklist">
                <li>You run or help run a company, and the website has to bring in work</li>
                <li>You suspect it is falling behind, but you are not sure where to start</li>
                <li>You want a straight answer, not a sales pitch</li>
              </ul>
            </div>
            <div className="path_compare-col is-move" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
              <h3 className="heading-style-h4">Marketing and web teams</h3>
              <ul role="list" className="path_checklist">
                <li>You own a larger site on WordPress, Webflow Enterprise, or a custom stack</li>
                <li>You need to show up in AI answers and search, at scale</li>
                <li>You want to know if your platform and workflow can keep up with AI</li>
              </ul>
            </div>
          </div>
        </div></div></div>
      </section>

      <section className="section_aeo-4">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="assessment-proof" data-reveal="">
            <blockquote className="assessment-proof_quote">
              <p className="heading-style-h4">“ZINC helped us rethink how our website drives growth. Their AI-powered approach transformed our content and visibility, delivering measurable gains in both traffic and qualified leads.”</p>
              <footer><strong>Robert Brown</strong>, President, OMNIMED</footer>
            </blockquote>
            <div className="assessment-proof_facts">
              <div><span className="assessment-proof_num">25+</span><span>years building websites</span></div>
              <div><span className="assessment-proof_num">500+</span><span>projects launched</span></div>
              <div><span className="assessment-proof_num">15 min</span><span>from request to live, on our own AI-run site</span></div>
            </div>
          </div>
        </div></div></div>
      </section>

      <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="faq2_component">
            <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Questions before you send your site.</h2></div>
            </div></div>
            <div className="faq2_list" data-reveal=""><FaqItems items={FAQ_ITEMS} /></div>
          </div>
        </div></div></div>
      </section>

      <section className="assessment-final">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="assessment-final_inner" data-reveal="">
            <h2 className="heading-style-h2">The businesses that adjust now get the head start.</h2>
            <p className="text-size-medium">Find out where you stand. It takes two minutes and costs nothing.</p>
            <a href="#assessment-form" className="button w-button">Get My Free Assessment &gt;</a>
          </div>
        </div></div></div>
      </section>
    </main>
  );
}
