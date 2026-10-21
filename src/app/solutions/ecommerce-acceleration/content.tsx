/* eslint-disable @next/next/no-img-element */
// E-commerce Acceleration, rebuilt Sept 21, 2026 from the implementation
// brief. Keeps the original page's editorial character (left-aligned
// display hero, thin rules, small bracketed labels, 01/02/03 process, the
// DFND showcase) on the site's existing section archetypes (header46,
// layout249, layout481, logo4, faq2, layout19).
// Oct 20, 2026: the AI shopping material moved to its own page,
// /solutions/ai-shopping-readiness, so every Solutions menu link opens a real
// page. This page is now the overview: three ways we help (AI shopping,
// storefronts, AI for commerce teams), with storefronts and team AI covered
// here in full.
import type { CSSProperties } from "react";
import { FaqItems } from "@/components/site/faq";
import { InShort } from "@/components/site/in-short";
import { KeepExploring, EXPLORE } from "@/components/site/keep-exploring";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { AI_SHOPPING_PATH, ArrowIcon, Cards, Intro } from "./parts";
import { FAQ_ITEMS } from "./faq-items";

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

export function EcomContent() {
  return (
    <>
      <main className="main-wrapper offering-page">
        {/* Hero (header46): editorial, left-aligned, open space */}
        <header className="section_aeo-hero color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="header46_component"><div className="max-width-large ecom-hero">
              <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; E-commerce Acceleration &lt;</div></div>
              <div className="margin-bottom margin-small"><h1 className="heading-style-h1"><span className="ecom-hero__lede">Stores built to sell.</span> To shoppers, and the AI shopping for them.</h1></div>
              <p className="text-size-medium fade-up">ZINC designs, builds, and improves Shopify and BigCommerce stores, gets your catalog ready to be chosen by AI shopping assistants, and puts practical AI to work for your commerce team. AI drafts, your team approves.</p>
              <div className="margin-top margin-medium"><div className="button-group">
                <a href={`${AI_SHOPPING_PATH}#assessment`} className="button w-button">Get a Free AI Shopping Check &gt;</a>
                <a href="/work/dfnd-shopify-website-design" className="button is-link is-icon w-inline-block"><div>See Our Shopify Work</div><ArrowIcon /></a>
              </div></div>
            </div></div>
          </div></div></div>
        </header>

        <InShort>
          <p>ZINC helps Shopify and BigCommerce brands sell more in three ways: <strong>getting chosen by AI shopping assistants, building storefronts that convert, and putting AI to work inside the commerce team.</strong></p>
          <p>AI shopping work starts with a free AI shopping check. Storefront and team projects start with a conversation about your store.</p>
        </InShort>

        <div className="section-divider"><div className="padding-global"><div className="container-large"><div className="row-top"><div className="divider-line"></div></div></div></div></div>

        {/* Three ways we help (layout249, three columns) */}
        <section id="commerce-capabilities" className="section_layout249">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="Three ways we help" heading="Get chosen by AI. Sell to people. Free up your team." text="Three connected workstreams, built on a storefront that works for people first." />
              <Cards items={[
                { title: "AI Shopping Readiness", text: "Shoppers ask assistants to find, compare, and buy. We make your products easy for them to understand and recommend, and test the path to checkout.", items: ["Product facts, identifiers, and variants", "Clear answers on sizing, delivery, and returns", "AI channel settings and purchase-path testing"], link: { href: AI_SHOPPING_PATH, label: "Explore AI Shopping Readiness" } },
                { id: "storefronts", title: "Storefronts & Conversion", text: "We design, build, and improve Shopify and BigCommerce stores that are fast, clear, and easy to buy from, for people and AI alike.", items: ["Store design, development, and platform migrations", "Product pages, navigation, and merchandising", "Mobile experience and conversion improvements"], link: { href: "/work/dfnd-shopify-website-design", label: "See the DFND store" } },
                { title: "AI for Commerce Teams", text: "Use AI for catalog, content, and reporting work. AI drafts, your team approves, and nothing reaches customers without review.", items: ["Product content and attribute drafts", "Catalog quality checks", "Connected store and campaign reporting"], link: { href: "#ai-operations", label: "How it works" } },
              ]} />
            </div>
          </div></div></div>
        </section>

        {/* AI shopping teaser (dark band): the hook, then the dedicated page */}
        <section className="section_aeo-6 color-scheme-1">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout249_component">
              <Intro tagline="AI shopping" heading="AI shoppers don’t bounce. They buy somewhere else." text="When an assistant can’t find a size, confirm stock, or read your returns policy, it recommends a store it understands. Shopify already connects your store to AI shopping. Whether your products get chosen depends on details your store controls." />
              <div className="ecom-selftest">
                <div className="ecom-selftest__label">Try this today: the five-minute test</div>
                <p className="ecom-selftest__text">Ask ChatGPT or Gemini to find your best seller in a specific size, confirm it’s in stock, and tell you the delivered price. Anything it gets wrong or makes up is where your store is losing ground.</p>
              </div>
              <div className="offering-links">
                <a href={AI_SHOPPING_PATH} className="button w-button">Explore AI Shopping Readiness &gt;</a>
              </div>
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
                { n: "01", title: "Assess", text: "Start with a free AI shopping check or a conversation about your store. We review your storefront, catalog, channels, and workflows, and agree priorities and what success looks like." },
                { n: "02", title: "Build", text: "Design, build, and fix what matters most, from product information to a new storefront or team workflow, with your approval before changes go live." },
                { n: "03", title: "Stay Sharp", text: "Ongoing support as your catalog, channels, and team change, measured against the goals we agreed, so you keep building on what works." },
              ]} />
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

        {/* Enquiry (layout19 grid, form in the right column) */}
        <section id="contact" className="section_layout19">
          <div className="padding-global"><div className="container-large"><div className="padding-section-large">
            <div className="layout19_component"><div className="w-layout-grid layout19_content">
              <div className="layout19_content-left" data-reveal="">
                <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Talk about your store &lt;</div></div>
                <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Let’s find your next step.</h2></div>
                <div className="margin-bottom margin-small"><p className="text-size-medium">Tell us about your store and what you want to change. We’ll come back with a recommendation, whether that is a focused fix, a new integration, or a larger project.</p></div>
                <ul role="list" className="layout19_list">
                  <li className="layout19_item"><p>A senior team with over 25 years of brand and commerce experience.</p></li>
                  <li className="layout19_item"><p>Scope and costs agreed before any work starts.</p></li>
                  <li className="layout19_item"><p>Only interested in AI shopping? <a href={`${AI_SHOPPING_PATH}#assessment`}>Get the free AI shopping check</a>.</p></li>
                </ul>
              </div>
              <div className="layout19_image-wrapper" data-reveal="" style={{ "--i": 1 } as CSSProperties}>
                <EnquiryForm
                  formName="E-commerce Enquiry"
                  offer="E-commerce Acceleration"
                  submitLabel="Talk About My Store"
                  contextLabel="What would you like to improve?"
                  contextPlaceholder="For example, conversion, a platform move, catalog work, or reporting."
                  successMessage="Thanks. We will review your store and come back to you with a recommended next step."
                />
              </div>
            </div></div>
          </div></div></div>
        </section>

        <KeepExploring
          groups={[
            { heading: "Commerce and platforms", links: [{ href: AI_SHOPPING_PATH, title: "AI Shopping Readiness", note: "Get found, understood, and bought by AI." }, { href: "/partners/shopify", title: "Shopify partnership", note: "How we design, build, and grow Shopify stores." }, EXPLORE.enterprise] },
            { heading: "Reading", links: [{ href: "/glossary", title: "AI search glossary", note: "AEO, agentic commerce, and more, in plain English." }, EXPLORE.postStructure, EXPLORE.postSeo] },
            { heading: "Take the next step", links: [{ href: `${AI_SHOPPING_PATH}#assessment`, title: "Get a free AI shopping check", note: "See your store the way AI assistants do." }, { href: "/work/dfnd-shopify-website-design", title: "See our Shopify work", note: "DFND: a Shopify store built to sell." }, EXPLORE.contact] },
          ]}
        />
      </main>
    </>
  );
}
