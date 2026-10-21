import type { CSSProperties } from "react";

// Hub of platform-specific migration paths (AI Website Migration page).
// WordPress first: it is the main migration opportunity (positioning.md).
// Webflow is a decision page, not an exit.

const PATHS = [
  { href: "/solutions/wordpress-ai-website-migration", from: "From WordPress", title: "WordPress to AI-native", text: "No plugins to patch. Every plugin function gets an agreed replacement." },
  { href: "/solutions/webflow-ai-website-migration", from: "From Webflow", title: "Webflow or AI-native?", text: "Two good answers. We build both and will tell you which fits your team." },
  { href: "/solutions/wix-ai-website-migration", from: "From Wix", title: "Wix to AI-native", text: "Wix will not let the site leave. We rebuild it and recover the content." },
  { href: "/solutions/squarespace-ai-website-migration", from: "From Squarespace", title: "Squarespace to AI-native", text: "When the brand outgrows the template. Blog and media moved, design freed." },
  { href: "/solutions/hubspot-cms-ai-website-migration", from: "From HubSpot CMS", title: "Keep HubSpot. Move the website.", text: "The CRM, forms, and attribution stay. The website moves." },
  { href: "/solutions/framer-ai-website-migration", from: "From Framer", title: "Framer to AI-native", text: "Keep the design, motion included. Own the code underneath it." },
];

export function MigrationPathsHub({ id = "paths" }: { id?: string }) {
  return (
    <section id={id} className="section_layout249">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="margin-bottom margin-xxlarge" data-reveal=""><div className="max-width-large">
          <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Migration paths &lt;</div></div>
          <div className="margin-bottom margin-small"><h2 className="heading-style-h2">Pick the move you are planning.</h2></div>
          <p className="text-size-medium">Each path covers what moves, what each platform feature becomes, and when staying put is the smarter call.</p>
        </div></div>
        <div className="paths_grid">
          {PATHS.map((p, i) => (
            <a key={p.href} href={p.href} className="paths_card" data-reveal="" style={{ "--i": i % 3 } as CSSProperties}>
              <span className="paths_from">{p.from}</span>
              <span className="paths_title">{p.title}</span>
              <span className="paths_text">{p.text}</span>
              <span className="paths_go" aria-hidden="true">See the path &gt;</span>
            </a>
          ))}
        </div>
        <p className="offering-note">Not sure what you have? <a href="/migration-planner" className="faq-link">Run the free migration planner &gt;</a> Moving from Drupal, Sitecore, or a custom CMS? The method is the same. <a href="#quote" className="faq-link">Tell us what you are on &gt;</a></p>
      </div></div></div>
    </section>
  );
}
