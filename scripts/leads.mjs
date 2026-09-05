#!/usr/bin/env node
// Inbound lead triage CLI for wearezinc.com form submissions.
//
//   node scripts/leads.mjs list [--status new|contacted|qualified|closed|spam|all] [--limit 50]
//   node scripts/leads.mjs show <id-prefix>
//   node scripts/leads.mjs set <id-prefix> <status> [--note "text"]
//   node scripts/leads.mjs unsynced        # stored but never reached HubSpot
//   node scripts/leads.mjs unnotified      # stored but no email went out
//
// Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local.

import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const envFile = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

const STATUSES = ["new", "contacted", "qualified", "closed", "spam"];
const [cmd = "list", ...rest] = process.argv.slice(2);
const flags = {};
const positional = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith("--")) {
    flags[rest[i].slice(2)] = rest[i + 1] ?? true;
    i++;
  } else {
    positional.push(rest[i]);
  }
}

const COLS =
  "id, created_at, status, form_name, name, email, phone, company, message, hubspot_synced, hubspot_contact_id, notified_at, reviewed_at, notes";

const fmt = (r) => {
  const when = r.created_at.replace("T", " ").slice(0, 16);
  const hs = r.hubspot_contact_id
    ? `hs:${r.hubspot_contact_id}`
    : r.hubspot_synced
      ? "hs:yes"
      : "hs:NO";
  const mail = r.notified_at ? "mail:yes" : "mail:no";
  const msg = (r.message ?? "").replace(/\s+/g, " ").slice(0, 60);
  return `${r.id.slice(0, 8)}  ${when}  ${r.status.padEnd(9)} ${(r.name ?? "").padEnd(22).slice(0, 22)} ${(r.email ?? "").padEnd(34).slice(0, 34)} ${hs.padEnd(16)} ${mail}  ${msg}`;
};

async function find(prefix) {
  const { data, error } = await db.from("form_submissions").select(COLS).ilike("id", `${prefix}%`);
  if (error) throw error;
  if (!data.length) throw new Error(`No submission starting with ${prefix}`);
  if (data.length > 1) throw new Error(`Ambiguous prefix ${prefix} (${data.length} matches)`);
  return data[0];
}

async function main() {
  if (cmd === "list") {
    const status = flags.status ?? "new";
    let q = db
      .from("form_submissions")
      .select(COLS)
      .order("created_at", { ascending: false })
      .limit(Number(flags.limit ?? 50));
    if (status !== "all") q = q.eq("status", status);
    const { data, error } = await q;
    if (error) throw error;
    console.log(`${data.length} submission(s)${status === "all" ? "" : ` with status=${status}`}\n`);
    for (const r of data) console.log(fmt(r));
    return;
  }

  if (cmd === "unsynced" || cmd === "unnotified") {
    let q = db.from("form_submissions").select(COLS).neq("status", "spam").order("created_at");
    q = cmd === "unsynced" ? q.eq("hubspot_synced", false) : q.is("notified_at", null);
    const { data, error } = await q;
    if (error) throw error;
    console.log(`${data.length} ${cmd} submission(s)\n`);
    for (const r of data) console.log(fmt(r));
    return;
  }

  if (cmd === "show") {
    const r = await find(positional[0]);
    console.log(JSON.stringify(r, null, 2));
    return;
  }

  if (cmd === "set") {
    const [prefix, status] = positional;
    if (!STATUSES.includes(status)) throw new Error(`status must be one of ${STATUSES.join(", ")}`);
    const r = await find(prefix);
    const patch = { status, reviewed_at: new Date().toISOString() };
    if (typeof flags.note === "string") {
      patch.notes = r.notes ? `${r.notes}\n${flags.note}` : flags.note;
    }
    const { error } = await db.from("form_submissions").update(patch).eq("id", r.id);
    if (error) throw error;
    console.log(`${r.id.slice(0, 8)} ${r.email}: ${r.status} → ${status}`);
    return;
  }

  console.error("Unknown command. See header of scripts/leads.mjs");
  process.exit(1);
}

main().catch((e) => {
  console.error(e.message ?? e);
  process.exit(1);
});
