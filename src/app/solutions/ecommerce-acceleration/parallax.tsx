"use client";

import { useEffect } from "react";

// Scroll-linked parallax on the layout414 image strips, replicating the
// Webflow IX2 interaction (measured live): as the strips traverse the
// viewport, the top strip translates from -36px to +84px and the bottom
// strip mirrors it. Progress = (viewportH - top) / (viewportH + wrapperH).
export function StripParallax() {
  useEffect(() => {
    const top = document.querySelector<HTMLElement>(".image-list-top");
    const bottom = document.querySelector<HTMLElement>(".image-list-bottom");
    const wrapper = document.querySelector<HTMLElement>(".layout414_content-bottom");
    if (!top || !bottom || !wrapper) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const x = -36 + 120 * p;
      top.style.transform = `translate3d(${x}px, 0, 0)`;
      bottom.style.transform = `translate3d(${-x}px, 0, 0)`;
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
