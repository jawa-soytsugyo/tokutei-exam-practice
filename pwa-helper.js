/* PWA Helper & Offline Manager (Tokutei Agriculture Pilot) */
(function () {
  'use strict';

  // 1. Service Worker Registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((err) => {
        console.warn('Service Worker registration skipped:', err);
      });
    });
  }

  const pwaTexts = {
    ja: {
      installBtn: '📲 アプリを端末にインストール',
      installHint: 'ホーム画面に追加して、オフラインでも素早く学習できます',
      offlineBadge: '📴 オフライン利用中（学習可能）',
      onlineBadge: '🌐 オンラインに復帰しました'
    },
    uz: {
      installBtn: '📲 Ilovani telefonga o‘rnatish',
      installHint: 'Bosh ekranga qo‘shing, internetsiz ham bemalol o‘rganing',
      offlineBadge: '📴 Oflayn rejim (Savol va lug‘at ishlaydi)',
      onlineBadge: '🌐 Internetga ulandi'
    },
    en: {
      installBtn: '📲 Install App on Device',
      installHint: 'Add to home screen for instant offline study',
      offlineBadge: '📴 Offline Mode (Fully usable)',
      onlineBadge: '🌐 Back Online'
    },
    ne: {
      installBtn: '📲 एप स्थापना गर्नुहोस्',
      installHint: 'अफलाइन पनि अध्ययन गर्न गृहपृष्ठमा थप्नुहोस्',
      offlineBadge: '📴 अफलाइन मोड',
      onlineBadge: '🌐 अनलाइन'
    },
    my: {
      installBtn: '📲 အက်ပ်ကို ထည့်သွင်းပါ',
      installHint: 'အော့ဖ်လိုင်းတွင်လည်း လေ့လာနိုင်ရန် ပင်မမျက်နှာပြင်သို့ ထည့်ပါ',
      offlineBadge: '📴 အော့ဖ်လိုင်းမုဒ်',
      onlineBadge: '🌐 အွန်လိုင်း'
    }
  };

  function getLang() {
    const stored = localStorage.getItem('language');
    if (stored && pwaTexts[stored]) return stored;
    return 'ja';
  }

  let deferredPrompt = null;

  function createInstallBanner() {
    if (document.getElementById('pwaInstallBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'pwaInstallBanner';
    banner.className = 'pwa-install-banner is-hidden';

    const lang = getLang();
    const t = pwaTexts[lang];

    banner.innerHTML = `
      <div class="pwa-banner-content">
        <div class="pwa-banner-icon">📲</div>
        <div class="pwa-banner-text">
          <strong id="pwaBannerTitle">${t.installBtn}</strong>
          <span id="pwaBannerHint">${t.installHint}</span>
        </div>
      </div>
      <div class="pwa-banner-actions">
        <button id="pwaInstallActionBtn" type="button" class="pwa-install-btn">${t.installBtn}</button>
        <button id="pwaDismissBtn" type="button" class="pwa-dismiss-btn" aria-label="閉じる">✕</button>
      </div>
    `;

    document.body.prepend(banner);

    const actionBtn = document.getElementById('pwaInstallActionBtn');
    const dismissBtn = document.getElementById('pwaDismissBtn');

    if (actionBtn) {
      actionBtn.addEventListener('click', async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          banner.classList.add('is-hidden');
        }
        deferredPrompt = null;
      });
    }

    if (dismissBtn) {
      dismissBtn.addEventListener('click', () => {
        banner.classList.add('is-hidden');
        sessionStorage.setItem('pwa-dismissed', 'true');
      });
    }
  }

  // Before Install Prompt Event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (sessionStorage.getItem('pwa-dismissed') === 'true') return;
    createInstallBanner();
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.classList.remove('is-hidden');
  });

  window.addEventListener('appinstalled', () => {
    const banner = document.getElementById('pwaInstallBanner');
    if (banner) banner.classList.add('is-hidden');
    deferredPrompt = null;
  });

  // Offline / Online Status Indicator
  function showStatusToast(message, isOffline) {
    let toast = document.getElementById('pwaStatusToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pwaStatusToast';
      toast.className = 'pwa-status-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `pwa-status-toast is-visible ${isOffline ? 'is-offline' : 'is-online'}`;
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  }

  window.addEventListener('offline', () => {
    const t = pwaTexts[getLang()];
    showStatusToast(t.offlineBadge, true);
  });

  window.addEventListener('online', () => {
    const t = pwaTexts[getLang()];
    showStatusToast(t.onlineBadge, false);
  });

  // If already loaded while offline
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    window.addEventListener('DOMContentLoaded', () => {
      const t = pwaTexts[getLang()];
      showStatusToast(t.offlineBadge, true);
    });
  }
})();
