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
    // ---- friends: "last seen" presence. No login needed; it only stores a random player id and a time. ----
    if (url.pathname === '/ping' || url.pathname === '/seen') {
      const PID = /^[a-f0-9]{16,32}$/;
      if (url.pathname === '/ping') {
        const pid = String(b.pid || ''); if (!PID.test(pid)) return json({ error: 'Bad request.' }, 400);
        await env.DB.prepare('INSERT INTO presence (pid, t) VALUES (?, ?) ON CONFLICT(pid) DO UPDATE SET t = excluded.t').bind(pid, Date.now()).run();
        if (Math.random() < 0.01) await env.DB.prepare('DELETE FROM presence WHERE t < ?').bind(Date.now() - 30 * 86400000).run();
        return json({ ok: true });
      }
      const pids = (Array.isArray(b.pids) ? b.pids : []).map(String).filter((x) => PID.test(x)).slice(0, 100);
      if (!pids.length) return json({ t: {} });
      const rows = await env.DB.prepare('SELECT pid, t FROM presence WHERE pid IN (' + pids.map(() => '?').join(',') + ')').bind(...pids).all();
      const t = {}; for (const r of rows.results || []) t[r.pid] = r.t; return json({ t });
    }
    // ---- party invites to friends who are online in another room: dropped here, picked up within seconds, expire after 3 minutes ----
    if (url.pathname === '/pinv' || url.pathname === '/pinbox') {
      const PID = /^[a-f0-9]{16,32}$/;
      await env.DB.prepare('CREATE TABLE IF NOT EXISTS invites (to_pid TEXT, from_pid TEXT, code TEXT, by TEXT, t INTEGER)').run();
      if (url.pathname === '/pinv') {
        const to = String(b.to || ''), from = String(b.from || ''), code = String(b.code || '').toUpperCase(), by = String(b.by || '').replace(/[\u0000-\u001f<>]/g, '').slice(0, 16);
        if (!PID.test(to) || !PID.test(from) || !/^[A-Z0-9-]{8,24}$/.test(code)) return json({ error: 'Bad request.' }, 400);
        const n = await env.DB.prepare('SELECT COUNT(*) AS c FROM invites WHERE from_pid = ? AND t > ?').bind(from, Date.now() - 60000).first();
        if (n && n.c >= 10) return json({ error: 'Slow down.' }, 429);
        await env.DB.prepare('INSERT INTO invites (to_pid, from_pid, code, by, t) VALUES (?, ?, ?, ?, ?)').bind(to, from, code, by, Date.now()).run();
        return json({ ok: true });
      }
      const pid = String(b.pid || ''); if (!PID.test(pid)) return json({ error: 'Bad request.' }, 400);
      const rows = await env.DB.prepare('SELECT from_pid, code, by, t FROM invites WHERE to_pid = ? AND t > ? ORDER BY t DESC LIMIT 5').bind(pid, Date.now() - 180000).all();
      await env.DB.prepare('DELETE FROM invites WHERE to_pid = ? OR t < ?').bind(pid, Date.now() - 180000).run();
      return json({ inv: (rows.results || []).map((r) => ({ f: r.from_pid, c: r.code, by: r.by })) });
    }
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
