"use client";

import { useState } from "react";

// Short intake for the free migration preview. Posts the same JSON shape the
// static Webflow-styled forms send (see public/js/zinc-forms.js) so it lands
// in Supabase, HubSpot, and the team inbox through /api/forms unchanged.
// Markup reuses the contact page's form classes (forms.css) so it renders
// with the site's existing look and feel.

const PLATFORMS = [
  "WordPress",
  "Webflow",
  "Squarespace",
  "Wix",
  "HubSpot CMS",
  "Framer",
  "Shopify",
  "Custom or other",
  "Not sure",
];

export function FitCheckForm({
  formName = "Migration Preview Request",
  submitLabel = "Request my preview",
}: {
  formName?: string;
  submitLabel?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const payload = {
      formName,
      name: get("Preview-Name"),
      email: get("Preview-Email"),
      message: get("Preview-Change"),
      website: get("website"),
      fields: {
        "Website URL": get("Preview-URL"),
        "Current platform": get("Preview-Platform"),
        "What would you like to change more easily": get("Preview-Change"),
      },
    };
    setState("sending");
    try {
      const r = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await r.json()) as { ok?: boolean };
      if (!r.ok || !body.ok) throw new Error("failed");
      const w = window as Window & { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === "function") {
        w.gtag("event", "generate_lead", { form_name: formName, method: "website_form" });
      }
      setState("done");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div className="form_message-success-wrapper" style={{ display: "block" }}>
        <div className="form_message-success">
          <div>Thanks. We will look at your site and come back with your preview and a recommendation.</div>
        </div>
      </div>
    );
  }

  return (
    <form className="contact6_form" onSubmit={onSubmit} data-name={formName} noValidate={false}>
      <div className="form_field-2col">
        <div className="form_field-wrapper">
          <label htmlFor="Preview-Name" className="form_field-label">Name</label>
          <input id="Preview-Name" name="Preview-Name" type="text" maxLength={200} required className="form_input w-input" />
        </div>
        <div className="form_field-wrapper">
          <label htmlFor="Preview-Email" className="form_field-label">Work email</label>
          <input id="Preview-Email" name="Preview-Email" type="email" maxLength={254} required className="form_input w-input" />
        </div>
      </div>
      <div className="form_field-2col is-mobile-1col">
        <div className="form_field-wrapper">
          <label htmlFor="Preview-URL" className="form_field-label">Website URL</label>
          <input id="Preview-URL" name="Preview-URL" type="url" maxLength={500} required placeholder="https://" className="form_input w-input" />
        </div>
        <div className="form_field-wrapper">
          <label htmlFor="Preview-Platform" className="form_field-label">Current platform (optional)</label>
          <select id="Preview-Platform" name="Preview-Platform" className="form_input is-select-input w-select" defaultValue="">
            <option value="">Select one...</option>
            {PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form_field-wrapper">
        <label htmlFor="Preview-Change" className="form_field-label">What would you like to change more easily? (optional)</label>
        <textarea id="Preview-Change" name="Preview-Change" maxLength={2000} className="form_input is-text-area w-input" />
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: -9999, height: 0, width: 0, opacity: 0 }}
      />
      <input
        type="submit"
        className="button w-button"
        value={state === "sending" ? "Please wait..." : submitLabel}
        disabled={state === "sending"}
      />
      {state === "failed" ? (
        <div className="form_message-error-wrapper" style={{ display: "block" }}>
          <div className="form_message-error">
            <div>Something went wrong. Email hello@wearezinc.com and we will set it up by hand.</div>
          </div>
        </div>
      ) : null}
    </form>
  );
}
