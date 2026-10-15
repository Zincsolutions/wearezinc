"use client";

import { useState } from "react";
import type { PlannerResult } from "@/lib/migration-planner";

// Client side of the free migration planner (/migration-planner). Results
// are a starting inventory, not a full crawl, and the copy says so.

function gtag(event: string, params: Record<string, string | number>) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", event, params);
}

export function PlannerTool() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PlannerResult | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/migration-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
      setState("done");
      gtag("migration_planner_run", { platform: data.platform ?? "unknown", urls: data.total });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const needDecision = result ? result.flags.reduce((n, f) => n + f.count, 0) : 0;
  const nextStep = result?.pathPage ? `${result.pathPage}#preview` : "/solutions/wordpress-ai-website-migration#preview";

  return (
    <div className="planner">
      <form className="planner_form" onSubmit={run}>
        <label htmlFor="planner-url" className="planner_label">Your website address</label>
        <div className="planner_row">
          <input
            id="planner-url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourcompany.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="planner_input"
            required
          />
          <button type="submit" className="button w-button" disabled={state === "loading"}>
            {state === "loading" ? "Reading your sitemap…" : "Plan My Migration >"}
          </button>
        </div>
        <p className="planner_hint">Free, instant, and no sign-up. We only read your public sitemap and homepage.</p>
      </form>

      <div aria-live="polite">
        {state === "error" ? <p className="planner_error" role="alert">{error}</p> : null}

        {state === "done" && result ? (
          <div className="planner_result">
            {result.total === 0 ? (
              <div className="planner_empty">
                <h2 className="heading-style-h4">We could not find a sitemap for {result.site.replace(/^https?:\/\//, "")}.</h2>
                <p>That is common, and it is the first thing a migration should fix: without a sitemap, nobody knows exactly what you are about to move. We can crawl the site for you as part of a free preview.</p>
                <a href={nextStep} className="button w-button">Get a Free Migration Preview &gt;</a>
              </div>
            ) : (
              <>
                <dl className="proof_stats planner_stats">
                  <div className="proof_stat"><dt className="proof_stat-label">URLs in your sitemap{result.truncated ? " (first 5,000)" : ""}</dt><dd className="proof_stat-value">{result.total.toLocaleString()}</dd></div>
                  <div className="proof_stat"><dt className="proof_stat-label">templates to plan</dt><dd className="proof_stat-value">{result.templates.length}</dd></div>
                  <div className="proof_stat"><dt className="proof_stat-label">URLs that can likely keep their address</dt><dd className="proof_stat-value">{Math.max(result.total - needDecision, 0).toLocaleString()}</dd></div>
                  <div className="proof_stat"><dt className="proof_stat-label">URLs that need a decision</dt><dd className="proof_stat-value">{needDecision.toLocaleString()}</dd></div>
                </dl>

                <div className="proof_grid">
                  <div className="proof_table-wrap">
                    <table className="proof_table">
                      <caption>URL inventory for {result.site.replace(/^https?:\/\//, "")}, by template</caption>
                      <thead><tr><th scope="col">Template</th><th scope="col">URLs</th><th scope="col">Example</th></tr></thead>
                      <tbody>
                        {result.templates.slice(0, 12).map((t) => (
                          <tr key={t.template}>
                            <th scope="row">{t.template}</th>
                            <td>{t.count.toLocaleString()}</td>
                            <td><span className="proof_path planner_sample">{t.samples[0]}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="proof_side">
                    <div className="proof_card">
                      <div className="proof_card-label">Platform</div>
                      <h3 className="heading-style-h5">{result.platform ? `Looks like ${result.platform}.` : "We could not tell which platform."}</h3>
                      <p>{result.pathPage ? "See what each of its features becomes after a move, and when staying is the smarter call." : "The method is the same whatever you run on. A free preview tells you what moves and what needs rebuilding."}</p>
                      {result.pathPage ? <a href={result.pathPage} className="faq-link">See your migration path &gt;</a> : null}
                    </div>
                    <div className="proof_card is-lesson">
                      <div className="proof_card-label">Needs a decision</div>
                      {result.flags.length || result.trailingSlashMixed ? (
                        <ul role="list" className="planner_flags">
                          {result.flags.map((f) => <li key={f.reason}><strong>{f.count.toLocaleString()}</strong> {f.reason}.</li>)}
                          {result.trailingSlashMixed ? <li>Your URLs mix trailing slashes. The new host needs one rule, applied everywhere.</li> : null}
                        </ul>
                      ) : (
                        <p>No common trouble patterns in your sitemap. Clean URLs make for a calmer move.</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="planner_next">
                  <div>
                    <h2 className="heading-style-h4">Next: see two of your pages on an agent-ready stack.</h2>
                    <p>We rebuild two pages, run one real change through Dispatch, and send back a stack recommendation and a draft redirect map. Free, no commitment.</p>
                  </div>
                  <a href={nextStep} className="button w-button">Get a Free Migration Preview &gt;</a>
                </div>
                <p className="offering-note">This reads your sitemap, so it shows what you have told search engines about. A real inventory also crawls the site for pages the sitemap misses.</p>
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
