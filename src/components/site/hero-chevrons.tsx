"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Chevron field behind the homepage hero. Ported from the dot grid on
// lovable.dev/product-managers (their DotGrid component): one SVG path
// rebuilt per animation frame, a grid on a 28 x 30 pitch, an enter animation
// that grows each glyph in with a cubic ease-out staggered by distance from
// the center, and a hover effect that scales glyphs within EFFECT_RADIUS of
// the pointer up to MAX_SCALE with a quadratic falloff, eased over time.
// Differences from the original: the glyph is a chevron rather than a dot
// (left half points right, right half points left, both toward the copy),
// the radial fill runs red -> orange -> yellow from the edge inward and
// dissolves into the page background in an ellipse around the text,
// and the canvas sizes to its container instead of a fixed 1440 x 693.

const GAP_X = 28;
const GAP_Y = 30;
const GLYPH = 8; // half-height at rest; same "radius" Lovable uses for dots
const MAX_SCALE = 1.6;
const EFFECT_RADIUS = 200;
const ANIMATION_DURATION = 600;
const ENTER_DURATION = 600;
const ENTER_STAGGER = 2;
const ENTER_START_RADIUS = 400;

const COLORS = {
  red: "#fe0d0d",
  orange: "#fe5000",
  amber: "#fe7700",
  yellow: "#feba00",
  paper: "#ffffff",
};

