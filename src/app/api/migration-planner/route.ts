import { NextResponse } from "next/server";
import { planMigration, PlannerError } from "@/lib/migration-planner";

// POST { url } → URL inventory for the free migration planner. Best-effort
// per-instance rate limit; the planner itself caps every fetch.

export const runtime = "nodejs";
export const maxDuration = 30;

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 8;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many checks in a short time. Please try again in a few minutes." }, { status: 429 });
  }
  let url = "";
  try {
    const body = (await req.json()) as { url?: unknown };
    url = typeof body.url === "string" ? body.url : "";
  } catch {
    return NextResponse.json({ error: "Please enter your website address." }, { status: 400 });
  }
  try {
    const result = await planMigration(url);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof PlannerError) return NextResponse.json({ error: error.message }, { status: 400 });
    console.error("Migration planner failed", error);
    return NextResponse.json({ error: "Something went wrong reading that site. Try again, or request a free preview instead." }, { status: 500 });
  }
}
