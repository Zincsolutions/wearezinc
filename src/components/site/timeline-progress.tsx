"use client";

import { useEffect } from "react";

// Scroll-linked vertical progress bar (IX2 "Section Content 99 [Timeline
// Progress]"): .layout121_progress-bar height maps 0% -> 100% across the
// 25%..55% band of its section's viewport traverse.
export function TimelineProgress() {
  useEffect(() => {
    const bars = [...document.querySelectorAll<HTMLElement>(".layout121_progress-bar")];
    if (!bars.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const bar of bars) {
        const section = bar.closest("section") || bar.parentElement!;
        const r = section.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
        const t = Math.min(1, Math.max(0, (p - 0.25) / 0.3));
        bar.style.height = `${t * 100}%`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
