const SOLUTION_LINKS = [
  { href: "/solutions/ai-strategy-optimization", label: "AI Enablement" },
  { href: "/solutions/website-design-development", label: "Website & Optimization" },
  { href: "/solutions/ecommerce-acceleration", label: "Ecommerce Acceleration" },
  { href: "/solutions/content-campaign-systems", label: "Content & Campaigns" },
  { href: "/solutions/automation-workflows", label: "Automation & Workflow" },
  { href: "/solutions/branding-positioning", label: "Brand & Positioning" },
];

const COMPANY_LINKS = [
  { href: "/work", label: "Our Work" },
  { href: "/blog", label: "Ideas & Insights" },
  { href: "/about-us", label: "About" },
  { href: "/contact-us", label: "Contact Us" },
];

export function Footer({ currentPath }: { currentPath?: string }) {
  return (
    <footer className="footer">
      <div className="pad-global">
        <div className="container-lg">
          <div className="footer-pad">
            <div className="footer-top">
              <div className="footer-left">
                <div className="footer-logo-block">
                  <a href="/" aria-label="ZINC home">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/wf/69606a5b2a8d96da39f97543_Zinc_footer_logo.webp"
                    alt="ZINC"
                    className="footer-logo"
                    width={100}
                    height={100}
                    loading="lazy"
                  />
                  </a>
                </div>
                <div className="footer-details">
                  <div className="label">Contact ZINC:</div>
                  <div>Ph: (949) 719-4950</div>
                  <div>hello@wearezinc.com</div>
                </div>
              </div>
              <div className="footer-menus">
                <div className="footer-list">
                  {SOLUTION_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
                  ))}
                </div>
                <div className="footer-list">
                  {COMPANY_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="footer-divider" />
            <div className="footer-bottom">
              <div className="footer-credit">
                <div>© 2026 ZINC Solutions Inc. All rights reserved.</div>
                <div className="footer-governed">
                  This site is governed by{" "}
                  <a href="https://dispatchvault.com" target="_blank" rel="noopener noreferrer">Dispatch</a>
                </div>
              </div>
              <div className="footer-legal">
                <a href="/about/privacy-policy" aria-current={currentPath === "/about/privacy-policy" ? "page" : undefined}>Privacy Policy</a>
                <a href="/about/terms-of-use" aria-current={currentPath === "/about/terms-of-use" ? "page" : undefined}>Terms of Use</a>
                <a href="/about/cookie-policy" aria-current={currentPath === "/about/cookie-policy" ? "page" : undefined}>Cookies Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
