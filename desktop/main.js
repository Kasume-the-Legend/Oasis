const { app, BrowserWindow, protocol, net, session, shell, Menu } = require('electron');
const path = require('path'); const { pathToFileURL } = require('url'); const fs = require('fs');
protocol.registerSchemesAsPrivileged([{ scheme: 'oasis', privileges: { standard: true, secure: true, supportFetchAPI: true, corsEnabled: true, stream: true } }]);
const ROOT = path.join(__dirname, 'game');
function createWindow() {
  const win = new BrowserWindow({ width: 1280, height: 760, backgroundColor: '#050a1c', title: 'Oasis', autoHideMenuBar: true, webPreferences: { contextIsolation: true, sandbox: true, backgroundThrottling: false } });
  Menu.setApplicationMenu(null);
  win.loadURL('oasis://game/index.html');
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });   // links open in your normal browser
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('oasis://')) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });
  win.webContents.on('before-input-event', (e, i) => { if (i.type === 'keyDown' && i.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); } });
}
app.whenReady().then(() => {
  protocol.handle('oasis', (req) => {      // serves the game from inside the app, on one fixed address so saves stay put
    let p = decodeURIComponent(new URL(req.url).pathname); if (p === '/' || !p) p = '/index.html';
    const f = path.normalize(path.join(ROOT, p)); if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) return new Response('Not found', { status: 404 });
    return net.fetch(pathToFileURL(f).toString());
  });
  session.defaultSession.setPermissionRequestHandler((wc, perm, cb) => cb(['media', 'fullscreen', 'clipboard-read', 'clipboard-sanitized-write', 'pointerLock', 'gamepad'].includes(perm)));
  createWindow();
  app.on('activate', () => { if (!BrowserWindow.getAllWindows().length) createWindow(); });
});
app.on('window-all-closed', () => app.quit());
