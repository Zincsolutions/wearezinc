import type { FaqItem } from "@/components/site/faq";

// Approved copy from the Sept 21, 2026 enterprise page handoff.
// Answers are our own trusted static content (rendered via innerHTML).
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "Can you help with our existing Webflow Enterprise website?", a: wrap(`<p>Yes. We can work within your existing site and design system, improve content structures and integrations, and support your team with ongoing design, development, and AI enablement. A rebuild is not required.</p>`) },
  { q: "How do you integrate AI with Webflow?", a: wrap(`<p>We start with a specific task and assess Webflow’s built-in AI, supported agent connections through its MCP server, and API-based integrations. Then we configure and test the workflow around your content, permissions, and review process. The right setup depends on your plan, tools, and requirements.</p>`) },
  { q: "Can we keep our existing approval and publishing process?", a: wrap(`<p>We design around your review requirements and assess how each integration interacts with them. Platform permissions alone do not define every approval step, so we test the full workflow and agree who can publish.</p>`) },
  { q: "Do you work with platforms beyond Webflow?", a: wrap(`<p>Yes. Our experience includes WordPress, HubSpot, and other connected website and commerce systems. We recommend the platform and integrations around your business requirements, with Webflow Enterprise a core part of our website practice.</p>`) },
  { q: "Do we need Dispatch or an AI-native migration?", a: wrap(`<p>No. Enterprise CMS solutions can use the platform’s own capabilities and appropriate integrations. Where an additional management layer would help, we assess our governance platform, Dispatch, for the specific workflow and confirm compatibility before recommending it.</p>`) },
  { q: "Can you work with our IT, security, or compliance teams?", a: wrap(`<p>Yes. We include the relevant stakeholders in planning, document the proposed data flows and tools, and validate the implementation against your agreed requirements. Your internal reviewers retain responsibility for organizational approvals.</p>`) },
  { q: "How do engagements and costs work?", a: wrap(`<p>We offer scoped projects and ongoing partnerships. Your proposal identifies delivery priorities, responsibilities, fees, and any platform, integration, or AI usage costs. We agree what success looks like before work begins.</p>`) },
];
