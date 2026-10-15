import type { CSSProperties } from "react";

// "Keep exploring": the closing link block on solutions pages. Three short
// columns (usually: related paths, reading, and the decision the reader is
// weighing) so nobody reaches the end of a page with nowhere to go, and
// crawlers see how the offers connect.

export type ExploreLink = { href: string; title: string; note?: string };
export type ExploreGroup = { heading: string; links: ExploreLink[] };

export function KeepExploring({
  heading = "Where to go from here.",
  groups,
}: {
  heading?: string;
  groups: ExploreGroup[];
}) {
  return (
    <section className="keep-exploring" aria-labelledby="keep-exploring-heading">
      <div className="padding-global"><div className="container-large"><div className="keep-exploring_pad">
        <div className="keep-exploring_head" data-reveal="">
          <div className="text-style-tagline">&gt; Keep exploring &lt;</div>
          <h2 id="keep-exploring-heading" className="heading-style-h3">{heading}</h2>
        </div>
        <div className="keep-exploring_grid">
          {groups.map((g, i) => (
            <nav key={g.heading} className="keep-exploring_group" aria-label={g.heading} data-reveal="" style={{ "--i": i } as CSSProperties}>
              <h3 className="keep-exploring_group-heading">{g.heading}</h3>
              <ul role="list" className="keep-exploring_list">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="keep-exploring_link">
                      <span className="keep-exploring_title">{l.title}<span aria-hidden="true" className="keep-exploring_arrow">&gt;</span></span>
                      {l.note ? <span className="keep-exploring_note">{l.note}</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div></div></div>
    </section>
  );
}

// Shared links, so a renamed page or post only changes in one place.
export const EXPLORE = {
  aiNative: { href: "/solutions/ai-native-websites", title: "AI-Native Websites", note: "Update your site by asking your own AI agent." },
  migration: { href: "/solutions/ai-website-migration", title: "AI Website Migration", note: "Move your site without losing what it has earned." },
  wordpress: { href: "/solutions/wordpress-ai-website-migration", title: "WordPress to AI-Native", note: "No plugins to patch. Every plugin gets a destination." },
  dispatch: { href: "/solutions/ai-dispatch", title: "Dispatch", note: "Preview, approvals, history, and restore for AI changes." },
  enterprise: { href: "/solutions/enterprise-websites", title: "Webflow Enterprise & CMS", note: "Get more from the platform your team already loves." },
  design: { href: "/solutions/website-design-development", title: "Website Design & Development", note: "New sites and redesigns, built on the right platform." },
  ecommerce: { href: "/solutions/ecommerce-acceleration", title: "E-commerce Acceleration", note: "Get your store chosen by AI shoppers." },
  realChange: { href: "/solutions/ai-native-websites#real-change", title: "Watch a real change on this site", note: "One request, one send-back, live in 15 minutes." },
  postDispatch: { href: "/post/what-is-dispatchvault-management-layer-for-ai-powered-websites", title: "What is DispatchVault?", note: "The management layer for AI-powered websites, explained." },
  postStructure: { href: "/post/structuring-your-site-for-ai-optimization-aeo", title: "Structuring your site for AI optimization", note: "How answer engines read your pages." },
  postSeo: { href: "/post/how-seo-is-evolving-in-the-age-of-ai-search", title: "How SEO is evolving in the age of AI search", note: "What changes when the answer arrives first." },
  postBuild: { href: "/post/idea-to-market-fast-ai-build-process", title: "From idea to market, fast", note: "Inside an AI-assisted build process." },
  assessment: { href: "/solutions/ai-native-websites#assessment", title: "Request a website assessment", note: "Improve, migrate, or redesign? Get a straight answer." },
  preview: { href: "/solutions/wordpress-ai-website-migration#preview", title: "Get a free migration preview", note: "Two pages rebuilt and one real change, no commitment." },
  contact: { href: "/contact-us", title: "Talk to ZINC", note: "Strategy, brand, commerce, or a new site." },
} satisfies Record<string, ExploreLink>;
