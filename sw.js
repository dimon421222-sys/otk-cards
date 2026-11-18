const CACHE_NAME = 'otk-cards-v3';
const PAGES = Array.from({ length: 31 }, (_, i) => {
  const numStr = String(i + 1).padStart(2, '0');
  return './pages/' + encodeURIComponent(`Фотокарты №1-36_Страница_${numStr}.jpg`);
});

const ASSETS = [
  './',
  './index.html',
  './data.js',
  './manifest.json',
  ...PAGES
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});