/* Service Worker for Tokutei Ginou Exam Practice (All 6 Sectors - Network First) */
const CACHE_NAME = 'tokutei-all-sectors-v3';

const STATIC_ASSETS = [
  './',
  './index.html',
  './mistakes.html',
  './agriculture-menu.html',
  './agriculture.html',
  './agriculture-vocab.html',
  './automobile-menu.html',
  './automobile.html',
  './automobile-vocab.html',
  './construction-menu.html',
  './construction.html',
  './construction-vocab.html',
  './foodmanufacturing-menu.html',
  './foodmanufacturing.html',
  './foodmanufacturing-vocab.html',
  './foodservice-menu.html',
  './foodservice.html',
  './foodservice-vocab.html',
  './lodging-menu.html',
  './lodging.html',
  './lodging-vocab.html',
  './style.css',
  './theme.css',
  './vocabulary.css',
  './practice.css',
  './script.js',
  './practice.js',
  './vocabulary-page.js',
  './construction-vocab.js',
  './construction-i18n.js',
  './construction-mock-data.js',
  './construction-question-generator.js',
  './construction-vocab-data.js',
  './sector-question-generator.js',
  './sector-vocabulary-reviewed.js',
  './agriculture-question-data.js',
  './agriculture-vocabulary-1000.js',
  './automobile-question-data.js',
  './automobile-vocabulary-1000.js',
  './foodmanufacturing-question-data.js',
  './foodmanufacturing-vocabulary-1000.js',
  './foodservice-question-data.js',
  './foodservice-vocabulary-1000.js',
  './lodging-question-data.js',
  './lodging-vocabulary-1000.js',
  './japanese-furigana.js',
  './mistake-notebook.js',
  './mistakes-language.js',
  './theme-manager.js',
  './menu-locales.js',
  './back-nav.js',
  './pwa-helper.js',
  './firebase-bootstrap.js',
  './firebase-client.js',
  './firebase-config.js',
  './vocab-language.js',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Bypass Firebase firestore, auth, googleapis or external telemetry
  if (
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('identitytoolkit.googleapis.com') ||
    url.hostname.includes('firebaseio.com')
  ) {
    return;
  }

  // Network-First strategy: Always fetch freshest version from network when online.
  // Fall back to cache when offline or network fails.
  event.respondWith(
    fetch(req)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(req).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
