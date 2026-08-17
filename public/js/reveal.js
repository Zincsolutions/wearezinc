// Line-reveal animation for [data-gsap-lines] headlines (Z-01-compliant:
// IntersectionObserver + failsafe + reduced-motion instant reveal).
// Shared by the static pages (inline) and componentized pages (this file).
(function () {
  'use strict';
  var SELECTOR = '[data-gsap-lines]';
  var DEFAULTS = { y: 26, duration: 0.85, stagger: 0.12, delay: 0.25, ease: 'power3.out' };
  var FAILSAFE_MS = 2500;
  var instances = new Map();
  var done = new WeakSet();

  function clearInline(el) {
    el.style.visibility = 'visible';
    el.querySelectorAll('.line, .line > span').forEach(function (n) {
      n.style.opacity = '';
      n.style.transform = '';
    });
  }

  function revertSplit(el) {
    var inst = instances.get(el);
    if (inst) { try { inst.revert(); } catch (e) {} instances.delete(el); }
  }

  function finish(el) {
    revertSplit(el);
    clearInline(el);
    done.add(el);
  }

  function forceRevealAll() {
    document.querySelectorAll(SELECTOR).forEach(finish);
    document.documentElement.classList.remove('gsap-js');
  }

  var failsafe = setTimeout(forceRevealAll, FAILSAFE_MS);

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function num(el, name, fallback) {
    var raw = el.getAttribute(name);
    if (raw == null || raw === '') return fallback;
    var n = Number(String(raw).trim().replace(',', '.'));
    return isFinite(n) ? n : fallback;
  }

  function animate(el) {
    if (done.has(el)) return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !window.SplitType || !window.gsap || !('IntersectionObserver' in window)) {
      finish(el);
      return;
    }
    var inst = new SplitType(el, { types: 'lines', lineClass: 'line' });
    instances.set(el, inst);
    el.querySelectorAll('.line').forEach(function (line) {
      var span = document.createElement('span');
      while (line.firstChild) span.appendChild(line.firstChild);
      line.appendChild(span);
    });
    var parts = el.querySelectorAll('.line > span');
    if (!parts.length) { finish(el); return; }
    gsap.set(parts, { y: num(el, 'data-gsap-y', DEFAULTS.y), opacity: 0 });
    el.style.visibility = 'visible';
    var played = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || played) return;
        played = true;
        io.disconnect();
        gsap.to(parts, {
          y: 0,
          opacity: 1,
          duration: num(el, 'data-gsap-duration', DEFAULTS.duration),
          ease: DEFAULTS.ease,
          stagger: num(el, 'data-gsap-stagger', DEFAULTS.stagger),
          delay: num(el, 'data-gsap-delay', DEFAULTS.delay),
          onComplete: function () { finish(el); }
        });
        setTimeout(function () { if (!done.has(el)) finish(el); }, 4000);
      });
    }, { threshold: 0.1 });
    io.observe(el);
  }

  function init() {
    var els = document.querySelectorAll(SELECTOR);
    if (!els.length) { clearTimeout(failsafe); return; }
    Promise.resolve()
      .then(function () { return window.SplitType || loadScript('/vendor/split-type.min.js'); })
      .then(function () { return window.gsap || loadScript('/vendor/gsap.min.js'); })
      .then(function () {
        clearTimeout(failsafe);
        els.forEach(animate);
      })
      .catch(forceRevealAll);
  }

  // Run now if the DOM is already parsed (Next.js loads this script after
  // DOMContentLoaded has fired); otherwise wait for it.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
