// Word-by-word scroll reveal on the About page (.layout484_text),
// ported verbatim from the capture. Loads the self-hosted GSAP stack
// on demand, then runs (with a readyState guard — no DOMContentLoaded race).
(function () {
  'use strict';
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = resolve; s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  function run() {

// Function to check if the viewport width is 767px or less
function isMobile() {
  return window.innerWidth <= 767;
}

// Split text into individual words
const layoutText = new SplitType(".layout484_text", { types: "words" });
const layoutTL = gsap.timeline();

// Define different start and end values for mobile devices
let startValue = isMobile() ? "top 35%" : "top center";
let endValue = isMobile() ? "bottom 90%" : "bottom center";

layoutTL.from(layoutText.words,{
  // Initial opacity for each word
  opacity: 0.25,
  // Stagger animation of each word
  stagger: 0.1,
  scrollTrigger: { 
    trigger: ".section_layout484",
    // Trigger animation when .section_layout484 reaches certain part of the viewport
    start: startValue,
    // End animation when .section_layout484 reaches certain part of the viewport
    end: endValue,
    // Smooth transition based on scroll position
    scrub: 2 
  }
});

  }
  function start() {
    Promise.resolve()
      .then(function () { return window.SplitType || loadScript('/vendor/split-type.min.js'); })
      .then(function () { return window.gsap || loadScript('/vendor/gsap.min.js'); })
      .then(function () { return window.ScrollTrigger || loadScript('/vendor/ScrollTrigger.min.js'); })
      .then(function () { if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger); run(); })
      .catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
