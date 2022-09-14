const staticCacheName = "cache-v1";
const assets = ["/", "/index.html"];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", (event) => {
    console.log(event.request);
});

/*
self.addEventListener("fetch", (event) => {

    if(!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
              return response;
            }
    
            var fetchRequest = event.request.clone();
    
            return fetch(fetchRequest).then(
                function(response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(staticCacheName).then(function(cache) {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }
            );
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.add(
                keys.filter((key) => key !== staticCacheName).map((key) => caches.delete(key))
            );
        })
    );
});
*/