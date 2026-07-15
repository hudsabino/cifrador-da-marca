const CACHE = "cifrador-da-marca-v14";
const ARQUIVOS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./favicon.svg", "./icone-192.png", "./icone-512.png",
  "./icone-maskable-512.png", "./apple-touch-icon.png", "./emblema-glpmmmce.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match("./index.html")))
  );
});
