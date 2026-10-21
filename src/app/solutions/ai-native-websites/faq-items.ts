import type { FaqItem } from "@/components/site/faq";

// Approved copy from the Sept 21, 2026 AI-native page handoff.
// Answers are our own trusted static content (rendered via innerHTML).
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "Is this an AI website builder?", a: wrap(`<p>No. AI website builders generate a site from a prompt and keep it on their platform. An AI-native website is a real, professionally designed site in your own repository, and your AI agent works on it the way a developer would: one reviewed change at a time, on your brand, with a record of who asked and who approved.</p>`) },
  { q: "What if our marketing team prefers a visual editor?", a: wrap(`<p>Then you have options. Many teams find that asking the agent is faster than any editor, and anyone can still review the preview visually before approving. Where editors want forms and fields, a headless CMS can sit alongside the agent. And if your team truly works best on a visual canvas, Webflow Enterprise may be the better fit. We design, build, and support those sites too.</p><a class="faq-link" href="/solutions/enterprise-websites">Explore Webflow Enterprise &gt;</a>`) },
  { q: "What if our existing CMS is still the right choice?", a: wrap(`<p>We’ll recommend the approach that serves your business. We can help improve your existing platform and introduce AI where it adds value.</p><a class="faq-link" href="/solutions/enterprise-websites">Explore Enterprise Websites &amp; CMS &gt;</a>`) },
  { q: "Do we have to redesign our website?", a: wrap(`<p>No. A migration can preserve your agreed design and content. We identify any changes needed for functionality, accessibility, or the new architecture before agreeing the scope.</p>`) },
  { q: "What happens to our SEO, forms, and integrations?", a: wrap(`<p>We inventory what matters, preserve URLs where possible, plan redirects, and test agreed functionality before launch. Search rankings can fluctuate after a migration, so monitoring and follow-up are part of the plan.</p>`) },
  { q: "Does our team need to know how to code?", a: wrap(`<p>Routine supported tasks can begin with plain-language requests. Your team still reviews the results. We provide training and agree which tasks need ZINC or a developer.</p>`) },
  { q: "What will the migration and ongoing setup cost?", a: wrap(`<p>We scope the migration around your content, functionality, integrations, and team requirements. Your proposal separates implementation from hosting, agent usage, Dispatch, and any ongoing ZINC support.</p>`) },
  { q: "Can we choose our tools and keep control of our website?", a: wrap(`<p>We agree code ownership, account access, and handover in your project scope. We can recommend tools such as Astro or Next.js and hosting on Cloudflare, Netlify, or Vercel based on your requirements.</p>`) },
  { q: "What if AI makes an unwanted change?", a: wrap(`<p>The configured workflow lets your team review proposed changes before publication. We establish a restore process for supported site changes. Restoring code does not automatically reverse submitted forms, emails, or changes in external systems.</p>`) },
  { q: "Will an AI-native website improve our visibility in AI search?", a: wrap(`<p>The architecture alone does not guarantee visibility. SEO and AEO depend on content, technical foundations, and ongoing work. We can help improve and measure those separately from migration.</p>`) },
];
