import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const HS = "https://api.hubapi.com";

const db = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

// naive per-instance rate limit: 10 submissions / 10 min / IP
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 10 * 60_000;
  const list = (hits.get(ip) ?? []).filter((t) => t > windowStart);
  list.push(now);
  hits.set(ip, list);
  return list.length > 10;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Payload = {
  formName?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  // honeypot — real users never fill this
  website?: string;
  fields?: Record<string, string>;
};

async function hubspotUpsert(p: Payload): Promise<string> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) return "skipped:no-token";

  const [first, ...rest] = (p.name ?? "").trim().split(/\s+/);
  const properties: Record<string, string> = {
    email: p.email!,
    firstname: p.firstName ?? first ?? "",
    lastname: p.lastName ?? rest.join(" "),
  };
  if (p.phone) properties.phone = p.phone;
  if (p.company) properties.company = p.company;

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const create = await fetch(`${HS}/crm/v3/objects/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({ properties }),
  });
  if (create.ok) {
    const body = (await create.json()) as { id: string };
    await tryAttachNote(body.id, p, headers);
    return `created:${body.id}`;
  }
  if (create.status === 409) {
    // existing contact — error message contains "Existing ID: <id>"
    const err = (await create.json()) as { message?: string };
    const id = err.message?.match(/Existing ID: (\d+)/)?.[1];
    if (id) {
      await fetch(`${HS}/crm/v3/objects/contacts/${id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ properties }),
      });
      await tryAttachNote(id, p, headers);
      return `updated:${id}`;
    }
  }
  return `failed:${create.status}`;
}

// Message context as a Note on the contact. Needs notes scope — degrades
// gracefully if the service key doesn't have it (message is always in Supabase).
async function tryAttachNote(
  contactId: string,
  p: Payload,
  headers: Record<string, string>
): Promise<void> {
  if (!p.message && !p.formName) return;
  try {
    await fetch(`${HS}/crm/v3/objects/notes`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        properties: {
          hs_timestamp: new Date().toISOString(),
          hs_note_body: `Website form: ${p.formName ?? "unknown"}\n\n${p.message ?? "(no message)"}`,
        },
        associations: [
          {
            to: { id: contactId },
            types: [
              { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 },
            ],
          },
        ],
      }),
    });
  } catch {
    /* note is best-effort */
  }
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0];
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "Too many submissions" }, { status: 429 });
  }

  let p: Payload;
  try {
    p = (await req.json()) as Payload;
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // honeypot: pretend success, store nothing
  if (p.website) return Response.json({ ok: true });

  if (!p.email || !EMAIL_RE.test(p.email)) {
    return Response.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }

  const { error } = await db().from("form_submissions").insert({
    form_name: p.formName ?? "unknown",
    name: p.name ?? ([p.firstName, p.lastName].filter(Boolean).join(" ") || null),
    email: p.email,
    phone: p.phone ?? null,
    company: p.company ?? null,
    message: p.message ?? null,
    payload: p.fields ?? {},
  });
  if (error) {
    return Response.json({ ok: false, error: "Storage failed" }, { status: 500 });
  }

  const hubspot = await hubspotUpsert(p);
  if (hubspot.startsWith("failed")) {
    // stored in Supabase; flag for reconciliation rather than failing the user
    console.error(`HubSpot sync failed for ${p.email}: ${hubspot}`);
  } else if (!hubspot.startsWith("skipped")) {
    await db()
      .from("form_submissions")
      .update({ hubspot_synced: true })
      .eq("email", p.email)
      .order("created_at", { ascending: false })
      .limit(1);
  }

  return Response.json({ ok: true });
}
