// "We moved our own site first": proof from wearezinc.com's own Webflow to
// Next.js migration (capture Aug 12, 2026). Sources: the URL inventory is
// migration/webflow/manifest.json grouped by template, the redirects are in
// next.config.ts, asset and CMS counts are from the capture, the change
// count is merged PRs Aug 18 to Sep 27, 2026, and page weight is the median
// of three cold loads at 1440px (Oct 15, 2026; Webflow figures load the
// archived capture). Keep the Webflow framing neutral: we still sell it.

const INVENTORY = [
  { template: "Blog posts", path: "/post/…", urls: 16, kept: 16 },
  { template: "Solutions pages", path: "/solutions/…", urls: 10, kept: 9 },
  { template: "Core pages", path: "/, /about-us, /work …", urls: 10, kept: 7 },
  { template: "Case studies", path: "/work/…, /thomabravo", urls: 6, kept: 6 },
  { template: "Partner pages", path: "/partners/…", urls: 4, kept: 3 },
  { template: "Legal pages", path: "/about/…", urls: 3, kept: 3 },
];

const STATS = [
  { value: "49 of 49", label: "live URLs kept or redirected" },
  { value: "549", label: "files moved off the old CDN" },
  { value: "1 day", label: "to the first complete build" },
  { value: "36", label: "reviewed changes in the first six weeks" },
];

export function OwnMigrationProof({
  id = "proof",
  cta,
  compact = false,
}: {
  id?: string;
  cta?: { href: string; label: string };
  compact?: boolean;
}) {
  if (compact) {
    return (
      <section id={id} className="proof is-compact">
        <div className="padding-global"><div className="container-large"><div className="padding-section-large">
          <div className="proof_head" data-reveal="">
            <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Proof, not promises &lt;</div></div>
            <div className="margin-bottom margin-small"><h2 className="heading-style-h2">We moved our own website first.</h2></div>
            <p className="text-size-medium">wearezinc.com moved from Webflow to Next.js in August 2026, using the same six steps. Here is what that looked like.</p>
          </div>
          <dl className="proof_stats" data-reveal="">
            {STATS.map((s) => (
              <div key={s.label} className="proof_stat">
                <dt className="proof_stat-label">{s.label}</dt>
                <dd className="proof_stat-value">{s.value}</dd>
              </div>
            ))}
          </dl>
          <a href="/solutions/ai-website-migration#proof" className="faq-link">See the full URL inventory and what we learned &gt;</a>
        </div></div></div>
      </section>
    );
  }
  return (
    <section id={id} className="proof">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="proof_head" data-reveal="">
          <div className="margin-bottom margin-xsmall"><div className="text-style-tagline">&gt; Proof, not promises &lt;</div></div>
          <div className="margin-bottom margin-small"><h2 className="heading-style-h2">We moved our own website first.</h2></div>
          <p className="text-size-medium">In August 2026, wearezinc.com moved from Webflow to Next.js on Vercel, using the same six steps we use for clients. Webflow served us well, and we still build on it for enterprise teams. We moved for one reason: how fast the site could change.</p>
        </div>

        <dl className="proof_stats" data-reveal="">
          {STATS.map((s) => (
            <div key={s.label} className="proof_stat">
              <dt className="proof_stat-label">{s.label}</dt>
              <dd className="proof_stat-value">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="proof_grid">
          <div className="proof_table-wrap" data-reveal="">
            <table className="proof_table">
              <caption>URL inventory for wearezinc.com before the move, by template</caption>
              <thead>
                <tr><th scope="col">Template</th><th scope="col">URLs</th><th scope="col">Outcome</th></tr>
              </thead>
              <tbody>
                {INVENTORY.map((row) => (
                  <tr key={row.template}>
                    <th scope="row">{row.template}<span className="proof_path">{row.path}</span></th>
                    <td>{row.urls}</td>
                    <td>
                      {row.kept === row.urls
                        ? <span className="proof_pill">All kept</span>
                        : <span className="proof_pill is-mixed">{row.kept} kept · {row.urls - row.kept} redirected</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><th scope="row">Total</th><td>49</td><td><span className="proof_pill is-total">44 kept · 5 redirected · 0 lost</span></td></tr>
              </tfoot>
            </table>
          </div>

          <div className="proof_side">
            <div className="proof_card" data-reveal="">
              <div className="proof_card-label">Page weight</div>
              <h3 className="heading-style-h5">About the same, and that is the point.</h3>
              <p>Our homepage was already light on Webflow: about 0.7 MB and 38 requests on first load. On Next.js it is 0.64 MB and 35. If a migration pitch leads with page weight, ask what your site weighs today. The bigger gain is the pace of change.</p>
            </div>
            <div className="proof_card is-lesson" data-reveal="">
              <div className="proof_card-label">What we learned</div>
              <h3 className="heading-style-h5">Test the form all the way to a person.</h3>
              <p>After launch, our forms saved every lead to the CRM. But the CRM does not send alerts for contacts created through its API, so nobody was told. The leads were safe and unseen until we caught it. Notification is now a launch check on every migration, tested to the inbox.</p>
            </div>
          </div>
        </div>

        {cta ? (
          <div className="offering-links">
            <a href={cta.href} className="button w-button">{cta.label} &gt;</a>
            <a href="/solutions/ai-native-websites#real-change" className="button is-link w-button">Watch a real change on this site &gt;</a>
          </div>
        ) : null}
        <p className="offering-note">How we measured page weight: homepage first load at 1440px, cache disabled, median of three runs on October 15, 2026. Webflow figures load the archived August 12 capture of the live site.</p>
      </div></div></div>
    </section>
  );
}
