/* eslint-disable @next/next/no-img-element */
// Agency credibility strip for the website offering pages. The logos are
// the approved client logos already used on the homepage and show general
// agency experience; they are not endorsements of a specific offer.

const LOGOS = [
  { src: "/wf/695bda13c7c5d5a8fcdb4543_TB_Logo.webp", alt: "Thoma Bravo" },
  { src: "/wf/695bda13c7c5d5a8fcdb4542_Nagigator_logo.webp", alt: "Navigator" },
  { src: "/wf/695bda13c7c5d5a8fcdb4545_g99_logo.webp", alt: "Growth99" },
  { src: "/wf/695bda13c7c5d5a8fcdb4541_Sequel.webp", alt: "Sequel" },
];

export function TrustStrip({ lead, note }: { lead: string; note?: string }) {
  return (
    <section className="trust-strip" aria-label="Brands ZINC has worked with">
      <div className="padding-global"><div className="container-large">
        <div className="trust-strip__inner">
          <div>
            <p className="trust-strip__copy">{lead}</p>
            {note ? <p className="trust-strip__note">{note}</p> : null}
          </div>
          <div className="trust-strip__logos">
            {LOGOS.map((l) => (
              <div key={l.alt} className="trust-strip__logo"><img src={l.src} alt={l.alt} loading="lazy" /></div>
            ))}
          </div>
        </div>
      </div></div>
    </section>
  );
}
