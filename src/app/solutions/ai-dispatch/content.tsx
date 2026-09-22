/* eslint-disable @next/next/no-img-element */
// Dispatch, rebuilt Sept 22, 2026 from the Dispatch messaging
// recommendations (copy verbatim). Built on the solutions archetypes
// (header46, layout249, layout207, layout19, faq2) so it inherits the
// site's look and feel. Dispatch leads with governance; AEO is supporting.
import { FaqItems } from "@/components/site/faq";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { FAQ_ITEMS } from "./faq-items";

const GOVERNED_CHANGE = "https://dispatchvault.com/product/website-governance";

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

type Card = { title: string; text: string; best?: string };
const Cards = ({ items, cols }: { items: Card[]; cols?: "three" | "four" }) => (
  <div className={`w-layout-grid layout249_list${cols === "four" ? " is-four" : ""}`}>
    {items.map((c) => (
      <div key={c.title} className="layout249_item">
        <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.title}</strong></h3></div>
        <p>{c.text}</p>
        {c.best ? <p className="offering-note"><strong>Best for:</strong> {c.best}</p> : null}
      </div>
    ))}
  </div>
);

const Intro = ({ tagline, heading, children }: { tagline?: string; heading: string; children?: React.ReactNode }) => (
  <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
    {tagline ? <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div> : null}
    <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
    {children}
  </div></div>
);

const Checks = ({ items }: { items: string[] }) => (
  <div className="layout207_item-list">
    {items.map((t) => (
      <div key={t} className="layout207_item">
        <div className="layout207_item-icon-wrapper"><CheckIcon /></div>
        <div className="layout207_item-text-wrapper"><p><strong>{t}</strong></p></div>
      </div>
    ))}
  </div>
);