type Glyph = {
  cx: number;
  cy: number;
  key: string;
  dir: 1 | -1;
  distanceFromCenter: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// A bold ">" (dir = 1) or "<" (dir = -1) centered on (cx, cy). `s` is the
// half-height; proportions come from the Figma mood board chevrons.
function chevronPath(cx: number, cy: number, s: number, dir: 1 | -1) {
  if (s <= 0) return "";
  const k = s / GLYPH;
  const x = (v: number) => (cx + dir * v * k).toFixed(2);
  const y = (v: number) => (cy + v * k).toFixed(2);
  // Stroke is 6.25 wide (was 5, +25% per user request); outer edge unchanged.
  return (
    `M${x(-6.75)},${y(-8)}` +
    `L${x(-0.5)},${y(-8)}` +
    `L${x(6)},${y(0)}` +
    `L${x(-0.5)},${y(8)}` +
    `L${x(-6.75)},${y(8)}` +
    `L${x(-0.25)},${y(0)}Z`
  );
}

// Horizontal half-width of the quiet zone around the copy, as a fraction of
// half the canvas width, per breakpoint.
function clearFraction(width: number) {
  if (width >= 992) return 0.46;
  if (width >= 768) return 0.72;
  return 0.68;
}

export function HeroChevrons({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const frameRef = useRef<number | null>(null);
  const tickRef = useRef<(now: number) => void>(() => {});
  const runningRef = useRef(false);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const currentRef = useRef(new Map<string, number>());
  const targetRef = useRef(new Map<string, number>());
  const enterStartRef = useRef<number | null>(null);
  const enteredRef = useRef(false);
  const lastFrameRef = useRef(0);
  const rectRef = useRef<DOMRect | null>(null);
  const [size, setSize] = useState({ width: 1440, height: 608 });
  const gradientId = "hero-chevron-gradient";

  useEffect(() => {
    const el = svgRef.current?.parentElement;
    if (!el) return;
    let timer: number | null = null;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);
      if (width <= 0 || height <= 0) return;
      rectRef.current = null;
      if (timer) window.clearTimeout(timer);
      timer = window.setTimeout(() => setSize({ width, height }), 150);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const { width, height } = size;
  const centerX = width / 2;
  const centerY = height / 2;
  const cols = Math.floor((width - GLYPH) / GAP_X) + 1;
  const rows = Math.floor((height - GLYPH) / GAP_Y) + 1;

  const glyphs = useMemo(() => {
    const list: Glyph[] = [];
    const offsetX = (width - (cols - 1) * GAP_X) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = offsetX + c * GAP_X;
        const cy = GLYPH + r * GAP_Y;
        if (cy + GLYPH <= height) {
          list.push({
            cx,
            cy,
            key: `g-${r}-${c}`,
            dir: cx < centerX ? 1 : -1,
            distanceFromCenter: Math.hypot(cx - centerX, cy - centerY),
          });
        }
      }
    }
    return list;
  }, [rows, cols, width, height, centerX, centerY]);

  const maxDistance = useMemo(
    () => Math.max(0, ...glyphs.map((g) => g.distanceFromCenter)),
    [glyphs]
  );

  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    enteredRef.current = reducedMotion;
    enterStartRef.current = performance.now();
    const current = new Map<string, number>();
    const target = new Map<string, number>();
    glyphs.forEach((g) => {
      current.set(g.key, reducedMotion ? GLYPH : 0);
      target.set(g.key, GLYPH);
    });
    currentRef.current = current;
    targetRef.current = target;
  }, [glyphs, reducedMotion]);

  const toCanvas = useCallback(
    (clientX: number, clientY: number) => {
      if (!svgRef.current) return null;
      if (!rectRef.current) rectRef.current = svgRef.current.getBoundingClientRect();
      const rect = rectRef.current;
      return {
        x: (clientX - rect.left) * (width / rect.width),
        y: (clientY - rect.top) * (height / rect.height),
      };
    },
    [width, height]
  );

  const scaleFor = useCallback((cx: number, cy: number, p: { x: number; y: number } | null) => {
    if (!p) return GLYPH;
    const d = Math.hypot(p.x - cx, p.y - cy);
    if (d > EFFECT_RADIUS) return GLYPH;
    const t = d / EFFECT_RADIUS;
    const strength = 1 - Math.pow(t, 2);
    return GLYPH * (1 + (MAX_SCALE - 1) * strength);
  }, []);

  useEffect(() => {
    let alive = true;
    const tick = (now: number) => {
      if (!alive) return;
      const dt = now - lastFrameRef.current;
      lastFrameRef.current = now;
      const ease = Math.min(1, (dt / ANIMATION_DURATION) * 3);
      let changed = false;
      let entered = true;
      const next = new Map(currentRef.current);

      glyphs.forEach((g) => {
        const cur = currentRef.current.get(g.key) ?? 0;
        let goal: number;
        if (enterStartRef.current && !enteredRef.current) {
          const elapsed = now - enterStartRef.current;
          const delay =
            (Math.max(0, g.distanceFromCenter - ENTER_START_RADIUS) /
              Math.max(1, maxDistance - ENTER_START_RADIUS)) *
            ENTER_STAGGER *
            ENTER_DURATION;
          const local = Math.max(0, elapsed - delay);
          const progress = Math.min(1, local / ENTER_DURATION);
          const entering = GLYPH * easeOutCubic(progress);
          if (progress < 1) entered = false;
          goal =
            pointerRef.current && progress === 1
              ? scaleFor(g.cx, g.cy, pointerRef.current)
              : entering;
        } else {
          goal = targetRef.current.get(g.key) ?? GLYPH;
        }
        if (Math.abs(cur - goal) > 0.01) {
          next.set(g.key, enteredRef.current ? lerp(cur, goal, ease) : goal);
          changed = true;
        } else if (cur !== goal) {
          next.set(g.key, goal);
          changed = true;
        }
      });

      if (entered && !enteredRef.current) enteredRef.current = true;

      if (changed) {
        currentRef.current = next;
        if (pathRef.current) {
          const d = glyphs
            .map((g) => chevronPath(g.cx, g.cy, next.get(g.key) ?? 0, g.dir))
            .filter(Boolean)
            .join("");
          pathRef.current.setAttribute("d", d);
        }
      }

      if (!changed && enteredRef.current && !pointerRef.current) {
        runningRef.current = false;
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    tickRef.current = tick;
    runningRef.current = true;
    lastFrameRef.current = performance.now();
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      alive = false;
      runningRef.current = false;
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [glyphs, maxDistance, scaleFor]);

  useEffect(() => {
    const wake = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      lastFrameRef.current = performance.now();
      frameRef.current = requestAnimationFrame(tickRef.current);
    };
    const settle = () => {
      glyphs.forEach((g) => targetRef.current.set(g.key, GLYPH));
    };
    const onMove = (e: MouseEvent) => {
      if (!rectRef.current && svgRef.current) rectRef.current = svgRef.current.getBoundingClientRect();
      const rect = rectRef.current;
      if (!rect) return;
      const padX = EFFECT_RADIUS * (rect.width / width);
      const padY = EFFECT_RADIUS * (rect.height / height);
      const outside =
        e.clientX < rect.left - padX ||
        e.clientX > rect.right + padX ||
        e.clientY < rect.top - padY ||
        e.clientY > rect.bottom + padY;
      if (outside) {
        if (pointerRef.current !== null) {
          pointerRef.current = null;
          if (enteredRef.current) {
            settle();
            wake();
          }
        }
        return;
      }
      const p = toCanvas(e.clientX, e.clientY);
      if (!p) return;
      pointerRef.current = p;
      if (enteredRef.current) {
        glyphs.forEach((g) => targetRef.current.set(g.key, scaleFor(g.cx, g.cy, p)));
        wake();
      }
    };
    const onLeave = () => {
      pointerRef.current = null;
      if (enteredRef.current) {
        settle();
        wake();
      }
    };
    const invalidate = () => {
      rectRef.current = null;
    };
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (fine) {
      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("resize", invalidate);
    window.addEventListener("scroll", invalidate, true);
    return () => {
      if (fine) {
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseleave", onLeave);
      }
      window.removeEventListener("resize", invalidate);
      window.removeEventListener("scroll", invalidate, true);
    };
  }, [glyphs, toCanvas, scaleFor, width, height]);

  // Fill: an elliptical gradient centered on the copy, like Lovable's. The
  // inner ellipse is the page color, so the field dissolves in a curve
  // around the headline and subtext instead of stopping at a vertical line.
  // `clear` is the horizontal half-width of that quiet zone as a fraction of
  // half the canvas; the ellipse is taller than the band so chevrons creep
  // closer to the center at the top and bottom than they do beside the copy.
  const clear = clearFraction(width);
  const band = 1 - clear;
  const stops = [
    [clear, COLORS.paper],
    [clear + band * 0.25, COLORS.yellow],
    [clear + band * 0.5, COLORS.amber],
    [clear + band * 0.75, COLORS.orange],
    [1, COLORS.red],
  ] as const;
  const gradientTransform = `translate(${width / 2} ${height / 2}) scale(${width / 2} ${height * 1.25})`;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: "visible", display: "block" }}
      aria-hidden="true"
    >
      <path ref={pathRef} fill={`url(#${gradientId})`} />
      <defs>
        <radialGradient
          id={gradientId}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform={gradientTransform}
        >
          {stops.map(([offset, color], i) => (
            <stop key={i} offset={offset} stopColor={color} />
          ))}
        </radialGradient>
      </defs>
    </svg>
  );
}
