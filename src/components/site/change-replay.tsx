"use client";

import { useEffect, useRef, useState } from "react";

// Replay of a real Dispatch request on this website: req-28b8544e, Aug 18,
// 2026 (GitHub PR #1, branch dispatch/req-28b8544e). Times are the commit and
// merge timestamps converted to Pacific time; file stats are from the PR.
// Keep it factual: if this ever swaps to a newer request, take every detail
// from that request's PR, not from memory.

type Step = {
  label: string;
  time: string;
  title: string;
  body: string;
  status: string;
  tone: "neutral" | "progress" | "warn" | "done";
};

const STEPS: Step[] = [
  {
    label: "Request",
    time: "12:09 PM",
    title: "Ask in plain language.",
    body: "A ZINC team member opened a Dispatch request: add a credit line under the footer copyright saying the site is operated with AI and governed by Dispatch.",
    status: "Requested",
    tone: "neutral",
  },
  {
    label: "Preview",
    time: "12:09 PM",
    title: "The agent builds it on its own branch.",
    body: "Claude Code made the change on a separate branch and put it on a preview: two files, matched to the footer’s existing type and hover style. The live site never saw it.",
    status: "Preview ready",
    tone: "progress",
  },
  {
    label: "Send back",
    time: "12:19 PM",
    title: "A person says “not quite.”",
    body: "The requester read the line in context and sent it back with one note: drop “operated with AI.” The agent revised the same branch, and a fresh preview replaced the old one.",
    status: "Changes requested",
    tone: "warn",
  },
  {
    label: "Approve",
    time: "12:24 PM",
    title: "Approved, live, and on the record.",
    body: "Approval in Dispatch released the change. The record keeps who asked, what changed, who approved it, and the version to restore if anyone ever needs it.",
    status: "Approved · Live",
    tone: "done",
  },
];

const AUTOPLAY_MS = 2600;

function Card({ index }: { index: number }) {
  const step = STEPS[index];
  return (
    <div className="replay_card">
      <div className="replay_card-head">
        <span className="replay_id">req-28b8544e</span>
        <span className={`replay_status is-${step.tone}`}>{step.status}</span>
      </div>

      {index === 0 ? (
        <div className="replay_card-body">
          <div className="replay_kicker">Request</div>
          <p className="replay_request">Add a credit line under the footer copyright: “This site is operated with AI and governed by Dispatch,” with Dispatch linked.</p>
        </div>
      ) : (
        <div className="replay_card-body">
          <div className="replay_kicker">
            {index === 3 ? "Live on wearezinc.com" : "Preview · dispatch/req-28b8544e"}
          </div>
          <div className="replay_footer">
            <span className="replay_footer-copy">© 2026 ZINC Solutions Inc. All rights reserved.</span>
            <span className="replay_footer-line">
              This site is{" "}
              {index === 1 ? <>operated with AI and </> : null}
              {index === 2 ? <del>operated with AI and </del> : null}
              governed by <u>Dispatch</u>
            </span>
          </div>
          {index === 1 ? <div className="replay_meta">2 files changed · matched to footer styles</div> : null}
          {index === 2 ? <div className="replay_meta replay_note">Note from reviewer: “Drop ‘operated with AI.’”</div> : null}
          {index === 3 ? (
            <dl className="replay_record">
              <div><dt>Requested</dt><dd>ZINC team · 12:09 PM</dd></div>
              <div><dt>Built by</dt><dd>Claude Code</dd></div>
              <div><dt>Revised</dt><dd>Once · 12:19 PM</dd></div>
              <div><dt>Approved</dt><dd>In Dispatch · 12:24 PM</dd></div>
            </dl>
          ) : null}
        </div>
      )}
    </div>
  );
}

export function ChangeReplay() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [userDriven, setUserDriven] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  // Play the replay once when it first scrolls into view. Skipped for
  // reduced motion; any click hands control back to the reader.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          setActive(0);
          setPlaying(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay ends on its own at the last step.
  const running = playing && active < STEPS.length - 1;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((a) => a + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [running, active]);

  const choose = (i: number) => {
    setPlaying(false);
    setUserDriven(true);
    setActive(i);
  };

  const replay = () => {
    setUserDriven(true);
    setActive(0);
    setPlaying(true);
  };

  const step = STEPS[active];

  return (
    <div className="workflow replay" ref={root}>
      <div className="replay_bar">
        <div className="workflow_controls" role="group" aria-label="Steps of a real website change">
          {STEPS.map((s, i) => (
            <button
              key={s.label}
              type="button"
              className={`workflow_control${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
              aria-pressed={i === active}
              onClick={() => choose(i)}
            >
              <span className="workflow_control-number">{s.time}</span>
              {s.label}
            </button>
          ))}
        </div>
        <button type="button" className="replay_again" onClick={replay} disabled={running}>
          {running ? "Playing…" : "Replay"}
        </button>
      </div>
      <div className="replay_progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${(active + 1) / STEPS.length})` }} />
      </div>
      <div className="workflow_panel" aria-live={userDriven ? "polite" : "off"}>
        <div key={`text-${active}`} className="workflow_text workflow_swap">
          <div className="replay_step-time">Aug 18, 2026 · {step.time} PT</div>
          <h3 className="heading-style-h4">{step.title}</h3>
          <p className="text-size-medium">{step.body}</p>
        </div>
        <div key={`card-${active}`} className="workflow_swap">
          <Card index={active} />
        </div>
      </div>
    </div>
  );
}
