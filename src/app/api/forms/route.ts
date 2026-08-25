import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

const HS = "https://api.hubapi.com";
const MAX_BODY_BYTES = 32_768;
const RATE_LIMIT = 10;
const RATE_WINDOW_SECONDS = 10 * 60;

const db = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

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

const json = (body: object, status = 200) =>
  Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });

function cleanText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const clean = value.replace(/\u0000/g, "").trim();
  return clean ? clean.slice(0, maxLength) : undefined;
}

function normalizePayload(value: unknown): Payload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const fields: Record<string, string> = {};

  if (input.fields !== undefined) {
    if (!input.fields || typeof input.fields !== "object" || Array.isArray(input.fields)) {
      return null;
    }
    const entries = Object.entries(input.fields as Record<string, unknown>);
    if (entries.length > 40) return null;
    for (const [rawKey, rawValue] of entries) {
      const key = cleanText(rawKey, 80);
      const fieldValue = cleanText(rawValue, 2_000);
      if (key && fieldValue !== undefined) fields[key] = fieldValue;
    }
  }

  return {
    formName: cleanText(input.formName, 100),
    name: cleanText(input.name, 200),
    firstName: cleanText(input.firstName, 100),
    lastName: cleanText(input.lastName, 100),
    email: cleanText(input.email, 254)?.toLowerCase(),
    phone: cleanText(input.phone, 50),
    company: cleanText(input.company, 200),
    message: cleanText(input.message, 5_000),
    website: cleanText(input.website, 500),
    fields,
  };
}

async function readPayload(req: Request): Promise<Payload | null> {
  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) throw new Error("too-large");
  if (!req.body) return null;

  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("too-large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return normalizePayload(JSON.parse(new TextDecoder().decode(bytes)));
}

function clientKey(req: Request): string {
  const ip = (
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "unknown"
  )
    .split(",")[0]
    .trim();
  return createHash("sha256").update(ip).digest("hex");
}

async function rateLimited(req: Request): Promise<boolean> {
  const { data, error } = await db().rpc("check_form_rate_limit", {
    p_key_hash: clientKey(req),
    p_limit: RATE_LIMIT,
    p_window_seconds: RATE_WINDOW_SECONDS,
  });
  if (error) throw error;
  return data === true;
}

function trustedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (req.headers.get("host") ?? new URL(req.url).host);
  } catch {
    return false;
  }
}

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
    signal: AbortSignal.timeout(8_000),
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
        signal: AbortSignal.timeout(8_000),
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
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    /* note is best-effort */
  }
}

export async function POST(req: Request) {
  if (!trustedOrigin(req)) return json({ ok: false, error: "Invalid origin" }, 403);

  let p: Payload;
  try {
    const parsed = await readPayload(req);
    if (!parsed) return json({ ok: false, error: "Invalid request" }, 400);
    p = parsed;
  } catch (error) {
    const status = error instanceof Error && error.message === "too-large" ? 413 : 400;
    return json({ ok: false, error: status === 413 ? "Request too large" : "Invalid JSON" }, status);
  }

  // honeypot: pretend success, store nothing
  if (p.website) return json({ ok: true });

  try {
    if (await rateLimited(req)) {
      return json({ ok: false, error: "Too many submissions" }, 429);
    }
  } catch (error) {
    console.error("Form rate-limit check failed", error);
    return json({ ok: false, error: "Form temporarily unavailable" }, 503);
  }

  if (!p.email || !EMAIL_RE.test(p.email)) {
    return json({ ok: false, error: "Valid email required" }, 400);
  }

  const { data: submission, error: storageError } = await db()
    .from("form_submissions")
    .insert({
      form_name: p.formName ?? "unknown",
      name: p.name ?? ([p.firstName, p.lastName].filter(Boolean).join(" ") || null),
      email: p.email,
      phone: p.phone ?? null,
      company: p.company ?? null,
      message: p.message ?? null,
      payload: p.fields ?? {},
    })
    .select("id")
    .single();
  if (storageError || !submission) {
    console.error("Form submission storage failed", storageError);
    return json({ ok: false, error: "Storage failed" }, 500);
  }

  let hubspot: string;
  try {
    hubspot = await hubspotUpsert(p);
  } catch (error) {
    console.error(`HubSpot sync failed for submission ${submission.id}`, error);
    hubspot = "failed:network";
  }
  if (hubspot.startsWith("failed")) {
    // stored in Supabase; flag for reconciliation rather than failing the user
    console.error(`HubSpot sync failed for submission ${submission.id}: ${hubspot}`);
  } else if (!hubspot.startsWith("skipped")) {
    await db()
      .from("form_submissions")
      .update({ hubspot_synced: true })
      .eq("id", submission.id);
  }

  return json({ ok: true });
}
