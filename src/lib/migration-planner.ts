import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

// Free migration planner: reads a public site's sitemap and returns a URL
// inventory by template, the platform it appears to run on, and the URLs
// that will need a decision (a redirect or a rule) in a migration.
//
// It fetches URLs a visitor typed, so it is careful: http(s) only, public
// addresses only (checked after DNS and on every redirect hop), short
// timeouts, capped response sizes, and capped sitemap and URL counts.

const TIMEOUT_MS = 6000;
const MAX_BYTES = 3_000_000;
const MAX_SITEMAPS = 8;
const MAX_URLS = 5000;
const MAX_REDIRECTS = 3;
const UA = "ZINC-Migration-Planner/1.0 (+https://www.wearezinc.com/migration-planner)";

export class PlannerError extends Error {}

function isPrivateV4(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19))
  );
}

function isPrivateV6(ip: string) {
  const v = ip.toLowerCase();
  if (v === "::" || v === "::1") return true;
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb")) return true;
  const mapped = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  return mapped ? isPrivateV4(mapped[1]) : false;
}

async function assertPublic(url: URL) {
  if (url.protocol !== "https:" && url.protocol !== "http:") throw new PlannerError("Only http and https addresses are supported.");
  if (url.username || url.password) throw new PlannerError("That address is not supported.");
  if (url.port && url.port !== "80" && url.port !== "443") throw new PlannerError("That address is not supported.");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new PlannerError("Please enter a public website address.");
  }
  const addresses = isIP(host) ? [{ address: host, family: isIP(host) }] : await lookup(host, { all: true }).catch(() => []);
  if (!addresses.length) throw new PlannerError("We could not find that website. Check the address and try again.");
  for (const a of addresses) {
    if (a.family === 4 ? isPrivateV4(a.address) : isPrivateV6(a.address)) throw new PlannerError("Please enter a public website address.");
  }
}

async function safeFetch(input: string): Promise<{ url: URL; status: number; text: string; headers: Headers } | null> {
  let url = new URL(input);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
    await assertPublic(url);
    const res = await fetch(url, {
      redirect: "manual",
      headers: { "User-Agent": UA, Accept: "text/html,application/xml,text/xml,text/plain;q=0.9,*/*;q=0.5" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }).catch(() => null);
    if (!res) return null;
    if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
      url = new URL(res.headers.get("location")!, url);
      continue;
    }
    if (!res.body) return { url, status: res.status, text: "", headers: res.headers };
    const reader = res.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) { await reader.cancel(); break; }
      chunks.push(value);
    }
    const text = new TextDecoder().decode(Buffer.concat(chunks));
    return { url, status: res.status, text, headers: res.headers };
  }
  return null;
}

const PLATFORMS: [string, RegExp][] = [
  ["WordPress", /wp-content|wp-includes|<meta[^>]+generator[^>]+wordpress/i],
  ["Webflow", /data-wf-site|website-files\.com|<meta[^>]+generator[^>]+webflow/i],
  ["Wix", /static\.wixstatic\.com|<meta[^>]+generator[^>]+wix/i],
  ["Squarespace", /static1\.squarespace\.com|<!-- This is Squarespace/i],
  ["HubSpot CMS", /hs-sites\.com|hubspotusercontent|<meta[^>]+generator[^>]+hubspot/i],
  ["Framer", /framerusercontent\.com|<meta[^>]+generator[^>]+framer/i],
  ["Shopify", /cdn\.shopify\.com|Shopify\.theme/i],
  ["Drupal", /<meta[^>]+generator[^>]+drupal|\/sites\/default\/files/i],
  ["Next.js", /\/_next\/static/i],
];

export const PATH_PAGES: Record<string, string> = {
  WordPress: "/solutions/wordpress-ai-website-migration",
  Webflow: "/solutions/webflow-ai-website-migration",
  Wix: "/solutions/wix-ai-website-migration",
  Squarespace: "/solutions/squarespace-ai-website-migration",
  "HubSpot CMS": "/solutions/hubspot-cms-ai-website-migration",
  Framer: "/solutions/framer-ai-website-migration",
  Shopify: "/solutions/ecommerce-acceleration",
};

const FLAGS: [string, (u: URL) => boolean][] = [
  ["Query-string addresses (like ?p=123) usually need a redirect rule", (u) => u.search.length > 1],
  ["File extensions (.html, .php, .aspx) usually change and need 301s", (u) => /\.(html?|php|aspx?|cfm)$/i.test(u.pathname)],
  ["Uppercase characters need a case rule on the new host", (u) => /[A-Z]/.test(u.pathname)],
  ["Date-based archive paths need a decision: keep, redirect, or retire", (u) => /\/(19|20)\d{2}\/\d{2}(\/|$)/.test(u.pathname)],
  ["Tag, category, and author archives need a decision: keep, redirect, or retire", (u) => /\/(tag|tags|category|categories|author)\//i.test(u.pathname)],
];

const locs = (xml: string) => [...xml.matchAll(/<loc>\s*(?:<!\[CDATA\[)?\s*([^<\]\s]+)\s*(?:\]\]>)?\s*<\/loc>/gi)].map((m) => m[1].replace(/&amp;/g, "&"));

