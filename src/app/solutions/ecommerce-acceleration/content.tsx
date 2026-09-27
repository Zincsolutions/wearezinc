/* eslint-disable @next/next/no-img-element */
// E-commerce Acceleration, rebuilt Sept 21, 2026 from the implementation
// brief. Keeps the original page's editorial character (left-aligned
// display hero, thin rules, small bracketed labels, 01/02/03 process, the
// DFND showcase) on the site's existing section archetypes (header46,
// layout249, layout481, logo4, blog38, faq2, layout19).
// Sept 27, 2026: AI shopping readiness moved to the top of the page (brief
// "ZINC e-commerce AI-agent brief", Flux review). Shopify supplies the
// connection; ZINC separates what the platform already handles from what a
// store still needs, then fixes it. Entry offer is a free AI shopping check.
import type { CSSProperties } from "react";
import { FaqItems } from "@/components/site/faq";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { StepNumber } from "@/components/site/step-number";
import { FAQ_ITEMS } from "./faq-items";

const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

type Card = { id?: string; n?: string; title: string; text: string; items?: string[] };
const Cards = ({ items, four }: { items: Card[]; four?: boolean }) => (
  <div className={`w-layout-grid layout249_list${four ? " is-four" : ""}`}>
    {items.map((c) => (
      <div key={c.title} id={c.id} className="layout249_item">
        {c.n ? <div className="margin-bottom margin-xsmall"><StepNumber value={c.n} /></div> : null}
        <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.title}</strong></h3></div>
        <p>{c.text}</p>
        {c.items ? (
          <ul role="list" className="capability_list">
            {c.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        ) : null}
      </div>
    ))}
  </div>
);

const Intro = ({ tagline, heading, text }: { tagline?: string; heading: string; text?: string }) => (
  <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
    {tagline ? <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div> : null}
    <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
    {text ? <p className="text-size-medium">{text}</p> : null}
  </div></div>
);

const PLATFORMS = [
  { src: "/wf/695bda13c7c5d5a8fcdb45da_logo-shopify-new.svg", alt: "Shopify" },
  { src: "/wf/695bda13c7c5d5a8fcdb45de_logo-big-commerce-new.svg", alt: "BigCommerce" },
  { src: "/wf/695bda13c7c5d5a8fcdb45db_logo-klaviyo-new.svg", alt: "Klaviyo" },
  { src: "/wf/695bda13c7c5d5a8fcdb45dc_logo-hubspot-new.svg", alt: "HubSpot" },
  { src: "/wf/695bda13c7c5d5a8fcdb45dd_logo-gorgias-new.svg", alt: "Gorgias" },
  { src: "/wf/695bda13c7c5d5a8fcdb4693_Recharge.webp", alt: "Recharge" },
  { src: "/wf/695bda13c7c5d5a8fcdb4698_Yotpo_logo.webp", alt: "Yotpo" },
  { src: "/wf/695bda13c7c5d5a8fcdb4696_celigo.webp", alt: "Celigo" },
];

const POSTS = [
  { href: "/post/ai-checkout-is-here-what-it-means-for-ecommerce-in-2026", img: "/wf/695bda13c7c5d5a8fcdb46e7_zinc_blg_14.png", alt: "Abstract illustration of an AI-assisted checkout", title: "AI Checkout Is Here: What It Means for eCommerce in 2026", text: "Learn how OpenAI’s new Commerce APIs reshape product discovery, checkout, and conversion, and how brands can prepare for AI-driven buying." },
  { href: "/post/aeo-tactics-all-e-commerce-merchants-should-implement-in-2026", img: "/wf/69a4925b86b0d755c4bdb90c_AEO%20optimiation%2004.png", alt: "Abstract illustration of answer engine optimization", title: "AEO Tactics All E-commerce Merchants Should Implement in 2026", text: "The essential tactics e-commerce brands need to appear in AI answers across ChatGPT, Perplexity, and Google’s AI search." },
  { href: "/post/how-to-make-your-ecommerce-store-ai-search-ready-in-2026", img: "/wf/695bda13c7c5d5a8fcdb468d_ecom_blog_o1.jpg", alt: "Online store products arranged for AI search", title: "How to Make Your Ecommerce Store AI-Search Ready in 2026", text: "A checklist for making your store discoverable and accurately represented in AI search experiences." },
];

