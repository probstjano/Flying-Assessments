const CACHE_NAME = 'flying-assessment-v19'; 
const ASSETS_TO_CACHE = [
  '/',
  'index.html',
  'standard.html',
  'bereiche.html',
  'sppb.html',
  'demmi.html',
  'manifest.json',
  'icon.png',
  'SPPB_Protokoll.pdf',
  'DEMMI_Protokoll.pdf',
  'Assessment-Leitfaden.pdf',
  'FiST.html',
  'FSMC.html',
  'SARA.html',
  'BBS.html',
  'BBS.pdf',
  'PSFS_GAS.html'
  
];

// Neue Version sofort aktiv
self.addEventListener('install', (event) => {
  self.skipWaiting(); // ⚡ aktiviert sofort
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Alte Caches löschen + Kontrolle übernehmen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // ⚡ sofort übernehmen
});

// Netzwerkabfragen: zuerst Cache, dann Netzwerk
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
