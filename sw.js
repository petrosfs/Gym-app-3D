// Service worker: offline λειτουργία. Για νέα έκδοση των αρχείων δεδομένων (JSON) άλλαξε το VERSION.
const VERSION='v4';
const SHELL = 'gym-shell-' + VERSION;
const DATA = 'gym-data-' + VERSION;
const EXT = 'gym-ext-' + VERSION;

const SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/icon.svg'];
const DATA_FILES = ['char_f.json', 'char_m.json', 'muscles.json'];
const EXT_FILES = [
  'https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/loaders/GLTFLoader.js'
];
const EXT_HOSTS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    await (await caches.open(SHELL)).addAll(SHELL_FILES);
    // Τα μεγάλα αρχεία και οι εξωτερικές βιβλιοθήκες δεν πρέπει να εμποδίζουν την εγκατάσταση αν αποτύχουν
    const d = await caches.open(DATA), x = await caches.open(EXT);
    await Promise.allSettled([
      ...DATA_FILES.map(f => d.add(f)),
      ...EXT_FILES.map(u => x.add(new Request(u, { mode: 'cors' })))
    ]);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [SHELL, DATA, EXT];
    for (const k of await caches.keys()) if (!keep.includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

const networkFirst = async (req, cacheName) => {
  const c = await caches.open(cacheName);
  try {
    const r = await fetch(req);
    if (r && r.ok) c.put(req, r.clone());
    return r;
  } catch (err) {
    const hit = await c.match(req, { ignoreSearch: true });
    if (hit) return hit;
    throw err;
  }
};
const cacheFirst = async (req, cacheName) => {
  const c = await caches.open(cacheName);
  const hit = await c.match(req, { ignoreSearch: true });
  if (hit) return hit;
  const r = await fetch(req);
  if (r && r.ok) c.put(req, r.clone());
  return r;
};
const staleWhileRevalidate = async (req, cacheName) => {
  const c = await caches.open(cacheName);
  const hit = await c.match(req);
  const net = fetch(req).then(r => { if (r && (r.ok || r.type === 'opaque')) c.put(req, r.clone()); return r; }).catch(() => hit);
  return hit || net;
};

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    const name = url.pathname.split('/').pop();
    if (DATA_FILES.includes(name)) return e.respondWith(cacheFirst(req, DATA));
    // Η σελίδα και τα αρχεία της: πρώτα το δίκτυο (ώστε να έρχονται οι αλλαγές), αλλιώς η αποθηκευμένη έκδοση
    return e.respondWith(networkFirst(req, SHELL));
  }
  if (EXT_HOSTS.includes(url.hostname)) return e.respondWith(staleWhileRevalidate(req, EXT));
});
