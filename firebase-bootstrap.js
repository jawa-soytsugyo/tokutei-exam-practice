(function () {
  "use strict";

  function initializeResponsiveLayout() {
    if (!document.getElementById("globalResponsiveStyles")) {
      const style = document.createElement("style");
      style.id = "globalResponsiveStyles";
      style.textContent = `
        html {
          width: 100%; max-width: 100%; overflow-x: hidden;
          -webkit-text-size-adjust: 100%; text-size-adjust: 100%;
          scroll-padding-top: calc(72px + env(safe-area-inset-top));
        }
        body {
          width: 100%; max-width: 100%; min-height: var(--app-height, 100dvh);
          overflow-x: hidden;
          font-family: "Noto Sans Myanmar", "Myanmar Text", "Segoe UI", Arial, "Hiragino Sans", "Yu Gothic", sans-serif;
        }
        img, svg, video, canvas { max-width: 100%; height: auto; }
        button, a, select, input { touch-action: manipulation; }
        input, select, textarea { max-width: 100%; }
        #welcomeScreen {
          display: none !important;
        }
        .hero-panel {
          justify-content: flex-start !important;
          gap: 22px;
        }
        .hero-panel::before { display: none !important; }
        .hero-panel .metric {
          display: grid;
          gap: 8px;
        }
        .hero-panel .metric-number {
          line-height: .82;
        }
        .hero-panel .metric-label {
          max-width: none;
          color: rgba(255,255,255,.9);
          line-height: 1.45;
        }
        .hero-panel .mini-list {
          width: 100%;
          margin-top: auto;
          gap: 10px;
        }
        .hero-panel .mini-item {
          min-width: 0;
          min-height: 58px;
          padding: 14px 16px;
          align-items: center;
          border-color: rgba(255,255,255,.22);
          border-radius: 10px;
          background: rgba(255,255,255,.1);
          line-height: 1.3;
        }
        .welcome-screen {
          min-height: var(--app-height, 100dvh);
          padding:
            max(14px, env(safe-area-inset-top))
            max(14px, env(safe-area-inset-right))
            max(14px, env(safe-area-inset-bottom))
            max(14px, env(safe-area-inset-left));
          overflow-y: auto;
        }
        .welcome-card {
          max-height: calc(var(--app-height, 100dvh) - 28px);
          overflow-y: auto;
        }
        @media (pointer: coarse) {
          button, select, input, .back, .mini-item { min-height: 44px; }
          a, button { -webkit-tap-highlight-color: transparent; }
        }
        @media (max-width: 900px) {
          body > nav.topbar .topbar-inner { width: calc(100% - 20px); }
          .settings { width: 100%; max-width: 100%; }
          main { width: min(100% - 24px, 1180px) !important; }
          .hero { grid-template-columns: minmax(0,1fr) !important; }
          .themes-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
          .vocabulary { grid-template-columns: repeat(2,minmax(0,1fr)); }
        }
        @media (max-width: 640px) {
          body > nav.topbar .topbar-inner { width: calc(100% - 16px); }
          main { width: calc(100% - 16px) !important; padding-top: 14px !important; }
          .settings, .controls { max-width: 100%; }
          .control-group { max-width: 100%; }
          .hero, .themes-grid, .vocabulary, .mini-list {
            grid-template-columns: minmax(0,1fr) !important;
          }
          .hero-copy, .hero-panel, .hero, .card, .theme-card, .word {
            max-width: 100%;
          }
          .hero, .hero-panel, .card { padding-left: clamp(14px,4vw,20px); padding-right: clamp(14px,4vw,20px); }
          .hero-panel {
            min-height: 0 !important;
            padding-top: 22px !important;
            padding-bottom: 22px !important;
          }
          .hero-panel .metric-number { font-size: clamp(3.4rem,18vw,5rem); }
          .hero-panel .mini-list { margin-top: 2px; }
          .hero-panel .mini-item { min-height: 54px; }
          .theme-card, .word { min-width: 0; }
          .option, .next { width: 100%; white-space: normal; overflow-wrap: anywhere; }
          .welcome-card { width: 100%; padding: clamp(18px,5vw,28px); }
          .welcome-card input, .welcome-card select { font-size: 16px; }
        }
        @media (max-width: 360px) {
          main { width: calc(100% - 12px) !important; }
          .card, .hero-panel, .hero { border-radius: 12px; }
          .global-settings-panel { font-size: .94rem; }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .welcome-screen { place-items: start center; }
          .welcome-card { max-height: calc(100dvh - 16px); padding: 14px 18px; }
          .welcome-card p { margin-bottom: 8px; }
          .welcome-card label { margin-top: 8px; }
          .welcome-card button { margin-top: 12px; }
          body > nav.topbar { position: relative; }
        }
      `;
      document.head.append(style);
    }

    let frame;
    const updateViewport = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewport = window.visualViewport;
        const width = Math.round(viewport?.width || window.innerWidth);
        const height = Math.round(viewport?.height || window.innerHeight);
        const root = document.documentElement;
        root.style.setProperty("--app-height", `${height}px`);
        root.style.setProperty("--app-width", `${width}px`);
        root.dataset.layout = width < 640 ? "phone" : width < 1024 ? "tablet" : "desktop";
        root.dataset.orientation = width > height ? "landscape" : "portrait";
        root.classList.toggle("touch-device", matchMedia("(pointer: coarse)").matches);
      });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    window.addEventListener("orientationchange", updateViewport, { passive: true });
    window.visualViewport?.addEventListener("resize", updateViewport, { passive: true });
  }

  initializeResponsiveLayout();

  function initializeGlobalSettings() {
    if (document.getElementById("globalSettingsButton")) return;

    const style = document.createElement("style");
    style.id = "globalSettingsStyles";
    style.textContent = `
      .global-settings-button {
        position: fixed; top: max(12px, env(safe-area-inset-top)); right: 12px;
        z-index: 2147482000; width: 40px; height: 40px; display: inline-flex; align-items: center; justify-content: center;
        border: 1px solid var(--line, #e2e8f0); border-radius: 10px;
        background: var(--card, #ffffff); color: var(--text, #0f172a); box-shadow: 0 4px 12px rgba(15,23,42,.08);
        cursor: pointer;
      }
      .global-settings-button.is-inline {
        position: static; width: 40px; height: 40px; border-radius: 10px;
        border: 1px solid var(--line, #e2e8f0); background: var(--card, #ffffff);
        color: var(--text, #0f172a); box-shadow: none; display: inline-flex;
        align-items: center; justify-content: center; cursor: pointer;
      }
      .global-settings-button:hover,
      .global-settings-button:focus-visible { border-color: var(--primary, #4338ca); color: var(--primary, #4338ca); outline: none; }
      .global-settings-panel {
        position: fixed; top: max(64px, calc(env(safe-area-inset-top) + 54px)); right: 12px;
        z-index: 2147482000; width: min(300px, calc(100vw - 24px)); padding: 16px;
        max-height: calc(var(--app-height, 100dvh) - 76px); overflow-y: auto;
        border: 1px solid var(--line, #e2e8f0); border-radius: 12px; background: var(--card, #ffffff); color: var(--text, #0f172a);
        box-shadow: var(--shadow-hover, 0 8px 24px rgba(15,23,42,.12)); font-family: inherit;
      }
      .global-settings-panel[hidden] { display: none !important; }
      .global-settings-title { margin: 0 0 14px; font-size: 1.05rem; font-weight: 850; }
      .global-settings-row { display: grid; grid-template-columns: 86px 1fr; gap: 10px; align-items: center; margin-top: 10px; }
      .global-settings-row label { font-size: .88rem; font-weight: 750; }
      .global-settings-row select,
      .global-settings-row input,
      .global-settings-action {
        min-height: 40px; border: 1px solid var(--line, #cbd7df); border-radius: 8px;
        padding: 7px 10px; background: var(--card, #fff); color: var(--text, #172033); font: inherit; cursor: pointer;
      }
      .global-settings-row input { width: 100%; cursor: text; }
      .global-font-actions { display: grid; grid-template-columns: repeat(3,1fr); gap: 6px; }
      .global-settings-action { font-weight: 800; }
      .global-settings-account {
        margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--line, #d7e1e6);
      }
      .global-settings-account-title { margin-bottom: 9px; font-size: .88rem; font-weight: 750; }
      .global-settings-panel #firebaseAuthControls {
        display: flex !important; width: 100%; max-width: 100%; gap: 8px;
        align-items: center; flex-wrap: wrap;
      }
      .global-settings-panel #firebaseAuthControls .auth-avatar {
        width: 34px; height: 34px; border-radius: 50%; object-fit: cover;
      }
      .global-settings-panel #firebaseAuthControls .auth-name {
        flex: 1 1 120px; min-width: 0; overflow: hidden; text-overflow: ellipsis;
        white-space: nowrap; font-size: .85rem; font-weight: 750;
      }
      .global-settings-panel #firebaseAuthControls .auth-button {
        min-height: 40px; max-width: 100%; border: 0; border-radius: 8px; padding: 8px 11px;
        background: var(--primary, #4338ca); color: #fff; font: inherit; font-weight: 800; cursor: pointer;
      }
      .global-settings-panel #firebaseAuthControls .auth-login-button { width: 100%; }
      html.dark .global-settings-button, body.dark .global-settings-button {
        background: var(--card, #1e293b); color: var(--text, #f1f5f9); border-color: var(--line, #334155);
      }
      html.dark .global-settings-panel, body.dark .global-settings-panel {
        border-color: var(--line, #334155); background: var(--card, #1e293b); color: var(--text, #f1f5f9);
      }
      html.dark .global-settings-panel select,
      html.dark .global-settings-panel input,
      html.dark .global-settings-action,
      body.dark .global-settings-panel select,
      body.dark .global-settings-panel input,
      body.dark .global-settings-action {
        border-color: var(--line, #334155); background: #0f172a; color: var(--text, #f1f5f9);
      }
      @media (max-width: 520px) {
        .global-settings-button:not(.is-inline) { top: max(8px, env(safe-area-inset-top)); right: 8px; width: 40px; height: 40px; }
        .global-settings-panel { top: max(58px, calc(env(safe-area-inset-top) + 50px)); right: 8px; width: min(300px, calc(100vw - 16px)); }
      }
    `;
    document.head.append(style);

    const button = document.createElement("button");
    button.id = "globalSettingsButton";
    button.className = "global-settings-button";
    button.type = "button";
    button.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>';
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", "globalSettingsPanel");

    const panel = document.createElement("section");
    panel.id = "globalSettingsPanel";
    panel.className = "global-settings-panel";
    panel.hidden = true;
    panel.innerHTML = `
      <h2 id="globalSettingsTitle" class="global-settings-title">Sozlamalar</h2>
      <div class="global-settings-row">
        <label id="globalNameLabel" for="globalStudentName">Ism</label>
        <input id="globalStudentName" type="text" maxlength="60" autocomplete="name" />
      </div>
      <div class="global-settings-row">
        <label id="globalLanguageLabel" for="globalLanguage">Til</label>
        <select id="globalLanguage">
          <option value="uz">O'zbek</option>
          <option value="ja">日本語</option>
          <option value="en">English</option>
          <option value="ne">नेपाली</option>
          <option value="my">မြန်မာဘာသာ</option>
        </select>
      </div>
      <div class="global-settings-row">
        <label id="globalThemeLabel">Ko‘rinish</label>
        <button id="globalTheme" class="global-settings-action" type="button">Kun / Tun</button>
      </div>
      <div class="global-settings-row">
        <label id="globalFontLabel">Matn</label>
        <div class="global-font-actions">
          <button class="global-settings-action" data-font="-1" type="button">A−</button>
          <button class="global-settings-action" data-font="0" type="button">A</button>
          <button class="global-settings-action" data-font="1" type="button">A+</button>
        </div>
      </div>
      <div class="global-settings-account">
        <div id="globalAccountLabel" class="global-settings-account-title">Google hisobi</div>
        <div id="globalAuthSlot"></div>
      </div>
    `;

    const topbarControls = document.querySelector('.topbar .controls, .topbar .settings, .topbar-actions');
    if (topbarControls) {
      button.classList.add('is-inline');
      topbarControls.appendChild(button);
      document.body.append(panel);
    } else {
      document.body.append(button, panel);
    }
    document.getElementById("welcomeScreen")?.classList.add("hidden");

    const authSlot = panel.querySelector("#globalAuthSlot");
    let authMount = document.getElementById("firebaseAuthControls");
    if (!authMount) {
      authMount = document.createElement("div");
      authMount.id = "firebaseAuthControls";
      authMount.setAttribute("aria-label", "Google login");
      authMount.setAttribute("aria-live", "polite");
    }
    authSlot.replaceWith(authMount);

    const studentName = panel.querySelector("#globalStudentName");
    studentName.value = localStorage.getItem("studentName") || "";
    studentName.addEventListener("change", () => {
      localStorage.setItem("studentName", studentName.value.trim());
      window.FirebaseStudy?.savePreferences().catch(console.error);
    });

    const language = panel.querySelector("#globalLanguage");
    language.value = ["uz", "ja", "en", "ne", "my"].includes(localStorage.getItem("language"))
      ? localStorage.getItem("language")
      : "ja";
    const settingsCopy = {
      uz: {
        settings: "Sozlamalar", name: "Ism", language: "Til", appearance: "Ko‘rinish",
        theme: "Kun / Tun", font: "Matn", account: "Google hisobi"
      },
      ja: {
        settings: "設定", name: "名前", language: "言語", appearance: "表示",
        theme: "昼 / 夜", font: "文字", account: "Google アカウント"
      },
      en: {
        settings: "Settings", name: "Name", language: "Language", appearance: "Appearance",
        theme: "Light / Dark", font: "Text", account: "Google account"
      },
      ne: {
        settings: "सेटिङहरू", name: "नाम", language: "भाषा", appearance: "प्रदर्शन",
        theme: "दिन / रात", font: "अक्षर", account: "Google खाता"
      },
      my: {
        settings: "ဆက်တင်များ", name: "အမည်", language: "ဘာသာစကား", appearance: "ပုံစံ",
        theme: "နေ့ / ည", font: "စာလုံး", account: "Google အကောင့်"
      }
    };
    const applySettingsCopy = (locale) => {
      const copy = settingsCopy[locale] || settingsCopy.ja;
      panel.lang = locale;
      panel.querySelector("#globalSettingsTitle").textContent = copy.settings;
      panel.querySelector("#globalNameLabel").textContent = copy.name;
      panel.querySelector("#globalLanguageLabel").textContent = copy.language;
      panel.querySelector("#globalThemeLabel").textContent = copy.appearance;
      panel.querySelector("#globalTheme").textContent = copy.theme;
      panel.querySelector("#globalFontLabel").textContent = copy.font;
      panel.querySelector("#globalAccountLabel").textContent = copy.account;
      button.title = copy.settings;
      button.setAttribute("aria-label", copy.settings);
    };
    applySettingsCopy(language.value);

    button.addEventListener("click", () => {
      panel.hidden = !panel.hidden;
      button.setAttribute("aria-expanded", String(!panel.hidden));
    });
    language.addEventListener("change", () => {
      localStorage.setItem("language", language.value);
      applySettingsCopy(language.value);
      const pageLangSelect = document.querySelector("#language, #langSelect, #languageSelect");
      if (pageLangSelect) {
        pageLangSelect.value = language.value;
        pageLangSelect.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        location.reload();
      }
    });
    panel.querySelector("#globalTheme").addEventListener("click", () => {
      if (window.ThemeManager) return;
      const dark = !document.body.classList.contains("dark");
      document.body.classList.toggle("dark", dark);
      localStorage.setItem("theme", dark ? "dark" : "light");
    });
    panel.querySelectorAll("[data-font]").forEach((fontButton) => {
      fontButton.addEventListener("click", () => {
        const direction = Number(fontButton.dataset.font);
        const current = Number.parseInt(localStorage.getItem("fontSize"), 10) || 16;
        const size = direction === 0 ? 16 : Math.min(24, Math.max(12, current + direction));
        localStorage.setItem("fontSize", String(size));
        document.documentElement.style.fontSize = `${size}px`;
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) {
        panel.hidden = true;
        button.setAttribute("aria-expanded", "false");
        button.focus();
      }
    });
    document.addEventListener("pointerdown", (event) => {
      if (!panel.hidden && !panel.contains(event.target) && event.target !== button) {
        panel.hidden = true;
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGlobalSettings, { once: true });
  } else {
    initializeGlobalSettings();
  }

  function showLoadingGate() {
    if (!document.getElementById("firebaseBootstrapStyles")) {
      const style = document.createElement("style");
      style.id = "firebaseBootstrapStyles";
      style.textContent = `
        .firebase-auth-gate {
          position: fixed; inset: 0; z-index: 2147483646; display: grid; place-items: center;
          padding: 24px; background: rgba(15,23,42,.85);
          font-family: inherit;
        }
        .firebase-auth-card {
          width: min(100%, 430px); padding: 32px; border-radius: 18px; background: var(--card, #fff);
          color: var(--text, #172033); box-shadow: 0 24px 64px rgba(0,0,0,.3); text-align: center;
        }
        .firebase-auth-card h2 { margin: 0 0 10px; font-size: 1.8rem; }
        .firebase-auth-card p { margin: 0 0 22px; color: var(--muted, #637084); line-height: 1.55; }
        .firebase-google-button {
          width: 100%; min-height: 48px; border: 0; border-radius: 10px; padding: 12px 16px;
          background: var(--primary, #4338ca); color: #fff; font: inherit; font-weight: 800; cursor: pointer;
        }
        .firebase-auth-error { min-height: 1.4em; margin-top: 14px; color: #b42318; font-size: .9rem; }
      `;
      document.head.append(style);
    }
    if (document.getElementById("firebaseAuthGate")) return;
    const gate = document.createElement("section");
    gate.id = "firebaseAuthGate";
    gate.className = "firebase-auth-gate";
    gate.innerHTML = `
      <div class="firebase-auth-card">
        <h2>Google orqali kiring</h2>
        <p>Natijalaringiz va o‘qish ma’lumotlaringiz faqat sizning akkauntingizda saqlanadi.</p>
        <button id="firebaseGoogleLogin" class="firebase-google-button" type="button" disabled>Yuklanmoqda...</button>
        <div id="firebaseAuthError" class="firebase-auth-error" aria-live="polite"></div>
      </div>
    `;
    document.body.append(gate);
  }

  // Study content is always available. Firebase login is optional and is used
  // only to synchronize progress across devices.

  const prefetchedPages = new Set();
  function prefetchPage(event) {
    const anchor = event.target.closest("a[href]");
    if (!anchor || anchor.origin !== location.origin || prefetchedPages.has(anchor.href)) return;
    prefetchedPages.add(anchor.href);
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = anchor.href;
    document.head.append(link);
  }
  document.addEventListener("pointerover", prefetchPage, { passive: true });
  document.addEventListener("touchstart", prefetchPage, { passive: true });

  window.firebaseStudyReady = import("./firebase-client.js?v=20260928-1")
    .then((module) => module.ready)
    .catch((error) => {
      console.error("Firebase initialization failed:", error);
      const message = document.getElementById("firebaseAuthError");
      if (message) message.textContent = "Firebase xizmatiga ulanib bo‘lmadi. Sahifani yangilang.";
      throw error;
    });
}());
