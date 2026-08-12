# wearezinc.com — Next.js site

Rebuild of wearezinc.com (migrating from Webflow "ZINC Growth Design" to Vercel, Aug 2026). Follows the Predictant migration playbook (`Zincsolutions/predictant`).

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Migration strategy

- **Source of truth: the live published site as of the Aug 12, 2026 capture** (Webflow publish of Jul 17). Unpublished Webflow Designer edits are deliberately excluded (user decision).
- **Phase A**: pixel-identical port of live pages, verified by screenshot diffing. **Phase B**: refactor internals after cutover, no visual changes.
- `migration/webflow/` holds the snapshot: `pages/*.html` (rendered live pages incl. 404), `assets/` (all CDN assets), `cms/*.json` (CMS collections + items), `manifest.json`. Read-only reference — never import from it at runtime.

## Page inventory (user decisions, Aug 12 2026)

- **Drop** (do NOT port): `/blog-cats`, `/lander-1`, `/lander-2`, `/partners-3` (duplicate), `/style-guide-*`. Dropped URLs 301 to sensible targets (`/partners-3` → `/partners/partners-2`).
- **Move**: `/thomabravo` → `/work/thomabravo` with a 301 from the old path.
- **Everything else in the sitemap ports 1:1** with identical URLs (SEO/URL parity is a hard requirement).
- Resources section: 5 CMS items exist but were never reachable on the old site (listing page was draft). Goes live properly in this build under `/resources` — confirm final scope with user before cutover.

## Architecture

- App Router + TypeScript + Tailwind CSS v4, `src/` layout, `@/*` alias. Next 16 / React 19.
- **Content**: Supabase from day one (user decision) — blog posts, categories, resources in tables; blog routes use ISR. Import source: `migration/webflow/cms/*.json` (22 posts: 16 published + 6 drafts; keep drafts unpublished).
- **Forms**: API route → (1) insert into Supabase `form_submissions`, (2) upsert HubSpot contact (Sales Pro account; env `HUBSPOT_PRIVATE_APP_TOKEN`). No Resend — HubSpot handles lead notifications. Honeypot + rate limiting required.
- **Analytics**: GA4 `G-H4WRSH6E2G` via `next/script`. FullStory/Hotjar: ask user before porting (audit flagged duplicate trackers + consent gating).
- Deploys: GitHub `Zincsolutions/wearezinc` → Vercel.

## Quality bar — fix during port (from the Aug 2026 Webflow audit, IDs Z-01..Z-18)

The old site had bugs that must NOT be ported:

- **Z-01**: text-reveal animation could leave headlines permanently invisible (CDN-loaded GSAP + ScrollTrigger + resize re-init). Rebuild animations with IntersectionObserver + a force-reveal failsafe; content must be visible without JS. Same visual result.
- **Z-02**: a script stripped `srcset`/`sizes` from all images. Use `next/image` properly instead.
- **Z-03/Z-04**: add `og:image` everywhere; Organization + Article + Service JSON-LD (ZINC sells AEO — its own site must demonstrate it).
- **Z-07**: every image gets real alt text.
- **Z-08**: thin SEO titles/descriptions get rewritten to the "Topic | Qualifier | ZINC" pattern (drafts need user approval before shipping).
- **Z-09**: exactly one `<h1>` per page.
- Old sitemap listed a 404ing draft-post URL — generate sitemap from actual routes.

## Brand notes

- Colors: ZINC orange `#FF5B19`, navy `#0C2954` (extract full palette into Tailwind theme tokens from the captured CSS).
- Fonts: Geist, Geist Mono, Inter (self-host via `next/font`, don't use webfont.js).
- Copy rule: it's "AI", never "Ai" (old site was inconsistent — normalize during port).
