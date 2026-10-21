import type { FaqItem } from "@/components/site/faq";
import { ASSESSMENT_TURNAROUND } from "@/lib/assessment";

// Free website assessment FAQs. Plain answers for owners and marketing
// leads alike; no pricing (quoted after a call, per Oct 15 2026 decision).
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "Is it really free?", a: wrap(`<p>Yes. No cost, no obligation, and no credit card. We do it because the assessment is the best way for you to see how we think, and for us to see whether we can genuinely help.</p>`) },
  { q: "What do you need from me?", a: wrap(`<p>Just your website address and two minutes for the form. No logins, no access to your platform, no files. If we need anything else, we will ask.</p>`) },
  { q: "How long does it take?", a: wrap(`<p>You get your written assessment within ${ASSESSMENT_TURNAROUND}. If you would like to talk it through, we will set up a 20-minute call at a time that suits you.</p>`) },
  { q: "Is a person doing this, or a tool?", a: wrap(`<p>A person. A senior ZINC strategist reviews your site, using tools to check the technical details, and writes up what matters for your business in plain language.</p>`) },
  { q: "Will you try to sell me something?", a: wrap(`<p>We will recommend a next step. If it is something we do, we will tell you what it involves and what it costs. If it is something you can do yourself, or something we do not do, we will say that too.</p>`) },
  { q: "Does it matter what my website is built on?", a: wrap(`<p>No. WordPress, Webflow, Wix, Squarespace, Shopify, HubSpot, or custom code: we review them all. Part of the assessment is telling you whether your current platform is still the right one.</p>`) },
  { q: "We are a larger company with a marketing team. Is this for us?", a: wrap(`<p>Yes. For larger sites we focus on the pages and journeys that matter most, AI and search visibility at scale, and whether your platform and workflow can keep up. Webflow Enterprise and AI-native options are both on the table.</p>`) },
];
