"use client";

// Logo links (header and footer): always a full reload of the homepage,
// starting at the very top, from any page or scroll position. Scroll
// restoration is switched off first so the browser cannot put the reader
// back where they were. Modifier clicks (new tab, etc.) behave normally.
export function HomeLink({
  className,
  children,
  label = "ZINC home",
}: {
  className?: string;
  children: React.ReactNode;
  label?: string;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    try {
      window.history.scrollRestoration = "manual";
    } catch {}
    window.scrollTo(0, 0);
    if (window.location.pathname === "/" && !window.location.hash) {
      window.location.reload();
    } else {
      // Intentional full page load: the logo should restart the homepage.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign("/");
    }
  }
  return (
    // Plain <a> on purpose: a full reload, not client-side navigation.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href="/" className={className} aria-label={label} onClick={onClick}>
      {children}
    </a>
  );
}
