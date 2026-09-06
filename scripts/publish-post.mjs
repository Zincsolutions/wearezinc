#!/usr/bin/env node
/**
 * Publish (or update) a blog post in Supabase from an HTML body + JSON meta.
 *
 *   node scripts/publish-post.mjs path/to/meta.json path/to/body.html [--draft]
 *
 * meta.json fields:
 *   name, slug, seo_title, meta_description, post_summary, main_image,
 *   thumbnail_image (optional, defaults to main_image), publish_date (ISO),
 *   featured (bool), categories (array of category slugs),
 *   related (array of post slugs)
 *
 * Upserts on slug, so re-running with edits updates the post in place.
 * Needs SUPABASE_SERVICE_ROLE_KEY in .env.local (RLS blocks anon writes).
 * The post route revalidates every 300s, so edits appear within ~5 minutes.
 */
import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
for (const line of fs.readFileSync(path.join(ROOT, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}

const [metaPath, bodyPath, ...flags] = process.argv.slice(2);
if (!metaPath || !bodyPath) {
  console.error('usage: node scripts/publish-post.mjs meta.json body.html [--draft]');
  process.exit(1);
}
const draft = flags.includes('--draft');
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const body = fs.readFileSync(bodyPath, 'utf8').trim();

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const row = {
  name: meta.name,
  slug: meta.slug,
  post_body: body,
  post_summary: meta.post_summary ?? null,
  seo_title: meta.seo_title ?? null,
  meta_description: meta.meta_description ?? null,
  main_image: meta.main_image ?? null,
  thumbnail_image: meta.thumbnail_image ?? meta.main_image ?? null,
  publish_date: meta.publish_date ?? new Date().toISOString(),
  featured: !!meta.featured,
  sort_order: meta.sort_order ?? null,
  status: draft ? 'draft' : 'published',
};

const { data: post, error } = await db.from('posts').upsert(row, { onConflict: 'slug' }).select('id,slug,status').single();
if (error) throw new Error(`posts: ${error.message}`);
console.log(`post ${post.status}: /post/${post.slug} (${post.id})`);

// categories (replace)
const { data: cats, error: ce } = await db.from('categories').select('id,slug');
if (ce) throw new Error(`categories: ${ce.message}`);
const catIds = (meta.categories ?? []).map((s) => {
  const c = cats.find((x) => x.slug === s);
  if (!c) throw new Error(`unknown category slug: ${s}`);
  return c.id;
});
await db.from('post_categories').delete().eq('post_id', post.id);
if (catIds.length) {
  const { error: e } = await db.from('post_categories').insert(catIds.map((category_id) => ({ post_id: post.id, category_id })));
  if (e) throw new Error(`post_categories: ${e.message}`);
}
console.log(`categories: ${meta.categories?.join(', ') || '(none)'}`);

// related posts (replace)
const relSlugs = meta.related ?? [];
await db.from('post_related').delete().eq('post_id', post.id);
if (relSlugs.length) {
  const { data: rel, error: re } = await db.from('posts').select('id,slug').in('slug', relSlugs);
  if (re) throw new Error(`related lookup: ${re.message}`);
  const missing = relSlugs.filter((s) => !rel.find((r) => r.slug === s));
  if (missing.length) console.warn(`related slugs not found: ${missing.join(', ')}`);
  if (rel.length) {
    const { error: e } = await db.from('post_related').insert(rel.map((r) => ({ post_id: post.id, related_post_id: r.id })));
    if (e) throw new Error(`post_related: ${e.message}`);
  }
  console.log(`related: ${rel.map((r) => r.slug).join(', ')}`);
}
console.log(`live at https://www.wearezinc.com/post/${post.slug} (allow up to 5 min for ISR)`);
