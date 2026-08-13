#!/usr/bin/env node
/**
 * Visual parity QA: screenshot every shared page on the live Webflow site and
 * the Vercel rebuild, then pixel-diff them. Writes screenshots + diffs to
 * qa/ (gitignored) and prints a per-page diff percentage.
 *
 * Expected noise: animation timing (text reveals), session-recording overlays.
 * Pages are settled by scrolling to bottom (triggers lazy loads + reveals),
 * waiting, then returning to top before capture.
 */
import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'qa');
const OLD = 'https://www.wearezinc.com';
const NEW = 'https://wearezinc.vercel.app';

const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'public/_wf/manifest.json'), 'utf8')
);
// pages that exist on both sites at the same path (thomabravo moved; skip)
const PATHS = manifest.pages
  .map((p) => (p === 'index' ? '/' : `/${p}`))
  .filter((p) => p !== '/work/thomabravo');
PATHS.push('/blog', '/post/aeo-in-practice-discoverart-case-study', '/post/seo-techniques');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

const slug = (p) => (p === '/' ? 'home' : p.replace(/^\//, '').replace(/\//g, '__'));

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  // scroll through the page to fire lazy loads and reveal animations
  await page.evaluate(async () => {
    await new Promise((done) => {
      let y = 0;
      const step = () => {
        y += 600;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 60);
        else done();
      };
      step();
    });
  });
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

async function capture(context, base, p, vp, tag) {
  const page = await context.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await settle(page);
  const file = path.join(OUT, `${slug(p)}--${vp.name}--${tag}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await page.close();
  return file;
}

function diff(aFile, bFile, outFile) {
  const a = PNG.sync.read(fs.readFileSync(aFile));
  const b = PNG.sync.read(fs.readFileSync(bFile));
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const crop = (img) => {
    const out = new PNG({ width, height });
    PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
    return out;
  };
  const ca = crop(a);
  const cb = crop(b);
  const d = new PNG({ width, height });
  const bad = pixelmatch(ca.data, cb.data, d.data, width, height, { threshold: 0.15 });
  fs.writeFileSync(outFile, PNG.sync.write(d));
  return {
    pct: ((bad / (width * height)) * 100).toFixed(2),
    heightDelta: Math.abs(a.height - b.height),
  };
}

fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce' });

const results = [];
for (const p of PATHS) {
  for (const vp of VIEWPORTS) {
    try {
      const oldFile = await capture(context, OLD, p, vp, 'old');
      const newFile = await capture(context, NEW, p, vp, 'new');
      const r = diff(oldFile, newFile, path.join(OUT, `${slug(p)}--${vp.name}--diff.png`));
      results.push({ page: p, vp: vp.name, ...r });
      console.log(`${r.pct.padStart(6)}%  Δh=${String(r.heightDelta).padStart(4)}  ${vp.name.padEnd(7)}  ${p}`);
    } catch (e) {
      results.push({ page: p, vp: vp.name, error: e.message.slice(0, 80) });
      console.log(`ERROR   ${vp.name.padEnd(7)}  ${p}: ${e.message.slice(0, 80)}`);
    }
  }
}

await browser.close();
fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));

const flagged = results.filter((r) => r.error || Number(r.pct) > 5 || r.heightDelta > 50);
console.log(`\n${results.length} comparisons, ${flagged.length} flagged (>5% or Δh>50 or error)`);
