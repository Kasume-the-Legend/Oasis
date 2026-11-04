// The Oasis service worker. Caches nothing. It (1) lets Android Chrome install the page as an app, and (2) adds the
// COOP/COEP headers GitHub Pages cannot send, so the page becomes cross-origin isolated (needed by the PlayStation 2 emulator's threads).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
    const r = e.request;
    if (r.cache === 'only-if-cached' && r.mode !== 'same-origin') return;
    e.respondWith(fetch(r).then((res) => {
        if (!res || res.status === 0 || res.type === 'opaque' || res.type === 'opaqueredirect') return res;
        const h = new Headers(res.headers);
        h.set('Cross-Origin-Embedder-Policy', 'credentialless');
        h.set('Cross-Origin-Opener-Policy', 'same-origin');
        h.set('Cross-Origin-Resource-Policy', 'cross-origin');
        return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h });
    }).catch(() => fetch(r)));
});
