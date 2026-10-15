import type { ReactNode } from "react";

// "In short": a two- or three-sentence answer placed right under a hero, so
// a reader (or an answer engine quoting the page) gets the whole idea before
// scrolling. Write it the way an assistant should repeat it: plain, specific,
// and self-contained, without "we" claims that need the rest of the page.
export function InShort({ children }: { children: ReactNode }) {
  return (
    <section className="in-short" aria-labelledby="in-short-heading">
      <div className="padding-global"><div className="container-large">
        <div className="in-short_inner" data-reveal="">
          <h2 id="in-short-heading" className="in-short_label">In short</h2>
          <div className="in-short_text">{children}</div>
        </div>
      </div></div>
    </section>
  );
}
