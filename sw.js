const CACHE_NAME = 'otk-cards-v1';
const ASSETS = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  ...Array.from({ length: 31 }, (_, i) => `./pages/${i + 1}.jpg`)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});