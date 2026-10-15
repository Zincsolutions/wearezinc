import type { ReactNode } from "react";

// Plain hero for content pages (glossary, comparisons, tools): tagline, one
// h1, a lede, and optional actions. No illustration, so the content leads.
export function ContentHero({
  tagline,
  title,
  lede,
  children,
}: {
  tagline: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="section_aeo-hero color-scheme-1 content-hero">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="max-width-large">
          <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; {tagline} &lt;</div></div>
          <div className="margin-bottom margin-small hero-seq__item"><h1 className="heading-style-h1">{title}</h1></div>
          <p className="text-size-medium hero-seq__item">{lede}</p>
        </div>
        {children ? <div className="margin-top margin-medium hero-seq__item">{children}</div> : null}
      </div></div></div>
    </header>
  );
}
