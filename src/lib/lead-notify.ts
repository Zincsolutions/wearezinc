// Inbound-lead email notification, sent from the forms API after a
// submission is stored. Uses Resend's HTTP API directly (no SDK dependency).
//
// Required env (production): RESEND_API_KEY, FORM_NOTIFY_TO
// Optional env: FORM_NOTIFY_FROM (must be on a Resend-verified domain)
//
// Sending is best-effort: a failure is logged and never blocks the visitor.

export type LeadNotification = {
  submissionId: string;
  formName: string;
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  fields: Record<string, string>;
  hubspotContactId?: string;
  receivedAt: Date;
};

const HUBSPOT_PORTAL_ID = "2098094";
const SUPABASE_PROJECT_REF = "juebigeqdzpgtomlaygh";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const prettyFieldName = (key: string) =>
  key.replace(/^Contact-\d+-/i, "").replace(/[-_]+/g, " ").trim();

export function notifyRecipients(): string[] {
  return (process.env.FORM_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function buildLeadEmail(lead: LeadNotification): {
  subject: string;
  text: string;
  html: string;
} {
  const who = lead.name ? `${lead.name} <${lead.email}>` : lead.email;
  const subject = `New website lead: ${lead.name ?? lead.email}${
    lead.company ? ` (${lead.company})` : ""
  }`;

  const hubspotUrl = lead.hubspotContactId
    ? `https://app.hubspot.com/contacts/${HUBSPOT_PORTAL_ID}/record/0-1/${lead.hubspotContactId}`
    : undefined;
  const supabaseUrl = `https://supabase.com/dashboard/project/${SUPABASE_PROJECT_REF}/editor?table=form_submissions`;

  const core: Array<[string, string | undefined]> = [
    ["Form", lead.formName],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Company", lead.company],
    ["Received", lead.receivedAt.toISOString()],
  ];
  const coreKeys = new Set(["name", "email", "phone", "company", "message"]);
  const extras = Object.entries(lead.fields).filter(([key]) => {
    const k = key.toLowerCase();
    return ![...coreKeys].some((c) => k.includes(c)) && !k.includes("website");
  });

  const textLines = [
    `New website lead from ${who}`,
    "",
    ...core.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    "Message:",
    lead.message ?? "(no message)",
    "",
    ...(extras.length
      ? ["Other fields:", ...extras.map(([k, v]) => `  ${prettyFieldName(k)}: ${v}`), ""]
      : []),
    hubspotUrl ? `HubSpot contact: ${hubspotUrl}` : "HubSpot contact: not synced",
    `Supabase submissions: ${supabaseUrl}`,
    `Submission ID: ${lead.submissionId}`,
    "",
    "Reply to this email to respond directly to the lead.",
  ];

  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${escapeHtml(
      k
    )}</td><td style="padding:6px 0;vertical-align:top">${escapeHtml(v)}</td></tr>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f5f5;font-family:Inter,Helvetica,Arial,sans-serif;color:#0C2954">
<div style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;padding:28px;border-top:4px solid #FF5B19">
  <h1 style="font-size:20px;margin:0 0 4px">New website lead</h1>
  <p style="margin:0 0 20px;color:#6b7280">${escapeHtml(who)}</p>
  <table style="border-collapse:collapse;font-size:14px;width:100%">
    ${core.filter(([, v]) => v).map(([k, v]) => row(k, v!)).join("\n    ")}
  </table>
  <h2 style="font-size:14px;margin:20px 0 6px;color:#6b7280">Message</h2>
  <div style="white-space:pre-wrap;font-size:14px;line-height:1.5;padding:12px;background:#f9fafb;border-radius:6px">${escapeHtml(
    lead.message ?? "(no message)"
  )}</div>
  ${
    extras.length
      ? `<h2 style="font-size:14px;margin:20px 0 6px;color:#6b7280">Other fields</h2><table style="border-collapse:collapse;font-size:14px;width:100%">${extras
          .map(([k, v]) => row(prettyFieldName(k), v))
          .join("")}</table>`
      : ""
  }
  <p style="margin:24px 0 0;font-size:14px">
    ${
      hubspotUrl
        ? `<a href="${hubspotUrl}" style="display:inline-block;background:#FF5B19;color:#fff;text-decoration:none;padding:10px 16px;border-radius:6px;font-weight:600">Open in HubSpot</a>`
        : `<span style="color:#b45309">HubSpot sync did not complete — record is in Supabase.</span>`
    }
    &nbsp; <a href="${supabaseUrl}" style="color:#0C2954">All submissions</a>
  </p>
  <p style="margin:20px 0 0;font-size:12px;color:#9ca3af">Reply to this email to respond to the lead. Submission ${escapeHtml(
    lead.submissionId
  )}</p>
</div></body></html>`;

  return { subject, text: textLines.join("\n"), html };
}

export async function sendLeadNotification(
  lead: LeadNotification
): Promise<"sent" | "skipped:no-config" | `failed:${string}`> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = notifyRecipients();
  if (!apiKey || to.length === 0) return "skipped:no-config";

  const from = process.env.FORM_NOTIFY_FROM ?? "ZINC Website <forms@wearezinc.com>";
  const { subject, text, html } = buildLeadEmail(lead);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // Resend dedupes on this key; a Vercel retry can't double-send.
      "Idempotency-Key": `lead-${lead.submissionId}`,
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.name ? `${lead.name} <${lead.email}>` : lead.email,
      subject,
      text,
      html,
      tags: [{ name: "type", value: "website-lead" }],
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (res.ok) return "sent";
  const body = await res.text().catch(() => "");
  return `failed:${res.status}:${body.slice(0, 200)}`;
}
