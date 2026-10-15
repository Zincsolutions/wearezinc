// "Which stack for which job": how ZINC recommends a platform before looking
// at a site. Webflow Enterprise and Shopify are first-class answers, not
// fallbacks (positioning: platform by business need; we sell none of them).

const PICKS = [
  {
    job: "A marketing site, blog, or resource library your team changes every week",
    pick: "Astro",
    host: "on Cloudflare, Netlify, or Vercel",
    why: "Pages ship as plain HTML first, so they load fast, and the code is simple for an agent to change safely.",
  },
  {
    job: "A site that shares components with your web app, or has logged-in and personalized pages",
    pick: "Next.js",
    host: "on Vercel",
    why: "The same React components as your product, and pages that refresh without a full rebuild. This website runs on it.",
  },
  {
    job: "A large marketing team that edits on a visual canvas, with enterprise security and review needs",
    pick: "Webflow Enterprise",
    host: "with CMS and CRM integrations",
    why: "Visual editing, a structured CMS, and enterprise hosting and support. We design, build, and add AI workflows there too.",
    href: "/solutions/enterprise-websites",
  },
  {
    job: "A store where commerce is the core of the business",
    pick: "Shopify",
    host: "with AI shopping readiness",
    why: "Checkout, catalog, and AI shopping channels come with the platform. Our job is making your store the one that gets chosen.",
    href: "/solutions/ecommerce-acceleration",
  },
  {
    job: "Content that feeds the website, an app, and documentation at once",
    pick: "A headless CMS",
    host: "alongside your agent",
    why: "Structured content in one place, with fields your editors know, previewed before it goes live.",
  },
  {
    job: "A WordPress site built on heavy custom plugins, run by a team that likes it",
    pick: "Stay put",
    host: "and add AI inside WordPress",
    why: "A move is not always the win. We will tell you when improving what you have is the smarter spend.",
    href: "/solutions/wordpress-ai-website-migration",
  },
];

export function StackPicks({ id = "stack" }: { id?: string }) {
  return (
    <section id={id} className="stack">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="stack_head" data-reveal="">
          <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Which stack for which job &lt;</div></div>
          <div className="margin-bottom margin-small"><h2 className="heading-style-h2">We recommend the stack. We sell none of them.</h2></div>
          <p className="text-size-medium">The right foundation follows what you are building and who will run it, not what an agency prefers. Here is how we decide, before we have even seen your site.</p>
        </div>
        <div className="stack_table-wrap" data-reveal="">
          <table className="stack_table">
            <caption className="u-sr-only">ZINC platform recommendations by type of website</caption>
            <thead>
              <tr>
                <th scope="col">If you are running</th>
                <th scope="col">Our pick</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {PICKS.map((p) => (
                <tr key={p.pick}>
                  <td className="stack_job">{p.job}</td>
                  <th scope="row" className="stack_pick">
                    {p.href ? <a href={p.href}>{p.pick}</a> : p.pick}
                    <span className="stack_host">{p.host}</span>
                  </th>
                  <td className="stack_why">{p.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="offering-note">Not sure which row is you? <a href="#assessment" className="faq-link">Request a website assessment &gt;</a></p>
      </div></div></div>
    </section>
  );
}
