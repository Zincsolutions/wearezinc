# WeAreZinc.com

Production website for [ZINC](https://www.wearezinc.com), built with Next.js and deployed through Vercel. Supabase stores published articles, categories, resources, and form submissions; HubSpot receives lead contacts.

## Safe change workflow

1. Create a branch from `main`. Never develop directly on `main`.
2. Copy `.env.example` to `.env.local` and fill it with approved development values.
3. Run `npm ci`, then `npm run check`.
4. Push the branch and review the Vercel preview, including forms, redirects, metadata, and mobile layout.
5. Merge only after the preview and checks pass. Merging to `main` deploys production.

Production secrets must not be copied into the repository or pasted into issues, commits, logs, or analytics events.

## Local development

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

`npm run check` runs the complete sequence.

## Architecture

- `src/app` contains the Next.js App Router, componentized landing pages, form API, sitemap, and robots rules.
- `src/lib/content.ts` reads published content from Supabase using the public key and row-level security.
- `src/lib/render.ts` renders the migrated blog templates.
- `public/_wf` contains preserved, generated Webflow HTML. These files are served through rewrites in `next.config.ts` and are intentionally excluded from linting.
- `supabase/migrations` is the source of truth for database schema changes.
- `docs/BUILD.md` contains migration background; this README is the operational source of truth.

## Environment variables

See `.env.example`. Public Supabase values may be exposed to the browser; the service-role and HubSpot tokens are server-only and must never use the `NEXT_PUBLIC_` prefix.

## Deployment and domains

- GitHub: `Zincsolutions/wearezinc`
- Production: `www.wearezinc.com`
- Vercel production branch: `main`
- Canonical host: `https://www.wearezinc.com`

Legacy domains should terminate at Vercel so the host-based redirects in `next.config.ts` can preserve the full request path.
