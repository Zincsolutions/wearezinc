-- Inbound lead triage: track HubSpot linkage, notification delivery, and a
-- working status so submissions can be organized and followed up.

create type public.lead_status as enum ('new', 'contacted', 'qualified', 'closed', 'spam');

alter table public.form_submissions
  add column status public.lead_status not null default 'new',
  add column hubspot_contact_id text,
  add column notified_at timestamptz,
  add column reviewed_at timestamptz,
  add column notes text;

comment on column public.form_submissions.status is
  'Triage state: new → contacted → qualified/closed; spam is excluded from reporting.';
comment on column public.form_submissions.hubspot_contact_id is
  'HubSpot CRM contact ID (portal 2098094) created or updated for this submission.';
comment on column public.form_submissions.notified_at is
  'When the team email notification was accepted by Resend. NULL = not sent.';

create index form_submissions_status_created_at_idx
  on public.form_submissions (status, created_at desc);

-- Backfill: everything before this migration was already reviewed manually.
update public.form_submissions
  set status = 'spam', reviewed_at = now()
  where email like 'migration-test@%' or form_name = 'Prod smoke test';
