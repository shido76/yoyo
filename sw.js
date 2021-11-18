const CACHE_NAME = 'V1'
const STATIC_CACHE_URLS = [
  '/', 
  'index.js',
  '/audio/pi.m4a',
  '/audio/pi-last.m4a',
]

self.addEventListener('install', event => {
  console.log('Service Worker installing.')
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(STATIC_CACHE_URLS))  
  )
})

self.addEventListener('activate', event => {
  console.log('Service Worker activating.')
  // delete any unexpected caches
  event.waitUntil(
    caches.keys()
    .then(keys => keys.filter(key => key !== CACHE_NAME))
    .then(keys => Promise.all(keys.map(key => {
        console.log(`Deleting cache ${key}`)
        return caches.delete(key)
    })))
  )
})

self.addEventListener('fetch', event => {
  // Cache-First Strategy
  event.respondWith(
    caches.match(event.request) // check if the request has already been cached
    .then(cached => cached || fetch(event.request)) // otherwise request network
  )
})