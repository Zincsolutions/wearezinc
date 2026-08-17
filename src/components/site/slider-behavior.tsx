"use client";

import { useEffect } from "react";

// Behavior for the Webflow slider markup kept verbatim in the page content
// (measured from the original: manual navigation, 500ms ease slide,
// infinite wrap, swipe enabled, no autoplay). Dots are runtime-generated
// into .w-slider-nav, exactly like the Webflow runtime did.
export function SliderBehavior({ root = ".w-slider" }: { root?: string }) {
  useEffect(() => {
    const slider = document.querySelector<HTMLElement>(root);
    if (!slider) return;
    const mask = slider.querySelector<HTMLElement>(".w-slider-mask");
    const slides = [...slider.querySelectorAll<HTMLElement>(".w-slide")];
    const nav = slider.querySelector<HTMLElement>(".w-slider-nav");
    const left = slider.querySelector<HTMLElement>(".w-slider-arrow-left");
    const right = slider.querySelector<HTMLElement>(".w-slider-arrow-right");
    if (!mask || slides.length < 2) return;

    let index = 0;
    const dots: HTMLElement[] = [];
    if (nav && nav.children.length === 0) {
      for (let i = 0; i < slides.length; i++) {
        const d = document.createElement("div");
        d.className = "w-slider-dot" + (i === 0 ? " w-active" : "");
        d.setAttribute("role", "button");
        d.setAttribute("aria-label", `Show slide ${i + 1}`);
        d.addEventListener("click", () => go(i));
        nav.appendChild(d);
        dots.push(d);
      }
    }
    for (const s of slides) {
      s.style.transition = "transform 0.5s ease";
      s.style.willChange = "transform";
    }
    const go = (i: number) => {
      index = (i + slides.length) % slides.length;
      for (const s of slides) s.style.transform = `translateX(${-100 * index}%)`;
      dots.forEach((d, j) => d.classList.toggle("w-active", j === index));
    };
    const onLeft = () => go(index - 1);
    const onRight = () => go(index + 1);
    left?.addEventListener("click", onLeft);
    right?.addEventListener("click", onRight);

    // swipe
    let startX: number | null = null;
    const down = (e: PointerEvent) => { startX = e.clientX; };
    const up = (e: PointerEvent) => {
      if (startX === null) return;
      const dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
    };
    mask.addEventListener("pointerdown", down);
    mask.addEventListener("pointerup", up);
    return () => {
      left?.removeEventListener("click", onLeft);
      right?.removeEventListener("click", onRight);
      mask.removeEventListener("pointerdown", down);
      mask.removeEventListener("pointerup", up);
    };
  }, [root]);
  return null;
}
