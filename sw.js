const CACHE = 'memory-game-pro-v1';
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "images/bigben.webp",
  "images/burjkhalifa.webp",
  "images/camel.webp",
  "images/car_blue.webp",
  "images/car_red.webp",
  "images/car_yellow.webp",
  "images/cheetah.webp",
  "images/classic_car.webp",
  "images/colosseum.webp",
  "images/dolphin.webp",
  "images/eagle.webp",
  "images/eiffel.webp",
  "images/elephant.webp",
  "images/falcon.webp",
  "images/fuji.webp",
  "images/giraffe.webp",
  "images/greatwall.webp",
  "images/helicopter.webp",
  "images/horse.webp",
  "images/jet.webp",
  "images/leopard.webp",
  "images/lion.webp",
  "images/machupicchu.webp",
  "images/moto.webp",
  "images/owl.webp",
  "images/petra.webp",
  "images/pyramids.webp",
  "images/speedboat.webp",
  "images/statue_liberty.webp",
  "images/suv_luxury.webp",
  "images/sydney_opera.webp",
  "images/tajmahal.webp",
  "images/train_bullet.webp",
  "images/truck_heavy.webp",
  "images/yacht.webp",
  "images/zebra.webp"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((hit) => {
      if (hit) return hit;
      return fetch(e.request).then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
        }
        return res;
      }).catch(() => caches.match('index.html'));
    })
  );
});
