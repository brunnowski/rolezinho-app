self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open("rolezinho-v1").then(cache => {
      return cache.addAll([
        "/rolezinho-app/",
        "/rolezinho-app/index.html",
        "/rolezinho-app/manifest.json",
        "/rolezinho-app/assets/icons/icon-192.png",
        "/rolezinho-app/assets/icons/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});