const CACHE = "qldc-v2";
const FILES = ["/quanlydancu/", "/quanlydancu/index.html", "/quanlydancu/manifest.json", "/quanlydancu/sw.js"];

self.addEventListener("install", function(e) {
  e.waitUntil(caches.open(CACHE).then(function(c) { return c.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener("activate", function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(r) {
      return r || fetch(e.request).catch(function() { return caches.match("/quanlydancu/index.html"); });
    })
  );
});