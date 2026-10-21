import { EXPLORE } from "@/components/site/keep-exploring";
import type { PathData } from "@/components/site/migration-path";

// Content for the "<platform> to AI-native" path pages. Claims discipline
// (docs/positioning.md): preserve URLs "where possible", never promise
// unchanged rankings, "restore" for supported changes only, no em dashes.
// Platform facts are deliberately conservative; recheck them when a
// platform changes its export or redirect tooling. Webflow is handled as a
// decision, not an exit: ZINC sells Webflow Enterprise too.

const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

const KEEP_COMMON = [
  "Design preserved and verified at representative pages and viewports",
  "Pages, posts, images, PDFs, and media",
  "URLs preserved where possible, every other one mapped with a 301",
  "Forms, CRM delivery, analytics, and consent, each tested end to end",
  "Your code in your own repository, on your own hosting account",
  "Dispatch connected at cutover, so every agent change is previewed and approved",
];

const SEO_FAQ = {
  q: "Will we lose our search rankings?",
  a: wrap(`<p>Not if the move is done with discipline. Rankings slip after a migration for three reasons: URLs that break, page signals that get dropped, and crawl problems after launch. We keep URLs wherever we can, redirect the rest one to one, carry over every title, description, and heading before changing anything, and watch 404s and indexing closely after cutover. Some fluctuation while search engines re-crawl is normal, so we do not promise unchanged rankings. We do promise not to guess.</p>`),
};

const OWN_FAQ = {
  q: "Who owns the website after the move?",
  a: wrap(`<p>You do. The code lives in your own repository, the hosting account and domain stay in your name, and the content is yours. Turn Dispatch off and the website keeps running.</p>`),
};

