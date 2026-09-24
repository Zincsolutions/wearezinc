/* ZINC Solutions mega menu for the static (Webflow-ported) pages.
   Replaces the old Webflow dropdown with the same menu the React header
   renders (src/components/site/navbar.tsx): four columns, one-line
   descriptions, a featured row, and a footer prompt. Opens on hover or
   click, Escape closes it, and on tablet and below it becomes an open
   accordion inside the Webflow mobile menu. Styles: /css/nav-mega.css. */
(function () {
  'use strict';

  // Keep in sync with src/components/site/solution-groups.json
  // (tests/repository.test.mjs fails if they drift).
  var GROUPS = /* solution-groups:start */[
    {
      "heading": "Websites",
      "links": [
        { "href": "/solutions/ai-native-websites", "label": "AI-Native Websites", "desc": "Update your site by asking an AI agent.", "featured": true },
        { "href": "/solutions/ai-website-migration", "label": "AI Website Migration", "desc": "Move your site. Keep what works." },
        { "href": "/solutions/enterprise-websites", "label": "Enterprise Websites & CMS", "desc": "Webflow Enterprise and CMS integrations." },
        { "href": "/solutions/website-design-development", "label": "Website Design & Development", "desc": "New builds and focused improvements." },
        { "href": "/solutions/ai-dispatch", "label": "Dispatch", "desc": "Governance for AI-powered websites." }
      ]
    },
    {
      "heading": "E-commerce Acceleration",
      "links": [
        { "href": "/solutions/ecommerce-acceleration", "label": "E-commerce Acceleration", "desc": "Storefronts, product discovery, and automation." }
      ]
    },
    {
      "heading": "AI Enablement",
      "links": [
        { "href": "/solutions/ai-enablement", "label": "AI Strategy & Training", "desc": "Find where AI helps and train your team." },
        { "href": "/solutions/automation-workflows", "label": "AI Workflows & Automation", "desc": "Connect AI to your CMS, CRM, and marketing." }
      ]
    },
    {
      "heading": "Strategy & Brand",
      "links": [
        { "href": "/solutions/branding-positioning", "label": "Brand Strategy & Design", "desc": "Positioning, messaging, and identity." }
      ]
    }
  ]/* solution-groups:end */;

  var old = document.querySelector('.navbar2_menu-dropdown');
  if (!old) return;
  var navbar = old.closest('.navbar2_component');
  var desktop = window.matchMedia('(min-width: 992px)');
  var hover = window.matchMedia('(hover: hover)');

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // ---- build ----
  // Keep the wrapper's Webflow classes (minus the w-dropdown runtime hook)
  // so the header's own theme and mobile layout still apply, e.g. white
  // text on dark headers.
  var dd = el('div', 'nav-dd');
  Array.prototype.forEach.call(old.classList, function (c) {
    if (c !== 'w-dropdown') dd.classList.add(c);
  });
  var toggle = el('button', 'navbar2_dropdwn-toggle navbar2_link nav-dd-toggle');
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'nav-mega');
  toggle.appendChild(el('div', '', 'Solutions'));
  var chevron = old.querySelector('.dropdown-chevron');
  if (chevron) {
    chevron.classList.remove('w-embed');
    chevron.classList.add('nav-dd-chevron');
    toggle.appendChild(chevron);
  }

  var mega = el('div', 'nav-mega');
  mega.id = 'nav-mega';
  mega.setAttribute('role', 'region');
  mega.setAttribute('aria-label', 'Solutions');
  var inner = el('div', 'nav-mega__inner');
  var grid = el('div', 'nav-mega__grid');
  GROUPS.forEach(function (g) {
    var col = el('div', 'nav-mega__col');
    col.appendChild(el('p', 'nav-mega__heading', g.heading));
    var list = el('ul', 'nav-mega__list');
    list.setAttribute('role', 'list');
    g.links.forEach(function (l) {
      var li = el('li');
      var a = el('a', 'nav-mega__link' + (l.featured ? ' is-featured' : ''));
      a.href = l.href;
      if (window.location.pathname === l.href) a.setAttribute('aria-current', 'page');
      var label = el('span', 'nav-mega__label', l.label);
      if (l.featured) label.appendChild(el('span', 'nav-mega__badge', 'Featured'));
      a.appendChild(label);
      a.appendChild(el('span', 'nav-mega__desc', l.desc));
      li.appendChild(a);
      list.appendChild(li);
    });
    col.appendChild(list);
    grid.appendChild(col);
  });
  var foot = el('div', 'nav-mega__foot');
  foot.appendChild(el('p', '', 'Not sure where to start?'));
  var cta = el('a', 'nav-mega__cta', 'Talk About Your Goals >');
  cta.href = '/contact-us';
  foot.appendChild(cta);
  inner.appendChild(grid);
  inner.appendChild(foot);
  mega.appendChild(inner);
  dd.appendChild(toggle);
  dd.appendChild(mega);

  // A fresh node carries none of Webflow's dropdown handlers.
  old.parentNode.replaceChild(dd, old);
  if (navbar) {
    navbar.classList.add('has-mega');
    if (navbar.classList.contains('black')) navbar.classList.add('is-dark');
  }

  // ---- behavior (mirrors navbar.tsx) ----
  var closeTimer = null;
  function setOpen(open) {
    dd.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  // Hover only on hover-capable desktop layouts: on touch a tap fires
  // mouseenter AND click, which would open and then toggle closed.
  function hoverMenu() { return hover.matches && desktop.matches; }

  dd.addEventListener('mouseenter', function () {
    if (!hoverMenu()) return;
    clearTimeout(closeTimer);
    setOpen(true);
  });
  dd.addEventListener('mouseleave', function () {
    if (!hoverMenu()) return;
    closeTimer = setTimeout(function () { setOpen(false); }, 50);
  });
  dd.addEventListener('focusout', function (e) {
    if (hoverMenu() && !dd.contains(e.relatedTarget)) setOpen(false);
  });
  toggle.addEventListener('click', function () {
    setOpen(!dd.classList.contains('open'));
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && dd.classList.contains('open')) {
      setOpen(false);
      if (dd.contains(document.activeElement)) toggle.focus();
    }
  });

  // Mobile menu: while Webflow's menu is open, lock the page behind it
  // and size the sheet to start at the header's bottom edge.
  var burger = navbar && navbar.querySelector('.w-nav-button');
  if (burger && window.MutationObserver) {
    new MutationObserver(function () {
      var open = burger.classList.contains('w--open');
      var root = document.documentElement;
      root.classList.toggle('nav-sheet-open', open);
      if (open) root.style.setProperty('--mm-nav-h', Math.round(navbar.getBoundingClientRect().bottom) + 'px');
    }).observe(burger, { attributes: true, attributeFilter: ['class'] });
  }

  // Tablet and below: Solutions starts open inside the mobile menu, as on
  // the homepage. Crossing back to desktop closes it.
  function syncLayout() { setOpen(!desktop.matches); }
  syncLayout();
  if (desktop.addEventListener) desktop.addEventListener('change', syncLayout);
  else desktop.addListener(syncLayout);
})();
