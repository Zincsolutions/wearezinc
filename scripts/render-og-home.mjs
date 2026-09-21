// Render the homepage hero (chevron field + headline) as the Open Graph
// share image. Run with the dev server up: node scripts/render-og-home.mjs
// Writes public/og/home.png at 1200 x 630 (2x device pixels).
import { chromium } from "playwright";

const url = process.argv[2] ?? "http://localhost:3000";
const out = "public/og/home.png";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 900 },
  deviceScaleFactor: 2,
  reducedMotion: "no-preference",
});
await page.goto(url, { waitUntil: "networkidle" });
await page.addStyleTag({
  content: `
    .hero-banner { min-height: 630px !important; height: 630px !important; padding: 0 1.5rem !important; }
    .hero-banner__actions { display: none !important; }
    .hero-banner__subtext { margin-top: 1.75rem !important; }
    .hero-chevrons { -webkit-mask-image: none !important; mask-image: none !important; }
  `,
});
// let the enter animation finish and the ResizeObserver settle
await page.mouse.move(0, 0);
await page.waitForTimeout(3500);
// clip to exactly 1200 x 630 CSS px (2400 x 1260 output); the element's
// box can come out a pixel or two tall from sub-pixel padding
const box = await page.locator(".hero-banner").boundingBox();
await page.screenshot({
  path: out,
  clip: { x: box.x, y: box.y, width: 1200, height: 630 },
});
await browser.close();
console.log(`wrote ${out}`);
