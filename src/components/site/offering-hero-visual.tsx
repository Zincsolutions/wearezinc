// Code-drawn hero illustrations for the website offering pages (AI-native,
// migration, enterprise). Decorative: every phrase shown here is already said
// in the page copy, so the visual is hidden from assistive tech. Illustrative
// only, not a screenshot of a live agent or of Dispatch.

const Check = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" className="hv-check">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Chrome = ({ label }: { label: string }) => (
  <div className="hv-chrome">
    <span className="hv-dots"><i /><i /><i /></span>
    <span className="hv-chrome-label">{label}</span>
  </div>
);

function WorkflowVisual() {
  const steps = [
    { n: "01", label: "Request", state: "done" },
    { n: "02", label: "Preview", state: "done" },
    { n: "03", label: "Approve", state: "active" },
    { n: "04", label: "Publish", state: "todo" },
  ];
  return (
    <div className="hv-window">
      <Chrome label="Website change" />
      <div className="hv-body">
        <div className="hv-bubble is-user">
          “Change the headline to ‘Built for what’s next’ and use our new team photo.”
        </div>
        <div className="hv-preview">
          <div className="hv-preview-label">Preview</div>
          <div className="hv-preview-page">
            <div className="hv-preview-copy">
              <div className="hv-preview-headline">Built for what’s next</div>
              <span className="hv-line" style={{ width: "88%" }} />
              <span className="hv-line" style={{ width: "64%" }} />
              <span className="hv-pill" />
            </div>
            <div className="hv-photo" />
          </div>
        </div>
        <ol className="hv-steps">
          {steps.map((s) => (
            <li key={s.n} className={`hv-step is-${s.state}`}>
              <span className="hv-step-n">{s.state === "done" ? <Check /> : s.n}</span>
              {s.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function MigrationVisual() {
  const rows = [
    { item: "Design & content", status: "Preserved" },
    { item: "URLs & redirects", status: "Mapped" },
    { item: "Forms & integrations", status: "Reconnected" },
    { item: "Team workflow", status: "Dispatch" },
  ];
  return (
    <div className="hv-window">
      <Chrome label="Migration plan" />
      <div className="hv-body">
        <div className="hv-route">
          <span className="hv-chip">Current CMS</span>
          <svg className="hv-arrow" viewBox="0 0 40 12" aria-hidden="true">
            <path d="M0 6h36M31 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="hv-chip is-dark">AI-native website</span>
        </div>
        <ul className="hv-rows">
          {rows.map((r) => (
            <li key={r.item} className="hv-row">
              <span className="hv-row-item"><Check />{r.item}</span>
              <span className="hv-row-status">{r.status}</span>
            </li>
          ))}
        </ul>
        <div className="hv-footer">
          <span className="hv-dot" />
          Staging version ready for your review
        </div>
      </div>
    </div>
  );
}

function PlatformVisual() {
  const systems = ["CRM", "Marketing", "Analytics"];
  const models = ["Articles", "Case studies", "Resources"];
  const flow = ["Draft", "Preview", "Approve"];
  return (
    <div className="hv-window">
      <Chrome label="Webflow Enterprise" />
      <div className="hv-body">
        <div className="hv-systems">
          {systems.map((s) => <span key={s} className="hv-system">{s}</span>)}
        </div>
        <div className="hv-connectors" aria-hidden="true"><i /><i /><i /></div>
        <div className="hv-cms">
          <div className="hv-preview-label">CMS collections</div>
          {models.map((m, i) => (
            <div key={m} className="hv-cms-row">
              <span>{m}</span>
              <span className="hv-line" style={{ width: `${56 - i * 12}%` }} />
            </div>
          ))}
        </div>
        <ol className="hv-steps is-flow">
          {flow.map((f, i) => (
            <li key={f} className={`hv-step ${i < 2 ? "is-done" : "is-active"}`}>
              <span className="hv-step-n">{i < 2 ? <Check /> : "03"}</span>
              {f}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function OfferingHeroVisual({ variant }: { variant: "workflow" | "migration" | "platform" }) {
  return (
    <div className="offering-hero__visual hero-seq__item" aria-hidden="true">
      <div className="hv-stage">
        {variant === "workflow" ? <WorkflowVisual /> : variant === "migration" ? <MigrationVisual /> : <PlatformVisual />}
      </div>
    </div>
  );
}
