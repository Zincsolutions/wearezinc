import { getAllPosts, isContentConfigured } from "@/lib/content";

// llms.txt (https://llmstxt.org): a plain-language map of the site for AI
// assistants and answer engines. ZINC sells AEO, so this file is part of the
// proof. Keep the descriptions in step with the page heroes and
// docs/positioning.md; posts are appended from Supabase when configured.

const SITE = "https://www.wearezinc.com";

export const revalidate = 3600;

const SECTIONS: { heading: string; links: [path: string, title: string, note: string][] }[] = [
  {
    heading: "Start here",
    links: [
      ["/free-website-assessment", "Free Website Assessment", "A free, human-reviewed assessment of how AI assistants and search see a business website, where it loses leads, and the best next step (improve, migrate, or redesign). No logins or obligation; delivered within two business days."],
    ],
  },
  {
    heading: "AI-native websites and Dispatch",
    links: [
      ["/solutions/ai-native-websites", "AI-Native Websites", "Keep the website you love and change how you run it: your team updates the site by asking its own AI agent, previews the result, and approves it before it goes live."],
      ["/solutions/ai-website-migration", "AI Website Migration", "AI website migration, with control built in. ZINC moves an existing site onto an agent-ready stack (Astro or Next.js) with design, content, and URLs preserved where possible, then configures Dispatch."],
      ["/solutions/wordpress-ai-website-migration", "WordPress to AI-Native Migration", "Moving off WordPress: every plugin function gets an agreed replacement, URLs are preserved or redirected, and a free preview rebuilds two pages and runs one real change through Dispatch."],
      ["/solutions/ai-dispatch", "Dispatch", "Dispatch is the management layer for AI-powered websites: preview before release, role and risk-based approvals, attributed change history, and one-click restore for supported changes. Bring your own agent, such as Claude Code, Codex, or Gemini."],
    ],
  },
  {
    heading: "Migration paths",
    links: [
      ["/solutions/webflow-ai-website-migration", "Webflow or AI-Native?", "A straight comparison from a Webflow partner that moved its own site: when Webflow Enterprise is the better call, when an AI-native site is, and how agents can work on Webflow too."],
      ["/solutions/wix-ai-website-migration", "Wix to AI-Native Migration", "Wix does not export sites to other hosts, so the move is a rebuild: pages recreated, blog and CMS content recovered, every URL kept or redirected."],
      ["/solutions/squarespace-ai-website-migration", "Squarespace to AI-Native Migration", "Part export, part recovery: pages, blog, and media moved, the design rebuilt without template limits, every URL mapped."],
      ["/solutions/hubspot-cms-ai-website-migration", "HubSpot CMS to AI-Native Migration", "Keep HubSpot CRM, forms, tracking, and lead routing; move the website onto code you own."],
      ["/solutions/framer-ai-website-migration", "Framer to AI-Native Migration", "Keep the Framer design and motion, rebuilt on Astro or Next.js in your own repository."],
    ],
  },
  {
    heading: "Tools and references",
    links: [
      ["/migration-planner", "Free Migration Planner", "Enter a website to get its sitemap URL inventory by template, the platform it appears to run on, and the URLs that need a redirect decision."],
      ["/glossary", "AI Website Glossary", "Plain-language definitions: AI-native website, AI website migration, AI website governance, AEO, llms.txt, MCP, agentic commerce, risk tiers, SEO parity, and more."],
      ["/compare", "Comparisons", "Fair comparisons: Webflow or AI-native, WordPress or AI-native, Dispatch or a DIY agent workflow, agent editing or a headless CMS."],
      ["/compare/dispatch-vs-diy-ai-website-workflow", "Dispatch vs a DIY AI Website Workflow", "Where an agent plus GitHub and preview deploys is enough, and where approvals, attribution, and restore for the wider business need Dispatch."],
      ["/compare/ai-agent-vs-headless-cms", "AI Agent Editing vs Headless CMS", "When to update a site by asking an agent, when structured CMS fields are better, and how to combine them."],
    ],
  },
  {
    heading: "Websites and platforms",
    links: [
      ["/solutions/enterprise-websites", "Enterprise Websites & CMS", "Webflow Enterprise design, development, CMS integrations, and team enablement for organizations whose current platform is the right fit."],
      ["/solutions/ai-built-website-cleanup", "AI-Built Website Cleanup", "For sites built fast with AI builders such as Lovable, v0, or Bolt: review and fix lead paths, exposed secrets, search and AEO signals, accessibility, and code structure, then govern future changes with Dispatch."],
      ["/solutions/website-design-development", "Website Design & Development", "New websites and redesigns on Webflow, Shopify, or a code-based stack, chosen by business need."],
      ["/partners/webflow", "Webflow Partner", "ZINC's Webflow partnership and enterprise Webflow services."],
      ["/partners/shopify", "Shopify Partner", "ZINC's Shopify partnership and storefront services."],
    ],
  },
  {
    heading: "E-commerce and AI enablement",
    links: [
      ["/solutions/ai-shopping-readiness", "AI Shopping Readiness", "Get chosen by AI shoppers: accurate product facts, policies, AI channel settings, and a tested path to checkout for Shopify stores. Starts with a free AI shopping check."],
      ["/solutions/ecommerce-acceleration", "E-commerce Acceleration", "Shopify and BigCommerce storefronts and conversion, AI shopping readiness, and practical AI for commerce teams (AI drafts, your team approves)."],
      ["/solutions/ai-strategy-optimization", "AI Strategy & Training", "Where AI makes a useful difference, which tools to choose, and training so teams apply them with confidence."],
      ["/solutions/automation-workflows", "AI Workflows & Automation", "AI connected to existing CMS, CRM, and marketing systems, with clear review and approval steps."],
      ["/solutions/on-brand-aeo-sprint", "On-Brand AEO Sprint", "A focused sprint to improve how answer engines read, cite, and describe a brand."],
      ["/solutions/branding-positioning", "Brand Strategy & Design", "Positioning, messaging, and identity that make a business distinctive."],
    ],
  },
  {
    heading: "Company",
    links: [
      ["/about-us", "About ZINC", "Founded in 1998. More than 25 years of strategy, brand, design, and technology work for companies from Fortune 200s to early-stage startups."],
      ["/our-approach", "Our Approach", "Strategy first, then design and delivery, with AI applied where it adds value."],
      ["/work", "Our Work", "Case studies including Thoma Bravo, Growth99, DFND, Bravo Foundation, Navigator Global, and Pivot."],
      ["/contact-us", "Contact", "Start a project or request a website assessment. Phone (949) 719-4950, hello@wearezinc.com."],
    ],
  },
];

