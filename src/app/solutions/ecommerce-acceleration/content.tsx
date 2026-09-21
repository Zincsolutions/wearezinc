/* eslint-disable @next/next/no-img-element */
// E-commerce Acceleration, rebuilt Sept 21, 2026 from the implementation
// brief. Keeps the original page's editorial character (left-aligned
// display hero, thin rules, small bracketed labels, 01/02/03 process, the
// DFND showcase) on the site's existing section archetypes (header46,
// layout249, layout481, logo4, blog38, faq2, cta7). Copy is verbatim.
import { FaqItems } from "@/components/site/faq";
import { StepNumber } from "@/components/site/step-number";
import { FAQ_ITEMS } from "./faq-items";

const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

type Card = { n?: string; title: string; text: string; items?: string[] };
const Cards = ({ items, four }: { items: Card[]; four?: boolean }) => (
  <div className={`w-layout-grid layout249_list${four ? " is-four" : ""}`}>
    {items.map((c) => (
      <div key={c.title} className="layout249_item">
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

export function EcomContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* Hero (header46): editorial, left-aligned, open space */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; E-commerce Acceleration &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1">More ways to be found. Better ways to sell.</h1></div>
              <p className="text-size-medium fade-up">ZINC combines commerce strategy, design, development, and AI to help your brand reach customers, improve conversion, and scale operations.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href="/contact-us" className="button w-button">Talk About Your Store &gt;</a>
                <a href="#commerce-capabilities" className="button is-link is-icon w-inline-block"><div>Explore the Opportunities</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>
        <div className="section-divider"><div className="padding-global"><div className="container-large"><div className="row-top"><div className="divider-line"></div></div></div></div></div>

        {/* Capabilities (layout249, three columns) */}
        <section id="commerce-capabilities" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="Built for the way commerce is changing" heading="A stronger store. A more connected business." text="Improve the experience customers see and the systems your team works with, from your storefront to the channels where your products are discovered." />
              <Cards items={[
                { title: "Storefronts & Conversion", text: "Make it easier for customers to find the right products and buy with confidence. We design, build, and improve Shopify and BigCommerce stores around your brand and business goals.", items: ["Store design, development, and platform migrations", "Product pages, navigation, and merchandising", "Mobile experience and conversion improvements"] },
                { title: "Product Discovery & AI Shopping", text: "Help shopping platforms understand and present your products accurately. We improve product information and connect supported channels across search, social, and emerging AI shopping experiences.", items: ["Product data, attributes, and catalog structure", "Product feeds and supported channel setup", "Search visibility and channel performance measurement"] },
                { title: "Integrations & Automation", text: "Connect your store with the tools your business depends on and use AI to reduce repetitive work, with clear review and approval steps.", items: ["Commerce, email, CRM, and business-system integrations", "Product-content and campaign workflows", "Reporting and operational automation"] },
              ]} />
            </div>
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
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="Practical AI for commerce teams" heading="Give your team more room to grow." text="Start with the work that takes time every week. We help you apply AI to useful tasks within your existing commerce systems." />
              <Cards four items={[
                { title: "Prepare product content.", text: "Turn approved product information into draft descriptions and attributes for your team to review." },
                { title: "Support a campaign launch.", text: "Adapt approved messaging for product pages, email, and campaign assets while keeping your brand consistent." },
                { title: "Find catalog gaps.", text: "Identify missing attributes, inconsistent descriptions, and other issues that need attention." },
                { title: "Make reporting more useful.", text: "Summarize connected store and campaign data so your team can decide what to investigate and improve." },
              ]} />
              <p className="offering-bottomline">We choose built-in platform tools, connected apps, or custom integrations around the job and the people responsible for it.</p>
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
                { n: "01", title: "Assess", text: "Review your store, catalog, channels, and workflows to identify priorities and agree what success looks like." },
                { n: "02", title: "Optimize", text: "Implement the agreed improvements across your shopping experience, product information, or connected systems." },
                { n: "03", title: "Accelerate", text: "Review results, support your team, and build on what works through ongoing improvements and targeted experiments." },
              ]} />
              <div className="offering-links">
                <a href="/contact-us" className="button w-button">Talk About Your Store &gt;</a>
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

        {/* Closing CTA (cta7) */}
        <section className="section_aeo-10 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="cta7_component"><div className="cta7_content">
              <div className="max-width-large">
                <div className="margin-bottom margin-xsmall"><h2 className="heading-style-h3">What could your store do better?</h2></div>
                <p className="text-size-medium">Tell us where you want to grow and what is getting in the way. We’ll help you identify a practical next step.</p>
              </div>
              <div className="button-group is-right"><a href="/contact-us" className="button w-button">Talk About Your Store &gt;</a></div>
            </div></div>
          </div></div></div>
        </section>
      </main>
    </>
  );
}
