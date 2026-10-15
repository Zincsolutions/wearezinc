import { DispatchSetup, type SetupStep } from "@/components/site/dispatch-setup";

// "Foundations first" tuned for CMS, CRM, and marketing workflows. Same
// principle as the Dispatch setup: design the rules and templates before
// anything runs, then prove it on real work. AI drafts, your team approves.
// Timing matches the FAQ (most projects take 2 to 6 weeks).

const STEPS: SetupStep[] = [
  {
    when: "Week 1",
    title: "Map the work.",
    text: "We follow your campaigns, leads, and content from request to result, find the steps that repeat, and agree which ones to automate first and who approves each one.",
    outputs: ["A workflow map", "What to automate first", "An approver for each step", "What success looks like"],
  },
  {
    when: "Weeks 1 to 2",
    title: "Lay the foundations.",
    text: "We tidy the CMS content model and the CRM fields, stages, and lists the automations depend on, and write the brand, tone, and prompt templates every draft follows.",
    outputs: ["Content model and CRM fields", "Brand and tone guide", "Prompt templates", "Clean source data"],
  },
  {
    when: "Weeks 2 to 3",
    title: "Connect and set the rules.",
    text: "We connect your CMS, CRM, and marketing tools with platforms such as Make, Zapier, or HubSpot workflows, and decide which steps run on their own and which wait for a person.",
    outputs: ["Connected tools", "Review points for each workflow", "Alerts when something fails", "Access you control"],
  },
  {
    when: "Weeks 3 to 5",
    title: "Pilot on real work.",
    text: "We run a live campaign, lead flow, or content batch through the workflow, check every output against your standards, and fix what the automation gets wrong before your team depends on it.",
    outputs: ["Workflows proven on real work", "A known-limits list", "Time saved, measured", "A manual fallback for each step"],
  },
  {
    when: "Weeks 5 to 6",
    title: "Hand it over.",
    text: "We train the people who request, review, and approve, document each workflow, and agree who maintains what. Run it yourselves, with us, or both.",
    outputs: ["Team training", "Workflow playbooks", "Support responsibilities", "Next-workflows backlog"],
  },
];

export function WorkflowSetup() {
  return (
    <DispatchSetup
      id="foundations"
      heading="Automations are only as good as the system they run in."
      intro="Most AI automations break on messy data and unclear ownership, not on the model. So we design the foundations first: the content model, CRM fields, templates, and approvals your workflows follow. Then we connect your tools, prove it on real work, and hand it over."
      steps={STEPS}
      note="Typical for a focused workflow project. Your first conversation dates the real plan. Every automation runs in accounts you own, and any step can go back to a person. When a workflow publishes to an AI-native website, our governance platform, Dispatch, adds preview, approval, and history for those changes."
    />
  );
}
