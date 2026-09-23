import { HomeLink } from "./home-link";

const SOLUTION_LINKS = [
  { href: "/solutions/ai-native-websites", label: "AI-Native Websites" },
  { href: "/solutions/ai-website-migration", label: "AI Website Migration" },
  { href: "/solutions/enterprise-websites", label: "Enterprise Websites & CMS" },
  { href: "/solutions/ai-dispatch", label: "Dispatch" },
  { href: "/solutions/website-design-development", label: "Website Design & Development" },
  { href: "/solutions/ecommerce-acceleration", label: "E-commerce Acceleration" },
  { href: "/solutions/ai-enablement", label: "AI Strategy & Training" },
  { href: "/solutions/automation-workflows", label: "AI Workflows & Automation" },
  { href: "/solutions/branding-positioning", label: "Brand Strategy & Design" },
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
                  <HomeLink className="footer-logo-mark">
                    {/* ZINC mark as inline SVG so it can turn orange on hover */}
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="footer-logo" role="img" aria-hidden="true">
                      <circle className="footer-logo-mark__bg" cx="50" cy="50" r="50" />
                      <g transform="translate(30.15 16) scale(2.8333)">
                        <path className="footer-logo-mark__symbol" d="M9.48945 4.19006C10.7526 4.76021 12.0001 5.32568 13.2515 5.88252C13.4116 5.95376 13.4749 6.04763 13.4745 6.22077C13.4703 8.05865 13.4692 9.89654 13.4739 11.7344C13.4744 11.9262 13.4027 12.0263 13.229 12.1038C11.4373 12.9031 9.64813 13.7079 7.86043 14.5161C7.54757 14.6576 7.22208 14.7749 6.89935 14.9705C7.1408 15.1555 7.40833 15.2296 7.65298 15.3407C9.27885 16.0794 10.9096 16.8072 12.5389 17.5383C12.7772 17.6453 13.0136 17.7575 13.2557 17.8552C13.4074 17.9165 13.4741 18.0113 13.4738 18.1773C13.4709 20.0293 13.4726 21.8813 13.4714 23.7334C13.4713 23.9879 13.4317 24.0102 13.1971 23.9044C11.6915 23.2252 10.1871 22.5435 8.68034 21.8672C6.88387 21.0608 5.08496 20.26 3.28784 19.4551C2.283 19.005 1.28252 18.545 0.273295 18.1051C0.0603969 18.0123 -0.00126074 17.8889 1.94374e-05 17.6688C0.00810455 16.278 0.00401535 14.8871 0.00488607 13.4962C0.00515232 13.0705 0.0158833 12.6446 0.00685812 12.2191C0.0027741 12.0266 0.0785204 11.9251 0.251398 11.8483C1.67055 11.2178 3.08662 10.5803 4.50315 9.9438C5.12806 9.66303 5.7513 9.37852 6.377 9.09954C6.44344 9.06991 6.49471 9.02935 6.56559 8.97215C6.23966 8.76566 5.89334 8.64305 5.56211 8.49307C3.78723 7.6894 2.00913 6.89284 0.229986 6.09869C0.0701638 6.02735 0.0131318 5.92597 0.0123985 5.75459C0.00498711 4.02335 0.0144211 2.29224 0.039187 0.561181C0.0410133 0.433513 0.042322 0.305386 0.0339265 0.178132C0.022676 0.00762675 0.0670872 -0.0425374 0.239163 0.0365613C0.906468 0.343304 1.57823 0.640307 2.24841 0.940738C3.71702 1.59908 5.1858 2.25703 6.65427 2.91569C7.59474 3.33752 8.53478 3.76034 9.48945 4.19006Z" />
                      </g>
                    </svg>
                  </HomeLink>
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
