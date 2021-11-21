const CACHE_NAME = 'V2'
const STATIC_CACHE_URLS = [
  '/', 
  'alpine.js',
  'index.js',
  '/audio/pi.m4a',
  '/audio/pi-last.m4a',
  '/assets/apple-touch-icon.png',
  '/assets/favicon-32x32.png',
  '/assets/favicon-16x16.png',
  '/assets/safari-pinned-tab.svg',
  '/assets/android-chrome-192x192.png',
  '/assets/android-chrome-512x512.png',
  '/manifest.json',
  '/audio/finish.mp3',
  '/audio/end-yoyo.mp3',
]

const AUDIOS = [
  '1.1', 
  '1.2', 
  '1.3', 
  '1.4', 
  '1.5', 
  '1.6', 
  '1.7', 
  '2.1', 
  '2.2', 
  '2.3', 
  '2.4', 
  '2.5', 
  '2.6', 
  '2.7', 
  '2.8', 
  '3.1', 
  '3.2', 
  '3.3', 
  '3.4', 
  '3.5', 
  '3.6', 
  '3.7', 
  '3.8', 
  '4.1', 
  '4.2', 
  '4.3', 
  '4.4', 
  '4.5', 
  '4.6', 
  '4.7', 
  '4.8', 
  '5.1', 
  '5.2', 
  '5.3', 
  '5.4', 
  '5.5', 
  '5.6', 
  '5.7', 
  '5.8', 
  '5.9',   
  '6.1', 
  '6.2', 
  '6.3',  
  '6.4', 
  '6.5', 
  '6.6', 
  '6.7', 
  '6.8',  
  '6.9',   
  '7.1',  
  '7.2',  
  '7.3',  
  '7.4',  
  '7.5',  
  '7.6',  
  '7.7',  
  '7.8',  
  '7.9',  
  '7.10', 
  '8.1',  
  '8.2',  
  '8.3',   
  '8.4',  
  '8.5',  
  '8.6',   
  '8.7',  
  '8.8',  
  '8.9',  
  '8.10', 
  '9.1', 
  '9.2',   
  '9.3',  
  '9.4',  
  '9.5',   
  '9.6',  
  '9.7',  
  '9.8',  
  '9.9',  
  '9.10',  
  '9.11', 
  '10.1',  
  '10.2',  
  '10.3',  
  '10.4',  
  '10.5',  
  '10.6',  
  '10.7',   
  '10.8',  
  '10.9',  
  '10.10',   
  '10.11', 
  '11.1',  
  '11.2',  
  '11.3',  
  '11.4',  
  '11.5',  
  '11.6',  
  '11.7',  
  '11.8',  
  '11.9',
  '11.10',
  '11.11',
  '12.1', 
  '12.2',
  '12.3',
  '12.4',
  '12.5',
  '12.6',
  '12.7',
  '12.8',
  '12.9',
  '12.10',
  '12.11',
  '12.12',
  '13.1',
  '13.2',
  '13.3',
  '13.4',
  '13.5',
  '13.6',
  '13.7',
  '13.8',
  '13.9',
  '13.10',
  '13.11',
  '13.12',
  '14.1',
  '14.2',
  '14.3',
  '14.4',
  '14.5',
  '14.6',
  '14.7',
  '14.8',
  '14.9',
  '14.10',
  '14.11',
  '14.12',
  '14.13',   
  '15.1',
  '15.2',
  '15.3',
  '15.4',
  '15.5',
  '15.6',
  '15.7',
  '15.8',
  '15.9',
  '15.10',
  '15.11', 
  '15.12',
  '15.13',
  '16.1',
  '16.2',
  '16.3',
  '16.4',
  '16.5',
  '16.6',
  '16.7',
  '16.8',
  '16.9',
  '16.10',
  '16.11',
  '16.12',
  '16.13',
  '17.1',
  '17.2',
  '17.3', 
  '17.4',
  '17.5',
  '17.6',
  '17.7', 
  '17.8',
  '17.9',
  '17.10',
  '17.11',
  '17.12',
  '17.13',
  '17.14',
  '18.1',
  '18.2',
  '18.3',
  '18.4', 
  '18.5',
  '18.6',
  '18.7',
  '18.8',
  '18.9',
  '18.10',
  '18.11',
  '18.12',
  '18.13',
  '18.14',
  '19.1',   
  '19.2',
  '19.3',
  '19.4',
  '19.5', 
  '19.6',
  '19.7',
  '19.8',
  '19.9',
  '19.10',
  '19.11',
  '19.12',
  '19.13',
  '19.14',
  '19.15',
  '20.1',
  '20.2',
  '20.3',
  '20.4',
  '20.5', 
  '20.6',
  '20.7',
  '20.8',
  '20.9',
  '20.10',
  '20.11',
  '20.12',
  '20.13',
  '20.14',
  '20.15',
]

self.addEventListener('install', event => {
  console.log('Service Worker installing.')
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(STATIC_CACHE_URLS.concat(AUDIOS.map( audio => `audio/level-${audio}.mp3` ))))  
  )
})

self.addEventListener('activate', event => {
  console.log('Service Worker activating.')
  
  if(self.indexedDB){
    console.log('IndexedDB is supported')

    const request = self.indexedDB.open('YOYO', 1)
    let db = null

    request.onsuccess = e => {
      console.log('[onsuccess]', request.result)
      db = e.target.result // === request.result

      const transaction = db.transaction('audios', 'readwrite')
      transaction.onsuccess = t => {
        console.log('[Transaction] ALL DONE!')
      }
      transaction.onerror = t => {
        console.log('[Transaction] Error', t)
      }
      transaction.onabort = t => {
        console.log('[Transaction] Aborted', t)
      }

      const audioStore = transaction.objectStore('audios')

      // AUDIOS.forEach(audio => {
      //   let dbOpRequest = audioStore.add(`level-${audio}.mp3`)
      //   dbOpRequest.onsuccess = op => {
      //     console.log(op.target.result)
      //   }  
      // })
    }

    request.onupgradeneeded = e => {
      db = e.target.result
      const store = db.createObjectStore('audios', { keyPath: event.request })
    };

    request.onerror = e => {
      console.log('[onerror]', request.error)
    }

  }

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
