#!/usr/bin/env node
/**
 * Import the Webflow CMS snapshot (migration/webflow/cms/) into Supabase.
 *
 * - Rewrites Webflow CDN image URLs to /wf/<basename> (self-hosted) in every
 *   field, including inside rich-text HTML.
 * - Copies each referenced asset from migration/webflow/assets/ into public/wf/
 *   (downloads from the CDN if the snapshot is missing one).
 * - Upserts categories, posts (+category/related joins), and resources.
 *   Webflow drafts stay status='draft'.
 *
 * Idempotent: safe to re-run (upserts keyed on webflow_id).
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const CMS = path.join(ROOT, 'migration', 'webflow', 'cms');
const SNAP_ASSETS = path.join(ROOT, 'migration', 'webflow', 'assets');
const PUB = path.join(ROOT, 'public', 'wf');

// minimal .env.local loader (no dotenv dependency)
for (const line of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const CDN_RE =
  /https:\/\/(?:cdn\.prod\.website-files\.com|uploads-ssl\.webflow\.com|assets(?:-global)?\.website-files\.com)\/[^"\s)',]+/g;

fs.mkdirSync(PUB, { recursive: true });
const missingAssets = new Set();

function localizeUrl(url) {
  const base = decodeURIComponent(url.split('?')[0].split('/').pop());
  const src = path.join(SNAP_ASSETS, base);
  const dest = path.join(PUB, base);
  if (!fs.existsSync(dest)) {
    if (fs.existsSync(src)) fs.copyFileSync(src, dest);
    else missingAssets.add(url);
  }
  return '/wf/' + encodeURIComponent(base);
}

const localize = (v) => (typeof v === 'string' ? v.replace(CDN_RE, localizeUrl) : v);

async function downloadMissing() {
  for (const url of missingAssets) {
    const base = decodeURIComponent(url.split('?')[0].split('/').pop());
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fs.writeFileSync(path.join(PUB, base), Buffer.from(await res.arrayBuffer()));
      console.log(`  downloaded missing asset: ${base}`);
    } catch (e) {
      console.warn(`  MISSING asset (kept /wf/ path, needs manual fix): ${base}: ${e.message}`);
    }
  }
}

const read = (f) => JSON.parse(fs.readFileSync(path.join(CMS, f), 'utf8')).items;

async function upsert(table, rows, conflict = 'webflow_id') {
  if (!rows.length) return new Map();
  const { data, error } = await db.from(table).upsert(rows, { onConflict: conflict }).select();
  if (error) throw new Error(`${table}: ${error.message}`);
  return new Map(data.map((r) => [r.webflow_id ?? `${r.post_id}:${r.category_id ?? r.related_post_id}`, r.id]));
}

// --- categories ---
const catItems = read('categories.json');
const catIds = await upsert(
  'categories',
  catItems.map((c) => ({ webflow_id: c.id, name: c.fieldData.name, slug: c.fieldData.slug }))
);
console.log(`categories: ${catIds.size}`);

// --- posts ---
const postItems = read('blog-posts.json');
const postIds = await upsert(
  'posts',
  postItems.map((p) => {
    const f = p.fieldData;
    return {
      webflow_id: p.id,
      name: f.name,
      slug: f.slug,
      post_body: localize(f['post-body'] ?? null),
      post_summary: f['post-summary'] ?? null,
      seo_title: f['seo-page-title'] ?? null,
      meta_description: f['meta-description'] ?? null,
      main_image: f['main-image']?.url ? localize(f['main-image'].url) : null,
      thumbnail_image: f['thumbnail-image']?.url ? localize(f['thumbnail-image'].url) : null,
      publish_date: f['publish-date'] ?? null,
      featured: !!f.featured,
      sort_order: f['sort-order'] ?? null,
      status: p.isDraft ? 'draft' : 'published',
    };
  })
);
console.log(`posts: ${postIds.size}`);

// --- joins ---
const pc = [];
const pr = [];
for (const p of postItems) {
  for (const c of p.fieldData.categories ?? [])
    if (postIds.get(p.id) && catIds.get(c)) pc.push({ post_id: postIds.get(p.id), category_id: catIds.get(c) });
  for (const r of p.fieldData['related-blog-posts'] ?? [])
    if (postIds.get(p.id) && postIds.get(r)) pr.push({ post_id: postIds.get(p.id), related_post_id: postIds.get(r) });
}
if (pc.length) await upsert('post_categories', pc, 'post_id,category_id');
if (pr.length) await upsert('post_related', pr, 'post_id,related_post_id');
console.log(`post_categories: ${pc.length}, post_related: ${pr.length}`);

// --- resources (never publicly reachable on the old site -> keep as drafts) ---
const resItems = read('resources.json');
const resIds = await upsert(
  'resources',
  resItems.map((r) => ({
    webflow_id: r.id,
    name: r.fieldData.name,
    slug: r.fieldData.slug,
    status: 'draft',
    data: JSON.parse(JSON.stringify(r.fieldData, (k, v) => (typeof v === 'string' ? localize(v) : v))),
  }))
);
console.log(`resources: ${resIds.size} (all kept as drafts pending user decision)`);

await downloadMissing();
console.log('import complete');
