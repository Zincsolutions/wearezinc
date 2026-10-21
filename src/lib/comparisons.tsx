import { EXPLORE, type ExploreGroup } from "@/components/site/keep-exploring";
import type { FaqItem } from "@/components/site/faq";
import type { ReactNode } from "react";

// Comparison pages. Fair to both sides, competitor names left out, and the
// "choose this when" lists written so a reader can disqualify us. Dispatch
// claims stay inside what the Dispatch page already says.

export type Comparison = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  h1: string;
  lede: string;
  inShort: ReactNode;
  a: string;
  b: string;
  rows: { label: string; a: string; b: string }[];
  chooseAHeading: string;
  chooseBHeading: string;
  chooseA: string[];
  chooseB: string[];
  bothNote?: { heading: string; text: string };
  faqs: FaqItem[];
  explore: ExploreGroup[];
  card: { title: string; text: string };
};

const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const COMPARISONS: Comparison[] = [
  {
    slug: "dispatch-vs-diy-ai-website-workflow",
    metaTitle: "Dispatch vs a DIY AI Website Workflow | Governance Compared | ZINC",
    metaDescription: "Can you let an AI agent change your website with just GitHub and preview deploys? Often, yes. Here is what a DIY setup covers, where Dispatch adds control, and how to choose.",
    tagline: "Dispatch vs DIY",
    h1: "Do you need Dispatch, or can your team wire it up?",
    lede: "An AI agent, a GitHub repository, and preview deployments can take you a long way. Here is honestly where a DIY setup holds up, and where the business needs more than a developer workflow.",
    inShort: (
      <>
        <p>A DIY setup (an agent, pull requests, and preview deploys) works well <strong>when developers make and review every change.</strong> Dispatch adds what the rest of the business needs: plain-language requests, approvals by role and risk, attribution of who asked and who approved, one-click restore, and a single inbox.</p>
        <p>If only engineers touch your site, DIY may be enough. If marketing, leadership, or compliance need a say, that is where Dispatch earns its place.</p>
      </>
    ),
    a: "DIY agent workflow",
    b: "Dispatch",
    rows: [
      { label: "Who can ask for a change", a: "Anyone comfortable in GitHub or the agent’s own tools", b: "Anyone on the team, in plain language, from Dispatch or Slack" },
      { label: "Preview before release", a: "Yes, if preview deploys are configured on your host", b: "Every request gets a preview, by default" },
      { label: "Approvals", a: "Pull request reviews, usually by developers", b: "Roles and risk tiers: a copy fix and a navigation change can follow different rules" },
      { label: "Record of who did what", a: "Commits and pull requests show what changed", b: "Who asked, what context shaped it, who approved, and what changed, for people and agents" },
      { label: "Work in parallel", a: "Yes, with branches", b: "Yes, every request runs on its own branch" },
      { label: "Undo a change", a: "A developer reverts the commit and redeploys", b: "One-click restore for supported changes" },
      { label: "Knowing what needs attention", a: "Notifications spread across GitHub, the host, and chat", b: "Approvals, findings, and alerts in one inbox, with Slack when a person needs to act" },
      { label: "AEO monitoring", a: "Separate tools, if any", b: "Every page scored daily for the signals answer engines use" },
      { label: "Lock-in", a: "None", b: "None. Turn Dispatch off and the website keeps running" },
    ],
    chooseAHeading: "A DIY workflow is enough when…",
    chooseBHeading: "Add Dispatch when…",
    chooseA: [
      "Only developers change the website",
      "Your developers are happy reviewing every pull request",
      "Nobody outside engineering needs to approve or audit changes",
    ],
    chooseB: [
      "Marketing, leadership, or compliance need to request or approve changes",
      "You want the rules for a copy fix and a pricing change to differ",
      "You need a record of who asked and who approved, not just what changed",
      "You want restore and alerts without a developer on call",
    ],
    bothNote: {
      heading: "Start DIY. Add Dispatch when the business joins in.",
      text: "Dispatch works above the same repository, agent, and host, so a team can begin with a developer workflow and connect Dispatch later without rebuilding anything.",
    },
    faqs: [
      { q: "Is Dispatch just a GitHub wrapper?", a: wrap(`<p>No. It uses your repository and host as they are, and adds what a developer workflow does not cover for the rest of the business: plain-language requests, approvals by role and risk, full attribution, one-click restore for supported changes, an inbox, and daily AEO scoring.</p>`) },
      { q: "Can we use our own agent with Dispatch?", a: wrap(`<p>Yes. Dispatch is built around bring your own agent. Use an agent such as Claude Code, Codex, or Gemini, keep the site in your own GitHub repository, and deploy through the host that fits.</p>`) },
      { q: "Does ZINC run its own site through Dispatch?", a: wrap(`<p>Yes. Claude Code works on our repository, and changes are governed through Dispatch.</p><a class="faq-link" href="/solutions/ai-native-websites#real-change">Watch a real change, step by step &gt;</a>`) },
    ],
    explore: [
      { heading: "Go deeper", links: [EXPLORE.dispatch, EXPLORE.realChange, EXPLORE.postDispatch] },
      { heading: "Other comparisons", links: [{ href: "/compare/ai-agent-vs-headless-cms", title: "Agent editing vs headless CMS", note: "How your team should edit an AI-native site." }, { href: "/solutions/webflow-ai-website-migration", title: "Webflow or AI-native?", note: "A straight answer from a Webflow partner." }, EXPLORE.glossary] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.planner, EXPLORE.contact] },
    ],
    card: { title: "Dispatch vs a DIY agent workflow", text: "Where GitHub and preview deploys are enough, and where the business needs more." },
  },
  {
    slug: "ai-agent-vs-headless-cms",
    metaTitle: "AI Agent Editing vs Headless CMS | Which Should Your Team Use? | ZINC",
    metaDescription: "Should your team update the website by asking an AI agent, or by editing fields in a headless CMS? A fair comparison of speed, structure, control, and cost, and when to use both.",
    tagline: "Agent editing vs headless CMS",
    h1: "Ask an agent, or fill in a form? How your team should edit.",
    lede: "On an AI-native website, the agent can be the editor. A headless CMS is the other modern answer. Each fits a different kind of team, and many teams end up with a bit of both.",
    inShort: (
      <>
        <p>Agent editing is faster for <strong>layout changes, new pages, and sitewide updates</strong>: you describe the change and approve a preview. A headless CMS is better for <strong>high volumes of structured content</strong> that many editors publish through fixed fields.</p>
        <p>They combine well: editors fill in fields for routine content, the agent handles everything a form cannot, and Dispatch governs the agent’s changes.</p>
      </>
    ),
    a: "AI agent editing",
    b: "Headless CMS",
    rows: [
      { label: "How a change starts", a: "A plain-language request", b: "Editing fields in the CMS interface" },
      { label: "New page or layout", a: "Minutes: the agent builds it from your components", b: "Only within templates a developer has already built" },
      { label: "Sitewide updates", a: "One request can update every affected page", b: "Page by page, or a developer script" },
      { label: "High-volume structured content", a: "Works, but fields can be quicker for repetitive entries", b: "Its home ground: products, articles, team bios at volume" },
      { label: "Review before release", a: "A preview and an approval for every change, through Dispatch", b: "Drafts and preview, depending on the CMS and setup" },
      { label: "Learning curve", a: "Describe what you want; review what you get", b: "Learn the CMS fields and workflow" },
      { label: "Extra cost", a: "Agent usage, plus governance", b: "A CMS subscription, often priced per seat" },
    ],
    chooseAHeading: "Lead with agent editing when…",
    chooseBHeading: "Lead with a headless CMS when…",
    chooseA: [
      "Your team changes layouts and launches pages often",
      "You want to stop waiting on developers for anything a template does not cover",
      "A handful of people run the site and approve changes",
    ],
    chooseB: [
      "Many editors publish structured content every day",
      "The same content feeds a website, an app, and documentation",
      "Your editors already know and like a CMS",
    ],
    bothNote: {
      heading: "Or use both.",
      text: "A headless CMS can sit alongside the agent: editors fill in fields for routine content, the agent handles layouts and new pages, and Dispatch governs the agent’s changes. And if your team truly lives on a visual canvas, Webflow Enterprise may be the better answer.",
    },
    faqs: [
      { q: "Do we need a CMS on an AI-native website?", a: wrap(`<p>Not always. Many teams find that asking the agent covers everything they used a CMS for. Where editors want forms and fields, a headless CMS can be added.</p>`) },
      { q: "What if our team prefers a visual editor?", a: wrap(`<p>Then look at Webflow Enterprise. It combines visual editing with a structured CMS, and we design, build, and support those sites too.</p><a class="faq-link" href="/solutions/enterprise-websites">Explore Webflow Enterprise &gt;</a>`) },
      { q: "Is agent editing safe for a production website?", a: wrap(`<p>With controls, yes. Through Dispatch, every change runs on its own branch with a preview, approvals follow roles and risk tiers, every action is recorded, and supported changes can be restored with one click.</p>`) },
    ],
    explore: [
      { heading: "Go deeper", links: [EXPLORE.aiNative, EXPLORE.enterprise, EXPLORE.dispatch] },
      { heading: "Other comparisons", links: [{ href: "/compare/dispatch-vs-diy-ai-website-workflow", title: "Dispatch vs a DIY agent workflow", note: "Where GitHub is enough, and where it is not." }, { href: "/solutions/webflow-ai-website-migration", title: "Webflow or AI-native?", note: "A straight answer from a Webflow partner." }, EXPLORE.glossary] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.realChange, EXPLORE.contact] },
    ],
    card: { title: "Agent editing vs headless CMS", text: "How your team should edit an AI-native website, and when to use both." },
  },
];

export const getComparison = (slug: string) => {
  const c = COMPARISONS.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown comparison: ${slug}`);
  return c;
};
