/**
 * Minimal service worker — enables Chrome PWA install prompt.
 *
 * This app is online-only (e-commerce: products, cart, checkout,
 * payments, OAuth all require network). No offline caching is
 * performed. The fetch handler exists solely to satisfy Chrome's
 * installability criteria (beforeinstallprompt requires a fetch
 * handler in the SW).
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // All requests pass through to the network — no caching.
  event.respondWith(fetch(event.request));
});
