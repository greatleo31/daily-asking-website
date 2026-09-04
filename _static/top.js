/**
 * Back-to-top: constant accel then equal decel (triangle velocity).
 * Distance D, duration T => a = 4D / T^2. Peak speed v = a * T/2.
 */
(function () {
  'use strict';

  var SHOW_AFTER = 240;
  var MIN_MS = 900;
  var MAX_MS = 2000;
  var running = false;
  var btn = document.getElementById('lh-top');
  if (!btn) return;

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function yNow() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }

  function ySet(y) {
    window.scrollTo(0, y);
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
  }

  function sync() {
    btn.classList.toggle('is-on', yNow() > SHOW_AFTER);
  }

  function toTop() {
    var start = yNow();
    if (start <= 0 || running) return;
    if (reduced()) {
      ySet(0);
      return;
    }
    running = true;
    var duration = Math.min(MAX_MS, Math.max(MIN_MS, 2 * Math.sqrt(start / 14000) * 1000));
    var T = duration / 1000;
    var half = T / 2;
    var a = (4 * start) / (T * T);
    var t0 = performance.now();

    function frame(now) {
      var t = (now - t0) / 1000;
      if (t >= T) {
        ySet(0);
        running = false;
        sync();
        return;
      }
      var gone;
      if (t <= half) {
        gone = 0.5 * a * t * t;
      } else {
        var td = t - half;
        var vPeak = a * half;
        gone = 0.5 * a * half * half + vPeak * td - 0.5 * a * td * td;
      }
      ySet(Math.max(0, start - gone));
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  btn.addEventListener('click', function (event) {
    event.preventDefault();
    toTop();
  });
  window.addEventListener('scroll', sync, { passive: true });
  document.addEventListener('touchmove', sync, { passive: true });
  sync();
})();
