# wearezinc.com — Build Description & Handoff

**Project:** ZINC company website (We Are ZINC) — migrated from Webflow to Next.js/Vercel/Supabase
**Repo:** `Zincsolutions/wearezinc` (GitHub) · **Deploy:** Vercel project `wearezinc` → https://wearezinc.vercel.app
**Written:** August 13, 2026 · Audience: any Claude Code session or developer picking up this codebase

---

## 1. What this is

wearezinc.com ran on Webflow (site "ZINC Growth Design", ID `695bda13c7c5d5a8fcdb4451`).
In August 2026 it was rebuilt on the ZINC standard stack — **Next.js 16 (App Router,
TypeScript, Tailwind v4, `src/` layout) on Vercel, with Supabase for content and form
storage** — following the same "stealth migration" playbook as `Zincsolutions/predictant`:

- **Phase A (done):** pixel-identical port of the live Webflow site, verified by
  automated screenshot diffing. The rebuild is visually indistinguishable from the
  original except where bugs were deliberately fixed.
- **Phase B (future):** refactor internals into proper components without visual change.

**As of this writing, DNS cutover has NOT happened.** wearezinc.com still points at
Webflow; the rebuild lives at wearezinc.vercel.app. The Webflow subscription stays
active until after cutover.

## 2. Architecture

```
migration/webflow/        Read-only snapshot of the live Webflow site (Aug 12, 2026):
  pages/*.html            all 50 rendered pages incl. 404
  assets/                 553 CDN assets
  cms/*.json              CMS collections export (posts, categories, resources…)
  manifest.json           capture manifest
public/_wf/               PROCESSED static pages served via next.config.ts rewrites
public/wf/                all self-hosted assets (nothing references Webflow's CDN)
public/vendor/            pinned gsap 3.13.0 + split-type 0.3.4 (self-hosted)
public/js/zinc-forms.js   form interceptor (posts to /api/forms)
src/templates/            processed blog templates (post.html, blog.html)
src/lib/content.ts        Supabase queries (anon key; RLS hides drafts)
src/lib/render.ts         cheerio templating: Supabase content → Webflow markup
src/app/blog/route.ts     listing: 12/page, param `?190f5589_page=N` (Webflow's original)
src/app/post/[slug]/      post pages (ISR 300s) with OG tags + Article JSON-LD
src/app/api/forms/        form endpoint: Supabase insert + HubSpot upsert + Note
src/app/sitemap.ts        sitemap from real routes + published posts
scripts/                  capture-webflow.py, port-webflow.mjs, import-cms.mjs,
                          seo-overrides.json, qa-diff.mjs, qa-diff-one.mjs
supabase/migrations/      schema (versioned; applied via `supabase db push`)
```

**The regeneration pipeline:** `scripts/port-webflow.mjs` transforms the snapshot into
`public/_wf/` + `src/templates/`. It applies, in order: asset URL rewriting to `/wf/`,
SRI stripping, removal of the old srcset-stripping script, replacement of the fragile
GSAP reveal with a defensive snippet (`scripts/reveal-snippet.html`), GA4 proxy → real
gtag.js, OG/JSON-LD injection, approved metadata overrides (`scripts/seo-overrides.json`),
and forms-script injection. **Never hand-edit files in `public/_wf/` — edit the port
script and re-run it.**

**Static pages** are complete HTML documents served by rewrites (`next.config.ts` reads
`public/_wf/manifest.json`). They never touch the React tree. **Blog pages** are rendered
at request time by string/DOM templating (cheerio) from Supabase content through the
captured Webflow templates — visually identical, CMS-driven.

## 3. Data (Supabase)

