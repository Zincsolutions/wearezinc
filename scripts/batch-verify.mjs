import { chromium } from 'playwright';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
const pages = process.argv.slice(2);
const OLD = 'https://www.wearezinc.com';
const NEW = 'http://localhost:3400';
const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce' });
const results = [];
for (const p of pages) {
  const row = { page: p, widths: [] };
  for (const w of [1440, 768, 375]) {
    const shots = {};
    for (const [tag, base] of [['old', OLD], ['new', NEW]]) {
      const page = await ctx.newPage();
      await page.setViewportSize({ width: w, height: 900 });
      await page.goto(base + p, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForLoadState('networkidle', { timeout: 25000 }).catch(() => {});
      await page.addStyleTag({ content: '.image-list-top,.image-list-bottom{transform:none !important}.logo3_component{animation:none !important;transform:none !important}' }).catch(() => {});
      await page.evaluate(async () => {
        await new Promise((d) => { let y = 0; const s = () => { y += 700; scrollTo(0, y); y < document.body.scrollHeight ? setTimeout(s, 50) : d(); }; s(); });
      });
      await page.waitForTimeout(1300);
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(600);
      shots[tag] = await page.screenshot({ fullPage: true });
      await page.close();
    }
    const a = PNG.sync.read(shots.old), b = PNG.sync.read(shots.new);
    const W = Math.min(a.width, b.width), H = Math.min(a.height, b.height);
    const crop = (img) => { const o = new PNG({ width: W, height: H }); PNG.bitblt(img, o, 0, 0, W, H, 0, 0); return o; };
    const d = new PNG({ width: W, height: H });
    const bad = pixelmatch(crop(a).data, crop(b).data, d.data, W, H, { threshold: 0.15 });
    row.widths.push({ w, pct: +((bad / (W * H)) * 100).toFixed(2), dh: Math.abs(a.height - b.height) });
  }
  const worst = Math.max(...row.widths.map((x) => x.pct));
  const worstDh = Math.max(...row.widths.map((x) => x.dh));
  console.log(`${p.padEnd(42)} ${row.widths.map((x) => `${x.w}:${x.pct}%/Δ${x.dh}`).join('  ')}  ${worst < 1 && worstDh < 30 ? 'OK' : '<<< REVIEW'}`);
  results.push(row);
}
await browser.close();
