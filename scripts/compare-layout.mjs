import { chromium } from 'playwright';
const p = process.argv[2] ?? '/about/cookie-policy';
const W = Number(process.argv[3] ?? 1440), H = Number(process.argv[4] ?? 900);
const bases = { old: 'https://www.wearezinc.com', new: 'http://localhost:3400' };
const browser = await chromium.launch();
const out = {};
for (const [tag, base] of Object.entries(bases)) {
  const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  await page.goto(base + p, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await page.evaluate(async () => {
    await new Promise((d) => { let y = 0; const s = () => { y += 800; scrollTo(0, y); y < document.body.scrollHeight ? setTimeout(s, 50) : d(); }; s(); });
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
  out[tag] = await page.evaluate(() => {
    const r = (el) => {
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { t: Math.round(b.top + scrollY), l: Math.round(b.left), w: Math.round(b.width), h: Math.round(b.height) };
    };
    const q = (s) => document.querySelector(s);
    const qa = (s) => [...document.querySelectorAll(s)];
    const h2s = qa('h2').map((el) => ({ text: el.textContent.trim().slice(0, 22), ...r(el) }));
    const navLinks = qa('nav a, .nav-menu a, .navbar2_menu a').slice(0, 4).map((el) => ({ text: el.textContent.trim().slice(0, 10), l: Math.round(el.getBoundingClientRect().left) }));
    const foot = q('footer') || q('.footer3_component');
    const footLinks = (foot ? [...foot.querySelectorAll('a')] : []).slice(1, 4).map((el) => ({ text: el.textContent.trim().slice(0, 14), ...r(el) }));
    return {
      nav: r(q('.navbar2_component') || q('.nav')),
      h1: r(q('h1')),
      firstP: r(q('h1 + p, .text-md') || qa('p')[0]),
      h2s,
      firstUl: r(q('main ul') || q('ul')),
      footTop: r(foot),
      footLinks,
      docH: document.body.scrollHeight,
    };
  });
  await ctx.close();
}
await browser.close();
// print aligned comparison
const flat = (o, prefix = '') => {
  const rows = [];
  const add = (k, v) => rows.push([prefix + k, v]);
  if (!o) return rows;
  for (const [k, v] of Object.entries(o)) {
    if (Array.isArray(v)) v.forEach((item, i) => rows.push(...flat(item, `${k}[${i}]${item.text ? ':' + item.text : ''}.`)));
    else if (v && typeof v === 'object') rows.push(...flat(v, k + '.'));
    else add(k, v);
  }
  return rows;
};
const a = Object.fromEntries(flat(out.old));
const b = Object.fromEntries(flat(out.new));
const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
for (const k of keys) {
  const va = a[k], vb = b[k];
  const mark = typeof va === 'number' && typeof vb === 'number' && Math.abs(va - vb) > 2 ? '  <<<' : '';
  console.log(`${k.padEnd(44)} old=${String(va).padEnd(8)} new=${String(vb).padEnd(8)}${mark}`);
}
