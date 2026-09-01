/**
 * 理念段打字机效果。
 * 进入视口 ≥40% 触发，只播一次；prefers-reduced-motion 或无 JS 时
 * 文案保持完整可见（渐进增强：HTML 默认含全文，JS 启动后才清空重打）。
 * 光标随播闪烁，播完 800ms 后移除。
 */
(function () {
  'use strict';

  var CHAR_MS_BASE = 90;
  var CHAR_MS_JITTER = 40;
  var CARET_LINGER_MS = 800;

  function setup() {
    var el = document.querySelector('[data-typewriter]');
    if (!el || el.dataset.typewriterBound) return;
    el.dataset.typewriterBound = '1';

    var reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    var full = el.textContent.trim();
    var started = false;

    el.textContent = '';
    el.classList.add('typewriter--caret');

    function type() {
      if (started) return;
      started = true;
      var i = 0;
      (function tick() {
        if (i <= full.length) {
          el.textContent = full.slice(0, i);
          i += 1;
          setTimeout(tick, CHAR_MS_BASE + Math.random() * CHAR_MS_JITTER);
        } else {
          setTimeout(function () {
            el.classList.remove('typewriter--caret');
          }, CARET_LINGER_MS);
        }
      })();
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          type();
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
  // htmx 增强导航返回首页时重新绑定（新 DOM，只会在该次访问播一次）
  document.addEventListener('htmx:afterSettle', setup);
})();
