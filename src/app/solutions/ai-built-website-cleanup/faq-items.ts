import type { FaqItem } from "@/components/site/faq";

// AI-built website cleanup (new offer, Oct 2026). Tools are named as
// examples only ("such as"); no claims about any tool's quality.
const wrap = (html: string) => `<div class="margin-bottom margin-small"><div class="max-width-large">${html}</div></div>`;

export const FAQ_ITEMS: FaqItem[] = [
  { q: "We built our site with an AI tool. Is that a problem?", a: wrap(`<p>Not at all. AI builders are a fast way to get a real site live. The risk is in what nobody checked: a form that never reaches anyone, keys exposed in the browser, pages search engines cannot read, or code only the tool understands. We find those, fix them, and give you a site you can keep growing.</p>`) },
  { q: "Which tools do you clean up after?", a: wrap(`<p>Sites built with tools such as Lovable, v0, Bolt, Replit, or a general AI assistant, and sites a developer prototyped quickly with AI help. If it produces code we can put in a repository, we can review it.</p>`) },
  { q: "Will you rebuild everything?", a: wrap(`<p>Only if that is cheaper. Most sites need targeted fixes, not a rebuild. The review tells you which parts to keep, which to fix, and which to replace, with a cost for each, before you commit.</p>`) },
  { q: "Can we keep using AI to change the site afterwards?", a: wrap(`<p>Yes, that is the point. We move the code into your own repository, add the structure an agent needs to work safely, and connect Dispatch, so every future change is previewed and approved before it goes live.</p>`) },
  { q: "What does the review cost?", a: wrap(`<p>The first look is free: share the site and what it needs to do, and we tell you whether it needs a light cleanup, targeted fixes, or a proper rebuild. The full review and the fixes are scoped and priced after that.</p>`) },
];