export type PlannerResult = {
  site: string;
  platform: string | null;
  pathPage: string | null;
  sitemaps: string[];
  total: number;
  truncated: boolean;
  templates: { template: string; count: number; samples: string[] }[];
  flags: { reason: string; count: number; samples: string[] }[];
  trailingSlashMixed: boolean;
};

export async function planMigration(raw: string): Promise<PlannerResult> {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 300) throw new PlannerError("Please enter your website address.");
  let start: URL;
  try {
    start = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new PlannerError("That does not look like a website address.");
  }

  const home = await safeFetch(start.origin + "/");
  if (!home) throw new PlannerError("We could not reach that website. Check the address and try again.");
  const origin = home.url.origin;
  const platform = PLATFORMS.find(([, re]) => re.test(home.text))?.[0] ?? null;

  // Sitemap discovery: robots.txt first, then the usual locations.
  const queue: string[] = [];
  const robots = await safeFetch(`${origin}/robots.txt`);
  if (robots && robots.status === 200) {
    for (const m of robots.text.matchAll(/^\s*sitemap:\s*(\S+)/gim)) queue.push(m[1]);
  }
  if (!queue.length) queue.push(`${origin}/sitemap.xml`, `${origin}/sitemap_index.xml`, `${origin}/wp-sitemap.xml`);

  const seenSitemaps = new Set<string>();
  const pages = new Set<string>();
  let truncated = false;
  while (queue.length && seenSitemaps.size < MAX_SITEMAPS) {
    const next = queue.shift()!;
    let nextUrl: URL;
    try { nextUrl = new URL(next, origin); } catch { continue; }
    if (nextUrl.hostname.replace(/^www\./, "") !== new URL(origin).hostname.replace(/^www\./, "")) continue;
    if (seenSitemaps.has(nextUrl.href)) continue;
    seenSitemaps.add(nextUrl.href);
    const res = await safeFetch(nextUrl.href);
    if (!res || res.status !== 200 || !/<(urlset|sitemapindex)/i.test(res.text)) continue;
    if (/<sitemapindex/i.test(res.text)) {
      queue.push(...locs(res.text));
      continue;
    }
    for (const loc of locs(res.text)) {
      if (pages.size >= MAX_URLS) { truncated = true; break; }
      pages.add(loc);
    }
  }
  if (queue.length) truncated = true;

  const urls = [...pages].map((p) => { try { return new URL(p); } catch { return null; } }).filter((u): u is URL => !!u);

  // Group by first path segment; segments with fewer than 3 URLs are
  // standalone pages (about, contact, and the like).
  const bySeg = new Map<string, URL[]>();
  for (const u of urls) {
    const seg = u.pathname.split("/").filter(Boolean)[0];
    const key = seg && u.pathname.split("/").filter(Boolean).length > 1 ? `/${seg}/…` : "Standalone pages";
    bySeg.set(key, [...(bySeg.get(key) ?? []), u]);
  }
  const standalone = bySeg.get("Standalone pages") ?? [];
  for (const [key, list] of bySeg) {
    if (key !== "Standalone pages" && list.length < 3) {
      standalone.push(...list);
      bySeg.delete(key);
    }
  }
  if (standalone.length) bySeg.set("Standalone pages", standalone);

  const templates = [...bySeg.entries()]
    .map(([template, list]) => ({ template, count: list.length, samples: list.slice(0, 3).map((u) => u.pathname + u.search) }))
    .sort((a, b) => b.count - a.count);

  const flags = FLAGS.map(([reason, test]) => {
    const hits = urls.filter(test);
    return { reason, count: hits.length, samples: hits.slice(0, 3).map((u) => u.pathname + u.search) };
  }).filter((f) => f.count > 0);

  const nonRoot = urls.filter((u) => u.pathname !== "/");
  const withSlash = nonRoot.filter((u) => u.pathname.endsWith("/")).length;
  const trailingSlashMixed = withSlash > 0 && withSlash < nonRoot.length;

  return {
    site: origin,
    platform,
    pathPage: platform ? PATH_PAGES[platform] ?? null : null,
    sitemaps: [...seenSitemaps].slice(0, 8),
    total: urls.length,
    truncated,
    templates,
    flags,
    trailingSlashMixed,
  };
}
