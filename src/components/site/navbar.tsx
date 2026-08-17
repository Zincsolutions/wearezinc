"use client";

import { useRef, useState } from "react";

const SOLUTIONS = [
  { href: "/solutions/ai-strategy-optimization", label: "AI Strategy & Optimization" },
  { href: "/solutions/website-design-development", label: "Website Design & Development" },
  { href: "/solutions/ecommerce-acceleration", label: "Ecommerce Acceleration" },
  { href: "/solutions/content-campaign-systems", label: "Content & Campaign Systems" },
  { href: "/solutions/automation-workflows", label: "Automations & Workflows" },
  { href: "/solutions/branding-positioning", label: "Branding & Positioning" },
];

function BoltIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M9.48945 4.19006C10.7526 4.76021 12.0001 5.32568 13.2515 5.88252C13.4116 5.95376 13.4749 6.04763 13.4745 6.22077C13.4703 8.05865 13.4692 9.89654 13.4739 11.7344C13.4744 11.9262 13.4027 12.0263 13.229 12.1038C11.4373 12.9031 9.64813 13.7079 7.86043 14.5161C7.54757 14.6576 7.22208 14.7749 6.89935 14.9705C7.1408 15.1555 7.40833 15.2296 7.65298 15.3407C9.27885 16.0794 10.9096 16.8072 12.5389 17.5383C12.7772 17.6453 13.0136 17.7575 13.2557 17.8552C13.4074 17.9165 13.4741 18.0113 13.4738 18.1773C13.4709 20.0293 13.4726 21.8813 13.4714 23.7334C13.4713 23.9879 13.4317 24.0102 13.1971 23.9044C11.6915 23.2252 10.1871 22.5435 8.68034 21.8672C6.88387 21.0608 5.08496 20.26 3.28784 19.4551C2.283 19.005 1.28252 18.545 0.273295 18.1051C0.0603969 18.0123 -0.00126074 17.8889 1.94374e-05 17.6688C0.00810455 16.278 0.00401535 14.8871 0.00488607 13.4962C0.00515232 13.0705 0.0158833 12.6446 0.00685812 12.2191C0.0027741 12.0266 0.0785204 11.9251 0.251398 11.8483C1.67055 11.2178 3.08662 10.5803 4.50315 9.9438C5.12806 9.66303 5.7513 9.37852 6.377 9.09954C6.44344 9.06991 6.49471 9.02935 6.56559 8.97215C6.23966 8.76566 5.89334 8.64305 5.56211 8.49307C3.78723 7.6894 2.00913 6.89284 0.229986 6.09869C0.0701638 6.02735 0.0131318 5.92597 0.0123985 5.75459C0.00498711 4.02335 0.0144211 2.29224 0.039187 0.561181C0.0410133 0.433513 0.042322 0.305386 0.0339265 0.178132C0.022676 0.00762675 0.0670872 -0.0425374 0.239163 0.0365613C0.906468 0.343304 1.57823 0.640307 2.24841 0.940738C3.71702 1.59908 5.1858 2.25703 6.65427 2.91569C7.59474 3.33752 8.53478 3.76034 9.48945 4.19006Z" fill="currentColor" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z" fill="currentColor" />
    </svg>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Matches the original behavior: opens on hover; a short grace period on
  // leave lets the pointer cross into the list without flicker.
  // Hover handlers only run on hover-capable devices — on touch, a tap fires
  // mouseenter AND click, which would open-then-toggle-closed.
  const canHover = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;
  const enter = () => {
    if (!canHover()) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDdOpen(true);
  };
  const leave = () => {
    if (!canHover()) return;
    closeTimer.current = setTimeout(() => setDdOpen(false), 50);
  };

  return (
    <div className="nav" role="banner">
      <div className="nav-inner">
        <a href="/" className="nav-logo-link" aria-label="ZINC home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wf/695bda13c7c5d5a8fcdb4489_relume-127136.webp" alt="ZINC" className="nav-logo" height={32} loading="eager" />
        </a>

        <nav role="navigation" className={`nav-menu${menuOpen ? " open" : ""}`}>
          <div
            className={`nav-dd${ddOpen ? " open" : ""}`}
            onMouseEnter={enter}
            onMouseLeave={leave}
          >
            <button
              type="button"
              className="nav-dd-toggle nav-link"
              aria-expanded={ddOpen}
              onClick={() => setDdOpen((v) => !v)}
            >
              <div>Solutions</div>
              <div className="nav-dd-chevron"><Chevron /></div>
            </button>
            <nav className="nav-dd-list">
              {SOLUTIONS.map((s) => (
                <a key={s.href} href={s.href} className="nav-dd-link">{s.label}</a>
              ))}
            </nav>
          </div>
          <div className="nav-pages">
            <a href="/work" className="nav-link">Work</a>
            <a href="/blog" className="nav-link">Insights</a>
            <a href="/about-us" className="nav-link">About</a>
          </div>
          <a href="/contact-us" className="btn menu-cta">Contact Us</a>
        </nav>

        <div className="nav-buttons">
          <a href="/solutions/on-brand-aeo-sprint" className="nav-pill">
            <div className="nav-pill-icon-wrap">
              <div className="nav-pill-icon"><BoltIcon /></div>
            </div>
            <div className="nav-pill-text">
              <p className="lg">Get AI Optimized</p>
              <p className="sm">AI SEO Sprint</p>
            </div>
          </a>
          <a href="/contact-us" className="btn nav-cta">Let&apos;s Go!</a>
          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </div>
  );
}