// What Shopify supplies vs. what a store still needs. Platform facts as of
// Sept 2026 (Shopify help center, Google Search Central); recheck quarterly.
const RAILS = [
  { layer: "AI discovery files", shopify: "Generates agents.md and llms.txt for your store by default.", zinc: "Checks they are served correctly, and customizes them only when there is a clear reason." },
  { layer: "Catalog and AI channels", shopify: "Eligible products flow into Shopify Catalog and AI shopping channels, with controls in your admin.", zinc: "Audits eligibility, channel settings, attributes, variants, images, and policies so assistants get complete, accurate facts." },
  { layer: "The path to purchase", shopify: "Checkout works differently by channel. Some send shoppers to your store, others support direct checkout where eligible.", zinc: "Tests the real journey on the channels that matter to you: right product, variant, and price, then cart, checkout, delivery, and returns." },
  { layer: "Google AI search", shopify: "Google says ordinary search fundamentals apply to AI Overviews and AI Mode.", zinc: "Fixes indexing, product information, and structured data that help in search results and AI answers alike." },
];

// Illustrative listing, not a client product.
const BEFORE = [
  ["Material", "Not listed"],
  ["Waterproof rating", "Not listed"],
  ["Sizes in stock", "Unclear"],
  ["Delivery", "Calculated at checkout"],
  ["Returns", "See policy page"],
];
const AFTER = [
  ["Material", "Recycled nylon ripstop, 2.5-layer"],
  ["Waterproof rating", "10,000 mm"],
  ["Sizes in stock", "XS to XXL; M and L ship today"],
  ["Delivery", "Free over $75, 2 to 4 days"],
  ["Returns", "30 days, free"],
];

