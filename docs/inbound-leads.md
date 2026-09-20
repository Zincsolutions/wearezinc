# Inbound leads — how form submissions are handled

_Written Sept 5, 2026. Operational reference for the wearezinc.com contact pipeline._

## Pipeline

Every form on the site (currently the contact-page **Contact 6 Form**) posts JSON
to `POST /api/forms` (`src/app/api/forms/route.ts`). The route, in order:

1. Rejects cross-origin posts, oversize bodies, honeypot hits, and rate-limit
   abusers (10 per IP per 10 min, enforced in Postgres).
2. **Stores** the submission in Supabase `public.form_submissions` (project
   `juebigeqdzpgtomlaygh`). This is the system of record: nothing after this
   step can lose a lead.
3. **Upserts a HubSpot contact** (portal 2098094) with lifecycle stage `lead`,
   lead status `NEW`, and owner `HUBSPOT_OWNER_ID`. The message is attached as a
   Note on the contact.
4. **Emails the team** via Resend (`src/lib/lead-notify.ts`) with every field,
   a HubSpot deep link, and Reply-To set to the lead so you can answer directly.
5. Writes `hubspot_contact_id` and `notified_at` back onto the Supabase row.

Steps 3–5 are best-effort. The visitor always sees success once step 2 succeeds;
failures are logged to Vercel and are visible via the CLI below.

## Why HubSpot alone didn't notify anyone

Contacts created through the CRM API arrive as source **INTEGRATION**, with no
form-submission event and no owner. HubSpot's built-in "form submitted" and
"assigned to you" notifications never fire for those records. Owner assignment
(step 3) fixes the second; the Resend email (step 4) is the reliable primary.

## Notification channels

| Channel | Trigger | Config |
|---|---|---|
| Email to team | Every stored submission | `RESEND_API_KEY`, `FORM_NOTIFY_TO`, `FORM_NOTIFY_FROM` on Vercel |
| HubSpot "record assigned" | Owner set on contact | `HUBSPOT_OWNER_ID`; owner's HubSpot notification prefs |
| Vercel logs | Any failure in steps 3–5 | Search logs for `submission <id>` |

## Triage statuses (Supabase `form_submissions.status`)

`new` → `contacted` → `qualified` or `closed`. `spam` is excluded from reports.

```bash
node scripts/leads.mjs list                  # new leads
node scripts/leads.mjs list --status all
node scripts/leads.mjs show 1a2b3c4d
node scripts/leads.mjs set 1a2b3c4d contacted --note "Replied 9/5, intro call Tue"
node scripts/leads.mjs unsynced              # never reached HubSpot — re-create by hand
node scripts/leads.mjs unnotified            # no email went out
```

Weekly: run `unsynced` and `unnotified`; anything listed is a lead that only
exists in Supabase and needs manual follow-up.

## Testing a change

Submit the live contact form with a `+test` address you control, then confirm:
the email arrives, the HubSpot contact shows you as owner with a Note, and
`node scripts/leads.mjs list` shows the row with `hs:<id>` and `mail:yes`.
Mark it `spam` afterwards so it stays out of reports.
