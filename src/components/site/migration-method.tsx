import type { CSSProperties } from "react";
import { StepNumber } from "@/components/site/step-number";

// The six-step migration method, each step paired with what it looked like
// on our own move (Webflow to Next.js, Aug 2026). Every proof line traces
// to the repo: migration/webflow/manifest.json (URLs, assets), cms/*.json
// (collections), qa/ (screenshot diffs), next.config.ts (301s), and the
// merged PR history. Update the numbers there first, then here.

const STEPS = [
  {
    title: "Inventory every URL.",
    text: "We crawl the live site and list every page by template before anything is designed or built.",
    proof: "Our site: 49 live URLs across six templates, each with a destination before a line of code.",
  },
  {
    title: "Keep the URLs.",
    text: "Same paths, same slugs. An address only changes when a 301 redirect is in place for it.",
    proof: "44 kept their exact address. 5 retired pages got 301s. Our highest-traffic page never moved.",
  },
  {
    title: "Export everything.",
    text: "CMS content, every file on the old platform’s CDN, and the rendered HTML of every page as the reference copy.",
    proof: "549 files moved off the old CDN. 4 CMS collections, 45 items, imported and checked.",
  },
  {
    title: "Parity first. Then improve.",
    text: "The first version is a faithful copy: same pages, same copy, same metadata. Changes come after sign-off, so any traffic shift has one cause to look at, not ten.",
    proof: "Our first complete build took one day, compared page by page against the original by screenshot.",
  },
  {
    title: "Prove the business paths.",
    text: "Forms, CRM delivery, notifications, analytics, and consent are tested end to end, from the visitor’s click to the right person’s inbox.",
    proof: "Lesson we learned: a form that saves a lead is not a form that tells anyone. We test to the inbox now.",
  },
  {
    title: "Govern, launch, and watch.",
    text: "Dispatch is connected before the agent touches production. Redirects go live at cutover, the sitemap is submitted, and 404s and indexing are watched closely.",
    proof: "Since our launch: 36 reviewed changes in six weeks, each one previewed before release.",
  },
];

export function MigrationMethod({
  id = "method",
  tagline = "How we migrate",
  heading = "Nothing gets designed until every URL has a plan.",
  text = "The same six steps on every move, written down while we moved our own website. The boring part comes first, because the boring part is what protects your traffic and your leads.",
}: {
  id?: string;
  tagline?: string;
  heading?: string;
  text?: string;
}) {
  return (
    <section id={id} className="section_aeo-6 color-scheme-1">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="layout249_component">
          <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
            <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div>
            <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
            <p className="text-size-medium">{text}</p>
          </div></div>
          <ol role="list" className="method_list">
            {STEPS.map((s, i) => (
              <li key={s.title} className="method_item" data-reveal="" style={{ "--i": i % 3 } as CSSProperties}>
                <div className="margin-bottom margin-xsmall"><StepNumber value={String(i + 1).padStart(2, "0")} /></div>
                <h3 className="heading-style-h5 method_title">{s.title}</h3>
                <p className="method_text">{s.text}</p>
                <p className="method_proof"><span className="method_proof-label">On our own move</span>{s.proof}</p>
              </li>
            ))}
          </ol>
        </div>
      </div></div></div>
    </section>
  );
}
