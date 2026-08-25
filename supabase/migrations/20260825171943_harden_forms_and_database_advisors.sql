-- Resolve current Supabase database-advisor findings and make public form
-- throttling durable across Vercel function instances.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = pg_catalog.now();
  return new;
end
$$;

create index if not exists post_categories_category_id_idx
  on public.post_categories (category_id);

create index if not exists post_related_related_post_id_idx
  on public.post_related (related_post_id);

create table public.form_rate_limits (
  key_hash text primary key check (pg_catalog.char_length(key_hash) = 64),
  window_started_at timestamptz not null default pg_catalog.now(),
  request_count integer not null default 1 check (request_count > 0)
);

create index form_rate_limits_window_started_at_idx
  on public.form_rate_limits (window_started_at);

alter table public.form_rate_limits enable row level security;
revoke all on table public.form_rate_limits from anon, authenticated;

create or replace function public.check_form_rate_limit(
  p_key_hash text,
  p_limit integer default 10,
  p_window_seconds integer default 600
)
returns boolean
language plpgsql
set search_path = ''
as $$
declare
  v_count integer;
  v_window_start timestamptz := pg_catalog.now()
    - (p_window_seconds * interval '1 second');
begin
  if pg_catalog.char_length(p_key_hash) <> 64
    or p_limit < 1 or p_limit > 100
    or p_window_seconds < 60 or p_window_seconds > 86400 then
    raise exception 'Invalid rate-limit arguments';
  end if;

  insert into public.form_rate_limits as limits (
    key_hash,
    window_started_at,
    request_count
  ) values (
    p_key_hash,
    pg_catalog.now(),
    1
  )
  on conflict (key_hash) do update set
    window_started_at = case
      when limits.window_started_at <= v_window_start then pg_catalog.now()
      else limits.window_started_at
    end,
    request_count = case
      when limits.window_started_at <= v_window_start then 1
      else limits.request_count + 1
    end
  returning request_count into v_count;

  -- Keep the internal abuse-prevention table bounded without storing raw IPs.
  delete from public.form_rate_limits
    where window_started_at < pg_catalog.now() - interval '1 day';

  return v_count > p_limit;
end
$$;

revoke all on function public.check_form_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.check_form_rate_limit(text, integer, integer)
  to service_role;
