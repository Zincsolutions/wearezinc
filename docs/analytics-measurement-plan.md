# ZINC marketing measurement plan

Baseline date: August 25, 2026

## Business questions

The weekly audit should answer four questions in order:

1. Which channels and campaigns brought qualified visits?
2. Which landing pages earned attention from search and referrals?
3. Which pages and calls to action created contact intent?
4. Which sources, campaigns, landing pages, and forms produced leads?

## GA4 events

| Event | Meaning | Reporting fields |
| --- | --- | --- |
| `page_view` | A page was viewed | Landing page, page path, source/medium, campaign |
| `scroll` | A visitor reached 90% of a page | Page path, source/medium |
| `click` | A visitor opened an outbound link | Link URL, page path |
| `form_start` | A visitor began using a form | Form ID/name, page path |
| `form_submit` | GA detected a form submission attempt | Form ID/name, page path |
| `cta_click` | A visitor clicked a contact, email, phone, or booking CTA | CTA text, CTA location, CTA destination |
| `generate_lead` | The server accepted a valid form submission | Form name; primary key event |

`generate_lead` is the dependable lead outcome. `form_submit` is diagnostic and may include attempts that fail validation or are blocked.

## Weekly scorecard

- Search demand: Google organic impressions, clicks, click-through rate, and average position.
- Qualified reach: engaged sessions and engagement rate by channel and source/medium.
- Landing-page performance: sessions, engagement rate, CTA clicks, and leads by landing page.
- Intent: CTA clicks by text, location, and destination.
- Outcomes: `generate_lead` totals and session lead rate by channel, campaign, landing page, and form name.
- Data quality: Direct and Unassigned share, self-referrals, unexpected countries, and sudden low-engagement spikes.

Compare the latest complete 28 days with the preceding 28 days. For low-volume leads, also use a rolling 90-day view.

## Campaign naming

Use lowercase values with underscores and keep the same spelling across every channel.

| Parameter | Examples |
| --- | --- |
| `utm_source` | `google`, `linkedin`, `newsletter`, `partner_name` |
| `utm_medium` | `cpc`, `paid_social`, `organic_social`, `email`, `referral` |
| `utm_campaign` | `aeo_sprint_q3_2026`, `website_redesign_q4_2026` |
| `utm_content` | `founder_post_01`, `case_study_ad_02`, `footer_banner` |

Never add UTM parameters to links between pages on WeAreZinc.com. Internal UTMs overwrite the original acquisition source.

## Interpretation rules

- Optimize a page for more traffic only when impressions are growing but click-through rate is weak.
- Improve message and UX when a landing page has traffic but weak engagement or few CTA clicks.
- Improve the form or offer when CTA clicks are healthy but `generate_lead` is weak.
- Scale a channel only after it produces engaged visits and leads, not merely sessions.
- Treat unexpected Direct or Referral spikes as a data-quality question before calling them marketing growth.
