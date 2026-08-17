"use client";

import { useState } from "react";

export interface FaqItem { q: string; a: string }

// FAQ accordion per the IX2 spec ("FAQ 2 accordion"): 400ms ease height
// animation + synced 180° icon rotation, driven by CSS in page-animations.css.
// Answers are trusted static content from our own capture.
export function FaqItems({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      {items.map((item, i) => (
        <div key={i} className={`faq2_accordion${open === i ? " open" : ""}`}>
          <div
            className="faq2_question"
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
          >
            <div className="text-size-medium">{item.q}</div>
            <div className="faq2_icon-wrapper">
              <div className="icon-embed-small w-embed">
                <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 20.8839C16.2374 21.1768 15.7626 21.1768 15.4697 20.8839L7.82318 13.2374C7.53029 12.9445 7.53029 12.4697 7.82318 12.1768L8.17674 11.8232C8.46963 11.5303 8.9445 11.5303 9.2374 11.8232L16 18.5858L22.7626 11.8232C23.0555 11.5303 23.5303 11.5303 23.8232 11.8232L24.1768 12.1768C24.4697 12.4697 24.4697 12.9445 24.1768 13.2374L16.5303 20.8839Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
          <div className="faq2_answer">
            <div dangerouslySetInnerHTML={{ __html: item.a }} />
          </div>
        </div>
      ))}
    </>
  );
}
