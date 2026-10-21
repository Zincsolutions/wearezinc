// Building blocks shared by the commerce pages: E-commerce Acceleration (the
// overview) and AI Shopping Readiness (split out Oct 20, 2026 so every
// Solutions menu link opens a real page).
import { StepNumber } from "@/components/site/step-number";

export const ArrowIcon = () => (
  <div className="icon-embed-xxsmall w-embed">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
    </svg>
  </div>
);

export type Card = {
  id?: string;
  n?: string;
  title: string;
  text: string;
  items?: string[];
  link?: { href: string; label: string };
};

export const Cards = ({ items, four }: { items: Card[]; four?: boolean }) => (
  <div className={`w-layout-grid layout249_list${four ? " is-four" : ""}`}>
    {items.map((c) => (
      <div key={c.title} id={c.id} className="layout249_item">
        {c.n ? <div className="margin-bottom margin-xsmall"><StepNumber value={c.n} /></div> : null}
        <div className="margin-bottom margin-small"><h3 className="heading-style-h4"><strong>{c.title}</strong></h3></div>
        <p>{c.text}</p>
        {c.items ? (
          <ul role="list" className="capability_list">
            {c.items.map((it) => <li key={it}>{it}</li>)}
          </ul>
        ) : null}
        {c.link ? (
          <div className="margin-top margin-small">
            <a href={c.link.href} className="button is-link is-icon w-inline-block"><div>{c.link.label}</div><ArrowIcon /></a>
          </div>
        ) : null}
      </div>
    ))}
  </div>
);

export const Intro = ({ tagline, heading, text }: { tagline?: string; heading: string; text?: string }) => (
  <div className="margin-bottom margin-xxlarge"><div className="max-width-large">
    {tagline ? <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div> : null}
    <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
    {text ? <p className="text-size-medium">{text}</p> : null}
  </div></div>
);

export const AI_SHOPPING_PATH = "/solutions/ai-shopping-readiness";
