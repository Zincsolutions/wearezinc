"use client";

import { useState } from "react";

export interface FaqEntry { question: string; answer: string }

// Markup-driven FAQ accordion: question/answer inner HTML comes verbatim
// from the Webflow capture (trusted static content), so per-variant icons
// and text classes are preserved. Animation CSS targets `${prefix}_answer`
// / `${prefix}_icon-wrapper` (see page-animations.css).
export function FaqList({ prefix, items }: { prefix: string; items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {items.map((item, i) => (
        <div key={i} className={`${prefix}_accordion${open === i ? " open" : ""}`}>
          <div
            className={`${prefix}_question`}
            role="button"
            tabIndex={0}
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setOpen(open === i ? null : i);
              }
            }}
            dangerouslySetInnerHTML={{ __html: item.question }}
          />
          <div className={`${prefix}_answer`}>
            <div dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </div>
      ))}
    </>
  );
}
