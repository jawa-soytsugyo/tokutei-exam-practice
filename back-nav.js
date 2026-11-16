/*
 * back-nav.js — shared "戻る" navigation for every sub page.
 *
 * 1. Floating "戻る" button: appears (bottom-left, safe-area aware) whenever the
 *    page header's own back link scrolls out of view, so a back control is
 *    always reachable at any scroll position and screen size.
 * 2. Swipe-right gesture (iPhone / touch devices): swiping from the left side of
 *    the screen to the right goes back exactly one step. On iOS Safari tabs the
 *    first 24px are left to Safari's native edge-swipe so the page never goes
 *    back twice.
 */
(() => {
  'use strict';

  if (window.__BACK_NAV_READY__) return;
  window.__BACK_NAV_READY__ = true;

  const LABELS = {
    ja: '戻る',
    uz: 'Ortga',
    en: 'Back',
    ne: 'फिर्ता',
    my: 'နောက်သို့'
  };

  function getLabel() {
    try {
      const lang = localStorage.getItem('language');
      if (lang && LABELS[lang]) return LABELS[lang];
    } catch (_) {}
    return LABELS.ja;
  }

  const CHEVRON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  const FALLBACK_URL = './index.html';

  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = window.navigator.standalone === true
    || (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);

  let navigating = false;
  let currentFab = null;

  function updateFabLabel() {
    if (!currentFab) return;
    const label = getLabel();
    currentFab.setAttribute('aria-label', label);
    const textSpan = currentFab.querySelector('.back-nav-fab__text');
    if (textSpan) textSpan.textContent = label;
  }

  function findHeaderBack() {
    return document.querySelector('#back, .back-button, a.back:not(.notebook-link)');
  }

  function fallbackUrl() {
    const headerBack = findHeaderBack();
    const href = headerBack && headerBack.getAttribute('href');
    return href && href !== '#' ? href : FALLBACK_URL;
  }

  function cameFromThisSite() {
    try {
      return Boolean(document.referrer) && new URL(document.referrer).origin === window.location.origin;
    } catch (error) {
      return false;
    }
  }

  function goBack() {
    if (navigating) return; // guarantee a single step back per gesture / tap
    navigating = true;
    if (cameFromThisSite() && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = fallbackUrl();
    }
    // If navigation is cancelled (e.g. no history entry), allow another try.
    window.setTimeout(() => { navigating = false; }, 1500);
  }

  // Restored from back/forward cache: reset the guard.
  window.addEventListener('pageshow', () => { navigating = false; });

  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'back-nav-style';
    style.textContent = `
      .back-nav-fab {
        position: fixed;
        left: max(12px, env(safe-area-inset-left));
        bottom: max(14px, calc(env(safe-area-inset-bottom) + 8px));
        z-index: 2147483000;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        min-height: 40px;
        padding: 0 14px 0 10px;
        border: 1px solid var(--line, #e2e8f0);
        border-radius: 10px;
        background: var(--card, #ffffff);
        color: var(--text, #0f172a);
        font: 650 14px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans", sans-serif;
        letter-spacing: 0.01em;
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.10);
        -webkit-backdrop-filter: blur(8px);
        backdrop-filter: blur(8px);
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
        opacity: 0;
        transform: translateY(12px) scale(0.96);
        pointer-events: none;
        transition: opacity 180ms ease, transform 180ms ease, background 150ms ease, color 150ms ease, border-color 150ms ease;
      }
      .back-nav-fab.is-visible { opacity: 1; transform: none; pointer-events: auto; }
      .back-nav-fab:hover { border-color: var(--accent, #4338ca); color: var(--accent, #4338ca); }
      .back-nav-fab:focus-visible { outline: 2px solid var(--accent, #4338ca); outline-offset: 2px; }
      .back-nav-fab__arrow { display: inline-flex; align-items: center; justify-content: center; }
      html.dark .back-nav-fab, body.dark .back-nav-fab {
        background: var(--card, #1e293b);
        color: var(--text, #f1f5f9);
        border-color: var(--line, #334155);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
      }
      html.dark .back-nav-fab:hover, body.dark .back-nav-fab:hover {
        border-color: var(--accent, #818cf8);
        color: var(--accent, #818cf8);
      }
      .back-nav-swipe {
        position: fixed;
        top: 50%;
        left: 0;
        z-index: 2147483001;
        width: 44px;
        height: 44px;
        margin-top: -22px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card, #ffffff);
        color: var(--text, #0f172a);
        border: 1px solid var(--line, #e2e8f0);
        box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
        transform: translateX(-56px);
        opacity: 0;
        pointer-events: none;
      }
      .back-nav-swipe.is-ready {
        border-color: var(--primary, #4338ca);
        color: var(--primary, #4338ca);
      }
      html.dark .back-nav-swipe, body.dark .back-nav-swipe {
        background: var(--card, #1e293b);
        color: var(--text, #f1f5f9);
        border-color: var(--line, #334155);
      }
      html.dark .back-nav-swipe.is-ready, body.dark .back-nav-swipe.is-ready {
        border-color: var(--accent, #818cf8);
        color: var(--accent, #818cf8);
      }
      body.has-back-nav { padding-bottom: calc(72px + env(safe-area-inset-bottom)); }
      @media (min-width: 900px) {
        .back-nav-fab { left: 20px; bottom: 20px; }
      }
      @media print { .back-nav-fab, .back-nav-swipe { display: none !important; } }
    `;
    document.head.appendChild(style);
  }

  function createFab() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-nav-fab';
    const label = getLabel();
    button.setAttribute('aria-label', label);
    button.innerHTML = `<span class="back-nav-fab__arrow" aria-hidden="true">${CHEVRON_SVG}</span><span class="back-nav-fab__text">${label}</span>`;
    button.addEventListener('click', goBack);
    document.body.appendChild(button);
    currentFab = button;
    return button;
  }

  function watchHeaderBack(fab) {
    const headerBack = findHeaderBack();
    if (!headerBack || !('IntersectionObserver' in window)) {
      fab.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      fab.classList.toggle('is-visible', !visible);
    }, { threshold: 0 });
    observer.observe(headerBack);
  }

  function isInteractive(target) {
    return Boolean(target && target.closest && target.closest('input, select, textarea, [contenteditable="true"], [data-no-swipe-back]'));
  }

  function hasHorizontalScroll(target) {
    let node = target;
    while (node && node !== document.body && node.nodeType === 1) {
      if (node.scrollWidth > node.clientWidth + 4) {
        const overflowX = window.getComputedStyle(node).overflowX;
        if (overflowX === 'auto' || overflowX === 'scroll') return true;
      }
      node = node.parentElement;
    }
    return false;
  }

  function setupSwipeBack() {
    // On iOS Safari tabs the native edge swipe owns the first ~20px.
    const minStartX = isIOS && !isStandalone ? 24 : 0;
    const maxStartX = 90;
    const triggerDistance = 80;

    const hint = document.createElement('div');
    hint.className = 'back-nav-swipe';
    hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML = CHEVRON_SVG;
    document.body.appendChild(hint);

    let tracking = false;
    let decided = false;
    let horizontal = false;
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let lastDx = 0;

    function resetHint() {
      hint.style.transition = 'transform 160ms ease, opacity 160ms ease';
      hint.style.transform = 'translateX(-56px)';
      hint.style.opacity = '0';
      hint.classList.remove('is-ready');
    }

    function cancel() {
      tracking = false;
      decided = false;
      horizontal = false;
      resetHint();
    }

    document.addEventListener('touchstart', (event) => {
      if (navigating || event.touches.length !== 1) return cancel();
      const touch = event.touches[0];
      if (touch.clientX < minStartX || touch.clientX > maxStartX) return cancel();
      if (isInteractive(event.target) || hasHorizontalScroll(event.target)) return cancel();
      tracking = true;
      decided = false;
      horizontal = false;
      startX = touch.clientX;
      startY = touch.clientY;
      startTime = Date.now();
      lastDx = 0;
      hint.style.transition = 'none';
    }, { passive: true });

    document.addEventListener('touchmove', (event) => {
      if (!tracking || event.touches.length !== 1) return;
      const touch = event.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (!decided && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
        decided = true;
        horizontal = dx > 0 && Math.abs(dx) > Math.abs(dy) * 1.4;
        if (!horizontal) return cancel();
      }
      if (!horizontal) return;
      lastDx = Math.max(0, dx);
      const progress = Math.min(1, lastDx / triggerDistance);
      hint.style.opacity = String(progress);
      hint.style.transform = `translateX(${-56 + progress * 72}px)`;
      hint.classList.toggle('is-ready', progress >= 1);
    }, { passive: true });

    document.addEventListener('touchend', (event) => {
      if (!tracking) return;
      const touch = event.changedTouches[0];
      const dy = touch ? Math.abs(touch.clientY - startY) : 0;
      const elapsed = Date.now() - startTime;
      const shouldGoBack = horizontal && lastDx >= triggerDistance && dy < lastDx * 0.7 && elapsed < 1200;
      cancel();
      if (shouldGoBack) goBack();
    }, { passive: true });

    document.addEventListener('touchcancel', cancel, { passive: true });
  }

  function init() {
    if (!document.body) return;
    injectStyles();
    document.body.classList.add('has-back-nav');
    const fab = createFab();
    watchHeaderBack(fab);
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) setupSwipeBack();

    window.addEventListener('storage', (event) => {
      if (event.key === 'language') updateFabLabel();
    });
    document.addEventListener('change', (event) => {
      if (event.target && ['language', 'globalLanguage', 'langSelect', 'languageSelect'].includes(event.target.id)) {
        updateFabLabel();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

