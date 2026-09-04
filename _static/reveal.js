/**
 * Scroll-in reveals for the home page.
 * No-JS: content stays visible. Reduced motion: skip transforms.
 * Rebinds after htmx swaps so back-to-home still works.
 */
(function () {
  'use strict';

  var SELECTOR = [
    '.lh-hero-title',
    '.lh-hero-sub',
    '.lh-hero-cta',
    '.lh-trust',
    '.lh-screens',
    '.lh-section-title',
    '.lh-card',
    '.lh-step',
    '.lh-companion-intro',
    '.lh-stage',
    '.lh-faq-item',
    '.lh-posts-list'
  ].join(',');

  var observer;

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function stagger(el) {
    var group = el.parentElement;
    if (!group) return;
    var peers = group.querySelectorAll(':scope > .lh-reveal');
    var i = Array.prototype.indexOf.call(peers, el);
    if (i > 0) el.style.setProperty('--lh-delay', (i * 90) + 'ms');
  }

  function setup() {
    document.documentElement.classList.add('lh-js');
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    if (reduced() || typeof IntersectionObserver !== 'function') return;

    var nodes = document.querySelectorAll(SELECTOR);
    if (!nodes.length) return;

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

    nodes.forEach(function (el) {
      el.classList.add('lh-reveal');
      observer.observe(el);
    });
    nodes.forEach(stagger);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
  document.addEventListener('htmx:afterSettle', setup);
})();