const line = ([path, title, note]: [string, string, string]) => `- [${title}](${SITE}${path}): ${note}`;

export async function GET() {
  const parts = [
    "# ZINC",
    "",
    "> ZINC is a strategy, brand, design, and technology agency (founded 1998, Irvine, California). It helps companies choose, build, and evolve the right digital foundation, using AI where it adds value: AI-native websites their teams run with their own AI agent, migrations off WordPress and other CMS platforms, Webflow Enterprise sites, AI shopping readiness for e-commerce, and Dispatch, ZINC's governance platform for AI website work.",
    "",
    "Key facts:",
    "- An AI-native website keeps its code and content in a repository the client's own AI agent can change, with each change previewed and approved by the team before release.",
    "- ZINC recommends the stack by business need (Astro, Next.js, Webflow Enterprise, Shopify) and sells none of the platforms.",
    "- The client owns the code, hosting account, domain, and content. Turn Dispatch off and the website keeps running.",
    "- wearezinc.com itself runs this way: Claude Code on the repository, governed through Dispatch.",
    "",
    ...SECTIONS.flatMap((s) => [`## ${s.heading}`, "", ...s.links.map(line), ""]),
  ];

  if (isContentConfigured()) {
    try {
      const posts = await getAllPosts();
      if (posts.length) {
        parts.push("## Insights", "");
        for (const p of posts) {
          const summary = p.post_summary?.replace(/\s+/g, " ").trim();
          parts.push(`- [${p.name}](${SITE}/post/${p.slug})${summary ? `: ${summary}` : ""}`);
        }
        parts.push("");
      }
    } catch {
      // The service map above is still useful if the content API is down.
    }
  }

  parts.push("## Optional", "", `- [Blog](${SITE}/blog): All articles on AI search, AEO, e-commerce, and AI-native websites.`, `- [Sitemap](${SITE}/sitemap.xml)`, "");

  return new Response(parts.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
