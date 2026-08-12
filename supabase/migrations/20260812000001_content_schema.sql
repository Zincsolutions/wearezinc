-- ZINC content schema: blog, categories, resources, form submissions.
-- Imported from the Webflow CMS snapshot (migration/webflow/cms/).

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  webflow_id text unique,
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  webflow_id text unique,
  name text not null,
  slug text unique not null,
  post_body text,
  post_summary text,
  seo_title text,
  meta_description text,
  main_image text,
  thumbnail_image text,
  publish_date timestamptz,
  featured boolean not null default false,
  sort_order integer,
  status text not null default 'draft' check (status in ('published', 'draft')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_status_publish_date_idx on public.posts (status, publish_date desc);

create table public.post_categories (
  post_id uuid not null references public.posts (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (post_id, category_id)
);

create table public.post_related (
  post_id uuid not null references public.posts (id) on delete cascade,
  related_post_id uuid not null references public.posts (id) on delete cascade,
  primary key (post_id, related_post_id)
);

-- Resources keep their full Webflow field payload in `data` until the section's
-- final design is settled (it was never publicly reachable on the old site).
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  webflow_id text unique,
  name text not null,
  slug text unique not null,
  status text not null default 'draft' check (status in ('published', 'draft')),
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_name text not null,
  name text,
  email text,
  phone text,
  company text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  hubspot_synced boolean not null default false,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger posts_updated_at before update on public.posts
  for each row execute function public.set_updated_at();

-- RLS: public content is readable by anyone; drafts and submissions are
-- service-role only (service role bypasses RLS).
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.post_categories enable row level security;
alter table public.post_related enable row level security;
alter table public.resources enable row level security;
alter table public.form_submissions enable row level security;

create policy "public read" on public.categories for select using (true);
create policy "public read published" on public.posts for select using (status = 'published');
create policy "public read" on public.post_categories for select using (true);
create policy "public read" on public.post_related for select using (true);
create policy "public read published" on public.resources for select using (status = 'published');
-- form_submissions: no policies — writes/reads go through the service role only.
