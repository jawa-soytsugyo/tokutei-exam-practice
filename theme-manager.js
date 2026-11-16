/**
 * theme-manager.js — Universal Dark / Light Theme Manager for Tokutei Skill
 * 
 * Ensures 100% consistent theme behavior across all pages (index, menus, practice, vocabulary, mistakes).
 * - Instant initialization in <head> to prevent theme flicker.
 * - Synchronizes across document.documentElement and document.body.
 * - Listens for cross-tab storage changes and Safari/iOS bfcache pageshow events.
 * - Automatically keeps all theme toggle buttons, icons, and labels in sync.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'theme';
  const LEGACY_KEY = 'tokutei_skill_theme';

  const SUN_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const MOON_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  const LABELS = {
    uz: {
      toLight: 'Kunduzgi rejim',
      toDark: 'Tungi rejim',
      toggle: 'Temani almashtirish',
      hintToLight: 'Kunduzgi rejimga o‘tish',
      hintToDark: 'Tungi rejimga o‘tish'
    },
    ja: {
      toLight: '昼モード',
      toDark: '夜モード',
      toggle: 'テーマ切り替え',
      hintToLight: '昼モードに切り替え',
      hintToDark: '夜モードに切り替え'
    },
    en: {
      toLight: 'Light mode',
      toDark: 'Dark mode',
      toggle: 'Toggle theme',
      hintToLight: 'Switch to light mode',
      hintToDark: 'Switch to dark mode'
    },
    ne: {
      toLight: 'दिनको मोड',
      toDark: 'रातको मोड',
      toggle: 'थिम परिवर्तन',
      hintToLight: 'दिनको मोडमा जानुहोस्',
      hintToDark: 'रातको मोडमा जानुहोस्'
    },
    my: {
      toLight: 'အလင်းမုဒ်',
      toDark: 'အမှောင်မုဒ်',
      toggle: 'ပုံစံပြောင်းရန်',
      hintToLight: 'အလင်းမုဒ်သို့ ပြောင်းရန်',
      hintToDark: 'အမှောင်မုဒ်သို့ ပြောင်းရန်'
    }
  };

  function getLanguage() {
    try {
      const stored = localStorage.getItem('language');
      if (stored && LABELS[stored]) return stored;
    } catch (_) {}
    return 'ja';
  }

  function getInitialTheme() {
    try {
      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        localStorage.removeItem(LEGACY_KEY);
        return legacy === 'dark' ? 'dark' : 'light';
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (_) {}
    return 'light';
  }

  let currentTheme = getInitialTheme();

  // Apply immediately to html element
  function applyToRoot(theme) {
    const isDark = theme === 'dark';
    if (document.documentElement) {
      document.documentElement.classList.toggle('dark', isDark);
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    }
    if (document.body) {
      document.body.classList.toggle('dark', isDark);
      document.body.setAttribute('data-theme', theme);
    }
  }

  applyToRoot(currentTheme);

  // When DOM loads, ensure body is also updated and bind UI elements
  function updateUI() {
    applyToRoot(currentTheme);
    const isDark = currentTheme === 'dark';
    const lang = getLanguage();
    const copy = LABELS[lang] || LABELS.ja;
    const iconSvg = isDark ? SUN_SVG : MOON_SVG;
    const label = isDark ? copy.toLight : copy.toDark;

    // 1. Icon-only buttons (#theme, button.theme, or buttons with data-icon-only="true")
    document.querySelectorAll('#theme, button.theme, [data-icon-only="true"]').forEach((btn) => {
      btn.innerHTML = iconSvg;
      btn.style.display = 'inline-flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.setAttribute('aria-label', isDark ? copy.hintToLight : copy.hintToDark);
      btn.setAttribute('aria-pressed', String(isDark));
      btn.title = isDark ? copy.hintToLight : copy.hintToDark;
    });

    // 2. Text+icon buttons (#themeToggle, .theme-toggle:not(#theme), #globalTheme)
    document.querySelectorAll('#themeToggle, .theme-toggle:not(#theme), #globalTheme').forEach((btn) => {
      if (btn.classList.contains('theme') || btn.getAttribute('data-icon-only') === 'true') return;
      btn.innerHTML = `${iconSvg}<span>${label}</span>`;
      btn.style.display = 'inline-flex';
      btn.style.alignItems = 'center';
      btn.style.gap = '6px';
      btn.setAttribute('aria-label', isDark ? copy.hintToLight : copy.hintToDark);
      btn.title = isDark ? copy.hintToLight : copy.hintToDark;
    });

    // 3. Settings button (#themeSettingsButton in index.html)
    const settingsBtn = document.getElementById('themeSettingsButton');
    if (settingsBtn) {
      settingsBtn.innerHTML = `${iconSvg}<span>${copy.toggle}</span>`;
      settingsBtn.style.display = 'inline-flex';
      settingsBtn.style.alignItems = 'center';
      settingsBtn.style.gap = '6px';
      settingsBtn.setAttribute('aria-label', isDark ? copy.hintToLight : copy.hintToDark);
      settingsBtn.title = isDark ? copy.hintToLight : copy.hintToDark;
    }
  }

  function setTheme(newTheme, persist = true) {
    const valid = newTheme === 'dark' ? 'dark' : 'light';
    currentTheme = valid;
    applyToRoot(valid);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, valid);
      } catch (_) {}
    }
    updateUI();
    try {
      window.dispatchEvent(new CustomEvent('tokutei-theme-change', { detail: { theme: valid } }));
    } catch (_) {}
  }

  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark', true);
  }

  // Cross-tab sync
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY && (event.newValue === 'dark' || event.newValue === 'light')) {
      setTheme(event.newValue, false);
    }
    if (event.key === 'language') {
      updateUI();
    }
  });

  // Safari bfcache navigation restore
  window.addEventListener('pageshow', () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved !== currentTheme) {
        setTheme(saved, false);
      } else {
        updateUI();
      }
    } catch (_) {}
  });

  // Global delegated click handler for any theme toggle button
  document.addEventListener('click', (event) => {
    const target = event.target && event.target.closest(
      '#themeToggle, #themeSettingsButton, #theme, #globalTheme, .theme-toggle, button.theme'
    );
    if (target) {
      // Prevent inline onclick from double-toggling
      if (typeof target.onclick === 'function') {
        target.onclick = null;
      }
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      toggleTheme();
    }
  }, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateUI, { once: true });
  } else {
    updateUI();
  }

  // Expose global API
  window.ThemeManager = Object.freeze({
    get: () => currentTheme,
    isDark: () => currentTheme === 'dark',
    set: setTheme,
    toggle: toggleTheme,
    updateUI: updateUI
  });

  // Global compatibility aliases
  window.toggleTheme = toggleTheme;
  window.applyTheme = setTheme;
})();

