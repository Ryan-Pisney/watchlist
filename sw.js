const CACHE = 'watchlist-v3';
const SHELL = ['./index.html', './manifest.json', './config.js', './posters.js', './seed.js',
               './icon-192.png', './icon-512.png', './icon-180.png'];
// small, occasionally-edited files: always fetch fresh, cache as backup
const FRESH = ['./config.js', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function networkFirst(req) {
  return fetch(req)
    .then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    })
    .catch(() => caches.match(req).then(m => m || caches.match('./index.html')));
}

function cacheFirst(req) {
  return caches.match(req).then(
    hit =>
      hit ||
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
        return res;
      })
  );
}

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  if (url.origin !== location.origin) {
    e.respondWith(
      caches.match(e.request).then(hit =>
        hit ||
        fetch(e.request).then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
      )
    );
    return;
  }

  const isFresh = FRESH.some(f => url.pathname.endsWith(f.replace('./', '/')));
  e.respondWith(e.request.mode === 'navigate' || isFresh ? networkFirst(e.request) : cacheFirst(e.request));
});
