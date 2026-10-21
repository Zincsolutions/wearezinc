import type { CSSProperties } from "react";

// "Foundations first" plus the typical Dispatch setup, week by week. This is
// where ZINC's design heritage earns its place: the agent works inside a
// system we design (components, brand rules, approvals) before it touches
// production. Weeks are typical for a marketing site; the assessment dates
// the real plan.

export type SetupStep = { when: string; title: string; text: string; outputs: string[] };

const WEEKS: SetupStep[] = [
  {
    when: "Week 1",
    title: "Map the requests.",
    text: "We list the website requests that eat your team’s week, pick the ones worth handing to an agent, and agree who approves each one.",
    outputs: ["Your request list", "What to automate first", "An approver for each", "What success looks like"],
  },
  {
    when: "Weeks 1 to 2",
    title: "Lay the foundations.",
    text: "We tidy the components, page sections, and content model, and write the brand and tone rules, so every draft comes out looking like you.",
    outputs: ["Component and section rules", "Brand and tone guide", "Content model", "Example requests"],
  },
  {
    when: "Week 2",
    title: "Connect and set the rules.",
    text: "Your agent, repository, host, and Slack are connected to Dispatch. Roles and risk tiers decide what a copy fix needs versus a navigation change.",
    outputs: ["Agent and repository access", "Preview for every change", "Roles and risk tiers", "Slack alerts"],
  },
  {
    when: "Weeks 2 to 3",
    title: "Pilot on real work.",
    text: "We run your actual backlog through the workflow, check every draft against your standards, and fix what the agent gets wrong before your team depends on it.",
    outputs: ["Workflows proven on real requests", "A known-limits list", "Time saved, measured", "A tested restore"],
  },
  {
    when: "Weeks 3 to 4",
    title: "Hand over the helm.",
    text: "We train the people who ask, review, and approve, document each workflow, and agree who looks after what. Run it yourselves, with us, or both.",
    outputs: ["Team training", "Request playbooks", "Support responsibilities", "Next-requests backlog"],
  },
];

// Defaults are the Dispatch setup; other offers pass their own copy and steps
// (see the CMS and CRM workflow variant on /solutions/automation-workflows).
export function DispatchSetup({
  id = "setup",
  heading = "An agent is only as good as the system it builds with.",
  intro = "Most AI website setups fail on taste and structure, not on the model. So we design the guardrails first: the components, brand rules, and approvals your agent works inside. Then we connect it, prove it on your real requests, and hand it over.",
  steps = WEEKS,
  note = "Typical for a marketing site. Your assessment dates the real plan. Turn Dispatch off at any point and the website keeps running.",
}: {
  id?: string;
  heading?: string;
  intro?: string;
  steps?: SetupStep[];
  note?: string;
}) {
  return (
    <section id={id} className="setup">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="setup_head" data-reveal="">
          <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Foundations first &lt;</div></div>
          <div className="margin-bottom margin-small"><h2 className="heading-style-h2">{heading}</h2></div>
          <p className="text-size-medium">{intro}</p>
        </div>
        <ol role="list" className="setup_list">
          {steps.map((w, i) => (
            <li key={w.title} className="setup_item" data-reveal="" style={{ "--i": i } as CSSProperties}>
              <div className="setup_when">{w.when}</div>
              <div className="setup_body">
                <h3 className="heading-style-h5">{w.title}</h3>
                <p>{w.text}</p>
              </div>
              <ul role="list" className="setup_outputs" aria-label={`${w.title} outputs`}>
                {w.outputs.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </li>
          ))}
        </ol>
        <p className="offering-note">{note}</p>
      </div></div></div>
    </section>
  );
}
