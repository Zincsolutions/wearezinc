/* eslint-disable @next/next/no-img-element */
// Section markup follows the archetypes used on the other solutions pages
// (header46, layout207, layout249, layout19, layout210, logo4, testimonial1,
// faq2, cta7) so the page inherits the site's look and feel unchanged.
import { FaqItems } from "@/components/site/faq";
import { FitCheckForm } from "@/components/site/fit-check-form";
import { FAQ_ITEMS } from "./faq-items";

const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

export function OverviewContent() {
  return (
    <>
      <main className="main-wrapper">
        {/* Hero (header46) */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; AI-Native Websites &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1">The Website Your Team Runs With AI.</h1></div>
              <p className="text-size-medium fade-up">Ask for a change. See it. Approve it. Done. ZINC gets you there and keeps you in control.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="#preview" className="button w-button">Get a Free Migration Preview &gt;</a>
                <a href="#demo" className="button is-link is-icon on-dark w-inline-block"><div>Watch It in Action</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>
        <div className="section-divider"><div className="padding-global"><div className="container-large"><div className="row-top"><div className="divider-line"></div></div><div className="row-bottom"><div className="end-wrap"><div className="divider-number-right micro-type">&gt; 01</div><div className="div-block"></div></div><div className="divider-number-left micro-type">SCROLL 00 &gt;</div></div></div></div></div>

        {/* What it is (layout207) */}
        <section className="section_aeo-4">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/695bda13c7c5d5a8fcdb458a_z_code_01-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb458a_z_code_01-p-800.webp 800w, /wf/695bda13c7c5d5a8fcdb458a_z_code_01-p-1080.webp 1080w, /wf/695bda13c7c5d5a8fcdb458a_z_code_01.webp 1200w" alt="Website code open in an editor, the foundation an AI agent works in" src="/wf/695bda13c7c5d5a8fcdb458a_z_code_01.webp" loading="lazy" className="layout207_image" /></div>
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; What It Is &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">No Tickets. No Plugins. Just Ask.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">An AI-native website lives in code your own agent can change directly. Your team previews, approves, and can undo every change.</p></div>
                <Items items={[
                  { strong: "Code, not a CMS.", text: "Astro or Next.js on Cloudflare, Vercel, or Netlify. Fast, secure, yours." },
                  { strong: "Your agent.", text: "Claude Code, Codex, or Gemini. Nothing to learn twice." },
                  { strong: "A safety net.", text: "Dispatch records who asked, who approved, and how to undo it." },
                  { strong: "Proof.", text: "This site runs exactly this way." },
                ]} />
                <div className="margin-top margin-medium"><div className="button-group">
                  <a href="/solutions/ai-dispatch" className="button is-secondary w-button">How Dispatch Works</a>
                  <a href="/solutions/ai-website-migration" className="button is-link is-icon w-inline-block"><div>How Migration Works</div><ArrowIcon /></a>
                </div></div>
              </div>
            </div></div>
          </div></div></div>
        </section>
        <div className="section-divider"></div>

        {/* Three ways in (layout249) */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Three Ways In &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Enable, Migrate, or Build.</h2></div>
                <p className="text-size-medium">You do not have to pick. We recommend the path after we understand your business.</p>
              </div></div>
              <div className="w-layout-grid layout249_list">
                <div className="layout249_item">
                  <div className="margin-bottom margin-medium"><div className="layout249_image-wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb44e4_z_brd_01.webp" alt="Enable your current website" className="layout249_image" /></div></div>
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">01</div></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>Enable</strong></h3></div>
                  <p>Keep your platform. Add the agent workflow, brand rules, and review controls it supports.</p>
                </div>
                <div className="layout249_item">
                  <div className="margin-bottom margin-medium"><div className="layout249_image-wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb44e5_z_brd_02.webp" alt="Migrate your website to an AI-native foundation" className="layout249_image" /></div></div>
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">02</div></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>Migrate</strong></h3></div>
                  <p>Keep your design, content, and URLs. Change the foundation so your agent can run it.</p>
                </div>
                <div className="layout249_item">
                  <div className="margin-bottom margin-medium"><div className="layout249_image-wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb44e6_z_brd_03.webp" alt="Build a new AI-native website" className="layout249_image" /></div></div>
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">03</div></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>Build</strong></h3></div>
                  <p>New brand, new journey, new site. Born AI-native.</p>
                </div>
              </div>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="/solutions/ai-website-migration" className="button is-secondary w-button">See Migration Paths &gt;</a>
                <a href="/solutions/website-design-development" className="button is-link is-icon w-inline-block"><div>Website Design &amp; Builds</div><ArrowIcon /></a>
              </div></div>
            </div>
          </div></div></div>
        </section>

        {/* Demo (layout210) */}
        <section id="demo" className="section_layout210">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout210_component"><div className="w-layout-grid layout210_content">
              <div className="layout210_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/69bb3df66dfef39d53c3f700_dispatch_04-p-500.png 500w, /wf/69bb3df66dfef39d53c3f700_dispatch_04.png 1200w" alt="A website change moving through the Dispatch Inbox: request, preview, approval, live" src="/wf/69bb3df66dfef39d53c3f700_dispatch_04.png" loading="lazy" className="layout210_image" /></div>
              <div className="layout210_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Watch It in Action &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Ask. Preview. Approve. Undo.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">One request, one preview, one approval, and it is live. Change your mind? Restore in a click.</p></div>
                <ul role="list" className="layout210_list">
                  <li className="layout210_item"><p>Ask your agent for the change</p></li>
                  <li className="layout210_item"><p>Preview it, desktop and mobile</p></li>
                  <li className="layout210_item"><p>Approve in the Dispatch Inbox</p></li>
                  <li className="layout210_item"><p>Undo in one click</p></li>
                  <li className="layout210_item"><p>Restore covers code and deploys; forms and email are handled separately</p></li>
                </ul>
                <div className="margin-top margin-medium"><div className="button-group"><a href="#preview" className="button is-secondary w-button">See It on Your Site &gt;</a></div></div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Migration (layout19) */}
        <section className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; AI Website Migration &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Keep Your Website. Change What It Can Do.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Page for page onto a foundation your agent can run. Landed governed.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>Design, content, and URLs preserved</p></li>
                  <li className="layout19_item"><p>Forms, CRM, and analytics reconnected</p></li>
                  <li className="layout19_item"><p>Working preview in days; launch scoped to your site</p></li>
                  <li className="layout19_item"><p>Migrate as-is, improve, or redesign</p></li>
                  <li className="layout19_item"><p>First 90 days of Dispatch Team included</p></li>
                </ul>
                <div className="margin-top margin-medium"><div className="button-group">
                  <a href="/solutions/ai-website-migration" className="button is-secondary w-button">How Migration Works</a>
                  <a href="/solutions/wordpress-ai-website-migration" className="button is-link is-icon w-inline-block"><div>Moving off WordPress?</div><ArrowIcon /></a>
                </div></div>
              </div>
              <div className="layout19_image-wrapper"><img sizes="(max-width: 767px) 100vw, 492px" srcSet="/wf/695bda13c7c5d5a8fcdb45bd_web_design_04-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb45bd_web_design_04-p-800.webp 800w, /wf/695bda13c7c5d5a8fcdb45bd_web_design_04.webp 1024w" alt="A business website preserved page for page after migration" src="/wf/695bda13c7c5d5a8fcdb45bd_web_design_04.webp" loading="lazy" className="layout19_image" /></div>
            </div></div>
          </div></div></div>
        </section>

        {/* Dispatch, the safety net (layout207) */}
        <section className="section_aeo-6">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout207_component"><div className="w-layout-grid layout207_content">
              <div className="layout207_image-wrapper"><img sizes="(max-width: 767px) 100vw, 600px" srcSet="/wf/695bda13c7c5d5a8fcdb4592_z_dispatch_01.1-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb4592_z_dispatch_01.1-p-800.webp 800w, /wf/695bda13c7c5d5a8fcdb4592_z_dispatch_01.1.webp 1200w" alt="Dispatch, the management layer for AI-powered websites" src="/wf/695bda13c7c5d5a8fcdb4592_z_dispatch_01.1.webp" loading="lazy" className="layout207_image" /></div>
              <div className="layout207_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; The Safety Net &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Let AI Move Fast. Stay in Control.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Dispatch is the management layer for AI-powered websites. Every change previewed, approved, attributed, and reversible.</p></div>
                <Items items={[
                  { strong: "Every request", text: "on its own branch, with a preview." },
                  { strong: "Roles decide", text: "who approves. High-risk work needs two." },
                  { strong: "Every page scored", text: "for answer engines, daily." },
                  { strong: "Your agent, your host.", text: "Turn Dispatch off and the site keeps running." },
                ]} />
                <div className="margin-top margin-medium"><div className="button-group">
                  <a href="/solutions/ai-dispatch" className="button is-secondary w-button">How Dispatch Works</a>
                  <a href="https://www.dispatchvault.com" target="_blank" rel="noopener noreferrer" className="button is-link is-icon w-inline-block"><div>Visit dispatchvault.com</div><ArrowIcon /></a>
                </div></div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Platforms we migrate from (logo4) */}
        <section className="section_on_brand_aeo_sprint-5">
          <div className="padding-global"><div className="container-large"><div className="padding-section-medium">
            <div className="logo4_component"><div className="w-layout-grid logo4_content">
              <div className="logo4_content-left">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">We Migrate From the Platforms You Are On.</h2></div>
                <p className="text-size-medium">WordPress, Webflow, Squarespace, Wix, HubSpot CMS, Framer. If your platform still fits, we will say so.</p>
                <div className="margin-top margin-medium"><div className="button-group"><a href="/contact-us" className="button is-secondary w-button">Talk to Us &gt;</a></div></div>
              </div>
              <div className="w-layout-grid logo4_list">
                <div className="logo4_wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb45df_logo-wordpress-new.svg" alt="WordPress" className="logo4_logo" /></div>
                <div className="logo4_wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb448a_logo-webflow.svg" alt="Webflow" className="logo4_logo" /></div>
                <div className="logo4_wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb45dc_logo-hubspot-new.svg" alt="HubSpot" className="logo4_logo" /></div>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Once you are there (layout249, six cards) */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Once You Are There &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Everything ZINC Does, Faster.</h2></div>
                <p className="text-size-medium">Work that took a quarter takes an afternoon on an AI-native site.</p>
              </div></div>
              <div className="w-layout-grid layout249_list">
                {[
                  { n: "01", t: "AEO & AI Visibility", p: "Every page scored from day one. Sprints when you want more.", href: "/solutions/ai-strategy-optimization", img: "/wf/695bda13c7c5d5a8fcdb44e4_z_brd_01.webp" },
                  { n: "02", t: "Content & Campaigns", p: "Campaign pages in an afternoon, not a quarter.", href: "/solutions/content-campaign-systems", img: "/wf/695bda13c7c5d5a8fcdb44e5_z_brd_02.webp" },
                  { n: "03", t: "Automation & Workflows", p: "Your site wired to HubSpot, Salesforce, and your operations.", href: "/solutions/automation-workflows", img: "/wf/695bda13c7c5d5a8fcdb44e6_z_brd_03.webp" },
                  { n: "04", t: "AI Image Library", p: "On-brand images and the context your agent draws on.", href: "/solutions/ai-image-library", img: "/wf/695bda13c7c5d5a8fcdb45b6_webdesign_05.webp" },
                  { n: "05", t: "Branding & Positioning", p: "The story and the rules your agent follows.", href: "/solutions/branding-positioning", img: "/wf/695bda13c7c5d5a8fcdb45bd_web_design_04.webp" },
                  { n: "06", t: "Ecommerce Acceleration", p: "Shopify and BigCommerce stay the store. Content around them goes AI-native.", href: "/solutions/ecommerce-acceleration", img: "/wf/695bda13c7c5d5a8fcdb458a_z_code_01.webp" },
                ].map((c) => (
                  <div key={c.n} className="layout249_item">
                    <div className="margin-bottom margin-medium"><div className="layout249_image-wrapper"><img loading="lazy" src={c.img} alt={c.t} className="layout249_image" /></div></div>
                    <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">{c.n}</div></div>
                    <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.t}</strong></h3></div>
                    <p>{c.p}</p>
                    <div className="margin-top margin-small"><div className="button-group"><a href={c.href} className="button is-link is-icon w-inline-block"><div>Learn more</div><ArrowIcon /></a></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Operating playbook (layout210) */}
        <section className="section_layout210">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout210_component"><div className="w-layout-grid layout210_content">
              <div className="layout210_image-wrapper"><img sizes="100vw" srcSet="/wf/695bda13c7c5d5a8fcdb45b6_webdesign_05-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb45b6_webdesign_05.webp 800w" alt="The Website Operating Playbook your team keeps after launch" src="/wf/695bda13c7c5d5a8fcdb45b6_webdesign_05.webp" loading="lazy" className="layout210_image" /></div>
              <div className="layout210_content-right">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; The Website Operating Playbook &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Not Just a Website. A Way to Run It.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Every migration and build ships with a playbook your team keeps.</p></div>
                <ul role="list" className="layout210_list">
                  <li className="layout210_item"><p>Who owns what, and how access works</p></li>
                  <li className="layout210_item"><p>Which tasks your agent handles</p></li>
                  <li className="layout210_item"><p>The brand guidance it follows</p></li>
                  <li className="layout210_item"><p>Who reviews and approves</p></li>
                  <li className="layout210_item"><p>Recovery, training, and when to call ZINC</p></li>
                </ul>
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Proof (layout249) */}
        <section id="recent" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Proof &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Sites Already Running This Way.</h2></div>
                <p className="text-size-medium">Named case studies follow as clients agree.</p>
              </div></div>
              <div className="w-layout-grid layout249_list">
                <div className="layout249_item">
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">01</div></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>This Site</strong></h3></div>
                  <p>Webflow to Next.js on Vercel. Verified page by page. Run on Dispatch with Claude Code.</p>
                </div>
                <div className="layout249_item">
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">02</div></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>A Law Firm</strong></h3></div>
                  <p>Webflow to Astro on Cloudflare. 47 routes. Governed from cutover.</p>
                </div>
                <div className="layout249_item">
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">03</div></div>
                  <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>A Financial Advisory Firm</strong></h3></div>
                  <p>To Astro on Netlify. Two design variants delivered as live previews.</p>
                </div>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Testimonial (testimonial1) */}
        <section className="section_aeo-5 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large"><div className="max-width-large align-center">
            <div className="testimonial1_component"><div className="testimonial1_content">
              <div className="margin-bottom margin-medium"><div className="testimonial1_logo-wrapper"><img sizes="(max-width: 3083px) 100vw, 3083px" srcSet="/wf/69f8bb7f8b82a8982e5c3a56_omnimed_logo_blk-p-500.png 500w, /wf/69f8bb7f8b82a8982e5c3a56_omnimed_logo_blk-p-800.png 800w, /wf/69f8bb7f8b82a8982e5c3a56_omnimed_logo_blk.png 3083w" alt="OMNIMED" src="/wf/69f8bb7f8b82a8982e5c3a56_omnimed_logo_blk.png" loading="lazy" className="testimonial1_logo" /></div></div>
              <h3 className="heading-style-h5"><strong>&quot;ZINC helped us rethink how our website drives growth. Their AI-powered approach transformed our content and visibility, delivering measurable gains in both traffic and qualified leads.&quot;</strong></h3>
              <div className="margin-top margin-medium"><div className="testimonial1_client">
                <div className="margin-bottom margin-xsmall"><div className="testimonial1_client-image-wrapper"><img loading="lazy" src="/wf/695bda13c7c5d5a8fcdb44b0_rb_sm.webp" alt="Robert Brown" className="testimonial1_client-image" /></div></div>
                <div className="text-weight-semibold">Robert Brown</div>
                <div>President, OMNIMED</div>
              </div></div>
            </div></div>
          </div></div></div></div>
        </section>

        {/* FAQ (faq2) */}
        <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="faq2_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">FAQs</h2></div>
                <p className="text-size-medium">Straight answers about running a website with AI.</p>
              </div></div>
              <div className="faq2_list">
                <FaqItems items={FAQ_ITEMS} />
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Preview form (layout19 grid, form in the right column) */}
        <section id="preview" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Free Migration Preview &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">See Your Site AI-Ready.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Give us your URL. We rebuild two pages on an agent-ready stack, run one real change through Dispatch, and tell you which path fits. No commitment.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>Two of your pages, rebuilt</p></li>
                  <li className="layout19_item"><p>One real change, previewed and approved</p></li>
                  <li className="layout19_item"><p>Stack recommendation and integration risk map</p></li>
                  <li className="layout19_item"><p>Enable, migrate, or build: our honest read</p></li>
                </ul>
              </div>
              <div className="layout19_image-wrapper">
                <FitCheckForm formName="Migration Preview Request" />
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Closing CTA (cta7) */}
        <section className="section_aeo-10 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="cta7_component"><div className="cta7_content">
              <div className="max-width-large">
                <div className="margin-bottom margin-xsmall"><h2 className="heading-style-h3">Ready to Run Your Website With AI?</h2></div>
                <p className="text-size-medium">Start with the free preview. See it on your own site.</p>
              </div>
              <div className="button-group is-right"><a href="#preview" className="button w-button">Get a Free Migration Preview &gt;</a></div>
            </div></div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
