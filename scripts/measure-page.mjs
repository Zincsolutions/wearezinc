#!/usr/bin/env node
// Extract the computed-style facts needed to rebuild a page without Webflow CSS.
// Usage: node scripts/measure-page.mjs https://www.wearezinc.com/about/cookie-policy
import { chromium } from 'playwright';

const url = process.argv[2];
const browser = await chromium.launch();
const ctx = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
await page.evaluate(async () => {
  await new Promise((d) => { let y = 0; const s = () => { y += 800; scrollTo(0, y); y < document.body.scrollHeight ? setTimeout(s, 50) : d(); }; s(); });
  scrollTo(0, 0);
});
await page.waitForTimeout(1500);

const data = await page.evaluate(() => {
  const pick = (el, props) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const out = Object.fromEntries(props.map((p) => [p, cs[p]]));
    out._w = Math.round(r.width); out._h = Math.round(r.height);
    return out;
  };
  const T = ['fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','textTransform','marginTop','marginBottom'];
  const q = (sel) => document.querySelector(sel);
  // deepest visible descendant with text (dodges font-size:0 wrappers)
  const vis = (root) => {
    if (!root) return null;
    let best = null;
    for (const el of [root, ...root.querySelectorAll('*')]) {
      const t = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (t && parseFloat(getComputedStyle(el).fontSize) > 0) { best = el; break; }
    }
    return best;
  };
  const rich = q('.text-rich-text');
  return {
    docHeight: document.body.scrollHeight,
    h1: pick(vis(q('h1')) || q('h1'), T),
    heroEyebrow: pick(vis(q('.header46_component p')) , T),
    richH2: pick(vis(rich?.querySelector('h2')), T),
    richH3: pick(vis(rich?.querySelector('h3')), T),
    richP: pick(vis(rich?.querySelector('p')), T),
    richLi: pick(vis(rich?.querySelector('li')), T),
    richA: pick(rich?.querySelector('a'), ['color','textDecorationLine','fontWeight']),
    richBox: pick(rich, ['maxWidth','marginLeft','marginRight','textAlign']),
    heroSection: pick(q('header'), ['paddingTop','paddingBottom','backgroundColor']),
    contentSection: pick(rich?.closest('section'), ['paddingTop','paddingBottom','backgroundColor']),
    padGlobal: pick(q('.padding-global'), ['paddingLeft','paddingRight']),
    containerLarge: pick(q('.container-large'), ['maxWidth']),
    nav: pick(q('.navbar_component') || q('nav'), ['backgroundColor','height','position','borderBottomWidth','borderBottomColor']),
    navLink: pick(vis(q('.navbar_link') || q('nav a')), T),
    navHeight: (q('.navbar_component')||q('nav'))?.getBoundingClientRect().height,
    footerBg: pick(q('footer') || q('.footer_component'), ['backgroundColor','paddingTop','paddingBottom']),
    footHeading: pick(vis((q('footer')||document).querySelector('.footer_link, footer a')), T),
    bodyBg: getComputedStyle(document.body).backgroundColor,
    bodyFont: getComputedStyle(document.body).fontFamily,
  };
});
console.log(JSON.stringify(data, null, 1));
await browser.close();
