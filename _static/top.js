/**
 * Back-to-top: accel then equal decel on the single scrolling root.
 * Do not write html+body+window together — Edge/Firefox treat that as
 * two scrollers and the motion diverges from Chrome.
 */
(function () {
  'use strict';

  var SHOW_AFTER = 240;
  var MIN_MS = 900;
  var MAX_MS = 2000;
  var running = false;
  var raf = 0;
  var btn = document.getElementById('lh-top');
  if (!btn) return;

  function reduced() {
    return window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function root() {
    return document.scrollingElement || document.documentElement;
  }

  function yNow() {
    return root().scrollTop;
  }

  function ySet(y) {
    root().scrollTop = y;
  }

  function stop() {
    running = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
    document.documentElement.classList.remove('lh-top-run');
  }

  function sync() {
    btn.classList.toggle('is-on', yNow() > SHOW_AFTER);
  }

  function toTop() {
    var start = yNow();
    if (start <= 0) return;
    stop();
    if (reduced()) {
      ySet(0);
      sync();
      return;
    }
    running = true;
    document.documentElement.classList.add('lh-top-run');
    var duration = Math.min(MAX_MS, Math.max(MIN_MS, 2 * Math.sqrt(start / 14000) * 1000));
    var T = duration / 1000;
    var half = T / 2;
    var a = (4 * start) / (T * T);
    var t0 = performance.now();

    function frame(now) {
      if (!running) return;
      var t = (now - t0) / 1000;
      if (t >= T) {
        ySet(0);
        stop();
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
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
  }

  btn.addEventListener('click', function (event) {
    event.preventDefault();
    toTop();
  });

  function cancelIfUserScrolls() {
    if (running) stop();
  }
  window.addEventListener('wheel', cancelIfUserScrolls, { passive: true });
  window.addEventListener('touchstart', cancelIfUserScrolls, { passive: true });
  window.addEventListener('keydown', function (event) {
    if (!running) return;
    var k = event.key;
    if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'PageUp' || k === 'PageDown' || k === 'Home' || k === 'End' || k === ' ') {
      stop();
    }
  });
  window.addEventListener('scroll', sync, { passive: true });
  sync();
})();
