import type { FaqItem } from "@/components/site/faq";

// Approved copy from the Sept 21, 2026 E-commerce Acceleration brief.
// Answers are our own trusted static content (rendered via innerHTML).
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "Do we need a new store to work with ZINC?", a: wrap(`<p>No. We can improve your current store, catalog, integrations, or team workflows. If a rebuild or platform move would better serve your goals, we can scope that separately.</p>`) },
  { q: "Do you work with Shopify and BigCommerce?", a: wrap(`<p>Yes. We help with design, development, integrations, and ongoing improvements, recommending the approach around your business requirements.</p>`) },
  { q: "Can you help our products appear in AI shopping experiences?", a: wrap(`<p>We can assess relevant channels, improve product data, and configure supported connections. Availability depends on the platform, market, products, and account eligibility. Inclusion does not guarantee recommendations or sales.</p>`) },
  { q: "How do you decide which AI tools to use?", a: wrap(`<p>We start with the task, the systems involved, and the people responsible for the outcome. We assess built-in tools before adding apps or custom integrations, and test the workflow with your team.</p>`) },
  { q: "Can you work with our existing marketing or internal team?", a: wrap(`<p>Yes. We can deliver a focused project or work alongside your team on ongoing commerce improvements, with clear responsibilities and priorities.</p>`) },
  { q: "How do you measure progress?", a: wrap(`<p>We agree measures around the engagement, such as conversion, channel performance, repeat purchases, or time spent on recurring tasks. Where reliable data is available, we also consider costs and profitability.</p>`) },
  { q: "What does an engagement cost?", a: wrap(`<p>We scope work around your priorities, platform, and integrations. Your proposal identifies implementation fees, third-party costs, and any optional ongoing support.</p>`) },
];
