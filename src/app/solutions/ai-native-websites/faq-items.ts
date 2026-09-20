import type { FaqItem } from "@/components/site/faq";

// Answers are our own trusted static content (rendered via innerHTML).
const wrap = (html: string) =>
  `<div class="margin-bottom margin-small"><div class="max-width-large"><p>${html}</p></div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What is an AI-native website?",
    a: wrap(
      "A website whose code and content live in a repository your AI agent can change directly, hosted on a modern platform, with your team previewing and approving each change. Astro or Next.js alone does not make a site AI-native. The workflow does."
    ),
  },
  {
    q: "Is it safe to let AI change our website?",
    a: wrap(
      "Yes, with a record and a gate. On Dispatch every change runs on its own branch with a preview, approvals follow roles, high-risk work needs two people, and any change can be restored in one click."
    ),
  },
  {
    q: "Will we lose our rankings?",
    a: wrap(
      "URLs are preserved or mapped, metadata and indexability are validated, and the site is monitored after launch. Google itself expects some movement after a site move. A careful process is the promise, not a guarantee."
    ),
  },
  {
    q: "Do we need a developer afterward?",
    a: wrap(
      "Not for day-to-day changes. Your team asks, reviews, and approves. ZINC stays on as operator, advisor, or escalation contact if you want us to."
    ),
  },
  {
    q: "Can we use AI without leaving our CMS?",
    a: wrap(
      "Often, yes. That is the Enable path. When cost, code portability, agent access, or speed has become the constraint, migration is the better answer, and we will say which."
    ),
  },
  {
    q: "Can you migrate a Webflow site?",
    a: wrap(
      "Yes. If Webflow still fits your team we may recommend keeping it. If not, we recreate the site on an open, agent-ready stack and keep the design and content."
    ),
  },
  {
    q: "What does it cost?",
    a: wrap(
      "Migrations and builds are fixed-quote projects after a short assessment. Every quote shows the one-time fee, what is included and excluded, the launch estimate, the stabilization period, and recurring costs next to what you pay today."
    ),
  },
];
