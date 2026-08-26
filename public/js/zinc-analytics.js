(function () {
  "use strict";

  var TRACKED_BOOKING_HOSTS = [
    "calendly.com",
    "calendar.google.com",
    "meetings.hubspot.com",
  ];

  function cleanText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 100);
  }

  function isBookingHost(hostname) {
    return TRACKED_BOOKING_HOSTS.some(function (host) {
      return hostname === host || hostname.endsWith("." + host);
    });
  }

  function destinationFor(link) {
    var href = link.getAttribute("href") || "";

    if (/^mailto:/i.test(href)) return "email";
    if (/^tel:/i.test(href)) return "phone";

    try {
      var url = new URL(href, window.location.href);
      var pathname = url.pathname.replace(/\/+$/, "") || "/";

      if (url.origin === window.location.origin && pathname === "/contact-us") {
        return "contact_page";
      }

      if (isBookingHost(url.hostname)) return "booking";
    } catch (_error) {
      return null;
    }

    return null;
  }

  function locationFor(link) {
    if (link.closest("footer, [class*='footer']")) return "footer";
    if (link.closest("nav, [class*='nav'], [role='navigation']")) return "navigation";
    if (link.closest("header, [class*='hero']")) return "hero";
    return "content";
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var link = target && target.closest ? target.closest("a[href]") : null;
    if (!link) return;

    var destination = destinationFor(link);
    if (!destination || typeof window.gtag !== "function") return;

    var ctaText =
      destination === "email"
        ? "Email ZINC"
        : destination === "phone"
          ? "Call ZINC"
          : cleanText(link.textContent || link.getAttribute("aria-label") || "CTA");

    window.gtag("event", "cta_click", {
      cta_text: ctaText,
      cta_location: locationFor(link),
      cta_destination: destination,
    });
  });
})();
