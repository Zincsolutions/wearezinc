// First-touch attribution for leads: which campaign, referrer, and landing
// page brought a visitor, kept for the session so the form can send it with
// the lead. Stored only in this browser (sessionStorage), never sent until
// the visitor submits a form. Every access is guarded: storage can be
// blocked or unavailable.

const KEY = "zinc:attribution";
const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export type Attribution = Partial<Record<(typeof UTM)[number] | "referrer" | "landing_page" | "first_seen", string>>;

export function captureAttribution() {
  try {
    const existing = window.sessionStorage.getItem(KEY);
    const params = new URLSearchParams(window.location.search);
    const hasUtm = UTM.some((k) => params.get(k));
    // Keep the first touch, unless a new campaign link arrives mid-session.
    if (existing && !hasUtm) return;
    const data: Attribution = { landing_page: window.location.pathname, first_seen: new Date().toISOString() };
    for (const k of UTM) {
      const v = params.get(k);
      if (v) data[k] = v.slice(0, 120);
    }
    const ref = document.referrer;
    if (ref && !ref.startsWith(window.location.origin)) data.referrer = ref.slice(0, 300);
    window.sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable: forms still work, just without attribution.
  }
}

export function readAttribution(): Record<string, string> {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return {};
    const data = JSON.parse(raw) as Attribution;
    const out: Record<string, string> = {};
    const label: Record<string, string> = {
      utm_source: "UTM source",
      utm_medium: "UTM medium",
      utm_campaign: "UTM campaign",
      utm_content: "UTM content",
      utm_term: "UTM term",
      referrer: "Referrer",
      landing_page: "Landing page",
      first_seen: "First seen",
    };
    for (const [k, v] of Object.entries(data)) if (v && label[k]) out[label[k]] = v;
    return out;
  } catch {
    return {};
  }
}