Project ref `juebigeqdzpgtomlaygh` (https://juebigeqdzpgtomlaygh.supabase.co).
Tables (all RLS-enabled): `posts` (22: 16 published, 6 draft), `categories` (5),
`post_categories`, `post_related`, `resources` (5, all draft — see Open Items),
`form_submissions` (service-role only; no anon policies).

Public reads use the **anon key** so RLS guarantees drafts never leak. Content images
were rewritten to self-hosted `/wf/` paths at import (`scripts/import-cms.mjs`,
idempotent, re-runnable). Schema changes go through `supabase/migrations/` +
`supabase db push` (CLI is linked; login via `supabase login`).

## 4. Forms pipeline

`public/js/zinc-forms.js` intercepts every Webflow-styled form (capture-phase listener
beats webflow.js), POSTs JSON to `/api/forms`, and drives the original
`.w-form-done` / `.w-form-fail` UX. The API route: honeypot (`website` field) → rate
limit (10/10min/IP, per-instance) → insert into `form_submissions` → HubSpot contact
create-or-update (portal **2098094**, na2) → form message attached as a **Note** on the
contact. HubSpot failures never fail the user; rows are flagged via `hubspot_synced`.

Verified end-to-end Aug 13, 2026 (test contact `migration-test@wearezinc.com`, HubSpot
id 534809518795 — deletable).

## 5. Environment variables

Values live in Vercel (production/preview/development) and gitignored `.env.local`.
Names only:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public reads (RLS-guarded)
- `SUPABASE_SERVICE_ROLE_KEY` — form inserts (server only)
- `HUBSPOT_PRIVATE_APP_TOKEN` — HubSpot service key (contacts + notes scopes)

## 6. Decisions log (why things are the way they are)

1. **Source of truth = live published site** as of Aug 12, 2026. ~4 weeks of unpublished
   Webflow Designer edits were deliberately excluded (user decision).
2. **Dropped pages** (user decision): `/blog-cats`, `/lander-1`, `/lander-2`,
   `/partners-3` (duplicate). 301s: `/partners-3 → /partners/partners-2`, junk →
   home/blog. **`/thomabravo` keeps its original root URL** (user decision Aug 13:
   highest-traffic page, no redirect risk; `/work/thomabravo → /thomabravo` safety 301).
3. **Post dates show the editorial `publish-date` CMS field.** The old Webflow template
   displayed the last-*republish* timestamp, which reset on every site publish (14 of 16
   posts all showed "July 1, 2026"). Intentional improvement; dates on some posts differ
   from the old site.
4. **Featured-post quirk:** the post "Why Strategy Beats Speed in the AI Era" has slug
   `maximize-your-digital-presence-today` (renamed post, original slug kept for URL
   parity). It's the `featured=true` hero and is excluded from the listing grid.
5. **Blog listing order** replicates Webflow: `sort_order` asc with nulls first
   (nulls sub-sorted newest-first), ties oldest-first. Category pill order is the
   template's original, hardcoded in `content.ts` (`CATEGORY_ORDER`).
6. **Pagination** is server-side, 12/page, using Webflow's original query param
   `?190f5589_page=N` (also accepts `?page=N`) so Finsweet List (loaded from jsdelivr,
   `@finsweet/attributes@2`) can fetch/filter across pages exactly as before.
7. **FullStory (org 97GDT) + Hotjar (250039) both kept** (user decision) — embedded in
   the ported page heads; same IDs, so recordings continue post-cutover. GA4
   `G-H4WRSH6E2G` via standard gtag.js (the old Webflow first-party proxy doesn't exist
   off-platform).
8. **"AI" not "Ai"** in any copy this build touches (old site was inconsistent).
9. **Webflow forms backend abandoned** — forms would silently die when the Webflow
   subscription ends; ours is platform-independent.

## 7. Bugs fixed during the port (from the Aug 2026 site audit)

- **Z-01 (critical):** old text-reveal could leave headlines permanently invisible
  (CDN-loaded GSAP + ScrollTrigger, killed by resize, no fallback — confirmed in
  FullStory recordings). Rebuilt: IntersectionObserver trigger, self-hosted pinned
  libraries, 2.5s force-reveal failsafe, markup restored after animation (resize-proof),
  `prefers-reduced-motion` honored. Same visual animation.
- **Z-02 (critical):** a site-wide script stripped `srcset`/`sizes` from every image.
  Removed; responsive images restored.
- **Z-03/Z-04:** og:image everywhere, Organization + WebSite + Article JSON-LD.
- **Z-08:** 18 pages of user-approved titles/descriptions (`scripts/seo-overrides.json`).
- Old sitemap listed a 404ing draft URL; new sitemap generates from real routes.

## 8. QA results (Aug 13, 2026)

- **60 full-page screenshot comparisons** vs the live site (`scripts/qa-diff.mjs`):
  44 under 5% pixel difference (many ~0%). Residual diffs on animated pages are the
  *old* site failing to render its own headlines in headless Chromium (its Z-01 bug)
  plus the intended date fix.
- Redirect map verified (308s). Forms verified E2E (Supabase row + HubSpot contact + note).
- Lighthouse (home, mobile sim): new **62/96/96/100** vs old **59/96/96/100**;
  LCP 7.5s vs 9.8s. Perf headroom is Phase B (font loading chain, hero image, tracker weight).

## 9. Open items

1. **DNS cutover** — user-gated. Steps: final click-through → add domains in Vercel →
   flip DNS at registrar → monitor → cancel Webflow after a safe window.
2. **Alt text on static pages (Z-07)** — blog/post images have real alts; the 28 ported
   static pages still carry the old site's empty `alt=""`. Needs a content pass
   (edit via the port script, not `public/_wf/` directly).
3. **Resources section** — 5 finished items sit as drafts in Supabase; the section was
   never reachable on the old site (listing page was a Webflow draft). Decide: build
   `/resources` or delete the content.
4. **6 draft blog posts** in Supabase awaiting a publish decision (flip `status` to
   `published`; they appear automatically via ISR).
5. **Deploys:** all production deploys so far ran via `npx vercel deploy --prod --yes`
   (CLI, logged in as `zincsquad`). The GitHub→Vercel connection reports connected but
   auto-deploy-on-push was not reliably observed — verify or keep using the CLI.
   Framework preset is pinned in `vercel.json` (the dashboard had "Other", which
   silently breaks Next.js routing — don't remove it).
6. **Finsweet attributes** load unpinned-major from jsdelivr (`@2`) — consider pinning
   exact version + self-hosting (same treatment gsap/split-type got).
7. **Phase B:** componentize pages, `next/image`, `next/font`, consolidate
   FullStory/Hotjar + consent gating (GDPR exposure flagged in the audit).

## 10. Useful commands

```bash
npm run dev                         # dev server (Turbopack) :3000
npm run build                       # production build
node scripts/port-webflow.mjs      # regenerate public/_wf + templates from snapshot
node scripts/import-cms.mjs        # (re)import CMS snapshot into Supabase — idempotent
node scripts/qa-diff.mjs           # full visual sweep vs live site → qa/
node scripts/qa-diff-one.mjs /blog # diff one path
supabase db push                    # apply new migrations
npx vercel deploy --prod --yes     # production deploy
```

## 11. Related context

- The Webflow site remains the live production site until cutover; its Designer still
  contains the unported unpublished edits if ever needed.
- The original site audit (18 findings, Z-01…Z-18) and this migration were run via
  Claude Code on the Mac mini ("ZINC Brand & Site" project folder), Aug 12–13, 2026.
- Sibling migration reference: `Zincsolutions/predictant` (same playbook).