export const MIGRATION_PATHS: PathData[] = [
  {
    slug: "webflow-ai-website-migration",
    platform: "Webflow",
    metaTitle: "Webflow or AI-Native Website? A Straight Answer | ZINC",
    metaDescription: "Stay on Webflow Enterprise or move to an AI-native website your team updates by asking its own AI agent? ZINC builds both, moved its own site, and will tell you which fits.",
    tagline: "Webflow or AI-native?",
    h1: "Stay on Webflow or go AI-native? Get a straight answer.",
    lede: "We are a Webflow partner, we build Webflow Enterprise sites, and we moved our own website off Webflow. So we can tell you, without an agenda, which one fits the way your team works.",
    inShort: (
      <>
        <p>Webflow Enterprise is the better fit when <strong>your marketing team edits visually every day</strong> and wants one vendor for CMS, hosting, and support. An AI-native website is the better fit when <strong>your team would rather ask than click</strong>, and wants the code in its own repository with every change governed.</p>
        <p>ZINC builds both and moves sites between them. A free preview shows you the difference on your own pages.</p>
      </>
    ),
    compare: {
      tagline: "Two good answers",
      heading: "The right platform depends on how your team works.",
      text: "Neither option is a compromise. Here is how we tell them apart.",
      stay: {
        heading: "Stay on Webflow Enterprise when…",
        items: [
          "Your marketers build and edit pages visually, every day",
          "Many editors need roles, staging, and publishing inside one platform",
          "Your security review favors a managed platform with enterprise support",
          "You want CMS, hosting, and support from one vendor",
        ],
        link: { href: "/solutions/enterprise-websites", label: "Explore Webflow Enterprise" },
      },
      move: {
        heading: "Go AI-native when…",
        items: [
          "Your team would rather describe a change than build it",
          "The site shares code with a product, or needs custom logic",
          "You want the code in your own repository, on any host",
          "You want an agent doing the work, with every change previewed and approved",
        ],
      },
      both: {
        heading: "Or get some of both.",
        text: "Agents can work on Webflow sites too, through Webflow’s supported integrations. We can set up AI workflows on your current Webflow site with review steps, and plan a move only if the business case is clear.",
      },
    },
    features: {
      heading: "If you move, nothing gets left behind.",
      text: "We moved our own site off Webflow, so we know where every piece goes.",
      rows: [
        { feature: "CMS collections", destination: "Exported, mapped to structured content, and imported, with every item checked against the live site." },
        { feature: "Interactions and animations", destination: "Rebuilt with CSS and light scripts. Content stays visible even if a script fails, which is not always true of the original." },
        { feature: "Webflow forms", destination: "Rebuilt and routed to your CRM, with notifications tested all the way to a person’s inbox." },
        { feature: "Assets on the Webflow CDN", destination: "Every image, video, and file moved to your own hosting. We moved 549 on ours." },
        { feature: "301 redirects in site settings", destination: "Carried into your host’s redirect rules, plus a new 301 for any page that changes address." },
        { feature: "Editor access for your team", destination: "Replaced by plain-language requests to your agent, with previews and approvals in Dispatch." },
      ],
    },
    keep: KEEP_COMMON,
    form: {
      heading: "See both answers on your own site.",
      text: "Give us your URL. We rebuild two pages on an agent-ready stack, run one real change through Dispatch, and send back a straight recommendation: stay on Webflow, add AI to it, or move.",
      formName: "Webflow Path Preview Request",
    },
    faqHeading: "Questions about Webflow and AI-native.",
    faqs: [
      { q: "Isn’t ZINC a Webflow partner?", a: wrap(`<p>Yes, and that is the point. We design, build, and support Webflow Enterprise sites, and we moved our own site to Next.js. We recommend whichever fits your team, and we earn our fee either way.</p><a class="faq-link" href="/solutions/enterprise-websites">Explore Webflow Enterprise &gt;</a>`) },
      { q: "Why did ZINC move its own site off Webflow?", a: wrap(`<p>Not for speed. Our Webflow homepage was already light. We moved because we wanted to run the site the way we recommend to clients: an AI agent working in our own repository, every change previewed and approved through Dispatch. In the first six weeks we shipped 36 reviewed changes.</p><a class="faq-link" href="/solutions/ai-website-migration#proof">See our own migration &gt;</a>`) },
      { q: "Can we use AI on our Webflow site without moving?", a: wrap(`<p>Often, yes. We start with a specific task and assess Webflow’s built-in AI, supported agent connections, and API integrations, then configure the workflow around your review steps.</p>`) },
      { q: "Can our team still edit visually after a move?", a: wrap(`<p>Your team reviews every change visually, on a preview, before approving it. But the editing itself happens by asking the agent. If visual editing is central to how your team works, that is a strong reason to stay on Webflow Enterprise.</p>`) },
      SEO_FAQ,
    ],
    explore: [
      { heading: "Both paths", links: [EXPLORE.enterprise, EXPLORE.aiNative, EXPLORE.migration] },
      { heading: "See the proof", links: [EXPLORE.realChange, EXPLORE.dispatch, EXPLORE.postDispatch] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.design, EXPLORE.contact] },
    ],
  },

  {
    slug: "wix-ai-website-migration",
    platform: "Wix",
    metaTitle: "Wix to AI-Native Website Migration | Own Your Site | ZINC",
    metaDescription: "Wix does not let your site leave. ZINC rebuilds it page for page on code you own, recovers the content, keeps or redirects every URL, and connects Dispatch so your team can update it with AI.",
    tagline: "Wix to AI-native migration",
    h1: "Leave Wix. Keep everything your site has earned.",
    lede: "Wix makes it easy to start and hard to leave. We rebuild your site page for page on code you own, recover the content, and keep or redirect every URL, so the move costs you nothing you have built.",
    inShort: (
      <>
        <p>Wix does not export your site to another host, so <strong>a Wix migration is a rebuild, not a transfer.</strong> ZINC recreates your pages on Astro or Next.js, recovers your blog and CMS content, and maps every URL before launch.</p>
        <p>Your team then updates the site by asking its AI agent, with each change previewed and approved through Dispatch. The code, hosting, and domain are yours.</p>
      </>
    ),
    why: {
      tagline: "Why teams leave Wix",
      heading: "Rent a website, or own one.",
      cards: [
        { title: "Your site, finally yours.", text: "On Wix, the site cannot leave the platform. After the move, the code sits in your repository and runs on any modern host." },
        { title: "No builder in the way.", text: "Pages ship without a site-builder runtime, so they load quickly and stay quick as you add to them." },
        { title: "Changes in an afternoon.", text: "Ask your agent for an update, preview the result, approve it. No editor to wrestle and no developer queue." },
      ],
    },
    features: {
      heading: "Every Wix feature gets a destination.",
      text: "Before cutover, each thing your site does has an agreed replacement, an owner, and a test.",
      rows: [
        { feature: "Pages and design", destination: "Rebuilt page for page, verified at desktop and mobile against the live site." },
        { feature: "Wix Blog", destination: "Posts, images, and categories recovered and moved, with post URLs kept or mapped one to one." },
        { feature: "CMS collections", destination: "Exported and imported into structured content your agent can update." },
        { feature: "Wix Forms", destination: "Rebuilt and routed to your CRM, with notifications tested to the inbox." },
        { feature: "Stores and Bookings", destination: "Assessed one by one. Commerce usually moves to Shopify, appointments to a dedicated booking service." },
        { feature: "Custom code and apps", destination: "Reviewed for what it actually does, then rebuilt, replaced, or retired with your sign-off." },
        { feature: "SEO settings and redirects", destination: "Titles, descriptions, structured data, and existing redirects carried over and verified." },
      ],
    },
    keep: KEEP_COMMON,
    stay: {
      heading: "When staying on Wix is the right call.",
      text: "A move should pay for itself. Sometimes it will not, and we will tell you.",
      items: [
        "Your store or bookings are the core of the business, and they work",
        "The site is small and rarely changes",
        "Your team is happy and nothing is holding you back",
      ],
    },
    form: {
      heading: "See your Wix site on code you own.",
      text: "Give us your URL. We rebuild two pages on an agent-ready stack, run one real change through Dispatch, and send back a stack recommendation and a feature-by-feature migration map. No commitment.",
      formName: "Wix Migration Preview Request",
    },
    faqs: [
      { q: "Can’t we just export our Wix site?", a: wrap(`<p>No. Wix does not let you export a site to run somewhere else. That is why a Wix migration is a rebuild: we recreate the design, recover the content from the live site and from what Wix can export, and verify everything against the original before launch.</p>`) },
      { q: "Will our blog post URLs change?", a: wrap(`<p>We keep them wherever we can. Any address that has to change gets a one-to-one 301 redirect, verified against the live site before cutover.</p>`) },
      { q: "What happens to Wix Stores or Bookings?", a: wrap(`<p>Each one gets an agreed destination before cutover. Online stores usually move to Shopify, where we also make products ready for AI shopping. Appointment booking moves to a dedicated service connected to the new site. If commerce is the heart of your Wix site, staying may be the better call.</p>`) },
      SEO_FAQ,
      OWN_FAQ,
    ],
    explore: [
      { heading: "Other paths", links: [EXPLORE.migration, EXPLORE.wordpress, EXPLORE.ecommerce] },
      { heading: "See the proof", links: [EXPLORE.realChange, EXPLORE.dispatch, EXPLORE.postStructure] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.aiNative, EXPLORE.contact] },
    ],
  },

  {
    slug: "squarespace-ai-website-migration",
    platform: "Squarespace",
    metaTitle: "Squarespace to AI-Native Website Migration | ZINC",
    metaDescription: "Outgrown your Squarespace template? ZINC rebuilds your site page for page on code you own, moves your blog and media, keeps or redirects every URL, and connects Dispatch for governed AI updates.",
    tagline: "Squarespace to AI-native migration",
    h1: "Outgrown Squarespace? Keep everything it earned.",
    lede: "Templates get you live fast, then box you in. We rebuild your site page for page, on brand, on a codebase your team updates by asking its AI agent, with every URL kept or redirected.",
    inShort: (
      <>
        <p>Squarespace exports some content but not all of it, so <strong>a Squarespace migration is part export, part recovery.</strong> ZINC moves your pages, blog, and media onto Astro or Next.js, rebuilds the design without template limits, and maps every URL before launch.</p>
        <p>From launch day, your team updates the site by asking its AI agent, with Dispatch handling previews and approvals.</p>
      </>
    ),
    why: {
      tagline: "Why teams leave Squarespace",
      heading: "When the brand outgrows the template.",
      cards: [
        { title: "Design without a ceiling.", text: "Layouts, components, and interactions built for your brand, not bent around a template’s blocks." },
        { title: "Content that scales.", text: "Structured content for case studies, resources, and service pages, so the site can grow without getting messy." },
        { title: "Changes by asking.", text: "Your agent makes the update, you preview it, you approve it. The template stops being the bottleneck." },
      ],
    },
    features: {
      heading: "Every Squarespace feature gets a destination.",
      text: "Before cutover, each thing your site does has an agreed replacement, an owner, and a test.",
      rows: [
        { feature: "Pages and design", destination: "Rebuilt page for page, then refined only where you agree to it." },
        { feature: "Blog and pages", destination: "Moved from Squarespace’s export, with anything the export leaves behind recovered from the live site." },
        { feature: "Galleries, products, and events", destination: "Recovered and rebuilt as structured content or moved to a dedicated service, case by case." },
        { feature: "Forms and newsletter blocks", destination: "Rebuilt and connected to your CRM or email platform, tested to the inbox." },
        { feature: "Commerce", destination: "Assessed honestly. Serious commerce usually moves to Shopify; light sales may not need a platform at all." },
        { feature: "URL mappings", destination: "Carried into your host’s redirect rules and verified before launch." },
      ],
    },
    keep: KEEP_COMMON,
    stay: {
      heading: "When staying on Squarespace is the right call.",
      text: "A move should pay for itself. Sometimes it will not, and we will tell you.",
      items: [
        "Your site is a simple portfolio that rarely changes",
        "Commerce is central and the built-in store does the job",
        "Your team is happy with the editor and nothing is holding you back",
      ],
    },
    form: {
      heading: "See your Squarespace site without the template.",
      text: "Give us your URL. We rebuild two pages on an agent-ready stack, run one real change through Dispatch, and send back a stack recommendation and a feature-by-feature migration map. No commitment.",
      formName: "Squarespace Migration Preview Request",
    },
    faqs: [
      { q: "Does Squarespace export everything?", a: wrap(`<p>No. Its export covers core pages and blog posts but leaves some content types and blocks behind. We inventory the live site first, use the export where it helps, and recover the rest so nothing is quietly lost.</p>`) },
      { q: "Can you redesign during the move?", a: wrap(`<p>Yes, two ways. Move first with the same design, then improve, which is safest for traffic. Or redesign and migrate together. Either way, the URL map and page signals are locked before design starts, so the redesign cannot break what ranks.</p>`) },
      SEO_FAQ,
      OWN_FAQ,
    ],
    explore: [
      { heading: "Other paths", links: [EXPLORE.migration, EXPLORE.wordpress, EXPLORE.design] },
      { heading: "See the proof", links: [EXPLORE.realChange, EXPLORE.dispatch, EXPLORE.postStructure] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.aiNative, EXPLORE.contact] },
    ],
  },

  {
    slug: "hubspot-cms-ai-website-migration",
    platform: "HubSpot CMS",
    metaTitle: "HubSpot CMS to AI-Native Website | Keep Your CRM | ZINC",
    metaDescription: "Keep HubSpot CRM, forms, and tracking. Move the website. ZINC rebuilds your HubSpot CMS site on code you own, keeps every URL and lead path, and connects Dispatch for governed AI updates.",
    tagline: "HubSpot CMS to AI-native migration",
    h1: "Keep HubSpot. Move the website.",
    lede: "Your CRM, forms, and attribution stay exactly where they are. The website moves to a codebase your team updates by asking its AI agent, and every lead still lands where your sales team expects it.",
    inShort: (
      <>
        <p>A HubSpot CMS migration moves the website, <strong>not your CRM.</strong> ZINC rebuilds your pages and blog on Astro or Next.js, keeps HubSpot forms, tracking, and lead routing working, and maps every URL before launch.</p>
        <p>This website runs exactly that way: a Next.js site with HubSpot CRM behind it, governed through Dispatch.</p>
      </>
    ),
    why: {
      tagline: "Why teams move the CMS",
      heading: "Your CRM is not the problem. The website is.",
      cards: [
        { title: "Stop paying for pages you could ask for.", text: "Many teams pay for CMS tiers mainly to build pages. With an agent, a new landing page is a request and a preview." },
        { title: "Templates without the friction.", text: "Modules and themes rebuilt as clean components your agent reuses, so new pages stay on brand." },
        { title: "Same leads, same reports.", text: "HubSpot tracking and forms stay in place, so attribution and lead routing continue without a gap." },
      ],
    },
    features: {
      heading: "Every HubSpot feature gets a destination.",
      text: "The CRM stays. Everything the website did gets an agreed replacement, an owner, and a test.",
      rows: [
        { feature: "HubSpot forms", destination: "Kept as embedded HubSpot forms, or rebuilt natively with delivery straight to the CRM. Both tested to the inbox." },
        { feature: "Tracking code and attribution", destination: "Kept on every page, so contact timelines and campaign reports continue." },
        { feature: "Website and blog pages", destination: "Exported, rebuilt page for page, with every URL kept or mapped one to one." },
        { feature: "Themes, templates, and modules", destination: "Rebuilt as reusable components your agent works with." },
        { feature: "Smart content and personalization", destination: "Assessed for what earns its keep, then rebuilt or retired with your sign-off." },
        { feature: "Campaign landing pages", destination: "Moved, or left on HubSpot if marketing operations depends on them. Your call, not ours." },
      ],
    },
    keep: [
      "HubSpot CRM, forms, tracking, and lead routing",
      ...KEEP_COMMON.filter((k) => !k.startsWith("Forms")),
    ],
    stay: {
      heading: "When staying on HubSpot CMS is the right call.",
      text: "A move should pay for itself. Sometimes it will not, and we will tell you.",
      items: [
        "Your marketers build landing pages in HubSpot every day",
        "Smart content and memberships are central to the experience",
        "Your HubSpot bundle makes the CMS effectively free",
      ],
    },
    form: {
      heading: "See your site off HubSpot CMS, with HubSpot still behind it.",
      text: "Give us your URL. We rebuild two pages on an agent-ready stack with your HubSpot form connected, run one real change through Dispatch, and send back a migration map. No commitment.",
      formName: "HubSpot CMS Migration Preview Request",
    },
    faqs: [
      { q: "Do we lose HubSpot tracking or attribution?", a: wrap(`<p>No. The HubSpot tracking code goes on every page of the new site, and forms either stay as HubSpot embeds or post straight to the CRM. Contact timelines and campaign reports continue without a gap.</p>`) },
      { q: "Does ZINC run its own site this way?", a: wrap(`<p>Yes. wearezinc.com is a Next.js site. Every form submission is saved, sent to HubSpot, and emailed to our team, and we test that path to the inbox on every launch, because a lead nobody sees is not a lead.</p>`) },
      SEO_FAQ,
      OWN_FAQ,
    ],
    explore: [
      { heading: "Other paths", links: [EXPLORE.migration, EXPLORE.wordpress, EXPLORE.enterprise] },
      { heading: "See the proof", links: [EXPLORE.realChange, EXPLORE.dispatch, EXPLORE.postDispatch] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.aiNative, EXPLORE.contact] },
    ],
  },

  {
    slug: "framer-ai-website-migration",
    platform: "Framer",
    metaTitle: "Framer to AI-Native Website Migration | Own the Code | ZINC",
    metaDescription: "Love your Framer design? Keep it and own the code. ZINC rebuilds your Framer site page for page, motion included where it matters, keeps every URL, and connects Dispatch for governed AI updates.",
    tagline: "Framer to AI-native migration",
    h1: "Love your Framer design? Keep it. Own the code.",
    lede: "Framer is a beautiful place to design. When the site needs to do more, or your team wants an agent making the changes, we rebuild it page for page on code you own, with the motion that matters.",
    inShort: (
      <>
        <p>A Framer migration <strong>keeps the design and moves it onto code you own.</strong> ZINC rebuilds your pages, components, and motion on Astro or Next.js, moves your CMS content, and keeps or redirects every URL.</p>
        <p>Your team then updates the site by asking its AI agent, with every change previewed and approved through Dispatch.</p>
      </>
    ),
    why: {
      tagline: "Why teams leave Framer",
      heading: "When the site has to do more than look good.",
      cards: [
        { title: "Own every line.", text: "The site lives in your repository and runs on any modern host. No platform decides what you can build next." },
        { title: "Logic a canvas cannot hold.", text: "Calculators, integrations, gated content, and pages that share code with your product." },
        { title: "Motion with restraint.", text: "We keep the animation that serves the story and cut what slows the page, so the site feels just as alive and loads faster." },
      ],
    },
    features: {
      heading: "Every Framer feature gets a destination.",
      text: "Before cutover, each thing your site does has an agreed replacement, an owner, and a test.",
      rows: [
        { feature: "Pages and layouts", destination: "Rebuilt page for page and verified at every breakpoint you use." },
        { feature: "Components and variants", destination: "Rebuilt as reusable components your agent uses for new pages." },
        { feature: "Effects and animations", destination: "Rebuilt with CSS and light scripts, honoring reduced-motion settings." },
        { feature: "CMS collections", destination: "Exported and imported into structured content, with every item checked." },
        { feature: "Forms", destination: "Rebuilt and routed to your CRM, tested to the inbox." },
        { feature: "Redirects and locales", destination: "Carried into your host’s rules and verified before launch." },
      ],
    },
    keep: KEEP_COMMON,
    stay: {
      heading: "When staying on Framer is the right call.",
      text: "A move should pay for itself. Sometimes it will not, and we will tell you.",
      items: [
        "A small team that redesigns often and loves the canvas",
        "A marketing site with no custom logic or integrations",
        "No need for an agent to work on the site",
      ],
    },
    form: {
      heading: "See your Framer design on code you own.",
      text: "Give us your URL. We rebuild two pages on an agent-ready stack, run one real change through Dispatch, and send back a stack recommendation and a migration map. No commitment.",
      formName: "Framer Migration Preview Request",
    },
    faqs: [
      { q: "Will the site look and move the same?", a: wrap(`<p>The design is rebuilt page for page and verified at the breakpoints you use. Motion is rebuilt where it serves the story, with reduced-motion support, and anything we propose to simplify is agreed with you first.</p>`) },
      { q: "Can we keep designing in Framer or Figma?", a: wrap(`<p>Yes. Designers keep working where they like. New designs become components, and your agent uses those components for future pages, so the site stays on brand.</p>`) },
      SEO_FAQ,
      OWN_FAQ,
    ],
    explore: [
      { heading: "Other paths", links: [EXPLORE.migration, EXPLORE.wordpress, EXPLORE.design] },
      { heading: "See the proof", links: [EXPLORE.realChange, EXPLORE.dispatch, EXPLORE.postStructure] },
      { heading: "Take the next step", links: [EXPLORE.assessment, EXPLORE.aiNative, EXPLORE.contact] },
    ],
  },
];

export const getMigrationPath = (slug: string) => {
  const path = MIGRATION_PATHS.find((p) => p.slug === slug);
  if (!path) throw new Error(`Unknown migration path: ${slug}`);
  return path;
};
