"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import { readAttribution } from "@/lib/attribution";
import { ASSESSMENT_FORM_NAME, ASSESSMENT_PATH, ROLE_FIELD, ROLE_OPTIONS } from "@/lib/assessment";

// The free website assessment form: the site's front door for every
// campaign. Short on purpose (three required fields), with three quick
// qualifiers that help us prioritize and let vendors self-identify. On
// success it moves to the thank-you page, which is the conversion URL for
// GA4 and any ad pixels.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SIZES = ["Just me", "2 to 10 people", "11 to 50 people", "51 to 200 people", "200+ people"];
const GOALS = [
  "More leads from my website",
  "Show up when people ask AI",
  "Modernize or move my website",
  "Make updates faster and easier",
  "Not sure yet",
];

function gtag(event: string, params: Record<string, string>) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}

type State = "idle" | "sending" | "failed";

export function AssessmentForm({ submitLabel = "Get My Free Assessment" }: { submitLabel?: string }) {
  const id = useId();
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const f = (name: string) => `${id}-${name}`;

  function onStart() {
    if (started.current) return;
    started.current = true;
    gtag("form_start", { form_name: ASSESSMENT_FORM_NAME, offer: "Free Website Assessment" });
  }

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const url = String(data.get("url") ?? "").trim();
    if (!name) next.name = "Please add your name.";
    if (!email || !EMAIL_RE.test(email)) next.email = "Please add a valid email.";
    if (!url) next.url = "Please add your website address.";
    else {
      try {
        new URL(/^https?:\/\//i.test(url) ? url : `https://${url}`);
      } catch {
        next.url = "Please add a valid website address.";
      }
    }
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`#${CSS.escape(f(Object.keys(found)[0]))}`)?.focus();
      return;
    }
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const url = get("url");
    const role = get("role");
    const payload = {
      formName: ASSESSMENT_FORM_NAME,
      name: get("name"),
      email: get("email"),
      company: get("company") || undefined,
      message: get("notes"),
      website: get("website"),
      fields: {
        "Website URL": /^https?:\/\//i.test(url) ? url : `https://${url}`,
        "Company size": get("size"),
        "Main goal": get("goal"),
        [ROLE_FIELD]: role,
        "Anything else": get("notes"),
        Offer: "Free Website Assessment",
        "Source page": window.location.pathname,
        ...readAttribution(),
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
      if (role !== ROLE_OPTIONS[2]) {
        gtag("generate_lead", { form_name: ASSESSMENT_FORM_NAME, offer: "Free Website Assessment", method: "website_form" });
      }
      router.push(`${ASSESSMENT_PATH}/thank-you`);
    } catch {
      setState("failed");
    }
  }

  const input = (
    name: "name" | "email" | "url" | "company",
    label: string,
    type: string,
    required: boolean,
    extra: Record<string, string | number | boolean> = {}
  ) => (
    <div className="form_field-wrapper">
      <label htmlFor={f(name)} className="form_field-label">{label}{required ? "" : " (optional)"}</label>
      <input
        id={f(name)}
        name={name}
        type={type}
        required={required}
        aria-required={required ? "true" : undefined}
        aria-invalid={errors[name] ? "true" : undefined}
        aria-describedby={errors[name] ? f(`${name}-error`) : undefined}
        className="form_input w-input"
        onFocus={onStart}
        {...extra}
      />
      {errors[name] ? <div id={f(`${name}-error`)} className="form_field-error">{errors[name]}</div> : null}
    </div>
  );

  const select = (name: string, label: string, options: readonly string[]) => (
    <div className="form_field-wrapper">
      <label htmlFor={f(name)} className="form_field-label">{label}</label>
      <select id={f(name)} name={name} className="form_input w-select" defaultValue="" onFocus={onStart}>
        <option value="" disabled>Select one…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <form className="contact6_form assessment-form" onSubmit={onSubmit} data-name={ASSESSMENT_FORM_NAME} noValidate>
      <div className="form_field-2col">
        {input("name", "Your name", "text", true, { maxLength: 200, autoComplete: "name" })}
        {input("email", "Email", "email", true, { maxLength: 254, autoComplete: "email", placeholder: "you@company.com" })}
      </div>
      <div className="form_field-2col">
        {input("url", "Website", "text", true, { maxLength: 500, autoComplete: "url", inputMode: "url", placeholder: "yourcompany.com" })}
        {input("company", "Company", "text", false, { maxLength: 200, autoComplete: "organization" })}
      </div>
      <div className="form_field-2col">
        {select("size", "Company size", SIZES)}
        {select("goal", "What do you want most?", GOALS)}
      </div>
      {select("role", ROLE_FIELD, ROLE_OPTIONS)}
      <div className="form_field-wrapper">
        <label htmlFor={f("notes")} className="form_field-label">Anything we should know? (optional)</label>
        <textarea
          id={f("notes")}
          name="notes"
          maxLength={2000}
          placeholder="Your platform, a deadline, or what is frustrating you most."
          className="form_input is-text-area w-input"
          onFocus={onStart}
        />
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
        className="button w-button assessment-form_submit"
        value={state === "sending" ? "Sending..." : `${submitLabel} >`}
        disabled={state === "sending"}
        aria-busy={state === "sending"}
      />
      <p className="form_privacy-note">
        Free, no obligation, and no logins needed. We use these details only to send your assessment.{" "}
        <a href="/about/privacy-policy">Privacy policy</a>
      </p>
      <div aria-live="polite">
        {state === "failed" ? (
          <div className="form_message-error-wrapper" style={{ display: "block" }}>
            <div className="form_message-error">
              <div>Something went wrong and your request was not sent. Email hello@wearezinc.com with your website and we will pick it up by hand.</div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
