/* sw.js — Service Worker PWA Universal Mobile Mapping GIS */
const VERSION = 'umg-1.4.0';
const SHELL = ['./', './index.html', './manifest.json', './icon-512.png'];
const CDN = ["https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css","https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js","https://unpkg.com/pmtiles@3.2.1/dist/pmtiles.js","https://unpkg.com/shpjs@6.2.0/dist/shp.min.js","https://unpkg.com/@tmcw/togeojson@7.1.3/dist/togeojson.umd.js","https://unpkg.com/geotiff@2.1.3/dist-browser/geotiff.js","https://unpkg.com/proj4@2.15.0/dist/proj4.js","https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js","https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js","https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js","https://unpkg.com/jspdf@2.5.2/dist/jspdf.umd.min.js","https://unpkg.com/fflate@0.8.2/umd/index.js"];
const TILE_CACHE = 'umg-tiles', TILE_MAX = 4000;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(SHELL);
    await Promise.all(CDN.map(u => fetch(u, { mode: 'cors' }).then(r => r.ok && c.put(u, r)).catch(() => null)));
    const demo = await fetch('./demo.html').catch(() => null);
    if (demo && demo.ok) await c.put('./demo.html', demo);
  })());
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION && k !== TILE_CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

async function trimTiles() {
  const c = await caches.open(TILE_CACHE), keys = await c.keys();
  for (let i = 0; i < keys.length - TILE_MAX; i++) await c.delete(keys[i]);
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.headers.has('range')) return;        // API POST & PMTiles range: selalu jaringan
  const url = new URL(req.url);
  if (url.hostname.endsWith('script.google.com') || url.hostname.endsWith('googleusercontent.com')) return;
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 4000);
        const r = await fetch(req, { signal: ctl.signal }); clearTimeout(t);
        if (r.ok) (await caches.open(VERSION)).put(req, r.clone());
        return r;
      } catch (err) {
        return (await caches.match(req, { ignoreSearch: true })) || (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  if (url.hostname === 'unpkg.com') {
    e.respondWith(caches.match(req).then(h => h || fetch(req).then(r => { if (r.ok) caches.open(VERSION).then(c => c.put(req, r.clone())); return r; })));
    return;
  }
  if (url.hostname === 'tile.openstreetmap.org') {   // cache pasif tile yang pernah dilihat (tanpa prefetch massal, sesuai kebijakan OSMF)
    e.respondWith((async () => {
      const c = await caches.open(TILE_CACHE), hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok) { c.put(req, r.clone()); trimTiles(); } return r; }).catch(() => hit || Response.error());
      return hit || net;
    })());
    return;
  }
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req).then(h => h || fetch(req)));
  }
});
