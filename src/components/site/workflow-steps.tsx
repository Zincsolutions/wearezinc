"use client";

import { useState } from "react";

// Explanatory walkthrough of the Request / Preview / Approve / Publish
// workflow on the AI-native websites page. A local, illustrative
// interaction only: static copy per step, no agent and no Dispatch calls.

const STEPS = [
  {
    label: "Request",
    title: "Start with a simple update.",
    body: "Ask for a new headline and an image from your approved library. Your agent prepares a version for review.",
    sketchLabel: "Example request",
    sketch: "“Change the headline to ‘Built for what’s next’ and use our new team photo.”",
  },
  {
    label: "Preview",
    title: "See the result in context.",
    body: "Check the new headline and photo in a page preview. Ask your agent for adjustments if needed.",
    sketchLabel: "Illustrative page preview",
    sketch: "Built for what’s next · Approved team photo replaces the previous image.",
  },
  {
    label: "Approve",
    title: "Your team makes the decision.",
    body: "Review the proposed change through Dispatch. Approve it when it is ready, or send it back with feedback.",
    sketchLabel: "Human review",
    sketch: "Headline and image checked. Change approved for publication.",
  },
  {
    label: "Publish",
    title: "Publish with a record.",
    body: "Release the approved update. Dispatch keeps a record of the change and the supported recovery path.",
    sketchLabel: "Release checkpoint",
    sketch: "New headline and photo published. Change history retained.",
  },
];

export function WorkflowSteps() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  return (
    <div className="workflow">
      <div className="workflow_controls" role="group" aria-label="Explore the website change workflow">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`workflow_control${i === active ? " is-active" : ""}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <span className="workflow_control-number">{String(i + 1).padStart(2, "0")}</span>
            {s.label}
          </button>
        ))}
      </div>
      <div className="workflow_panel" aria-live="polite">
        <div className="workflow_text">
          <h3 className="heading-style-h4">{step.title}</h3>
          <p className="text-size-medium">{step.body}</p>
        </div>
        <div className="workflow_sketch">
          <div className="text-style-tagline workflow_sketch-label">{step.sketchLabel}</div>
          <p className="workflow_sketch-text">{step.sketch}</p>
        </div>
      </div>
    </div>
  );
}
