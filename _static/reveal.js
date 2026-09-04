/**
 * Scroll-in reveals for the home page.
 * Hide first, wait two frames so the browser records the start state,
 * then observe. Same-frame hide+show skips the transition on mobile.
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
    var kids = group.children;
    var i = 0;
    var n = 0;
    for (i = 0; i < kids.length; i += 1) {
      if (kids[i] === el) {
        if (n > 0) el.style.setProperty('--lh-delay', (n * 160) + 'ms');
        return;
      }
      if (kids[i].classList && kids[i].classList.contains('lh-reveal')) n += 1;
    }
  }

  function arm(el) {
    if (el.classList.contains('is-in')) return;
    el.classList.add('is-in');
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

    nodes.forEach(function (el) {
      el.classList.add('lh-reveal');
      el.classList.remove('is-in');
    });
    nodes.forEach(stagger);

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        arm(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px -12% 0px' });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        nodes.forEach(function (el) {
          observer.observe(el);
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
  document.addEventListener('htmx:afterSettle', setup);
})();
