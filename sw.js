const CACHE_NAME = "daily-box-v60";
const ASSETS = [
  "./", "./index.html", "./styles.css?v=60", "./app.js?v=60",
  "./manifest.webmanifest", "./icon-180.png?v=60", "./icon-192.png?v=60",
  "./icon-512.png", "./vendor/supabase-2.118.0.min.js",
];
const ASSET_PATHS = new Set(ASSETS.map((path) => new URL(path, self.location).pathname));
const HOME_URL = new URL("./index.html", self.location).href;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("daily-box-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // Only cache this application's files; account and data requests go to the network.
  if (event.request.method !== "GET" || url.origin !== self.location.origin || !ASSET_PATHS.has(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const key = event.request.mode === "navigate" ? HOME_URL : event.request;
    const cached = await cache.match(key);
    if (cached) return cached;
    const response = await fetch(event.request);
    if (response.ok && response.type === "basic") {
      const copy = response.clone();
      event.waitUntil(cache.put(key, copy));
    }
    return response;
  })());
});
