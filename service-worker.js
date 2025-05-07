const CACHE_NAME = 'flying-assessments-v3';

const ASSETS_TO_CACHE = [
  '/', // wichtig für index.html bei PWA
  '/index.html',
  '/standard.html',
  '/bereiche.html',
  '/Hilfsmaterial.html',
  '/Assessment-Leitfaden.pdf',
  '/manifest.json',
  '/icon.png',
  // Einzelseiten Assessments
  '/5xsit-stand.html',
  '/30s_assisted.html',
  '/1MSTS.html',
  '/2MST.html',
  '/DEMMI.html',
  '/FiST.html',
  '/PSFS_GAS.html',
  '/sppb.html',
  '/TUG.html',
  '/Gaitspeed.html',
  '/Tinetti.html',
  '/BBS.html',
  '/MCTSIB.html',
  '/FSST.html',
  '/FSMC.html',
  '/SARA.html',
  '/trunk_impairment_scale.html',
  '/ISI.html',
  '/GDS.html',
  '/Braincheck.html',
  '/FOG.html',
  // Protokolle & PDFs
  '/SPPB_Protokoll.pdf',
  '/DEMMI_Protokoll.pdf',
  '/BBS_Protokoll.pdf',
  '/FSST_Protokoll.pdf',
  '/MCTSIB_Protokoll.pdf',
  '/SARA_Protokoll.pdf',
  '/BraincheckQuestionnaire.pdf',
  '/BraincheckQuestionnaire_englisch.pdf',
  '/BraincheckQuestionnaire_französisch.pdf',
  '/BraincheckQuestionnaire_italienisch.pdf',
  '/BraincheckUhr.pdf',
  '/braincheck_anleitung.pdf',
  // Medien
  '/walking speeds.jpg'
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
