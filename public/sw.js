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
  // Only intercept GET requests. Re-wrapping a POST/PUT request via
  // fetch(event.request) corrupts streaming bodies (e.g. multipart
  // file uploads), causing "Failed to parse body as FormData" on the
  // server. Chrome's installability check only needs the handler to
  // exist and handle navigation, so non-GET requests are left alone
  // (no respondWith call = browser sends them untouched).
  if (event.request.method !== 'GET') {
    return;
  }
  event.respondWith(fetch(event.request));
});
