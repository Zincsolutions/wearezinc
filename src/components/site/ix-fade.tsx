"use client";

import { useEffect } from "react";

// Elements captured with an IX2 opacity:0 initial state fade in when they
// enter the viewport (with a failsafe so nothing can stay invisible).
export function IxFade() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>(".ix-fade")];
    if (!els.length) return;
    const reveal = (el: HTMLElement) => el.classList.add("ix-in");
    if (!("IntersectionObserver" in window)) { els.forEach(reveal); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { reveal(e.target as HTMLElement); io.unobserve(e.target); }
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    const failsafe = setTimeout(() => els.forEach(reveal), 2500);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);
  return null;
}
