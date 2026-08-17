#!/usr/bin/env node
// Diff a path between production and the local rebuild.
// Usage: node scripts/qa-diff-local.mjs /about/cookie-policy [localBase]
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'node:fs';

const p = process.argv[2] ?? '/';
const OLD = 'https://www.wearezinc.com';
const NEW = process.argv[3] ?? 'http://localhost:3400';

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
  const slug = p.replaceAll('/', '_') || '_home';
  fs.writeFileSync(`qa/local${slug}--${vp.n}--old.png`, PNG.sync.write(crop(a)));
  fs.writeFileSync(`qa/local${slug}--${vp.n}--new.png`, PNG.sync.write(crop(b)));
  fs.writeFileSync(`qa/local${slug}--${vp.n}--diff.png`, PNG.sync.write(d));
  console.log(`${vp.n}: diff ${((bad / (w * h)) * 100).toFixed(2)}%  heightΔ=${Math.abs(a.height - b.height)}px (old ${a.height} vs new ${b.height})`);
}
await browser.close();
