// AI Shopping Readiness, split out of E-commerce Acceleration on Oct 20,
// 2026 so the featured Solutions menu item opens a real page instead of an
// anchor. Carries the AI shopping material from the Sept 27 brief and the
// Sept 29 refinements (shopper request, Why ZINC, Stay Sharp). Shopify
// supplies the connection; ZINC separates what the platform handles from what
// a store still needs, then fixes it. Entry offer: a free AI shopping check.
import type { CSSProperties } from "react";
import { FaqItems } from "@/components/site/faq";
import { InShort } from "@/components/site/in-short";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { ArrowIcon, Cards, Intro } from "../ecommerce-acceleration/parts";
import { FAQ_ITEMS } from "./faq-items";

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
  ["Price", "$189"],
  ["Waterproof rating", "Not listed"],
  ["Packed size", "Not listed"],
  ["Material", "Not listed"],
  ["Sizes in stock", "Unclear"],
  ["Delivery", "Calculated at checkout"],
  ["Returns", "See policy page"],
];
const AFTER = [
  ["Price", "$189"],
  ["Waterproof rating", "10,000 mm"],
  ["Packed size", "Packs into its own pocket, 310 g"],
  ["Material", "Recycled nylon ripstop, 2.5-layer"],
  ["Sizes in stock", "XS to XXL; M and L ship today"],
  ["Delivery", "Free over $75, 2 to 4 days"],
  ["Returns", "30 days, free"],
];

