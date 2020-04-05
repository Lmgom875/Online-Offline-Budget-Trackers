var CACHE_NAME = 'budget-v1';
const API_CACHE_NAME = 'trasnsation-v1';
var urlsToCache = [
  '/',
  '/styles.css',
  '/index.js',
  '/index.html',
  '/db.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];



self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});






self.addEventListener("fetch", function(event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
    caches.open(API_CACHE_NAME).then(cache => {
      return fetch(event.request)
      .then(resp => {
        cache.put(event.request.url, resp.clone());
        console.log('api cache open');
        return resp;
      })
      .catch(error => {
        return cache.match(event.request);
      });
    })
    .catch(error => console.log(error))
    );
    return;
  };

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(resp => {
        return resp || fetch(event.request);
      });
    })
  );
});
  
 