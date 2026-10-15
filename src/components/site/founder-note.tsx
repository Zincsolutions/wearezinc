/* eslint-disable @next/next/no-img-element */

// Homepage point of view from Jim. Client stays the hero (they are at the
// helm); ZINC is the guide with 25 years of judgment. Keep it short.
export function FounderNote() {
  return (
    <section className="founder-note" aria-labelledby="founder-note-heading">
      <div className="padding-global"><div className="container-large"><div className="padding-section-large">
        <div className="founder-note_grid">
          <div className="founder-note_tag" data-reveal="">
            <div className="text-style-tagline">&gt; A note from Jim &lt;</div>
          </div>
          <div className="founder-note_body" data-reveal="">
            <h2 id="founder-note-heading" className="heading-style-h2">AI can build your website in an afternoon. It cannot tell you what to say.</h2>
            <p className="text-size-medium">Speed is no longer an advantage. Everyone has it now. What sets a company apart is knowing what to build, what to keep, and what your customers actually need to hear. That has always been the hard part, and it still is.</p>
            <p className="text-size-medium">For more than 25 years, ZINC has helped companies make those calls. Today we pair that judgment with AI that does the heavy lifting, on websites your own team can run by asking. You stay at the helm. We stay right beside you.</p>
            <div className="founder-note_sign">
              <img src="/team/jim-zaslaw.jpg" alt="Jim Zaslaw" width={64} height={64} loading="lazy" className="founder-note_photo" />
              <div>
                <div className="text-weight-semibold">Jim Zaslaw</div>
                <div className="founder-note_role">Founder &amp; CEO, ZINC</div>
              </div>
            </div>
          </div>
        </div>
      </div></div></div>
    </section>
  );
}