export function EcomContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* Hero (header46): editorial, left-aligned, open space */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large ecom-hero">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; E-commerce Acceleration &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1"><span className="ecom-hero__lede">Your store is connected to AI shopping.</span> Is it ready to be chosen?</h1></div>
              <p className="text-size-medium fade-up">Shoppers are asking AI assistants to find, compare, and buy for them. Shopify already connects your store. Whether those assistants understand your products, trust your policies, and send buyers through to checkout depends on details only you can fix. ZINC finds the gaps, fixes your store, and puts practical AI to work behind the scenes.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="#assessment" className="button w-button">Get a Free AI Shopping Check &gt;</a>
                <a href="/work/dfnd-shopify-website-design" className="button is-link is-icon w-inline-block"><div>See Our Shopify Work</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>
        <div className="section-divider"><div className="padding-global"><div className="container-large"><div className="row-top"><div className="divider-line"></div></div></div></div></div>

        {/* The stakes (layout249): three situations merchants recognize, plus the self-test */}
        <section id="ai-shopping" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="What’s at stake" heading="AI shoppers don’t bounce. They buy somewhere else." text="When an assistant can’t find a size, confirm stock, or read your returns policy, it doesn’t send a complaint. It recommends a store it understands, and you never see the sale you lost." />
              <Cards items={[
                { title: "Your products show up with the wrong details.", text: "Missing sizes, outdated prices, and vague descriptions leave assistants guessing, or skipping you for a competitor with clearer facts." },
                { title: "Shoppers ask questions your pages don’t answer.", text: "Will it fit? Is it in stock? What does delivery cost? If the answer isn’t clear on your store, an assistant can’t give it." },
                { title: "Your team is buried in catalog and reporting work.", text: "Hours go into fixing product content and pulling numbers, leaving little time for the work that grows the business." },
              ]} />
              <div className="ecom-selftest">
                <div className="ecom-selftest__label">Try this today: the five-minute test</div>
                <p className="ecom-selftest__text">Ask ChatGPT or Gemini to find your best seller in a specific size, confirm it’s in stock, and tell you the delivered price. Anything it gets wrong or makes up is where your store is losing ground.</p>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Shopify has the rails (comparison): what the platform supplies vs. what ZINC fixes */}
        <section id="what-shopify-handles" className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <Intro tagline="Shopify has the rails" heading="Shopify supplies the connection. We make it work for your catalog." text="You shouldn’t pay anyone to install what your platform already provides. We start by separating what Shopify handles from what is holding your store back." />
            <div className="ecom-rails" role="table" aria-label="What Shopify provides and what ZINC fixes">
              <div className="ecom-rails__row is-head" role="row">
                <div role="columnheader">Layer</div>
                <div role="columnheader">What Shopify provides</div>
                <div role="columnheader">What ZINC fixes</div>
              </div>
              {RAILS.map((r) => (
                <div key={r.layer} className="ecom-rails__row" role="row">
                  <div className="ecom-rails__layer" role="rowheader">{r.layer}</div>
                  <div className="ecom-rails__cell" role="cell"><span className="ecom-rails__tag">Shopify</span>{r.shopify}</div>
                  <div className="ecom-rails__cell is-zinc" role="cell"><span className="ecom-rails__tag">ZINC</span>{r.zinc}</div>
                </div>
              ))}
            </div>
            <p className="offering-note">Channel availability depends on your market, products, and account eligibility, and it changes often. We check it for your store rather than assume it.</p>
          </div></div></div>
        </section>

        {/* Capabilities (layout249, three columns): two workstreams on one foundation */}
        <section id="commerce-capabilities" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="Two ways we help" heading="Get chosen by AI. Put AI to work for your team." text="Two connected workstreams, built on a storefront that works for people first." />
              <Cards items={[
                { title: "Get found, understood, and bought", text: "Make your products easy for AI assistants and shoppers to understand, compare, and buy, on the channels that matter to your business.", items: ["Product attributes, variants, and catalog mapping", "Clear answers on sizing, delivery, and returns", "AI channel settings and purchase-path testing", "Structured data, feeds, and measurement"] },
                { title: "Put AI to work inside your business", text: "Use AI for catalog, content, and reporting work. AI drafts, your team approves, and nothing reaches customers without review.", items: ["Product content and attribute drafts", "Catalog quality checks", "Campaign adaptation across channels", "Connected store and campaign reporting"] },
                { id: "storefronts", title: "Storefronts & Conversion", text: "The foundation for both. We design, build, and improve Shopify and BigCommerce stores that are fast, clear, and easy to buy from, for people and AI alike.", items: ["Store design, development, and platform migrations", "Product pages, navigation, and merchandising", "Mobile experience and conversion improvements"] },
              ]} />
            </div>
          </div></div></div>
        </section>

        {/* Before / after (illustrative listing): facts over adjectives */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <Intro tagline="What an assistant reads" heading="Adjectives don’t answer questions. Facts do." text="Assistants compare products on their facts: size, material, stock, delivered price, returns. Here is the kind of change we make, shown on an illustrative listing." />
            <div className="ecom-listing">
              <figure className="ecom-listing__card">
                <div className="ecom-listing__label">Before</div>
                <div className="ecom-listing__name">The Everyday Trail Jacket</div>
                <p className="ecom-listing__copy">Our most versatile jacket yet. Lightweight, packable, and ready for anything the trail throws at you.</p>
                <dl className="ecom-listing__facts">
                  {BEFORE.map(([k, v]) => (<div key={k} className="is-missing"><dt>{k}</dt><dd>{v}</dd></div>))}
                </dl>
                <figcaption className="ecom-listing__verdict">An assistant has to guess, so it recommends someone else.</figcaption>
              </figure>
              <figure className="ecom-listing__card is-after">
                <div className="ecom-listing__label">After</div>
                <div className="ecom-listing__name">The Everyday Trail Jacket</div>
                <p className="ecom-listing__copy">A packable 310 g shell for wet hikes and travel. Regular fit, true to size.</p>
                <dl className="ecom-listing__facts">
                  {AFTER.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
                </dl>
                <figcaption className="ecom-listing__verdict">Every shopper question has an answer an assistant can trust.</figcaption>
              </figure>
            </div>
            <p className="offering-note">Illustrative example, not a client listing.</p>
          </div></div></div>
        </section>

        {/* Commerce proof: DFND showcase (layout481, approved project imagery) */}
        <section className="section_layout481 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout481_component">
              <div className="margin-bottom margin-xxlarge"><div className="w-layout-grid layout481_content">
                <div className="layout481_content-left">
                  <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Client Showcase &lt;</div></div>
                  <h2 className="heading-style-h2">Commerce experience, built over time.</h2>
                </div>
                <div className="layout481_content-right">
                  <p className="text-size-medium">Explore our work with DFND across its brand and Shopify experience.</p>
                  <div className="margin-top margin-medium"><div className="button-group">
                    <a href="/work/dfnd-shopify-website-design" className="button is-secondary w-button">View the DFND Case Study</a>
                  </div></div>
                </div>
              </div></div>
              <div className="layout481_image-group">
                <div className="layout481_image-wrapper2"><img sizes="(max-width: 479px) 100vw, 240px" srcSet="/wf/695bda13c7c5d5a8fcdb4620_Screenshot%25202025-11-04%2520at%252011.00.29%25E2%2580%25AFAM-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb4620_Screenshot%202025-11-04%20at%2011.00.29%E2%80%AFAM.webp 703w" alt="DFND product photography featuring performance apparel" src="/wf/695bda13c7c5d5a8fcdb4620_Screenshot%202025-11-04%20at%2011.00.29%E2%80%AFAM.webp" loading="lazy" className="layout481_image2" /></div>
                <div className="layout481_image-wrapper1"><img sizes="(max-width: 479px) 100vw, 240px" srcSet="/wf/695bda13c7c5d5a8fcdb44fb_dfnd_work_2-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb44fb_dfnd_work_2-p-800.webp 800w, /wf/695bda13c7c5d5a8fcdb44fb_dfnd_work_2-p-1080.webp 1080w, /wf/695bda13c7c5d5a8fcdb44fb_dfnd_work_2.webp 1280w" alt="The DFND Shopify storefront designed and built by ZINC" src="/wf/695bda13c7c5d5a8fcdb44fb_dfnd_work_2.webp" loading="lazy" className="layout481_image1" /></div>
                <div className="layout481_image-wrapper3"><img sizes="(max-width: 479px) 100vw, 240px" srcSet="/wf/695bda13c7c5d5a8fcdb461f_dfnd_home-p-500.webp 500w, /wf/695bda13c7c5d5a8fcdb461f_dfnd_home-p-800.webp 800w, /wf/695bda13c7c5d5a8fcdb461f_dfnd_home-p-1080.webp 1080w, /wf/695bda13c7c5d5a8fcdb461f_dfnd_home.webp 1400w" alt="DFND homepage hero on desktop" src="/wf/695bda13c7c5d5a8fcdb461f_dfnd_home.webp" loading="lazy" className="layout481_image3" /></div>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Practical AI (layout249, four cards) */}
        <section id="ai-operations" className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="AI for commerce teams" heading="Give your team more room to grow." text="Start with the work that takes time every week. We help you apply AI to useful tasks within your existing commerce systems." />
              <Cards four items={[
                { title: "Prepare product content.", text: "Turn approved product information into draft descriptions and attributes for your team to review." },
                { title: "Support a campaign launch.", text: "Adapt approved messaging for product pages, email, and campaign assets while keeping your brand consistent." },
                { title: "Find catalog gaps.", text: "Identify missing attributes, inconsistent descriptions, and other issues that need attention." },
                { title: "Make reporting more useful.", text: "Summarize connected store and campaign data so your team can decide what to investigate and improve." },
              ]} />
              <p className="offering-bottomline">AI drafts. Your team approves. We choose built-in platform tools, connected apps, or custom integrations around the job and the people responsible for it.</p>
            </div>
          </div></div></div>
        </section>

        {/* Platforms and integrations (logo4) */}
        <section className="section_on_brand_aeo_sprint-5">
          <div className="padding-global"><div className="container-large"><div className="padding-section-medium">
            <div className="logo4_component"><div className="w-layout-grid logo4_content">
              <div className="logo4_content-left">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Your commerce platform. More potential.</h2></div>
                <p className="text-size-medium">Build on Shopify, BigCommerce, and the tools that support your business. We help connect marketing, customer data, and operations so your team can work more effectively.</p>
                <div className="margin-top margin-medium"><div className="button-group"><a href="/partners/partners-2" className="button is-secondary w-button">See Our Partners</a></div></div>
              </div>
              <div className="w-layout-grid logo4_list">
                {PLATFORMS.map((l) => (
                  <div key={l.alt} className="logo4_wrapper"><img loading="lazy" src={l.src} alt={l.alt} className="logo4_logo" /></div>
                ))}
              </div>
            </div></div>
          </div></div></div>
        </section>

        {/* Engagement process (layout249, numbered) */}
        <section className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="How We Work" heading="From assessment to acceleration." text="Start with the opportunities that matter most. Your next step might be a focused improvement, a new integration, or a larger store initiative." />
              <Cards items={[
                { n: "01", title: "Assess", text: "Start with a free AI shopping check. Then review your catalog, channel settings, policies, purchase paths, and workflows, and agree priorities and what success looks like." },
                { n: "02", title: "Fix", text: "Implement the agreed fixes across product information, policies, storefront, channels, and team workflows, with your approval before changes go live." },
                { n: "03", title: "Measure", text: "Re-test how assistants and shoppers see your store, track channel and conversion performance where platforms report it, and build on what works." },
              ]} />
              <div className="offering-links">
                <a href="#assessment" className="button w-button">Get a Free AI Shopping Check &gt;</a>
              </div>
            </div>
          </div></div></div>
        </section>

        {/* Related insights (blog38, compact) */}
        <section className="section_home-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="blog38_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Insights &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Related insights.</h2></div>
                <p className="text-size-medium">Recent articles on how customers discover and buy, and what it means for your store.</p>
              </div></div>
              <div className="blog38_list-wrapper w-dyn-list"><div role="list" className="blog38_list w-dyn-items">
                {POSTS.map((p) => (
                  <div key={p.href} role="listitem" className="blog38_item w-dyn-item">
                    <a href={p.href} className="blog38_item-link w-inline-block">
                      <div className="margin-bottom margin-small"><div className="blog38_image-wrapper"><img loading="lazy" src={p.img} alt={p.alt} className="blog38_image" /></div></div>
                      <div className="margin-bottom margin-xxsmall"><h3 className="heading-style-h5">{p.title}</h3></div>
                      <div className="text-size-regular">{p.text}</div>
                      <div className="margin-top margin-small"><div className="button-group"><div className="button is-link is-icon"><div>Read more</div><ArrowIcon /></div></div></div>
                    </a>
                  </div>
                ))}
              </div></div>
            </div>
          </div></div></div>
        </section>

        {/* FAQ (faq2) */}
        <section className="section_on_brand_aeo_sprint-7 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="faq2_component">
              <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">FAQs</h2></div>
              </div></div>
              <div className="faq2_list"><FaqItems items={FAQ_ITEMS} /></div>
            </div>
          </div></div></div>
        </section>

        {/* Free AI shopping check (layout19 grid, form in the right column) */}
        <section id="assessment" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left" data-reveal="">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Free AI shopping check &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">See your store the way AI assistants do.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Share your store and the products that matter most. We’ll put them through the questions shoppers ask assistants and walk you through what we find.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>Test key products for accurate facts, stock, prices, and policies.</p></li>
                  <li className="layout19_item"><p>Separate what Shopify already handles from what needs fixing.</p></li>
                  <li className="layout19_item"><p>Recommend next steps, with scope and costs for any proposed work.</p></li>
                </ul>
                <p className="offering-note">Free, and no platform access needed for the first check.</p>
              </div>
              <div className="layout19_image-wrapper" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
                <EnquiryForm
                  formName="AI Shopping Readiness Check"
                  offer="E-commerce Acceleration"
                  submitLabel="Request My Free Check"
                  contextLabel="Which products or problems should we look at first?"
                  contextPlaceholder="For example, your best sellers, a product line, or questions customers keep asking."
                  successMessage="Thanks. We will look at your store and come back to you to walk through what we find."
                />
              </div>
            </div></div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
