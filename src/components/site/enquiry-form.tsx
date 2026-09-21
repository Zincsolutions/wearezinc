"use client";

import { useId, useRef, useState } from "react";

// Enquiry form for the website offering pages (AI-native, migration,
// enterprise). Same fields on every page: name, work email, website URL
// (all required) and one optional context field whose label varies.
// Posts the JSON shape /api/forms already accepts so the enquiry lands in
// Supabase, HubSpot, and the team inbox unchanged. The originating page and
// offer travel as non-sensitive metadata in `fields`. Markup reuses the
// contact page's form classes (forms.css).

type Props = {
  formName: string;
  offer: string;
  submitLabel: string;
  contextLabel: string;
  contextPlaceholder?: string;
  successMessage: string;
};

type State = "idle" | "sending" | "done" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function gtag(event: string, params: Record<string, string>) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") w.gtag("event", event, params);
}

export function EnquiryForm({
  formName,
  offer,
  submitLabel,
  contextLabel,
  contextPlaceholder,
  successMessage,
}: Props) {
  const id = useId();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(false);

  const f = (name: string) => `${id}-${name}`;

  function onStart() {
    if (started.current) return;
    started.current = true;
    gtag("form_start", { form_name: formName, offer });
  }

  function validate(data: FormData) {
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const url = String(data.get("url") ?? "").trim();
    if (!name) next.name = "Please add your name.";
    if (!email || !EMAIL_RE.test(email)) next.email = "Please add a valid work email.";
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
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`#${CSS.escape(f(first))}`)?.focus();
      return;
    }
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const url = get("url");
    const payload = {
      formName,
      name: get("name"),
      email: get("email"),
      message: get("context"),
      website: get("website"),
      fields: {
        "Website URL": /^https?:\/\//i.test(url) ? url : `https://${url}`,
        [contextLabel]: get("context"),
        Offer: offer,
        "Source page": typeof window !== "undefined" ? window.location.pathname : "",
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
      gtag("generate_lead", { form_name: formName, offer, method: "website_form" });
      setState("done");
    } catch {
      setState("failed");
    }
  }

  if (state === "done") {
    return (
      <div className="form_message-success-wrapper" style={{ display: "block" }} role="status">
        <div className="form_message-success">
          <div>{successMessage}</div>
        </div>
      </div>
    );
  }

  const field = (
    name: "name" | "email" | "url",
    label: string,
    type: string,
    extra: Record<string, string | number | boolean> = {}
  ) => (
    <div className="form_field-wrapper">
      <label htmlFor={f(name)} className="form_field-label">{label}</label>
      <input
        id={f(name)}
        name={name}
        type={type}
        required
        aria-required="true"
        aria-invalid={errors[name] ? "true" : undefined}
        aria-describedby={errors[name] ? f(`${name}-error`) : undefined}
        className="form_input w-input"
        onFocus={onStart}
        {...extra}
      />
      {errors[name] ? (
        <div id={f(`${name}-error`)} className="form_field-error">{errors[name]}</div>
      ) : null}
    </div>
  );

  return (
    <form className="contact6_form" onSubmit={onSubmit} data-name={formName} noValidate>
      <div className="form_field-2col">
        {field("name", "Your name", "text", { maxLength: 200, autoComplete: "name" })}
        {field("email", "Work email", "email", { maxLength: 254, autoComplete: "email", placeholder: "you@company.com" })}
      </div>
      {field("url", "Website URL", "text", { maxLength: 500, autoComplete: "url", inputMode: "url", placeholder: "https://yourcompany.com" })}
      <div className="form_field-wrapper">
        <label htmlFor={f("context")} className="form_field-label">{contextLabel} (optional)</label>
        <textarea
          id={f("context")}
          name="context"
          maxLength={2000}
          placeholder={contextPlaceholder}
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
        className="button w-button"
        value={state === "sending" ? "Sending..." : `${submitLabel} >`}
        disabled={state === "sending"}
        aria-busy={state === "sending"}
      />
      <p className="form_privacy-note">
        We use these details to respond to your enquiry.{" "}
        <a href="/about/privacy-policy">Privacy policy</a>
      </p>
      <div aria-live="polite">
        {state === "failed" ? (
          <div className="form_message-error-wrapper" style={{ display: "block" }}>
            <div className="form_message-error">
              <div>Something went wrong and your enquiry was not sent. Email hello@wearezinc.com and we will pick it up by hand.</div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
