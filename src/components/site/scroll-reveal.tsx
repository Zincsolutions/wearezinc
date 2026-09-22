"use client";

import { useEffect } from "react";

// One-time fade-up for [data-reveal] blocks as they scroll into view.
// Z-01 rules: content is visible without JS (nothing is hidden until this
// runs), anything already on screen at mount is revealed before hiding kicks
// in, and a failsafe reveals everything if IntersectionObserver never reports.
// Reduced-motion visitors get no hiding at all.
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!els.length || reduce || !("IntersectionObserver" in window)) return;

    const reveal = (el: Element) => el.classList.add("is-revealed");
    const revealAll = () => els.forEach(reveal);

    // Anything at or above the fold stays put: no flash on load or on
    // hash links that land mid-page.
    const fold = window.innerHeight * 0.92;
    els.forEach((el) => { if (el.getBoundingClientRect().top < fold) reveal(el); });
    root.classList.add("reveal-ready");

    let alive = false;
    const io = new IntersectionObserver(
      (entries) => {
        alive = true;
        entries.forEach((e) => {
          if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => { if (!el.classList.contains("is-revealed")) io.observe(el); });

    const failsafe = window.setTimeout(() => { if (!alive) revealAll(); }, 1500);
    window.addEventListener("beforeprint", revealAll);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("beforeprint", revealAll);
      // Dropping the class un-hides everything without marking it revealed,
      // so a re-run (dev double-invoke, client navigation) starts clean.
      root.classList.remove("reveal-ready");
    };
  }, []);
  return null;
}
