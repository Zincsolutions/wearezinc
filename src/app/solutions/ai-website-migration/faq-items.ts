import type { FaqItem } from "@/components/site/faq";

// Approved copy from the Sept 21, 2026 migration page handoff.
// Answers are our own trusted static content (rendered via innerHTML).
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "Can you migrate our WordPress or Webflow website?", a: wrap(`<p>Yes. We review your content, functionality, and integrations to determine the right architecture and migration scope. Features tied to your CMS may need rebuilding or an alternative service.</p><a class="faq-link" href="/solutions/ai-native-websites">Explore AI-Native Websites &gt;</a>`) },
  { q: "Do we need to redesign?", a: wrap(`<p>No. We can migrate with your agreed design and content intact. If you want changes, we scope those separately so you can decide how much to take on.</p>`) },
  { q: "How long will it take, and what will it cost?", a: wrap(`<p>That depends on the number of page types, content volume, integrations, and launch requirements. Your proposal sets out the timeline and migration fee, with hosting, agent usage, Dispatch, and optional ongoing support identified separately.</p>`) },
  { q: "What happens to our SEO and existing website?", a: wrap(`<p>Your existing site stays live during the build. We plan URL continuity, redirects, and technical checks before cutover, along with post-launch monitoring. Search rankings can fluctuate, so we do not promise unchanged rankings.</p>`) },
  { q: "Who controls the website after migration?", a: wrap(`<p>Ownership, repository access, hosting accounts, and third-party services are documented in your proposal and handover. We train your team on the agreed workflow and identify where specialist support is needed. Ongoing ZINC support is an option.</p>`) },
];