export function AiShoppingContent() {
  return (
    <main className="main-wrapper offering-page">
      {/* Hero (header46): editorial, left-aligned, open space */}
      <header className="section_aeo-hero color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="header46_component"><div className="max-width-large ecom-hero">
            <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; AI Shopping Readiness &lt;</div></div>
            <div className="margin-bottom margin-small"><h1 className="heading-style-h1"><span className="ecom-hero__lede">Your store is connected to AI shopping.</span> Is it ready to be chosen?</h1></div>
            <p className="text-size-medium fade-up">Shoppers are asking AI assistants to find, compare, and buy for them. Shopify already connects your store. Whether those assistants understand your products, trust your policies, and send buyers through to checkout depends on details only you can fix. ZINC finds the gaps and fixes them.</p>
            <div className="margin-top margin-medium"><div className="button-group">
              <a href="#assessment" className="button w-button">Get a Free AI Shopping Check &gt;</a>
              <a href="#what-shopify-handles" className="button is-link is-icon w-inline-block"><div>What Shopify Already Handles</div><ArrowIcon /></a>
            </div></div>
          </div></div>
        </div></div></div>
      </header>

      <InShort>
        <p>Shopify already connects eligible stores to AI shopping. <strong>Whether assistants understand your products, trust your policies, and send buyers through to checkout depends on details your store controls.</strong> ZINC separates what the platform handles from what your store still needs, then fixes it.</p>
        <p>It starts with a free AI shopping check: we put your key products through the questions shoppers ask assistants and show you what they get wrong.</p>
      </InShort>

      <div className="section-divider"><div className="padding-global"><div className="container-large"><div className="row-top"><div className="divider-line"></div></div></div></div></div>

      {/* The stakes (layout249): situations merchants recognize, plus the self-test */}
      <section id="stakes" className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <Intro tagline="What’s at stake" heading="AI shoppers don’t bounce. They buy somewhere else." text="When an assistant can’t find a size, confirm stock, or read your returns policy, it doesn’t send a complaint. It recommends a store it understands, and you never see the sale you lost." />
            <Cards items={[
              { title: "Your products show up with the wrong details.", text: "Missing sizes, outdated prices, and vague descriptions leave assistants guessing, or skipping you for a competitor with clearer facts." },
              { title: "Shoppers ask questions your pages don’t answer.", text: "Will it fit? Is it in stock? What does delivery cost? If the answer isn’t clear on your store, an assistant can’t give it." },
              { title: "The path to checkout breaks quietly.", text: "A wrong variant, a dead link, or a missing policy ends the sale, and your analytics rarely show why." },
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

      {/* What we fix (layout249, four cards) */}
      <section id="what-we-fix" className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <Intro tagline="What we fix" heading="Get found. Get understood. Get chosen." text="The work behind an assistant recommending your product instead of someone else’s." />
            <Cards four items={[
              { title: "Product facts", text: "Complete, consistent facts an assistant can compare.", items: ["Product identifiers (GTINs), categories, and attributes", "Variants and catalog mapping"] },
              { title: "Clear answers", text: "The questions shoppers ask, answered on your store.", items: ["Sizing and fit", "Delivery costs and times", "Returns and policies"] },
              { title: "Channels", text: "Your products in the AI shopping channels that matter to you.", items: ["Eligibility and channel settings", "Feeds and structured data"] },
              { title: "The path to purchase", text: "A tested journey from recommendation to checkout.", items: ["Right product, variant, and price", "Cart, checkout, and measurement"] },
            ]} />
          </div>
        </div></div></div>
      </section>

      {/* Before / after (illustrative listing): facts over adjectives */}
      <section id="before-after" className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <Intro tagline="What an assistant reads" heading="Adjectives don’t answer questions. Facts do." text="An assistant takes a shopper’s request apart and checks each part against your product facts. Here is the kind of change we make, shown on an illustrative listing." />
          <div className="ecom-request">
            <div className="ecom-request__label">The shopper asks</div>
            <p className="ecom-request__text">“Find me a waterproof jacket under $200 that packs small, in a medium, delivered by Friday.”</p>
          </div>
          <div className="ecom-listing">
            <figure className="ecom-listing__card">
              <div className="ecom-listing__label">Before</div>
              <div className="ecom-listing__name">The Everyday Trail Jacket</div>
              <p className="ecom-listing__copy">Our most versatile jacket yet. Lightweight, packable, and ready for anything the trail throws at you.</p>
              <dl className="ecom-listing__facts">
                {BEFORE.map(([k, v]) => (<div key={k} className={k === "Price" ? undefined : "is-missing"}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
              <figcaption className="ecom-listing__verdict">It can’t confirm waterproof, packable, or in stock, so the assistant recommends someone else.</figcaption>
            </figure>
            <figure className="ecom-listing__card is-after">
              <div className="ecom-listing__label">After</div>
              <div className="ecom-listing__name">The Everyday Trail Jacket</div>
              <p className="ecom-listing__copy">A packable 310 g shell for wet hikes and travel. Regular fit, true to size.</p>
              <dl className="ecom-listing__facts">
                {AFTER.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
              <figcaption className="ecom-listing__verdict">Every part of the request has an answer the assistant can trust.</figcaption>
            </figure>
          </div>
          <p className="offering-note">Illustrative example, not a client listing.</p>
        </div></div></div>
      </section>

      {/* Why ZINC (layout249): the guide's credentials, compressed */}
      <section className="section_aeo-6 color-scheme-1">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <Intro tagline="Why ZINC" heading="Commerce experience, applied to a new kind of shopper." text="The things that win over an AI assistant, clear products and an easy path to buy, are the things good stores have always needed. We bring both sides." />
            <Cards items={[
              { title: "Over 25 years of experience.", text: "We have designed, built, and grown brands and online stores since long before assistants started shopping, so the fundamentals come first." },
              { title: "An honest diagnostic.", text: "We tell you what Shopify already handles, so you only invest in what your store actually needs." },
              { title: "AI with approval built in.", text: "AI drafts product content, catalog fixes, and reports. Your team reviews and approves before anything reaches customers." },
            ]} />
          </div>
        </div></div></div>
      </section>

      {/* Engagement process (layout249, numbered) */}
      <section id="how-it-works" className="section_layout249">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="layout249_component">
            <Intro tagline="How it works" heading="Check. Fix. Stay sharp." text="Start small, with your most important products, and build from what the check finds." />
            <Cards items={[
              { n: "01", title: "Assess", text: "Start with a free AI shopping check. Then review your catalog, channel settings, policies, and purchase paths, and agree priorities and what success looks like." },
              { n: "02", title: "Fix", text: "Implement the agreed fixes across product information, policies, storefront, and channels, with your approval before changes go live." },
              { n: "03", title: "Stay Sharp", text: "AI channels and your catalog keep changing. Ongoing support keeps your store accurate and builds on what works.", items: ["Regular checks of how assistants describe and recommend your products", "AI referral traffic and channel performance, where platforms report it", "New gaps found and fixed as channels and products change"] },
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
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
                offer="AI Shopping Readiness"
                submitLabel="Request My Free Check"
                contextLabel="Which products or problems should we look at first?"
                contextPlaceholder="For example, your best sellers, a product line, or questions customers keep asking."
                successMessage="Thanks. We will look at your store and come back to you to walk through what we find."
              />
            </div>
          </div></div>
        </div></div></div>
      </section>

      <KeepExploring
        groups={[
          { heading: "Commerce", links: [EXPLORE.ecommerce, { href: "/partners/shopify", title: "Shopify partnership", note: "How we design, build, and grow Shopify stores." }, { href: "/work/dfnd-shopify-website-design", title: "See our Shopify work", note: "DFND: a Shopify store built to sell." }] },
          { heading: "Reading", links: [{ href: "/glossary#agentic-commerce", title: "What is agentic commerce?", note: "AEO, agentic commerce, and more, in plain English." }, EXPLORE.postStructure, EXPLORE.postSeo] },
          { heading: "Take the next step", links: [{ href: "#assessment", title: "Get a free AI shopping check", note: "See your store the way AI assistants do." }, EXPLORE.contact] },
        ]}
      />
    </main>
  );
}
