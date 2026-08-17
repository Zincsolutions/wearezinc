import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import fs from 'node:fs';
const p = process.argv[2];
const OLD = 'https://www.wearezinc.com';
const NEW = 'http://localhost:3400';
const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
for (const w of [1440, 1237, 1024, 768, 375]) {
  const shots = {};
  for (const [tag, base] of [['old', OLD], ['new', NEW]]) {
    const page = await ctx.newPage();
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 45000 });
    // freeze scroll-linked strip parallax on BOTH sides so the diff measures
    // layout, not animation phase (verified separately)
    await page.addStyleTag({ content: '.image-list-top,.image-list-bottom{transform:none !important}' });
    await page.waitForLoadState('networkidle', { timeout: 25000 }).catch(() => {});
    await page.evaluate(async () => {
      await new Promise((d) => { let y = 0; const s = () => { y += 600; scrollTo(0, y); y < document.body.scrollHeight ? setTimeout(s, 60) : d(); }; s(); });
    });
    await page.waitForTimeout(1500);
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(700);
    shots[tag] = await page.screenshot({ fullPage: true });
    await page.close();
  }
  const a = PNG.sync.read(shots.old);
  const b = PNG.sync.read(shots.new);
  const W = Math.min(a.width, b.width), H = Math.min(a.height, b.height);
  const crop = (img) => { const o = new PNG({ width: W, height: H }); PNG.bitblt(img, o, 0, 0, W, H, 0, 0); return o; };
  const d = new PNG({ width: W, height: H });
  const bad = pixelmatch(crop(a).data, crop(b).data, d.data, W, H, { threshold: 0.15 });
  const slug = p.replaceAll('/', '_');
  fs.writeFileSync(`qa/multi${slug}--${w}--diff.png`, PNG.sync.write(d));
  fs.writeFileSync(`qa/multi${slug}--${w}--old.png`, PNG.sync.write(crop(a)));
  fs.writeFileSync(`qa/multi${slug}--${w}--new.png`, PNG.sync.write(crop(b)));
  console.log(`${w}px: diff ${((bad / (W * H)) * 100).toFixed(2)}%  heightΔ=${Math.abs(a.height - b.height)}px (old ${a.height} new ${b.height})`);
}
await browser.close();
