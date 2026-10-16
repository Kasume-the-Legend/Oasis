// Oasis save server: a Cloudflare Worker + D1 database.
// It stores ONE encrypted blob per account. The game encrypts the save in the player's browser with a key made from
// their username + password, so this server never sees a password or a readable save.
// Setup: see server/README.md.
const CORS = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400' };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', ...CORS } });
const MAX_BLOB = 1900000;            // D1 rows hold up to 2 MB
const WINDOW = 15 * 60 * 1000, TRIES = 10;
const HEX64 = /^[0-9a-f]{64}$/;
async function sha256hex(s) { const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join(''); }

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    const url = new URL(req.url);
    if (req.method !== 'POST') return json({ ok: true, name: 'oasis-save' });
    let b; try { b = await req.json(); } catch (e) { return json({ error: 'Bad request.' }, 400); }
    const id = String(b.id || ''), auth = String(b.auth || '');
    if (!HEX64.test(id) || !HEX64.test(auth)) return json({ error: 'Bad request.' }, 400);
    const a = await sha256hex('oasis-auth|' + auth), now = Date.now(), DB = env.DB;
    const rec = await DB.prepare('SELECT a, t, blob FROM saves WHERE id = ?').bind(id).first();
    const fl = await DB.prepare('SELECT n, t FROM fails WHERE id = ?').bind(id).first();
    if (fl && now - fl.t < WINDOW && fl.n >= TRIES) return json({ error: 'Too many wrong passwords. Try again in 15 minutes.' }, 429);
    if (rec && rec.a !== a) {
      const n = (fl && now - fl.t < WINDOW ? fl.n : 0) + 1;
      await DB.prepare('INSERT INTO fails (id, n, t) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET n = excluded.n, t = excluded.t').bind(id, n, now).run();
      return json({ error: 'Wrong username or password.' }, 401);
    }
    if (fl) await DB.prepare('DELETE FROM fails WHERE id = ?').bind(id).run();
    if (url.pathname === '/load') return rec ? json({ found: true, t: rec.t, blob: rec.blob }) : json({ found: false });
    if (url.pathname === '/save') {
      const blob = String(b.blob || '');
      if (!blob.startsWith('v1:') || blob.length > MAX_BLOB) return json({ error: 'Save too large or invalid.' }, 413);
      await DB.prepare('INSERT INTO saves (id, a, t, blob) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET t = excluded.t, blob = excluded.blob WHERE saves.a = excluded.a').bind(id, a, now, blob).run();
      return json({ ok: true, t: now });
    }
    if (url.pathname === '/delete') { await DB.prepare('DELETE FROM saves WHERE id = ? AND a = ?').bind(id, a).run(); return json({ ok: true }); }
    return json({ error: 'Not found.' }, 404);
  }
};
