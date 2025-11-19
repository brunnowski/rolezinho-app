const CACHE_NAME = 'rolezinho-static-v1';
const RUNTIME = 'rolezinho-runtime-v1';
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './offline.html'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => {
      if (k !== CACHE_NAME && k !== RUNTIME) return caches.delete(k);
    }));
    try { await self.clients.claim(); } catch(e){}
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;

  if (request.headers.get('accept') && request.headers.get('accept').includes('text/html')) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(RUNTIME);
        cache.put(request, fresh.clone());
        return fresh;
      } catch (err) {
        return caches.match('./offline.html');
      }
    })());
    return;
  }

  // navigation requests -> network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        const cache = await caches.open(RUNTIME);
        cache.put(request, response.clone());
        return response;
      } catch (err) {
        const cached = await caches.match('./offline.html');
        return cached || Response.error();
      }
    })());
    return;
  }

  // For other requests, use cache-first for images/scripts/styles
  if (request.destination === 'image' || request.destination === 'script' || request.destination === 'style') {
    event.respondWith(caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        const cloned = response.clone();
        caches.open(RUNTIME).then(cache => cache.put(request, cloned));
        return response;
      }).catch(() => caches.match('./icons/icon-192.png'));
    }));
    return;
  }

  // default: try network, fallback to cache
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
