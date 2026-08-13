#!/usr/bin/env node
/**
 * Phase A port: process the captured Webflow pages into self-hosted static
 * pages served from public/_wf/ via next.config.ts rewrites.
 *
 * Transforms (per CLAUDE.md quality bar):
 *  - asset URLs (cdn.prod.website-files.com etc.) -> /wf/<basename>
 *  - SRI integrity/crossorigin removed from tags now pointing at /wf/
 *  - Z-02: the srcset-stripping script is removed entirely
 *  - Z-01: the fragile GSAP/ScrollTrigger reveal is replaced with a defensive
 *    IntersectionObserver version loading self-hosted /vendor/ libraries
 *  - GA4: Webflow's first-party proxy script is swapped for standard gtag.js
 *
 * Dropped pages (user decision): blog-cats, lander-1, lander-2, partners-3,
 * blog + post/* (rebuilt as Supabase-driven routes), thomabravo (moves to
 * /work/thomabravo; redirect added in next.config.ts).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const PAGES = path.join(ROOT, 'migration', 'webflow', 'pages');
const SNAP_ASSETS = path.join(ROOT, 'migration', 'webflow', 'assets');
const PUB_ASSETS = path.join(ROOT, 'public', 'wf');
const PUB_PAGES = path.join(ROOT, 'public', '_wf');

const DROP = new Set(['blog-cats.html', 'lander-1.html', 'lander-2.html', 'partners-3.html', 'blog.html']);
const MOVE = { 'thomabravo.html': 'work/thomabravo.html' };

const CDN_RE =
  /https:\/\/(?:cdn\.prod\.website-files\.com|uploads-ssl\.webflow\.com|assets(?:-global)?\.website-files\.com)\/[^"\s)',]+/g;

const localName = (url) => decodeURIComponent(url.split('?')[0].split('/').pop());
const rewriteAssets = (html) => html.replace(CDN_RE, (u) => '/wf/' + encodeURIComponent(localName(u)));

function stripSri(html) {
  return html.replace(/<(?:link|script)\b[^>]*>/g, (tag) =>
    tag.includes('/wf/') ? tag.replace(/\s+integrity="[^"]*"/, '').replace(/\s+crossorigin(="[^"]*")?/, '') : tag
  );
}

// Remove a whole <script>...</script> element whose body contains `marker`.
function dropScriptContaining(html, marker) {
  const re = /<script\b[^>]*>[\s\S]*?<\/script>/g;
  return html.replace(re, (block) => (block.includes(marker) ? '' : block));
}

const DEFENSIVE_REVEAL = fs.readFileSync(path.join(ROOT, 'scripts', 'reveal-snippet.html'), 'utf8');

function replaceRevealScript(html) {
  const re = /<script\b[^>]*>[\s\S]*?<\/script>/g;
  let replaced = false;
  html = html.replace(re, (block) => {
    if (block.includes("data-gsap-lines") && block.includes('unpkg.com/split-type')) {
      replaced = true;
      return DEFENSIVE_REVEAL;
    }
    return block;
  });
  return { html, replaced };
}

const SITE = 'https://www.wearezinc.com';
const OG_IMAGE = `${SITE}/wf/695bda13c7c5d5a8fcdb44f2_home_header1.webp`;
const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZINC',
  url: SITE,
  logo: `${SITE}/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png`,
  description:
    'ZINC is an AI-driven digital strategy and design agency: AI enablement, answer engine optimization (AEO), web design and development, ecommerce, branding, and marketing systems.',
};
const SITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ZINC',
  url: SITE,
};

const OVERRIDES = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'scripts', 'seo-overrides.json'), 'utf8')
);
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

// Z-08: user-approved title/description rewrites (upserts each tag).
function applyOverrides(html, key) {
  const o = OVERRIDES[key];
  if (!o) return html;
  const upsertMeta = (h, attr, name, content) => {
    const re = new RegExp(`<meta content="[^"]*" ${attr}="${name}"\\s*/>`);
    const tag = `<meta content="${escAttr(content)}" ${attr}="${name}"/>`;
    return re.test(h) ? h.replace(re, tag) : h.replace('</title>', `</title>${tag}`);
  };
  if (o.title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escAttr(o.title)}</title>`);
    html = upsertMeta(html, 'property', 'og:title', o.title);
    html = upsertMeta(html, 'name', 'twitter:title', o.title);
  }
  if (o.description) {
    html = upsertMeta(html, 'name', 'description', o.description);
    html = upsertMeta(html, 'property', 'og:description', o.description);
    html = upsertMeta(html, 'name', 'twitter:description', o.description);
  }
  return html;
}

