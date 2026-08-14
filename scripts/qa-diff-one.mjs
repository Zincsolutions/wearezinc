#!/usr/bin/env node
// Diff a single path between the live Webflow site and the Vercel rebuild.
// Usage: node scripts/qa-diff-one.mjs /blog
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const p = process.argv[2] ?? '/';
const OLD = 'https://www.wearezinc.com';
const NEW = 'https://wearezinc.vercel.app';

const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
for (const vp of [{ n: 'desktop', w: 1440, h: 900 }, { n: 'mobile', w: 375, h: 812 }]) {
  const shots = {};
  for (const [tag, base] of [['old', OLD], ['new', NEW]]) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
    await page.evaluate(async () => {
      await new Promise((d) => { let y = 0; const s = () => { y += 600; scrollTo(0, y); y < document.body.scrollHeight ? setTimeout(s, 60) : d(); }; s(); });
    });
    await page.waitForTimeout(1200);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(600);
    shots[tag] = await page.screenshot({ fullPage: true });
    await page.close();
  }
  const a = PNG.sync.read(shots.old);
  const b = PNG.sync.read(shots.new);
  const w = Math.min(a.width, b.width);
  const h = Math.min(a.height, b.height);
  const crop = (img) => { const o = new PNG({ width: w, height: h }); PNG.bitblt(img, o, 0, 0, w, h, 0, 0); return o; };
  const d = new PNG({ width: w, height: h });
  const bad = pixelmatch(crop(a).data, crop(b).data, d.data, w, h, { threshold: 0.15 });
  console.log(`${vp.n}: ${((bad / (w * h)) * 100).toFixed(2)}%  Δh=${Math.abs(a.height - b.height)}`);
}
await browser.close();
