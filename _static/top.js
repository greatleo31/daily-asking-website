/**
 * Bottom-right back-to-top with ease-in-out (accel then decel).
 */
(function () {
  'use strict';

  var SHOW_AFTER = 320;
  var btn = document.getElementById('lh-top');
  if (!btn) return;

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function sync() {
    btn.classList.toggle('is-on', window.scrollY > SHOW_AFTER);
  }

  function toTop() {
    var start = window.scrollY;
    if (start <= 0) return;
    if (reduced()) {
      window.scrollTo(0, 0);
      return;
    }
    var duration = Math.min(1600, Math.max(720, start * 0.55));
    var t0 = performance.now();
    function frame(now) {
      var p = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, Math.round(start * (1 - easeInOutCubic(p))));
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  btn.addEventListener('click', function (event) {
    event.preventDefault();
    toTop();
  });
  window.addEventListener('scroll', sync, { passive: true });
  sync();
})();
