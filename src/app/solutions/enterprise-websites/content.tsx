/* eslint-disable @next/next/no-img-element */
// Section markup follows the solutions archetypes (header46, layout207,
// layout249, layout19, faq2) so the page inherits the site's look and feel.
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

export function EnterpriseContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* Hero (header46) */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Enterprise Websites &amp; CMS &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1">The right platform. More potential.</h1></div>
              <p className="text-size-medium fade-up">Grow with Webflow Enterprise and the systems your business relies on, with ZINC bringing strategy, design, development, and AI integration to help your team accomplish more.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="#contact" className="button w-button">Talk About Your Website &gt;</a>
                <a href="#ai-integrations" className="button is-link is-icon w-inline-block"><div>Explore AI Integrations</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>

        <TrustStrip lead="25+ years of strategy, design, and digital delivery for brands including:" />

        {/* Webflow expertise (layout207) */}
        <section className="section_aeo-4">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/695bda13c7c5d5a8fcdb45bd_web_design_04-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb45bd_web_design_04-p-800.webp 800w, /wf/695bda13c7c5d5a8fcdb45bd_web_design_04.webp 1024w" alt="Website layouts designed and built by ZINC on an enterprise CMS" src="/wf/695bda13c7c5d5a8fcdb45bd_web_design_04.webp" loading="lazy" className="layout207_image" /></div>
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Webflow expertise. Business perspective. &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Get more from Webflow Enterprise.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Your website needs to serve marketing, IT, and the people who use it every day. As a Webflow partner, we help you bring those needs together in a website that reflects your brand and supports your business.</p></div>
                <div className="offering-pair">
                  <div><h3 className="heading-style-h5">A stronger brand experience.</h3><p>Build or refine your website with thoughtful design, reusable components, and content structures that support growth.</p></div>
                  <div><h3 className="heading-style-h5">A more capable team.</h3><p>Give marketers clearer workflows, useful templates, and training so everyday website work moves with less friction.</p></div>
                  <div><h3 className="heading-style-h5">Connected business systems.</h3><p>Connect your CMS with CRM, marketing, analytics, and other essential tools, with clear responsibilities for how they operate.</p></div>
                </div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* AI within the platform (layout249, four cards) */}
        <section id="ai-integrations" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="AI within your enterprise platform" heading="Your CMS. New ways to get things done." text="Bring AI into the work your team already does. We combine Webflow’s AI capabilities with connected tools and custom integrations to reduce repetitive tasks and help your team scale." />
              <Cards four items={[
                { title: "Turn approved content into CMS drafts.", text: "Prepare articles, resources, or case studies from approved source material, mapped to your content structure and ready for an editor’s review." },
                { title: "Prepare campaigns faster.", text: "Use AI to help adapt approved messaging and prepare page content within your design system, with your team reviewing the finished experience." },
                { title: "Improve search content at scale.", text: "Identify gaps and draft improvements to titles, descriptions, and content for review as part of an ongoing SEO and AEO program." },
                { title: "Connect the steps between systems.", text: "Build workflows that organize approved inputs, prepare CMS updates, and notify the right people when work is ready for review." },
              ]} />
              <p className="offering-bottomline">We choose the tools around the task: built-in platform AI, connected agents, or a custom workflow where your business needs it.</p>
            </div>
          </div></div></div>
        </section>

        {/* Operating responsibilities (layout249, three cards) */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="Built around how your business operates" heading="More capability. Clear responsibility." text="Useful AI belongs in a workflow your team understands. We work with your marketing and IT teams to define access, review, and publishing responsibilities before rolling out a new integration." />
              <Cards items={[
                { n: "01", title: "Define access.", text: "Agree which tools can access which content and systems, using supported platform permissions and integration controls." },
                { n: "02", title: "Keep review in the process.", text: "Set up draft, preview, and approval steps around the work, with clear ownership of the final publishing decision." },
                { n: "03", title: "Make it maintainable.", text: "Test the workflow, document dependencies, and train the people responsible for running it and resolving issues." },
              ]} />
            </div>
          </div></div></div>
        </section>

        {/* Broader partnership (layout249, three cards) */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="One partner across your website" heading="Build it well. Keep making it better." />
              <Cards items={[
                { title: "Strategy, design & development.", text: "Align business goals, brand, content, and technology in a new website or a focused improvement to your existing one." },
                { title: "CMS & AI integration.", text: "Improve content models, connect business tools, and introduce AI workflows that address real bottlenecks." },
                { title: "Ongoing growth & support.", text: "Keep moving with design and development support, SEO and AEO, campaign delivery, and measured conversion improvements." },
              ]} />
              <div className="offering-links">
                <a href="/work" className="button is-link is-icon w-inline-block"><div>Explore ZINC’s Work</div><ArrowIcon /></a>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Process (layout249, numbered) */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="A practical way forward" heading="Start with what will make a difference." />
              <Cards items={[
                { n: "01 · Understand", title: "Find the opportunity.", text: "Review your website, business priorities, platform, and team workflows to identify where better design, integration, or AI can help." },
                { n: "02 · Implement", title: "Make it work in practice.", text: "Agree the scope and success measures, then build and test the website improvements or an initial AI workflow with your team." },
                { n: "03 · Evolve", title: "Build on what works.", text: "Train your team, review results, and prioritize the next improvements through a focused project or an ongoing partnership." },
              ]} />
            </div>
          </div></div></div>
        </section>

        {/* FAQ (faq2) */}
        <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="faq2_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Questions about your next step.</h2></div>
              </div></div>
              <div className="faq2_list"><FaqItems items={FAQ_ITEMS} /></div>
            </div>
          </div></div></div>
        </section>

        {/* Enquiry (layout19 grid, form in the right column) */}
        <section id="contact" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Your website. Your next opportunity. &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">What could your team do better?</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Tell us about your website and what you’d like to improve. We’ll help identify the right next step for your platform, your team, and your business.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>Discuss your goals and current setup.</p></li>
                  <li className="layout19_item"><p>Identify website and AI integration opportunities.</p></li>
                  <li className="layout19_item"><p>Define a practical scope and next step.</p></li>
                </ul>
              </div>
              <div className="layout19_image-wrapper">
                <EnquiryForm
                  formName="Enterprise Website Enquiry"
                  offer="Enterprise Websites & CMS"
                  submitLabel="Talk About Your Website"
                  contextLabel="What would you like to improve?"
                  contextPlaceholder="Your platform, team needs, or an AI workflow you have in mind."
                  successMessage="Thanks. We will review your website and come back to you with a suggested next step."
                />
              </div>
            </div></div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