export function DispatchContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* 1. Control-first hero (header46) */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Dispatch · AI Website Governance &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1">Let AI run your website. Keep your team in control.</h1></div>
              <p className="text-size-medium fade-up">Dispatch is the management layer for AI-powered websites. Your agent builds the change. Your team reviews and approves it. Dispatch keeps the work visible, attributable, and reversible.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="#get-started" className="button w-button">Talk Through the Right Path &gt;</a>
                <a href="#workflow" className="button is-link is-icon w-inline-block"><div>See the New Workflow</div><ArrowIcon /></a>
              </div></div>
              <p className="offering-note">Already on an agent-ready stack? ZINC can connect your website and configure Dispatch without requiring a redesign.</p>
            </div></div>
          </div></div></div>
        </header>
        <div className="section-divider"><div className="padding-global"><div className="container-large"><div className="row-top"><div className="divider-line"></div></div></div></div></div>

        {/* 2. The new operating model (layout207) */}
        <section className="section_aeo-4">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Your agent builds. Your team approves. &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Move faster without removing the safety net.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">AI coding agents can create pages, update content, improve metadata, and make sitewide changes in minutes. That speed is useful only when the business can see what is happening, apply the right approvals, and recover when something goes wrong.</p></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Dispatch sits above your agent, repository, and host. It gives every request a clear record, every proposed change a preview, and every release an accountable approval path. Your team gets the freedom to move faster without turning the website into an uncontrolled experiment.</p></div>
              </div>
              <div className="layout207_content-right">
                <Checks items={["Preview before release", "Role-based approvals", "Full change attribution", "Risk tiers for sensitive work", "One-click restore"]} />
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* 3. The proof moment (layout207 with the Dispatch review screen) */}
        <section id="workflow" className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/69bb3df66dfef39d53c3f700_dispatch_04-p-500.png 500w, /wf/69bb3df66dfef39d53c3f700_dispatch_04.png 1200w" alt="Dispatch review screen showing a previewed website change waiting for approval" src="/wf/69bb3df66dfef39d53c3f700_dispatch_04.png" loading="lazy" className="layout207_image" /></div>
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; See the new workflow &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Type the request. Watch the website change.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Ask your agent to update a headline, create a landing page, add a case study, or improve a group of service pages. The agent prepares the work against the real website. Dispatch shows the preview, records who did what, and routes the change to the right person for approval.</p></div>
                <p className="offering-bottomline">What once required a ticket, a queue, and a release cycle becomes a conversation with control built in.</p>
                <ul role="list" className="dispatch-prompts">
                  <li>“Create a landing page for our new service using the approved copy, our current design system, and the existing contact form.”</li>
                  <li>“Update the pricing FAQ across the site and show me every page that will change before anything goes live.”</li>
                  <li>“Add this approved case study using our current layout, then prepare it for review.”</li>
                </ul>
                <div className="margin-top margin-medium"><div className="button-group">
                  <a href={GOVERNED_CHANGE} className="button is-secondary w-button" rel="noopener">See a Governed Change, Step by Step</a>
                </div></div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* 4. Control without bottlenecks (layout249, six cards) */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro heading="Every change has a record. Every risk has a rule." />
              <Cards items={[
                { title: "Review before release", text: "Inspect the proposed change on a preview URL, request an adjustment, or approve it when it is ready. Nothing needs to go directly from an agent to production." },
                { title: "Match approval to risk", text: "Routine updates can move quickly. High-risk changes can require a second approver. Roles and risk tiers keep speed from outrunning judgment." },
                { title: "Know who did what", text: "Every request, branch, preview, approval, and release is attributed to the person or agent responsible. The history stays visible across the team." },
                { title: "Work in parallel", text: "Each request runs on its own branch, so multiple people and agents can work at once without overwriting one another." },
                { title: "Restore with one click", text: "If a supported website change needs to be reversed, return to the previous version without rebuilding the work from memory." },
                { title: "See what needs attention", text: "Approvals, findings, drafted fixes, and alerts come into one inbox, with Slack notifications when a person needs to act." },
              ]} />
            </div>
          </div></div></div>
        </section>

        {/* 5. Bring your own agent and stack */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <Intro tagline="BYOA · Bring your own agent" heading="Your agent. Your code. Your host.">
              <div className="margin-bottom margin-small"><p className="text-size-medium">Dispatch does not force your team into one AI model or one hosting platform. Use an agent such as Claude Code, Codex, or Gemini. Keep the website in your own GitHub repository. Deploy through the host that fits the project, including Vercel, Netlify, or Cloudflare.</p></div>
              <p className="text-size-medium">ZINC recommends the architecture around the website’s real needs. Dispatch adds a consistent management layer above the tools, so the team does not have to trade ownership for convenience.</p>
              <p className="offering-bottomline">Your website continues to live in your repository and hosting account. Dispatch governs the work around it.</p>
              <p className="offering-note">This website runs the same way: Claude Code on the repository, governed through Dispatch.</p>
            </Intro>
          </div></div></div>
        </section>

        {/* 6. From CMS safety net to AI-native control */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <Intro heading="Keep the safety net. Remove the constraint.">
              <div className="margin-bottom margin-small"><p className="text-size-medium">Traditional content management systems gave teams structure, permissions, publishing controls, and a safer way to update a website. AI agents change how the work gets produced, but they do not remove the need for those safeguards.</p></div>
              <p className="text-size-medium">Dispatch carries the important controls forward: visibility, roles, approvals, history, and recovery. The difference is that your agent can work directly against a modern codebase, without forcing every idea through a fixed template or a developer queue.</p>
            </Intro>
            <div className="offering-pair" style={{ marginTop: 0 }}>
              <div><h3 className="heading-style-h5">Moving off WordPress</h3><p>For many WordPress sites, this creates a practical path to a faster, more secure, agent-ready foundation while preserving the design, content, URLs, and business functions that still work.</p><a href="/solutions/wordpress-ai-website-migration" className="faq-link">WordPress to AI-native &gt;</a></div>
              <div><h3 className="heading-style-h5">When your platform still fits</h3><p>If your current platform is still the right fit, ZINC will say so. We can improve the site in place, add AI where it helps, or plan a migration when the business case is clear.</p><a href="/solutions/enterprise-websites" className="faq-link">Explore Enterprise Websites &amp; CMS &gt;</a></div>
            </div>
          </div></div></div>
        </section>

        {/* 7. Three paths (layout249, three cards) */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="How ZINC can get you there" heading="Migrate what works. Improve what matters. Redesign when it is worth it." />
              <Cards items={[
                { title: "Migrate as-is", text: "Keep the agreed design and content. ZINC recreates the site on an agent-ready foundation, preserves URLs where possible, reconnects the required business systems, and configures Dispatch from day one.", best: "teams that like the current website but want a better way to run it." },
                { title: "Migrate + improve", text: "Preserve the strongest parts of the website while improving priority pages, content structure, conversion paths, accessibility, SEO, or AEO as part of the move.", best: "teams that want a cleaner website and a stronger operating model without taking on a full redesign." },
                { title: "Redesign + migrate", text: "Reconsider the brand expression, customer journey, content, and technology together, then launch the new experience on an agent-ready stack governed through Dispatch.", best: "companies whose website no longer reflects the business or supports the next stage of growth." },
              ]} />
              <p className="offering-bottomline">ZINC’s job is not to force every client into the same answer. It is to make the right business, brand, creative, and technology decision, then carry it through.</p>
              <div className="offering-links">
                <a href="#get-started" className="button w-button">Talk Through the Right Path &gt;</a>
                <a href="/solutions/ai-website-migration" className="button is-link is-icon w-inline-block"><div>Explore AI Website Migration</div><ArrowIcon /></a>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* 8. AEO as a supporting capability */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <Intro tagline="Visibility built into the workflow" heading="See where AI search readiness slips, then act on it.">
              <div className="margin-bottom margin-small"><p className="text-size-medium">Dispatch monitors every page for the technical signals answer engines use, including titles, descriptions, headings, canonical tags, structured data, social metadata, indexability, and page status. Scores are tracked over time. When performance drops, the issue can enter the review queue with a drafted fix.</p></div>
              <p className="text-size-medium">AEO is one part of running a healthy website. It supports the migration and ongoing improvement program; it is not the reason to choose an architecture by itself, and no platform alone guarantees visibility in AI search.</p>
              <div className="offering-links">
                <a href="/solutions/on-brand-aeo-sprint" className="button is-link is-icon w-inline-block"><div>Ask About an AEO Sprint</div><ArrowIcon /></a>
              </div>
            </Intro>
          </div></div></div>
        </section>

        {/* 9. Why ZINC */}
        <section className="section_aeo-4">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Why ZINC &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">New technology. Experienced judgment.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">ZINC has spent more than 25 years helping companies make business, brand, creative, and technology decisions that show up in the real world. AI-native websites are a new operating model, but the questions behind a successful website have not disappeared.</p></div>
                <p className="text-size-medium">We help leadership teams decide what should change, what should stay, what the website needs to do for the business, and how the team should run it after launch. Then our strategists, designers, developers, and AI specialists put that decision into practice.</p>
              </div>
              <div className="layout207_content-right">
                <Checks items={[
                  "Business and brand strategy before platform selection",
                  "Design and content judgment, not migration alone",
                  "Technical planning across search, forms, analytics, CRM, and integrations",
                  "Migration, launch, training, and ongoing improvement",
                  "Dispatch governance configured around the way the client’s team works",
                ]} />
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* 10. FAQ (faq2) */}
        <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="faq2_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Questions about Dispatch.</h2></div>
              </div></div>
              <div className="faq2_list"><FaqItems items={FAQ_ITEMS} /></div>
            </div>
          </div></div></div>
        </section>

        {/* 11. Final CTA with enquiry (layout19) */}
        <section id="get-started" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">See what happens when AI speed meets real control.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Bring us the website you have and the business goals ahead of it. ZINC will help you decide whether to improve, migrate, or redesign, then show you how Dispatch can give your team a faster way to work without losing oversight.</p></div>
                <p className="offering-note">No platform credentials are needed for the initial review.</p>
                <div className="offering-links">
                  <a href={GOVERNED_CHANGE} className="button is-link is-icon w-inline-block" rel="noopener"><div>See a Governed Change, Step by Step</div><ArrowIcon /></a>
                </div>
              </div>
              <div className="layout19_image-wrapper">
                <EnquiryForm
                  formName="Dispatch Enquiry"
                  offer="Dispatch: AI Website Governance"
                  submitLabel="Talk Through the Right Path"
                  contextLabel="What would you like your website or team to do better?"
                  contextPlaceholder="Your current platform, your goals, or how your team works today."
                  successMessage="Thanks. We will review your website and come back to you to talk through the right path."
                />
              </div>
            </div></div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
