import type { CSSProperties } from "react";
import { FaqItems } from "@/components/site/faq";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { InShort } from "@/components/site/in-short";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { OfferingHeroVisual } from "@/components/site/offering-hero-visual";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { StepNumber } from "@/components/site/step-number";
import { FAQ_ITEMS } from "./faq-items";

// AI-built website cleanup: the offer for teams that shipped a site with an
// AI builder and now need it to be safe, findable, and governed. Feeds the
// AI-native and Dispatch offers.

const FINDINGS = [
  { title: "Forms that go nowhere.", text: "The form says thank you. The lead lands in a table nobody checks, or nowhere at all." },
  { title: "Secrets in the browser.", text: "API keys and database access exposed in code anyone can read, waiting for someone to find them." },
  { title: "Pages search engines cannot read.", text: "Content that only appears after scripts run, missing titles, no sitemap, and nothing for answer engines to quote." },
  { title: "Code only the tool understands.", text: "No repository, no structure, and no way for a person or a different agent to change it safely." },
  { title: "Accessibility gaps.", text: "Missing labels, low contrast, and keyboard traps that shut people out and add legal risk." },
  { title: "No safety net.", text: "Every change goes straight to the live site, with no preview, no approval, and no way back." },
];

const STEPS = [
  { n: "01 · Review", title: "Find what is at risk.", text: "We review security, forms and data, search and AEO signals, accessibility, performance, and code structure, and rank what we find by business risk." },
  { n: "02 · Fix", title: "Fix what matters first.", text: "Exposed secrets and broken lead paths first, then search, accessibility, and structure. Every fix is previewed before it goes live." },
  { n: "03 · Govern", title: "Make it safe to keep building.", text: "The code moves into your repository, gets the structure an agent needs, and is connected to Dispatch, so every future change is reviewed." },
];

export function CleanupContent() {
  return (
    <main className="main-wrapper offering-page offering-refresh">
      <ScrollReveal />
      <header className="section_aeo-hero color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="header46_component offering-hero"><div className="max-width-large">
            <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; AI-built website cleanup &lt;</div></div>
            <div className="margin-bottom margin-small hero-seq__item"><h1 className="heading-style-h1">You built it in a weekend. Make it ready for customers.</h1></div>
            <p className="text-size-medium hero-seq__item">AI builders get a site live fast. They do not always check that the leads arrive, the secrets stay secret, or search engines can read a word. We find what is at risk, fix it, and put your site on a footing you can keep building on.</p>
            <div className="margin-top margin-medium hero-seq__item"><div className="button-group">
              <a href="#review" className="button w-button">Get a Free First Look &gt;</a>
              <a href="#findings" className="button is-link w-button">What We Usually Find &gt;</a>
            </div></div>
          </div>
          <OfferingHeroVisual variant="workflow" /></div>
        </div></div></div>
      </header>

      <InShort>
        <p>AI-built website cleanup turns a site made with a tool such as Lovable, v0, or Bolt into one that is <strong>secure, findable, accessible, and safe to change.</strong> ZINC reviews it, fixes what puts the business at risk, and moves the code into your own repository.</p>
        <p>From there, your team keeps building with AI, and Dispatch previews and approves every change before it goes live.</p>
      </InShort>

      <section id="findings" className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; What we usually find &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">It looks finished. That is the problem.</h2></div>
              <p className="text-size-medium">The risks in a fast build are the ones you cannot see from the homepage. These are the six we check first.</p>
            </div></div>
            <div className="w-layout-grid layout249_list">
              {FINDINGS.map((f, i) => (
                <div key={f.title} className="layout249_item" data-reveal="" style={{ "--i": i % 3 } as CSSProperties}>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{f.title}</strong></h3></div>
                  <p>{f.text}</p>
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
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Keep the speed. Lose the risk.</h2></div>
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
            <div className="offering-definition" data-reveal="">
              <strong>Clean up, or start over?</strong>
              Most fast builds need targeted fixes, not a rebuild. When a rebuild is genuinely cheaper, we will show you why, and we can usually keep the design you already like.
            </div>
          </div>
        </div></div></div>
      </section>

      <section id="review" className="section_layout19">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout19_component"><div className="w-layout-grid layout19_content">
            <div className="layout19_content-left" data-reveal="">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Free first look &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Send us the site. We will tell you what is at risk.</h2></div>
              <ul role="list" className="layout19_list">
                <li className="layout19_item"><p>The risks that matter most, in plain language.</p></li>
                <li className="layout19_item"><p>Whether it needs a cleanup, targeted fixes, or a rebuild.</p></li>
                <li className="layout19_item"><p>A scoped next step, with costs.</p></li>
              </ul>
            </div>
            <div className="layout19_image-wrapper" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
              <EnquiryForm
                formName="AI-Built Site Cleanup Request"
                offer="AI-Built Website Cleanup"
                submitLabel="Get a Free First Look"
                contextLabel="What was it built with, and what does it need to do?"
                contextPlaceholder="For example: built in Lovable, takes demo requests, connects to HubSpot."
                successMessage="Thanks. We will take a first look at your site and come back with what we find and the right next step."
              />
            </div>
          </div></div>
        </div></div></div>
      </section>

      <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="faq2_component">
            <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Questions about cleaning up an AI-built site.</h2></div>
            </div></div>
            <div className="faq2_list" data-reveal=""><FaqItems items={FAQ_ITEMS} /></div>
          </div>
        </div></div></div>
      </section>

      <KeepExploring
        groups={[
          { heading: "Where it leads", links: [EXPLORE.aiNative, EXPLORE.dispatch, EXPLORE.migration] },
          { heading: "See the proof", links: [EXPLORE.realChange, EXPLORE.postStructure, EXPLORE.glossary] },
          { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.design, EXPLORE.contact] },
        ]}
      />
    </main>
  );
}
