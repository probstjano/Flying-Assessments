const CACHE_NAME = 'flying-assessments-v4';

const CACHE_NAME = 'flying-assessments-v3';

const ASSETS_TO_CACHE = [
  '/', // für index.html
  '/index.html',
  '/standard.html',
  '/bereiche.html',
  '/Hilfsmaterial.html',
  '/Assessment-Leitfaden.pdf',
  '/manifest.json',
  '/icon.png',
  // HTML-Seiten
  '/1MSTS.html',
  '/2MST.html',
  '/30s_assissted.html',
  '/5xsit-stand.html',
  '/BBS.html',
  '/Braincheck.html',
  '/DEMMI.html',
  '/FES-I.html',
  '/FOG.html',
  '/FSMC.html',
  '/FSST.html',
  '/FiST.html',
  '/GDS.html',
  '/Gaitspeed.html',
  '/ISI.html',
  '/MCTSIB.html',
  '/PSFS_GAS.html',
  '/SARA.html',
  '/STEADI.html',
  '/TUG.html',
  '/tinetti.html',
  '/trunk_impairment_scale.html',
  '/WGFP.html',
  // PDFs & Materialien
  '/2MST.pdf',
  '/BBS_Protokoll.pdf',
  '/BraincheckQuestionnaire.pdf',
  '/BraincheckQuestionnaire_englisch.pdf',
  '/BraincheckQuestionnaire_französisch.pdf',
  '/BraincheckQuestionnaire_italienisch.pdf',
  '/BraincheckUhr.pdf',
  '/DEMMI_Protokoll.pdf',
  '/FSST_Protokoll.pdf',
  '/Inkontinenz_Toolkit.pdf',
  '/MCTSIB_Protokoll.pdf',
  '/Mentale Gesundheit_Toolkit.pdf',
  '/SARA_Protokoll.pdf',
  '/SPPB_Protokoll.pdf',
  '/STEADI_Algorithm.pdf',
  '/STEADI_Schuhe.pdf',
  '/Schlaf_Toolkit.pdf',
  '/Schmerz_Toolkit.pdf',
  '/Flying_Unfall.pdf'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installing and caching app shell...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating and cleaning old caches...');
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('/index.html');
    })
  );
});
