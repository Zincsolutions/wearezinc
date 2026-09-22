/* eslint-disable @next/next/no-img-element */
// Section markup follows the solutions archetypes (header46, layout249,
// layout207, layout19, faq2) so the page inherits the site's look and feel.
// Copy is the approved text from the Sept 21, 2026 package, verbatim.
import { FaqItems } from "@/components/site/faq";
import { StepNumber } from "@/components/site/step-number";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { TrustStrip } from "@/components/site/trust-strip";
import { FAQ_ITEMS } from "./faq-items";

const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

type Card = { n?: string; title: string; text: string };
const Cards = ({ items, four }: { items: Card[]; four?: boolean }) => (
  <div className={`w-layout-grid layout249_list${four ? " is-four" : ""}`}>
    {items.map((c) => (
      <div key={c.title} className="layout249_item">
        {c.n ? <div className="margin-bottom margin-xsmall"><StepNumber value={c.n} /></div> : null}
        <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.title}</strong></h3></div>
        <p>{c.text}</p>
      </div>
    ))}
  </div>
);

const Intro = ({ tagline, heading, text }: { tagline: string; heading: string; text?: string }) => (
  <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
    <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div>
    <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
    {text ? <p className="text-size-medium">{text}</p> : null}
  </div></div>
);

export function MigrationContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* Hero (header46) */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; AI website migration, with control built in &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1">Your move to AI-native. Handled by ZINC.</h1></div>
              <p className="text-size-medium fade-up">Bring your website into an AI-native environment with an experienced team handling the migration, our governance platform, Dispatch, providing control, and your team prepared to take over.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="#quote" className="button w-button">Request a Migration Quote &gt;</a>
                <a href="#scope" className="button is-link is-icon w-inline-block"><div>See What’s Included</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>

        <TrustStrip lead="25+ years of strategy, design, and digital delivery for brands including:" />

        {/* Deliverables (layout249, four cards) */}
        <section id="scope" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="The migration, managed" heading="From your current CMS to your next chapter." text="Keep the design and content that work. We handle the technical transition and prepare your website for the way your team wants to work." />
              <Cards four items={[
                { title: "Your design and content.", text: "Recreate your agreed layouts, move your pages and content, and check the experience across desktop and mobile." },
                { title: "Your search foundations.", text: "Map URLs, metadata, internal links, and redirects, with launch checks and a plan to monitor search performance." },
                { title: "Your business connections.", text: "Review forms, analytics, CRM connections, and other integrations, then rebuild or reconnect what your website needs." },
                { title: "Your team’s new workflow.", text: "Configure hosting, your chosen AI agent, and Dispatch, then guide your team through reviewing and publishing its first changes." },
              ]} />
            </div>
          </div></div></div>
        </section>

        {/* Process (layout249, numbered) */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="A clear path to launch" heading="Know what’s moving. See it before it goes live." />
              <Cards items={[
                { n: "01 · Scope", title: "Agree the plan.", text: "We review your site and requirements, then outline what carries over, what needs rebuilding, the timeline, and the costs." },
                { n: "02 · Migrate", title: "Review your new site.", text: "Your current website stays live while we prepare a staging version, test the agreed functionality, and work through your feedback." },
                { n: "03 · Launch", title: "Make the move.", text: "We coordinate the switch, run launch checks, and hand over the website, account access, documentation, and team training." },
              ]} />
              <div className="offering-links">
                <a href="#quote" className="button w-button">Plan Your Migration &gt;</a>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* ZINC and Dispatch (layout207) */}
        <section className="section_aeo-4">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/69bb3df66dfef39d53c3f700_dispatch_04-p-500.png 500w, /wf/69bb3df66dfef39d53c3f700_dispatch_04.png 1200w" alt="Dispatch review screen showing a previewed website change waiting for approval" src="/wf/69bb3df66dfef39d53c3f700_dispatch_04.png" loading="lazy" className="layout207_image" /></div>
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; The ZINC difference &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">A website move. A lasting partnership.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Your website carries your brand and supports your business. Work with a team that understands both, with 25+ years of experience in strategy, design, and technology.</p></div>
                <div className="offering-pair">
                  <div>
                    <h3 className="heading-style-h5">Control comes with the setup.</h3>
                    <p>Our governance platform, Dispatch, provides visibility into AI website work. We configure your review and approval workflow and establish a recovery process for supported changes.</p>
                    <a href="/solutions/ai-dispatch" className="faq-link">Meet Dispatch &gt;</a>
                  </div>
                  <div>
                    <h3 className="heading-style-h5">Support beyond the switch.</h3>
                    <p>Run the site with your own team, work alongside ZINC, or have us manage ongoing improvements, from brand and campaigns to SEO and AEO.</p>
                    <a href="/work" className="faq-link">Explore Our Work &gt;</a>
                  </div>
                </div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Quote request (layout19 grid, form in the right column) */}
        <section id="quote" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Let’s scope your move &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Send us your website. We’ll map the next step.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Tell us what you’re working with and when you’d like to move. We’ll review your website, clarify the requirements, and prepare a scoped proposal.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>Migration scope and recommended setup.</p></li>
                  <li className="layout19_item"><p>Delivery timeline and launch responsibilities.</p></li>
                  <li className="layout19_item"><p>Implementation and ongoing costs.</p></li>
                </ul>
              </div>
              <div className="layout19_image-wrapper">
                <EnquiryForm
                  formName="Migration Quote Request"
                  offer="AI Website Migration"
                  submitLabel="Request a Migration Quote"
                  contextLabel="Anything we should know?"
                  contextPlaceholder="Your current platform, important integrations, or target launch date."
                  successMessage="Thanks. We will review your website and come back to you with the next step toward a scoped proposal."
                />
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* FAQ (faq2) */}
        <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="faq2_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">A few practical questions.</h2></div>
              </div></div>
              <div className="faq2_list"><FaqItems items={FAQ_ITEMS} /></div>
            </div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
