/* eslint-disable @next/next/no-img-element */
// Section markup follows the solutions archetypes (header46, layout207,
// layout249, layout19, faq2) so the page inherits the site's look and feel.
// Copy is the approved text from the Sept 21, 2026 package, verbatim.
import { FaqItems } from "@/components/site/faq";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { TrustStrip } from "@/components/site/trust-strip";
import { WorkflowSteps } from "@/components/site/workflow-steps";
import { FAQ_ITEMS } from "./faq-items";

const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

const CheckIcon = () => (
  <div className="icon-embed-xsmall w-embed">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 -960 960 960" aria-hidden="true">
      <path fill="currentColor" d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
    </svg>
  </div>
);

type Item = { strong: string; text: string };
const Items = ({ items }: { items: Item[] }) => (
  <div className="layout207_item-list">
    {items.map((it) => (
      <div key={it.strong} className="layout207_item">
        <div className="layout207_item-icon-wrapper"><CheckIcon /></div>
        <div className="layout207_item-text-wrapper">
          <p><strong>{it.strong}</strong> {it.text}</p>
        </div>
      </div>
    ))}
  </div>
);

type Card = { n?: string; title: string; text: string; quote?: boolean };
const Cards = ({ items, four }: { items: Card[]; four?: boolean }) => (
  <div className={`w-layout-grid layout249_list${four ? " is-four" : ""}`}>
    {items.map((c) => (
      <div key={c.title} className="layout249_item">
        {c.n ? <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">{c.n}</div></div> : null}
        <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.title}</strong></h3></div>
        <p className={c.quote ? "offering-quote" : undefined}>{c.text}</p>
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

export function OverviewContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* Hero (header46) */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; AI-Native Websites by ZINC &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1">Keep the website you love. Change how you run it.</h1></div>
              <p className="text-size-medium fade-up">We move your website to a foundation your team can update by asking an AI agent, preserving the design and content you value while our governance platform, Dispatch, provides visibility and control.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="#assessment" className="button w-button">Request a Website Assessment &gt;</a>
                <a href="#walkthrough" className="button is-link is-icon w-inline-block"><div>See How It Works</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>

        <TrustStrip
          lead="25+ years of strategy, design, and digital delivery. Trusted by brands including:"
          note="ZINC agency experience across brand, web, and commerce."
        />

        {/* Walkthrough (explanatory interaction) */}
        <section id="walkthrough" className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; A different way to work &lt;</div></div>
              <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Making website updates starts with a conversation.</h2></div>
              <p className="text-size-medium">Tell your AI agent what you’d like to change. Preview the result, ask for adjustments, and approve it when you’re ready.</p>
            </div>
            <WorkflowSteps />
            <p className="offering-note">Illustrative workflow, not a live agent or Dispatch product demo.</p>
            <div className="offering-definition">
              <strong>That’s the idea behind an AI-native website.</strong>
              Your agent works with the website’s code and content. You describe the change and review the result. ZINC sets up the website and the management tools that make this possible.
            </div>
          </div></div></div>
        </section>

        {/* Four familiar tasks (layout249) */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="What will you ask your agent to do?" heading="Small updates. Bigger possibilities." text="These everyday website tasks can start with a simple request. Your agent prepares the work for your team to review." />
              <Cards four items={[
                { title: "Update a service or pricing page.", text: "“Update our pricing page with the approved rates in this document.”", quote: true },
                { title: "Turn approved content into a new campaign page.", text: "“Create a landing page for our new service using this approved copy, our brand, and our contact form.”", quote: true },
                { title: "Add a case study using the existing design.", text: "“Turn this approved client story into a case study using our current layout.”", quote: true },
                { title: "Improve page titles, descriptions, and internal links.", text: "“Suggest clearer titles and descriptions for our service pages, and add relevant links between them.”", quote: true },
              ]} />
              <p className="offering-bottomline">You bring the direction. Your agent helps bring it to life. ZINC helps your team get started.</p>
            </div>
          </div></div></div>
        </section>

        {/* Dispatch (layout207) */}
        <section id="dispatch" className="section_aeo-4">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/69bb3df66dfef39d53c3f700_dispatch_04-p-500.png 500w, /wf/69bb3df66dfef39d53c3f700_dispatch_04.png 1200w" alt="Dispatch review screen showing a previewed website change waiting for approval" src="/wf/69bb3df66dfef39d53c3f700_dispatch_04.png" loading="lazy" className="layout207_image" /></div>
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Dispatch · Our governance platform &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">More freedom to create. A clear way to stay in control.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Dispatch gives your team visibility into AI website work. ZINC configures the approval process and management layer around the way your business operates.</p></div>
                <Items items={[
                  { strong: "Review before release.", text: "Inspect a preview and request changes before approving publication." },
                  { strong: "Know who did what.", text: "Keep a record of requests, changes, and approvals across your team and agents." },
                  { strong: "Have a recovery plan.", text: "Use version history and a tested restore process for supported website changes." },
                ]} />
                <p className="offering-bottomline">Bring your own agent, such as Codex or Claude Code. ZINC connects the tools and helps your team use them confidently.</p>
                <div className="margin-top margin-medium"><div className="button-group">
                  <a href="#assessment" className="button w-button">Request a Website Assessment &gt;</a>
                  <a href="https://dispatchvault.com/product/website-governance" className="button is-link is-icon w-inline-block" rel="noopener"><div>Explore Dispatch Governance</div><ArrowIcon /></a>
                </div></div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Migration overview (layout249 with intro pair) */}
        <section id="migration" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="From your current CMS to an AI-native website" heading="Keep what works. Change what’s possible." text="Your brand. Your content. Your next chapter. We assess your pages, design, content, URLs, forms, and integrations, then plan what carries over and what needs rebuilding. You review the new site before the switch." />
              <div className="offering-pair" style={{ marginTop: 0 }}>
                <div><h3 className="heading-style-h5">What we work to preserve</h3><p>Your agreed design and content. Existing URLs where possible. Forms, tracking, and business integrations, assessed and rebuilt or reconnected as needed.</p></div>
                <div><h3 className="heading-style-h5">What changes underneath</h3><p>An agent-accessible codebase, suitable hosting, and a managed review and publishing workflow. We recommend the architecture around your website’s actual requirements.</p></div>
              </div>
              <div className="offering-steps">
                <Cards items={[
                  { n: "01 · Assess", title: "Understand your website.", text: "Review content, functionality, integrations, SEO requirements, and how your team needs to work. Agree scope, timing, and costs." },
                  { n: "02 · Rebuild & verify", title: "Review it before moving.", text: "Prepare a staging version. Check representative layouts, content, forms, redirects, and integrations against the agreed scope." },
                  { n: "03 · Launch & enable", title: "Make the handover work.", text: "Coordinate cutover, configure Dispatch, train your team, and agree ongoing support and responsibilities." },
                ]} />
              </div>
              <p className="offering-bottomline">A preview can be quick. Production timing depends on the site’s complexity and launch checks. We’ll establish both after reviewing your website.</p>
              <div className="offering-links">
                <a href="#assessment" className="button w-button">Request a Website Assessment &gt;</a>
                <a href="/solutions/ai-website-migration" className="button is-link is-icon w-inline-block"><div>Explore AI Website Migration</div><ArrowIcon /></a>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Team support (layout249, two cards) */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="Ready for your team to use" heading="Your team. Our team. Or both." text="We configure your website, connect Dispatch, and guide your team through its first AI-assisted changes. Continue independently, collaborate with ZINC, or have us handle ongoing work." />
              <div className="offering-pair" style={{ marginTop: 0 }}>
                <div><h3 className="heading-style-h4"><strong>An experienced partner.</strong></h3><p>Bring over 25 years of ZINC’s strategy, brand, and website experience to your next move.</p></div>
                <div><h3 className="heading-style-h4"><strong>Room to keep growing.</strong></h3><p>Work with us on content, campaigns, SEO and AEO, and improvements that help turn visits into opportunities.</p></div>
              </div>
              <p className="offering-bottomline">Starting fresh or already running a code-based site? We also design new AI-native websites and integrate agents and Dispatch into compatible sites.</p>
              <div className="offering-links">
                <a href="/work" className="button is-link is-icon w-inline-block"><div>Explore ZINC’s Work</div><ArrowIcon /></a>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* FAQ (faq2) */}
        <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="faq2_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Questions before you make a move.</h2></div>
              </div></div>
              <div className="faq2_list"><FaqItems items={FAQ_ITEMS} /></div>
            </div>
          </div></div></div>
        </section>

        {/* Assessment enquiry (layout19 grid, form in the right column) */}
        <section id="assessment" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Your next step &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">See what’s possible for your website.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Share your website and what you’d like to accomplish. We’ll discuss the right next step for your business.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>Review your goals and current website.</p></li>
                  <li className="layout19_item"><p>Identify the requirements and questions that need a closer look.</p></li>
                  <li className="layout19_item"><p>Recommend a path, with scope and costs for any proposed work.</p></li>
                </ul>
                <p className="offering-note">No platform credentials needed for an initial conversation.</p>
              </div>
              <div className="layout19_image-wrapper">
                <EnquiryForm
                  formName="Website Assessment Request"
                  offer="AI-Native Websites"
                  submitLabel="Request a Website Assessment"
                  contextLabel="What would you like your website or team to do better?"
                  contextPlaceholder="Tell us what you’d like your website or team to do better."
                  successMessage="Thanks. We will review your website and come back to you to arrange the assessment conversation."
                />
              </div>
            </div></div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
