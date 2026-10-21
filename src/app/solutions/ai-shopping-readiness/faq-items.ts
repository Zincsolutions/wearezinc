import type { FaqItem } from "@/components/site/faq";

// AI shopping questions, moved from E-commerce Acceleration when this page
// was split out (Oct 20, 2026). Answers are our own trusted static content
// (rendered via innerHTML).
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "What is agentic commerce?", a: wrap(`<p>Agentic commerce is shopping done with the help of AI assistants and agents that research, compare, and on some channels buy products on a shopper’s behalf. For a merchant, it means your products, policies, and checkout need to make sense to software as well as to people.</p>`) },
  { q: "Doesn’t Shopify already create llms.txt and agents.md?", a: wrap(`<p>Yes. Shopify generates these discovery files for stores by default, and for most stores the managed version is the right choice. They help assistants find your store. They don’t fix incomplete product information, unclear policies, or a broken checkout handoff, which is where most of the work is.</p>`) },
  { q: "What are Shopify Agentic Storefronts?", a: wrap(`<p>Agentic Storefronts is Shopify’s way of making eligible products available in AI shopping channels, such as ChatGPT, Microsoft Copilot, and Google’s AI Mode and Gemini, with settings you manage in your Shopify admin. Which channels you can use, and whether shoppers can check out without leaving the conversation, depends on your market, products, and account eligibility.</p>`) },
  { q: "What does agent-ready mean for a store?", a: wrap(`<p>Your products carry complete, consistent facts, including identifiers such as GTINs, categories, attributes, variants, price, and stock. Your delivery and returns policies are clear. And a shopper sent by an assistant can reach the right product and check out without problems.</p>`) },
  { q: "How is this different from SEO?", a: wrap(`<p>It builds on it. Google says ordinary search fundamentals still apply to its AI features, so indexing, useful content, and structured data still matter. AI shopping adds a stricter test: assistants compare complete product facts, policies, and prices, and need a working path to checkout. Our <a href="/solutions/ai-strategy-optimization">SEO and AI visibility</a> work covers the rest of your site.</p>`) },
  { q: "Can AI agents check out on our store?", a: wrap(`<p>It depends on the channel. Some AI shopping channels send shoppers to your store’s checkout, while others support direct checkout for eligible merchants. We test the path on the channels that matter to you and check current eligibility, which changes often.</p>`) },
  { q: "Will this guarantee that ChatGPT recommends our products?", a: wrap(`<p>No one can guarantee that. We make your products accurate, complete, and easy to compare, then test the results, which improves your chances of being understood and chosen.</p>`) },
  { q: "Do we need Shopify Plus?", a: wrap(`<p>Not necessarily. Features and channel eligibility vary by plan, market, and product, so we check what applies to your store before recommending changes.</p>`) },
  { q: "Does designing for AI agents hurt the experience for people?", a: wrap(`<p>No. Clear product facts, fast pages, and honest information help human shoppers too. The work that makes a store easy for an assistant to understand usually makes it easier to buy from.</p>`) },
  { q: "What does the free AI shopping check include?", a: wrap(`<p>We put a small set of your key products through the questions shoppers ask AI assistants, note what they get wrong or leave out, and walk you through what we find with recommended next steps. It needs no platform access.</p>`) },
];
