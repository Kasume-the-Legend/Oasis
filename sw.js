// The Oasis: a do-nothing service worker. It only exists so Android Chrome will install the page as an app that opens fullscreen. It caches nothing.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
