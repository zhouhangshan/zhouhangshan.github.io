
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('周航山的网站').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.js',
        '/ico.ico'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});



self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});