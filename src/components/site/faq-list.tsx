"use client";

import { useState } from "react";

export interface FaqEntry { question: string; answer: string; defaultOpen?: boolean }

// Markup-driven FAQ accordion. Matches the Webflow behavior: each item
// toggles independently (several can be open), and items whose captured
// answer lacked the collapsed inline style start open.
export function FaqList({ prefix, items }: { prefix: string; items: FaqEntry[] }) {
  const [open, setOpen] = useState<boolean[]>(() => items.map((i) => !!i.defaultOpen));
  const toggle = (i: number) =>
    setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)));
  return (
    <>
      {items.map((item, i) => (
        <div key={i} className={`${prefix}_accordion${open[i] ? " open" : ""}`}>
          <div
            className={`${prefix}_question`}
            role="button"
            tabIndex={0}
            aria-expanded={open[i]}
            onClick={() => toggle(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle(i);
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
