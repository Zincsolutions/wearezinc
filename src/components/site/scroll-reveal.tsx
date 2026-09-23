"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Quiet scroll pacing (Sept 2026): section headings and card groups fade up
// the first time they scroll into view. Deliberately restrained:
// - only elements that start below the fold are ever hidden, so nothing on
//   screen at load blinks;
// - content is fully visible without JS (the hide class is added here);
// - forms and FAQs are never hidden;
// - each element animates once; reduced motion gets a short fade only.
// Styles live in globals.css under [data-reveal].

const HEADING_BLOCKS =
  ".max-width-large, .layout207_content-right, .layout19_content-left, .layout481_content-left, .layout414_content-left, .logo4_content-left, .offer-panel__intro";
const CARD_GROUPS =
  ".layout249_list, .blog38_list, .portfolio6_list, .offer-panel__paths, .solution-services";
const NEVER = "form, .faq2_list, .faq3_list, header, [data-no-reveal]";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const main = document.querySelector("main");
    if (!main) return;

    const targets: HTMLElement[] = [];
    const add = (el: Element | null, step = 0) => {
      if (!(el instanceof HTMLElement) || el.closest(NEVER) || el.dataset.reveal !== undefined) return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; // already in view
      el.dataset.reveal = "";
      el.style.setProperty("--reveal-delay", `${Math.min(step, 3) * 50}ms`);
      targets.push(el);
    };

    main.querySelectorAll("section h2").forEach((h2) => add(h2.closest(HEADING_BLOCKS) ?? h2));
    main.querySelectorAll(CARD_GROUPS).forEach((group) =>
      Array.from(group.children).forEach((child, i) => add(child, i))
    );
    // Also pick up anything tagged by an earlier run that has not revealed yet
    // (effects can run twice, and client navigations re-run this effect).
    main.querySelectorAll<HTMLElement>('[data-reveal=""]').forEach((el) => {
      if (!targets.includes(el)) targets.push(el);
    });
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.reveal = "in";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