// Z-03/Z-04 for static pages: default og:image/og:url + Organization JSON-LD.
function injectSeo(html, isHome) {
  const canon = html.match(/<link href="([^"]+)" rel="canonical"\/>/)?.[1];
  // drop Webflow's empty JSON-LD block
  html = html.replace(/<script type="application\/ld\+json">\s*<\/script>/, '');
  const inject = [];
  if (!html.includes('property="og:image"'))
    inject.push(`<meta property="og:image" content="${OG_IMAGE}"/>`);
  if (!html.includes('name="twitter:image"'))
    inject.push(`<meta name="twitter:image" content="${OG_IMAGE}"/>`);
  if (canon && !html.includes('property="og:url"'))
    inject.push(`<meta property="og:url" content="${canon}"/>`);
  inject.push(`<script type="application/ld+json">${JSON.stringify(ORG_LD)}</script>`);
  if (isHome) inject.push(`<script type="application/ld+json">${JSON.stringify(SITE_LD)}</script>`);
  return html.replace('</head>', inject.join('') + '</head>');
}

// Forms post to our API (Supabase + HubSpot) instead of Webflow's backend.
function injectFormsScript(html) {
  return html.includes('/js/zinc-forms.js')
    ? html
    : html.replace('</body>', '<script src="/js/zinc-forms.js" defer></script></body>');
}

function fixGa4(html) {
  // swap Webflow's first-party GA proxy for standard gtag.js
  return html.replace(
    /<script async(?:="")? src="\/nvhc9u4gxsag[^"]*"><\/script>/,
    '<script async src="https://www.googletagmanager.com/gtag/js?id=G-H4WRSH6E2G"></script>'
  );
}

// --- copy all snapshot assets into public/wf/ ---
fs.mkdirSync(PUB_ASSETS, { recursive: true });
let copied = 0;
for (const f of fs.readdirSync(SNAP_ASSETS)) {
  const dest = path.join(PUB_ASSETS, f);
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(path.join(SNAP_ASSETS, f), dest);
    copied++;
  }
}
console.log(`assets: +${copied} copied into public/wf (${fs.readdirSync(PUB_ASSETS).length} total)`);

// --- process pages ---
fs.rmSync(PUB_PAGES, { recursive: true, force: true });
fs.mkdirSync(PUB_PAGES, { recursive: true });

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
  );

let ported = 0;
const portedPaths = [];
for (const file of walk(PAGES)) {
  const rel = path.relative(PAGES, file);
  if (DROP.has(rel)) continue;
  if (rel.startsWith('post/')) continue; // Supabase-driven route
  const outRel = MOVE[rel] ?? rel;

  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<link href="https:\/\/cdn\.prod\.website-files\.com" rel="preconnect"[^>]*\/>/, '');
  html = rewriteAssets(html);
  html = stripSri(html);
  html = dropScriptContaining(html, 'removeAttribute("srcset")'); // Z-02
  const r = replaceRevealScript(html); // Z-01
  html = fixGa4(r.html);
  if (rel !== '404.html') html = injectSeo(html, rel === 'index.html'); // Z-03/Z-04
  html = applyOverrides(html, outRel.replace(/\.html$/, '')); // Z-08
  html = injectFormsScript(html);

  const dest = path.join(PUB_PAGES, outRel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  ported++;
  if (rel !== '404.html') portedPaths.push(outRel.replace(/\.html$/, ''));
  if (!r.replaced && rel !== '404.html') console.warn(`  note: no reveal script found in ${rel}`);
}

fs.writeFileSync(
  path.join(PUB_PAGES, 'manifest.json'),
  JSON.stringify({ pages: portedPaths.sort() }, null, 2)
);
console.log(`pages: ${ported} ported (${portedPaths.length} routable + 404)`);

// --- templates for the Supabase-driven blog routes ---
const TPL = path.join(ROOT, 'src', 'templates');
fs.mkdirSync(TPL, { recursive: true });
for (const [src, out] of [
  ['post/aeo-in-practice-discoverart-case-study.html', 'post.html'],
  ['blog.html', 'blog.html'],
]) {
  let html = fs.readFileSync(path.join(PAGES, src), 'utf8');
  html = html.replace(/<link href="https:\/\/cdn\.prod\.website-files\.com" rel="preconnect"[^>]*\/>/, '');
  html = rewriteAssets(html);
  html = stripSri(html);
  html = dropScriptContaining(html, 'removeAttribute("srcset")');
  html = replaceRevealScript(html).html;
  html = fixGa4(html);
  if (out === 'blog.html') html = applyOverrides(injectSeo(html, false), 'blog');
  html = injectFormsScript(html);
  fs.writeFileSync(path.join(TPL, out), html);
}
console.log('templates: post.html, blog.html written to src/templates/');
