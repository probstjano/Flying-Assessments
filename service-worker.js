
const CACHE_NAME = 'flying-assessment-v1';

const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'standard.html',
  'bereiche.html',
  'sppb.html',
  'manifest.json',
  'icon.png',
  'SPPB_Protokoll.pdf'
];

// Installation: Ressourcen cachen
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Aktivierung: alte Caches entfernen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Netzwerkanfragen abfangen: erst Cache, dann Netzwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
