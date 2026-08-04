// Service worker del Quiz Struttura della Materia.
// Strategia: stale-while-revalidate — l'app parte subito dalla cache (quindi
// funziona offline anche ad app chiusa) e nel frattempo scarica l'eventuale
// versione aggiornata, che verrà usata all'avvio successivo.
//
// Dopo aver caricato su GitHub una nuova versione di index.html, cambia il
// numero di CACHE qui sotto (v1 -> v2): forza la pulizia della cache vecchia.

const CACHE = "quiz-sdm-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-180.png",
  "./icon-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          return k === CACHE ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET") return;
  if (req.url.indexOf(self.location.origin) !== 0) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (cached) {
      const network = fetch(req).then(function (res) {
        if (res && res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () {
        if (cached) return cached;
        if (req.mode === "navigate") return caches.match("./index.html");
        return new Response("", { status: 504 });
      });
      return cached || network;
    })
  );
});
