/* Adventure Mode: a linear, zone-by-zone road (Final Fantasy X style) for The Oasis.
 * Loaded on demand by index.html (like Levels.js). No imports: it is given what it needs.
 *
 *   const A = mod.default({ THREE, L, seeded, canvasTex, cb });
 *     L  = the Levels.js module (kit, gk, pathTex, groundTex)
 *     cb = { teleport(x,z,ry), encounter(enc), heal(), toast(msg), chat(msg), busy() }
 *
 * Pieces:
 *   Path        a zone's spline (CatmullRom through PathPoint1..N): project(), at(), clamp
 *   ZoneLoader  JSON -> geometry (ground, path ribbon, scenery along the road, landmarks, save spheres, sky, lights)
 *   Encounters  invisible trigger volumes along the road that roll random battles as you walk
 *   Progress    flags, save spheres, visited zones, fast-travel nodes (kept on this device)
 *   Audio       per-zone ambience + a small generative melody (or a music file if the zone names one)
 *   UI          fade, zone banner, HUD, save-sphere prompt, world map + fast travel, title menu
 */
export default function (C) {
    const { THREE, L, seeded, cb } = C;
    const PI = Math.PI, TAU = PI * 2, clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const KEY = 'oasisAdv.v1';

    /* ----------------------------------------------------------------- Path */
    class Path {
        constructor(pts, width) {
            this.width = width || 3.2;
            const v = pts.map((p) => new THREE.Vector3(p[0], 0, p[1]));
            this.curve = new THREE.CatmullRomCurve3(v, false, 'centripetal');
            const len = this.curve.getLength(), n = Math.max(8, Math.ceil(len / 0.8));
            this.n = n; this.len = len; this.px = new Float32Array(n + 1); this.pz = new Float32Array(n + 1); this.tx = new Float32Array(n + 1); this.tz = new Float32Array(n + 1); this.cum = new Float32Array(n + 1);
            let acc = 0, lx = 0, lz = 0;
            for (let i = 0; i <= n; i++) {
                const t = i / n, p = this.curve.getPointAt(t), q = this.curve.getTangentAt(t);
                this.px[i] = p.x; this.pz[i] = p.z; const h = Math.hypot(q.x, q.z) || 1; this.tx[i] = q.x / h; this.tz[i] = q.z / h;
                if (i) acc += Math.hypot(p.x - lx, p.z - lz); this.cum[i] = acc; lx = p.x; lz = p.z;
            }
            this.len = acc; this.hint = 0;
        }
        /* nearest point on the road: { i, t (0..1 along it), d (signed distance, right of travel positive), cx, cz, tx, tz } */
        project(x, z, hint) {
            let best = 1e12, bi = 0; const n = this.n, h = hint === undefined ? this.hint : hint;
            const scan = (a, b) => { for (let i = a; i <= b; i++) { const dx = x - this.px[i], dz = z - this.pz[i], d = dx * dx + dz * dz; if (d < best) { best = d; bi = i; } } };
            if (h >= 0) scan(Math.max(0, h - 40), Math.min(n, h + 40)); if (h < 0 || best > 36) { best = 1e12; scan(0, n); }
            this.hint = bi; const tx = this.tx[bi], tz = this.tz[bi], dx = x - this.px[bi], dz = z - this.pz[bi];
            return { i: bi, t: this.cum[bi] / this.len, d: dx * -tz + dz * tx, cx: this.px[bi], cz: this.pz[bi], tx, tz, dist: Math.sqrt(best) };
        }
        at(t) { t = clamp(t, 0, 1); const f = t * this.n, i = Math.min(this.n - 1, Math.floor(f)), k = f - i; const x = this.px[i] + (this.px[i + 1] - this.px[i]) * k, z = this.pz[i] + (this.pz[i + 1] - this.pz[i]) * k; let tx = this.tx[i] + (this.tx[i + 1] - this.tx[i]) * k, tz = this.tz[i] + (this.tz[i + 1] - this.tz[i]) * k; const h = Math.hypot(tx, tz) || 1; return { x, z, tx: tx / h, tz: tz / h, nx: -tz / h, nz: tx / h }; }
    }

    /* ------------------------------------------------------------- Progress */
    const Progress = {
        s: null,
        blank() { return { v: 1, zone: null, x: 0, z: 0, flags: {}, spheres: {}, visited: {}, last: null, kills: 0, battles: 0, steps: 0, ms: 0, started: Date.now() }; },
        load() { try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); if (j && j.v === 1) { this.s = Object.assign(this.blank(), j); return true; } } catch (e) { /* no save */ } this.s = this.blank(); return false; },
        has() { try { const j = JSON.parse(localStorage.getItem(KEY) || 'null'); return !!(j && j.v === 1 && j.zone); } catch (e) { return false; } },
        save() { try { localStorage.setItem(KEY, JSON.stringify(this.s)); } catch (e) { /* storage full or blocked */ } },
        reset() { this.s = this.blank(); this.save(); },
        flag(k, v = true) { if (!this.s.flags[k]) { this.s.flags[k] = v; this.save(); return true; } return false; },
        hasFlag(k) { return !!(this.s && this.s.flags[k]); },
        visit(z) { this.s.visited[z] = (this.s.visited[z] || 0) + 1; },
        sphere(id, zone) { const first = !this.s.spheres[id]; this.s.spheres[id] = zone; this.s.last = id; this.save(); return first; },
        nodes(zones) { const out = []; for (const z of zones) for (const sp of z.saves || []) if (this.s.spheres[sp.id]) out.push({ id: sp.id, name: sp.name, zone: z.id, zoneName: z.name, t: sp.t }); return out; },
    };

    /* ---------------------------------------------------------------- Audio */
    const SCALES = { penta: [0, 2, 4, 7, 9], minor: [0, 2, 3, 5, 7, 8, 10], lydian: [0, 2, 4, 6, 7, 9, 11], dorian: [0, 2, 3, 5, 7, 9, 10] };
    const Audio = {
        ctx: null, master: null, nodes: [], timer: 0, el: null, kind: '', vol: 0.5, on: true,
        init() { if (this.ctx) return true; try { const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false; this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = 0; this.master.connect(this.ctx.destination); const len = this.ctx.sampleRate * 2, buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate), d = buf.getChannelData(0); let b0 = 0; for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; b0 = 0.985 * b0 + 0.015 * w; d[i] = b0 * 6; } this.noise = buf; return true; } catch (e) { return false; } },
        stopAll() { clearInterval(this.timer); for (const n of this.nodes) { try { n.stop ? n.stop() : n.disconnect(); } catch (e) { /* ended */ } } this.nodes = []; if (this.el) { try { this.el.pause(); } catch (e) { /* none */ } this.el = null; } },
        layer(type, f, q, g, lfoHz, lfoDepth) {
            const c = this.ctx, s = c.createBufferSource(); s.buffer = this.noise; s.loop = true; const fl = c.createBiquadFilter(); fl.type = type; fl.frequency.value = f; fl.Q.value = q; const ga = c.createGain(); ga.gain.value = g; s.connect(fl); fl.connect(ga); ga.connect(this.master); s.start(); this.nodes.push(s);
            if (lfoHz) { const o = c.createOscillator(), og = c.createGain(); o.frequency.value = lfoHz; og.gain.value = lfoDepth; o.connect(og); og.connect(ga.gain); o.start(); this.nodes.push(o); }
        },
        note(midi, when, dur, vol, type) { const c = this.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type || 'triangle'; o.frequency.value = 440 * Math.pow(2, (midi - 69) / 12); g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(vol, when + 0.06); g.gain.exponentialRampToValueAtTime(0.0008, when + dur); o.connect(g); g.connect(this.master); o.start(when); o.stop(when + dur + 0.1); },
        play(zone) {
            if (!this.on) return; if (!this.init()) return; this.stopAll(); if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => { /* needs a gesture */ });
            const amb = zone.ambient || 'wind', mu = zone.music || {}; this.kind = zone.id;
            if (amb === 'waves') { this.layer('lowpass', 520, 0.7, 0.16, 0.11, 0.12); this.layer('highpass', 2600, 0.4, 0.02, 0.2, 0.015); }
            else if (amb === 'forest') { this.layer('lowpass', 360, 0.5, 0.1, 0.07, 0.05); this.layer('bandpass', 4200, 6, 0.012, 0.3, 0.01); }
            else if (amb === 'ice') { this.layer('highpass', 1800, 0.5, 0.035, 0.05, 0.03); this.layer('lowpass', 240, 0.5, 0.09, 0.05, 0.04); }
            else this.layer('bandpass', 700, 0.5, 0.15, 0.17, 0.09);
            if (mu.src) { try { const a = new window.Audio(mu.src); a.loop = true; a.volume = 0.5 * this.vol; a.play().catch(() => { /* blocked */ }); this.el = a; } catch (e) { /* ignore */ } }
            else {
                const sc = SCALES[mu.scale] || SCALES.penta, root = mu.root || 57, c = this.ctx; const wet = c.createDelay(1.2); wet.delayTime.value = 0.42; const fb = c.createGain(); fb.gain.value = 0.38; wet.connect(fb); fb.connect(wet); wet.connect(this.master);
                const pad = (r) => { for (const iv of [0, 7, 12 + sc[2 % sc.length]]) this.note(r + iv - 12, c.currentTime, 7.5, 0.028, 'sine'); };
                let beat = 0; pad(root);
                this.timer = setInterval(() => { if (!this.ctx || this.ctx.state !== 'running') return; const t = c.currentTime + 0.05; if (beat % 4 === 0) pad(root + (Math.random() < 0.3 ? sc[2 % sc.length] - 12 : 0)); if (Math.random() < 0.72) { const m = root + 12 + sc[Math.floor(Math.random() * sc.length)] + (Math.random() < 0.3 ? 12 : 0), g = c.createGain(); g.gain.value = 0.9; this.note(m, t, 3.2, 0.05, 'triangle'); } beat++; }, 1900);
            }
            this.master.gain.cancelScheduledValues(this.ctx.currentTime); this.master.gain.linearRampToValueAtTime(0.5 * this.vol, this.ctx.currentTime + 2.5);
        },
        duck(on) { if (!this.ctx) return; this.master.gain.cancelScheduledValues(this.ctx.currentTime); this.master.gain.linearRampToValueAtTime(on ? 0.0 : 0.5 * this.vol, this.ctx.currentTime + 0.6); if (this.el) this.el.volume = on ? 0 : 0.5 * this.vol; },
        stop() { this.stopAll(); if (this.master) this.master.gain.value = 0; },
    };

    /* ------------------------------------------------------------------- UI */
    const UI = {
        root: null, built: false,
        css() {
            if (document.getElementById('adv-css')) return; const s = document.createElement('style'); s.id = 'adv-css';
            s.textContent = `
#adv-fade{position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;z-index:9000;transition:opacity .5s ease}
#adv-fade.on{opacity:1;pointer-events:auto}
#adv-flash{position:fixed;inset:0;pointer-events:none;z-index:8999;opacity:0;background:radial-gradient(circle at 50% 50%,#fff 0%,#bfe7ff 30%,rgba(10,20,60,.0) 70%)}
#adv-flash.go{animation:advFlash .9s ease-in forwards}
@keyframes advFlash{0%{opacity:0;transform:scale(.6)}35%{opacity:.95;transform:scale(1.05)}100%{opacity:1;transform:scale(3.2);background:#000}}
#adv-banner{position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:8000;text-align:center;pointer-events:none;opacity:0;transition:opacity .8s;color:#fff;text-shadow:0 2px 12px #000}
#adv-banner.on{opacity:1}
#adv-banner b{display:block;font:700 30px/1.1 system-ui,sans-serif;letter-spacing:.06em}
#adv-banner span{display:block;margin-top:6px;font:500 13px system-ui,sans-serif;letter-spacing:.18em;text-transform:uppercase;opacity:.85}
#adv-hud{position:fixed;left:12px;top:70px;z-index:7000;display:none;gap:8px;align-items:center;font:600 12px system-ui,sans-serif;color:#fff}
#adv-hud.on{display:flex}
#adv-hud .pill{background:rgba(10,16,38,.78);border:1px solid rgba(120,200,255,.35);border-radius:999px;padding:6px 12px;backdrop-filter:blur(6px)}
#adv-hud button{background:rgba(10,16,38,.78);border:1px solid rgba(120,200,255,.5);color:#cfe9ff;border-radius:999px;padding:6px 12px;cursor:pointer;font:600 12px system-ui}
#adv-hud button:hover{background:rgba(40,80,160,.8)}
#adv-bar{width:90px;height:6px;border-radius:3px;background:rgba(255,255,255,.18);overflow:hidden;display:inline-block;vertical-align:middle;margin-left:8px}
#adv-bar i{display:block;height:100%;background:linear-gradient(90deg,#4ad1ff,#7dffd0);width:0}
#adv-prompt{position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:7000;display:none;background:rgba(10,16,38,.85);border:1px solid #7dffd0;color:#e8fff6;border-radius:12px;padding:10px 18px;font:600 14px system-ui;cursor:pointer;text-align:center}
#adv-prompt.on{display:block}
#adv-panel{position:fixed;inset:0;z-index:8500;display:none;align-items:center;justify-content:center;background:rgba(2,6,20,.72);backdrop-filter:blur(4px);font-family:system-ui,sans-serif;color:#fff}
#adv-panel.on{display:flex}
#adv-panel .box{width:min(720px,94vw);max-height:90vh;overflow:auto;background:linear-gradient(180deg,#0f1a3a,#0a1128);border:1px solid rgba(120,200,255,.4);border-radius:18px;padding:22px}
#adv-panel h2{margin:0 0 4px;font-size:22px;letter-spacing:.05em}
#adv-panel .sub{opacity:.7;font-size:12px;margin-bottom:14px}
#adv-panel .btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
#adv-panel button.big{background:#2a5bd7;border:0;color:#fff;border-radius:10px;padding:10px 18px;font:700 14px system-ui;cursor:pointer}
#adv-panel button.big.alt{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25)}
#adv-panel button.big:disabled{opacity:.4;cursor:default}
#adv-map{display:flex;align-items:center;gap:0;overflow-x:auto;padding:18px 4px 30px}
.adv-node{flex:0 0 auto;width:120px;text-align:center;position:relative}
.adv-node .dot{width:26px;height:26px;margin:0 auto;border-radius:50%;border:3px solid #5a6a90;background:#1a2342}
.adv-node.vis .dot{border-color:#7dffd0;background:#12503f}
.adv-node.cur .dot{border-color:#ffd23f;background:#7a5a10;box-shadow:0 0 14px #ffd23f}
.adv-node b{display:block;margin-top:8px;font-size:12px}
.adv-node small{display:block;opacity:.65;font-size:10px;margin-top:2px}
.adv-link{flex:0 0 36px;height:3px;background:#3a4a78;margin-top:-34px}
.adv-link.on{background:#7dffd0}
.adv-sph{margin-top:6px;display:flex;flex-direction:column;gap:4px;align-items:center}
.adv-sph button{background:rgba(125,255,208,.12);border:1px solid #7dffd0;color:#c8ffe9;border-radius:8px;padding:3px 8px;font:600 10px system-ui;cursor:pointer;max-width:112px}
.adv-sph button:hover{background:rgba(125,255,208,.3)}
.adv-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;font-size:12px;opacity:.9;margin-top:6px}
.adv-stats div{background:rgba(255,255,255,.06);border-radius:8px;padding:8px}
`; document.head.appendChild(s);
        },
        build() {
            if (this.built) return; this.css(); const mk = (id, cls) => { const d = document.createElement('div'); d.id = id; if (cls) d.className = cls; document.body.appendChild(d); return d; };
            this.fade = mk('adv-fade'); this.flash = mk('adv-flash'); this.banner = mk('adv-banner'); this.hud = mk('adv-hud'); this.prompt = mk('adv-prompt'); this.panel = mk('adv-panel');
            this.hud.innerHTML = '<span class="pill"><span id="adv-zn">-</span><span id="adv-bar"><i></i></span></span><button id="adv-map-btn">Map</button><button id="adv-exit-btn">Leave</button>';
            this.hud.querySelector('#adv-map-btn').onclick = () => A.openMap(); this.hud.querySelector('#adv-exit-btn').onclick = () => A.leave();
            this.prompt.onclick = () => A.interact();
            this.built = true;
        },
        setFade(on, ms = 500) { this.build(); this.fade.style.transitionDuration = ms + 'ms'; this.fade.classList.toggle('on', on); return new Promise((r) => setTimeout(r, ms + 30)); },
        showBanner(name, sub) { this.build(); this.banner.innerHTML = '<b></b><span></span>'; this.banner.children[0].textContent = name; this.banner.children[1].textContent = sub || ''; this.banner.classList.add('on'); clearTimeout(this.bt); this.bt = setTimeout(() => this.banner.classList.remove('on'), 3400); },
        hudOn(on) { this.build(); this.hud.classList.toggle('on', !!on); if (!on) { this.prompt.classList.remove('on'); this.banner.classList.remove('on'); } },
        setHud(name, t) { const n = this.hud.querySelector('#adv-zn'); if (n && n.textContent !== name) n.textContent = name; const b = this.hud.querySelector('#adv-bar i'); if (b) b.style.width = Math.round(clamp(t, 0, 1) * 100) + '%'; },
        setPrompt(txt) { if (!this.built) return; if (txt) { if (this.prompt.textContent !== txt) this.prompt.textContent = txt; this.prompt.classList.add('on'); } else this.prompt.classList.remove('on'); },
        panelOpen(html, wire) { this.build(); this.panel.innerHTML = '<div class="box">' + html + '</div>'; this.panel.classList.add('on'); if (wire) wire(this.panel); },
        panelClose() { if (this.panel) { this.panel.classList.remove('on'); this.panel.innerHTML = ''; } },
        get panelIsOpen() { return !!this.panel && this.panel.classList.contains('on'); },
    };

    /* ------------------------------------------------------------ the module */
    const A = {
        data: null, zones: [], byId: {}, zone: null, path: null, group: null, K: null, mats: [], anim: [], spheres: [], volumes: [], dbg: null, env: null,
        busy: false, active: false, enc: { acc: 0, steps: 0, cool: 0, last: null }, nearSphere: null, lastPos: null, camYaw: null, t: 0, sky: null, key: null, T: 0, battle: null,
        Path, Progress, Audio, UI,

        async loadData(url) { if (this.data) return this.data; const r = await fetch(url || 'adventure/zones.json'); if (!r.ok) throw new Error('zones.json ' + r.status); this.data = await r.json(); this.zones = this.data.zones; this.byId = {}; for (const z of this.zones) this.byId[z.id] = z; return this.data; },

        /* ---------------- building a zone ---------------- */
        unload() {
            const g = this.group; if (!g) return;
            g.removeFromParent(); g.traverse((o) => { if (o.geometry && !o.userData.keepGeo) { try { o.geometry.dispose(); } catch (e) { /* ok */ } } if (o.material) { for (const m of Array.isArray(o.material) ? o.material : [o.material]) { try { if (m.map && m.userData && m.userData.own) m.map.dispose(); m.dispose(); } catch (e) { /* ok */ } } } });
            this.group = null; this.K = null; this.mats = []; this.anim = []; this.spheres = []; this.volumes = []; this.dbg = null; this.sky = null; this.key = null;
        },
        build(zone, parent) {
            this.unload(); const Q = seeded(hash(zone.id)), g = new THREE.Group(); g.name = 'adv_' + zone.id; this.group = g; parent.add(g);
            const path = this.path = new Path(zone.path, zone.width), mats = this.mats = [], anim = this.anim = []; const K = this.K = L.kit(g, Q, mats, anim); const GK = L.gk();
            const { M, IM, G, mesh } = K; const VM = M(0xffffff, { vertexColors: true, paint: 0, sn: 0 }), VD = M(0xffffff, { vertexColors: true, paint: 0, sn: 0, side: THREE.DoubleSide }), tn = (k) => { const v = Math.min(255, Math.floor(255 * k)); return (v << 16) | (v << 8) | v; };
            // bounds
            let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9; for (let i = 0; i <= path.n; i += 4) { x0 = Math.min(x0, path.px[i]); x1 = Math.max(x1, path.px[i]); z0 = Math.min(z0, path.pz[i]); z1 = Math.max(z1, path.pz[i]); }
            const cx = (x0 + x1) / 2, cz = (z0 + z1) / 2, S = Math.max(x1 - x0, z1 - z0) + 700; this.bounds = { x0, x1, z0, z1, cx, cz };
            // ground
            const gt = L.groundTex(zone.ground.tex).clone(); gt.wrapS = gt.wrapT = THREE.RepeatWrapping; gt.repeat.set(S / 5.7, S / 5.7); gt.needsUpdate = true;
            const gm = new THREE.MeshStandardMaterial({ color: zone.ground.color, roughness: 1, map: gt }); gm.userData.own = true; mats.push({ m: gm, c: new THREE.Color(zone.ground.color), sn: 1, glow: 0, gt: 0 });
            const gd = mesh(new THREE.PlaneGeometry(S, S), gm, cx, -0.04, cz); gd.rotation.x = -PI / 2; gd.userData.noGround = true;
            // road ribbon
            { const w = path.width * 1.0, N = path.n, pos = [], uv = [], idx = []; for (let i = 0; i <= N; i++) { const nx = -path.tz[i], nz = path.tx[i], wob = 1 + Math.sin(i * 0.37) * 0.07; for (const s of [-1, 1]) { pos.push(path.px[i] + nx * s * w * 0.5 * wob, 0.035, path.pz[i] + nz * s * w * 0.5 * wob); uv.push(s < 0 ? 0 : 1, path.cum[i] / (w * 1.6)); } if (i < N) { const a = i * 2; idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3); } }
                const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.setIndex(idx); geo.computeVertexNormals();
                const pt = L.pathTex(zone.pathTex || 'dirt'), rm = new THREE.MeshStandardMaterial({ map: pt, roughness: 0.95, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3 }); mats.push({ m: rm, c: new THREE.Color(0xffffff), sn: 1, glow: 0, gt: 0 });
                const rb = new THREE.Mesh(geo, rm); rb.userData.noOutline = true; rb.frustumCulled = false; g.add(rb);
                // soft verge: a darker, wider strip under the road so it sits in the ground
                const vg = geo.clone(), vp = vg.attributes.position; for (let i = 0; i <= N; i++) for (let s = 0; s < 2; s++) { const k = i * 2 + s, px = vp.getX(k) - path.px[i], pz = vp.getZ(k) - path.pz[i]; vp.setXYZ(k, path.px[i] + px * 1.35, 0.02, path.pz[i] + pz * 1.35); } const vm = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }); const vgm = new THREE.Mesh(vg, vm); vgm.userData.noOutline = true; vgm.frustumCulled = false; g.add(vgm); }
            // scenery along the road
            for (const sc of zone.scatter || []) {
                const model = GK[sc.m]; if (!model) { console.warn('adventure: no model', sc.m); continue; } const arr = Array.isArray(model) ? model : [model], hw = path.width / 2, byV = arr.map(() => []);
                for (let k = 0, tries = 0; k < sc.n && tries < sc.n * 4; tries++) {
                    const t = Q(), p = path.at(t), side = Q() < 0.5 ? -1 : 1, off = sc.off[0] + (sc.off[1] - sc.off[0]) * Math.pow(Q(), 1.35), lat = side * (hw + off), x = p.x + p.nx * lat, z = p.z + p.nz * lat;
                    const pr = path.project(x, z, -1); if (pr.dist < hw + sc.off[0] * 0.8) continue; k++;
                    const s = sc.s[0] + (sc.s[1] - sc.s[0]) * Q(), v = Math.floor(Q() * arr.length); byV[v].push({ x, z, ry: Q() * 6.28, sx: s, sy: s * (0.9 + Q() * 0.25), sz: s, c: sc.tint ? tn(0.86 + Q() * 0.14) : undefined });
                }
                arr.forEach((ge, v) => { if (byV[v].length) IM(ge, sc.dbl || /palm|tuft|flower/i.test(sc.m) ? VD : VM, byV[v]); });
            }
            // far scenery: big soft hills either side so the road never looks like a stage
            { const far = []; const m0 = GK.broad ? GK.broad[0] : null; if (m0) { for (let i = 0; i < 46; i++) { const p = path.at(i / 45), side = i % 2 ? 1 : -1, lat = side * (110 + Q() * 90); far.push({ x: p.x + p.nx * lat, y: -1.5, z: p.z + p.nz * lat, ry: Q() * 6, sx: 5 + Q() * 4, sy: 5 + Q() * 5, sz: 5 + Q() * 4, c: tn(0.66) }); } IM(m0, VM, far); } }
            // landmarks
            for (const lm of zone.landmarks || []) { try { this.landmark(lm, path, K, GK, VM, g, Q); } catch (e) { console.error('landmark', lm.k, e); } }
            // save spheres
            for (const sp of zone.saves || []) { const p = path.at(sp.t), x = p.x + p.nx * (path.width * 0.5 + 1.6), z = p.z + p.nz * (path.width * 0.5 + 1.6), grp = new THREE.Group(); grp.position.set(x, 0, z);
                const ring = new THREE.Mesh(new THREE.TorusGeometry(0.9, 0.06, 6, 24), new THREE.MeshBasicMaterial({ color: 0x7dffd0, transparent: true, opacity: 0.8, fog: false })); ring.rotation.x = PI / 2; ring.position.y = 0.06; ring.userData.noOutline = true; grp.add(ring);
                const base = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 0.35, 10), new THREE.MeshStandardMaterial({ color: 0x3a4a68, roughness: 0.6, metalness: 0.3 })); base.position.y = 0.18; grp.add(base);
                const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 1), new THREE.MeshStandardMaterial({ color: 0xbffff0, emissive: 0x4affc8, emissiveIntensity: 1.3, roughness: 0.2, transparent: true, opacity: 0.92 })); orb.position.y = 1.5; orb.userData.noOutline = true; grp.add(orb);
                const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.glowTex(), color: 0x7dffd0, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending, fog: false })); halo.scale.set(3.2, 3.2, 1); halo.position.y = 1.5; grp.add(halo);
                const lt = new THREE.PointLight(0x4affc8, 0.9, 9); lt.position.y = 1.6; grp.add(lt); g.add(grp); this.spheres.push({ ...sp, x, z, grp, orb, halo, ring, ph: Q() * 6 }); }
            // invisible encounter volumes (shown only in debug)
            this.volumes = (zone.encounters && zone.encounters.volumes) || [];
            // sky + lights
            const U = { top: { value: new THREE.Color(zone.sky.top) }, hor: { value: new THREE.Color(zone.sky.hor) } };
            const dome = new THREE.Mesh(new THREE.SphereGeometry(900, 20, 12), new THREE.ShaderMaterial({ uniforms: U, side: THREE.BackSide, depthWrite: false, fog: false, vertexShader: 'varying float vY; void main(){ vY = normalize(position).y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }', fragmentShader: 'uniform vec3 top; uniform vec3 hor; varying float vY; void main(){ float k = smoothstep(-0.05, 0.75, vY); gl_FragColor = vec4(mix(hor, top, k), 1.0); }' }));
            dome.renderOrder = -10; dome.frustumCulled = false; dome.userData.noOutline = true; g.add(dome); this.sky = dome;
            const lg = zone.light || {}, hemi = new THREE.HemisphereLight(new THREE.Color(zone.sky.top).lerp(new THREE.Color(0xffffff), 0.5), new THREE.Color(zone.ground.color).multiplyScalar(0.8), lg.hemi === undefined ? 0.9 : lg.hemi); g.add(hemi);
            const key = new THREE.DirectionalLight(lg.keyColor || '#fff', lg.key === undefined ? 1 : lg.key); const d = lg.dir || [0.5, 0.8, 0.4]; key.position.set(d[0] * 60, d[1] * 60, d[2] * 60); key.target.position.set(0, 0, 0); g.add(key); g.add(key.target); this.key = key;
            g.add(new THREE.AmbientLight(0xffffff, lg.amb === undefined ? 0.3 : lg.amb));
            this.env = { bg: new THREE.Color(zone.sky.hor), fog: new THREE.FogExp2(zone.sky.fog, zone.sky.fogD || 0.005), far: 1400 };
            this.zone = zone; return g;
        },
        glowTex() { if (this._gt) return this._gt; const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,0.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); return (this._gt = new THREE.CanvasTexture(c)); },
        landmark(lm, path, K, GK, VM, g, Q) {
            const { M, G } = K, wood = M(0x6a4a30, { sn: 0 }), stone = M(0x8c8c94, { sn: 0 }), glow = M(0xffd890, { glow: 1.0, sn: 0, gt: 1, emissive: 0xffc870, paint: 0 });
            const p = path.at(lm.t === undefined ? 0 : lm.t), grp = new THREE.Group(); grp.position.set(p.x, 0, p.z); grp.rotation.y = Math.atan2(p.tx, p.tz); g.add(grp); const hw = path.width / 2;
            const add = (ge, mat, x, y, z, sx, sy, sz, ry) => { const m = new THREE.Mesh(ge, mat); m.position.set(x, y, z); m.scale.set(sx, sy, sz); if (ry) m.rotation.y = ry; m.userData.noOutline = true; grp.add(m); return m; };
            if (lm.k === 'gate') { for (const s of [-1, 1]) { add(G.box, wood, s * (hw + 0.7), 2.1, 0, 0.5, 4.2, 0.5); add(G.sph, glow, s * (hw + 0.7), 3.55, 0.35, 0.28, 0.28, 0.28); add(G.box, stone, s * (hw + 0.7), 0.15, 0, 0.9, 0.3, 0.9); } add(G.box, wood, 0, 4.35, 0, hw * 2 + 2.6, 0.45, 0.6); add(G.box, wood, 0, 3.7, 0, hw * 2 + 1.4, 0.2, 0.3); }
            else if (lm.k === 'lamp') { const s = Q() < 0.5 ? -1 : 1, x = s * (hw + 1.0); add(G.cyl, wood, x, 1.2, 0, 0.1, 2.4, 0.1); add(G.box, glow, x, 2.55, 0, 0.36, 0.5, 0.36); add(G.cone4, wood, x, 3.0, 0, 0.36, 0.3, 0.36, PI / 4); const l = new THREE.PointLight(0xffc870, 0.6, 8); l.position.set(x, 2.5, 0); grp.add(l); }
            else if (lm.k === 'sign') { const x = hw + 1.0; add(G.cyl, wood, x, 0.9, 0, 0.07, 1.8, 0.07); const c = document.createElement('canvas'); c.width = 256; c.height = 96; const cx = c.getContext('2d'); cx.fillStyle = '#7a5a38'; cx.fillRect(0, 0, 256, 96); cx.strokeStyle = '#3a2814'; cx.lineWidth = 6; cx.strokeRect(3, 3, 250, 90); cx.fillStyle = '#fff3d0'; cx.font = 'bold 26px sans-serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText(lm.text || '', 128, 48, 232); const tx = new THREE.CanvasTexture(c); if (THREE.SRGBColorSpace) tx.colorSpace = THREE.SRGBColorSpace; const sm = new THREE.MeshStandardMaterial({ map: tx, roughness: 0.9 }); sm.userData.own = true; add(G.box, sm, x, 1.65, 0, 1.7, 0.64, 0.08, -0.4); }
            else if (lm.k === 'ruin') { const sd = Q(); for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1, h = 2.2 + ((sd * 7 + i * 1.7) % 1.6); add(G.cyl6, stone, s * (hw + 2.4 + (i >> 1) * 1.8), h / 2, (i >> 1) * 2.2 - 2, 0.45, h, 0.45); } add(G.box, stone, 0, 3.6, 0, hw * 2 + 5, 0.5, 0.7); add(G.box, stone, hw + 3, 0.5, 1.5, 1.4, 1.0, 1.0, 0.4); add(G.box, stone, -hw - 3.5, 0.35, -1.2, 1.1, 0.7, 1.3, -0.3); }
            else if (lm.k === 'temple') { const B = hw + 9; for (let i = 0; i < 4; i++) add(G.box, stone, 0, 0.35 + i * 0.7, -2 - i * 2.4, B * 2 - i * 3, 0.7, 4); add(G.box, stone, 0, 5.2, -12, B * 1.3, 5.2, 5); add(G.cone4, M(0x4a6a9a, { sn: 0 }), 0, 9.6, -12, B * 1.15, 3.6, B * 1.15 * 0.7, PI / 4); add(G.box, glow, 0, 2.6, -9.4, 3.2, 4.4, 0.2); for (const s of [-1, 1]) { add(G.cyl6, stone, s * 6, 3, -7, 0.9, 6, 0.9); add(G.sph, glow, s * 6, 6.3, -7, 0.5, 0.5, 0.5); } }
        },

        /* ---------------- going places ---------------- */
        async startNew() { Progress.reset(); Progress.s.zone = this.data.start; Progress.s.x = 0; await this.enter(this.data.start, 'start', true); },
        async resume() { Progress.load(); const z = Progress.s.zone && this.byId[Progress.s.zone] ? Progress.s.zone : this.data.start; const last = Progress.s.last && Progress.s.spheres[Progress.s.last] ? this.zones.find((q) => (q.saves || []).some((s) => s.id === Progress.s.last)) : null; if (last && last.id === z) await this.enter(z, 'sphere:' + Progress.s.last, true); else await this.enter(z, 'start', true); },
        /* where: 'start' | 'end' | 'sphere:<id>' | 't:<0..1>' */
        async enter(zoneId, where, first) {
            const z = this.byId[zoneId]; if (!z) return; this.busy = true; UI.build();
            if (!first) await UI.setFade(true, 450); else UI.fade.classList.add('on');
            const host = this.host; this.build(z, host); Progress.s.zone = zoneId; Progress.visit(zoneId);
            let t = 0.0, off = 0; if (where === 'end') t = 0.985; else if (where && where.startsWith('sphere:')) { const sp = this.spheres.find((s) => s.id === where.slice(7)); t = sp ? this.path.project(sp.x, sp.z, -1).t : 0.02; off = 2.6; } else if (where && where.startsWith('t:')) t = +where.slice(2) || 0;
            const p = this.path.at(Math.max(0.004, t)); let x = p.x, zz = p.z, ry = Math.atan2(p.tx, p.tz); if (where === 'end') ry += PI; if (off) { x += p.nx * -0.5; zz += p.nz * -0.5; }
            this.camYaw = null; this.lastPos = null; this.enc.acc = 0; this.enc.cool = (z.encounters && z.encounters.grace) || 10; this.nearSphere = null; UI.setPrompt(''); this.path.hint = -1; this.flagT = -1;
            cb.teleport(x, zz, ry); this.applyEnv(); Audio.play(z); UI.hudOn(true); Progress.s.x = x; Progress.save();
            await new Promise((r) => setTimeout(r, 120)); await UI.setFade(false, 550); UI.showBanner(z.name, z.sub); this.busy = false;
        },
        applyEnv() { const e = this.env; if (!e || !this.scene) return; this.scene.background = e.bg; this.scene.fog = e.fog; if (this.camera) { this.camera.far = e.far; this.camera.updateProjectionMatrix(); } },
        async exitZone(dir) {
            const z = this.zone, ex = z.exits && z.exits[dir]; if (!ex || this.busy) return;
            if (ex.requires && !Progress.hasFlag(ex.requires)) { cb.toast(ex.blocked || 'The way is blocked.'); this.bounceBack(dir); return; }
            await this.enter(ex.to, dir === 'next' ? 'start' : 'end');
        },
        bounceBack(dir) { const p = this.path.at(dir === 'next' ? 0.97 : 0.03); cb.teleport(p.x, p.z, Math.atan2(p.tx, p.tz) + (dir === 'next' ? PI : 0)); },

        /* ---------------- per frame ---------------- */
        /* called from the map's update with the player's position; moves nothing itself except via clamp() */
        update(dt, pos) {
            if (!this.zone || !this.active) return; this.T += dt; const z = this.zone;
            for (const s of this.spheres) { const b = Math.sin(this.T * 1.6 + s.ph); s.orb.position.y = 1.5 + b * 0.12; s.orb.rotation.y += dt * 0.8; s.halo.material.opacity = 0.45 + b * 0.12; s.ring.scale.setScalar(1 + Math.sin(this.T * 2 + s.ph) * 0.06); }
            for (const a of this.anim) { try { a(this.T, dt); } catch (e) { /* ignore */ } }
            if (this.sky) this.sky.position.set(pos.x, 0, pos.z);
            if (this.key) { this.key.position.set(pos.x + 30, 50, pos.z + 20); this.key.target.position.set(pos.x, 0, pos.z); }
            Progress.s.ms += dt * 1000;
            if (this.busy || UI.panelIsOpen) return;
            const pr = this.path.project(pos.x, pos.z); this.proj = pr; UI.setHud(z.name, pr.t);
            // save sphere prompt
            let near = null; for (const s of this.spheres) if (Math.hypot(pos.x - s.x, pos.z - s.z) < 2.8) { near = s; break; } if (near !== this.nearSphere) { this.nearSphere = near; UI.setPrompt(near ? (Progress.s.spheres[near.id] ? 'Touch the sphere to rest (F)' : 'Touch the Save Sphere (F)') : ''); }
            // area flags
            for (const ev of z.events || []) if (pr.t >= ev.t && Progress.flag(ev.flag)) { if (ev.text) cb.toast(ev.text); }
            // zone exits (the ends of the road)
            if (pr.t >= 0.992 && z.exits && z.exits.next) { this.exitZone('next'); return; }
            if (pr.t <= 0.006 && z.exits && z.exits.prev && this.lastPos && (pos.x - this.lastPos.x) * pr.tx + (pos.z - this.lastPos.z) * pr.tz < 0) { this.exitZone('prev'); return; }
            // encounters: invisible volumes along the road
            if (this.lastPos) { const d = Math.hypot(pos.x - this.lastPos.x, pos.z - this.lastPos.z); if (d < 3 && d > 0.002) this.walked(d, pr, pos); } else this.lastPos = { x: pos.x, z: pos.z }; this.lastPos.x = pos.x; this.lastPos.z = pos.z;
            this.enc.cool = Math.max(0, this.enc.cool - dt);
        },
        walked(d, pr, pos) {
            const z = this.zone, E = z.encounters; Progress.s.steps += d; if (!E || this.enc.cool > 0) return;
            let rate = 0; for (const v of this.volumes) { if (v.box) { if (Math.abs(pos.x - v.box[0]) < v.box[2] && Math.abs(pos.z - v.box[1]) < v.box[3]) rate = Math.max(rate, v.rate); } else if (pr.t >= v.t0 && pr.t <= v.t1) rate = Math.max(rate, v.rate); } if (!rate) { this.enc.acc = 0; return; }
            this.enc.acc += d; const step = E.stepDist || 4; while (this.enc.acc >= step) { this.enc.acc -= step; this.enc.steps++; const ramp = Math.min(1, this.enc.steps / 5); if (Math.random() < rate * ramp) { this.trigger(); return; } }
        },
        pick() { const E = this.zone.encounters, gs = E.groups; let tot = 0; for (const q of gs) tot += q.w || 1; let r = Math.random() * tot; for (const q of gs) { r -= q.w || 1; if (r <= 0) return q; } return gs[0]; },
        trigger(forced) {
            if (this.busy) return; const z = this.zone, E = z.encounters; if (!E) return; const g = forced || this.pick(); this.busy = true; this.enc.steps = 0; this.enc.acc = 0; this.enc.cool = 8;
            const lv = E.lvl || [1, 3], level = Math.round(lv[0] + (lv[1] - lv[0]) * (this.proj ? this.proj.t : 0.5));
            cb.encounter({ foes: g.foes.slice(0, 4), level, zone: z, biome: z.biome, weather: z.weather || 'clear' });
        },
        interact() {
            if (this.busy || !this.nearSphere) return; const s = this.nearSphere, first = Progress.sphere(s.id, this.zone.id); cb.heal(); Progress.s.last = s.id; Progress.save();
            cb.toast(first ? 'Save Sphere activated: ' + s.name + ' (fast travel unlocked)' : 'The sphere restores your strength. Progress saved.'); UI.setPrompt(''); this.nearSphere = null; s.halo.material.opacity = 1;
        },

        /* ---------------- walls of the road, camera ---------------- */
        clamp(pos) {
            if (!this.path || !this.active) return; const pr = this.path.project(pos.x, pos.z), lim = this.path.width / 2 + 2.6 + (this.zone.slack || 0);
            if (Math.abs(pr.d) > lim) { const nx = -pr.tz, nz = pr.tx, over = Math.abs(pr.d) - lim, s = Math.sign(pr.d); pos.x -= nx * s * over; pos.z -= nz * s * over; }
            if (pr.t <= 0.001 && !(this.zone.exits && this.zone.exits.prev)) { const back = (pos.x - pr.cx) * pr.tx + (pos.z - pr.cz) * pr.tz; if (back < -0.5) { pos.x -= pr.tx * (back + 0.5); pos.z -= pr.tz * (back + 0.5); } }
        },
        /* a fixed, road-following camera (like FFX): behind and above, looking down the path */
        cam(camera, controls, pos, dt) {
            if (!this.path || !this.active) return; const pr = this.proj || this.path.project(pos.x, pos.z);
            const look = this.path.at(Math.min(1, pr.t + 0.012)); let yaw = Math.atan2(look.tx, look.tz); if (this.camYaw === null) this.camYaw = yaw; let dy = Math.atan2(Math.sin(yaw - this.camYaw), Math.cos(yaw - this.camYaw)); this.camYaw += dy * Math.min(1, dt * 2.2);
            const back = 6.4, side = 1.7, h = 3.5, sy = Math.sin(this.camYaw), cy = Math.cos(this.camYaw);
            const dx = pos.x - sy * back + cy * side, dz = pos.z - cy * back - sy * side, k = Math.min(1, dt * 4.5);
            camera.position.x += (dx - camera.position.x) * k; camera.position.z += (dz - camera.position.z) * k; camera.position.y += (pos.y + h - camera.position.y) * k;
            controls.target.x += (pos.x + sy * 2.2 - controls.target.x) * k; controls.target.z += (pos.z + cy * 2.2 - controls.target.z) * k; controls.target.y += (pos.y + 1.3 - controls.target.y) * k;
        },

        /* ---------------- battle hand-off ---------------- */
        snapshot(pos, camera, controls) { return { zone: this.zone.id, x: pos.x, y: pos.y, z: pos.z, cam: camera.position.toArray(), tgt: controls.target.toArray(), yaw: this.camYaw, cool: 10 }; },
        async fadeBattleIn() { UI.flash.classList.remove('go'); void UI.flash.offsetWidth; UI.flash.classList.add('go'); Audio.duck(true); await new Promise((r) => setTimeout(r, 900)); UI.fade.style.transitionDuration = '0ms'; UI.fade.classList.add('on'); UI.flash.classList.remove('go'); },
        async fadeBattleOut() { await new Promise((r) => requestAnimationFrame(r)); await UI.setFade(false, 600); Audio.duck(false); },
        hideWorld(v) { if (this.group) this.group.visible = !v; UI.hudOn(!v && this.active); if (v) { UI.setPrompt(''); this.nearSphere = null; } },
        resumeAfterBattle(s, won) { this.busy = false; this.enc.cool = 10; this.lastPos = null; this.enc.acc = 0; if (won) { Progress.s.battles++; } Progress.save(); },

        /* ---------------- menus ---------------- */
        zoneIdx(id) { return this.zones.findIndex((z) => z.id === id); },
        openMap() {
            if (this.busy || !this.zone) return; const S = Progress.s, cur = this.zone.id, nodes = Progress.nodes(this.zones); let h = '<h2>World Map</h2><div class="sub">Linear road. Rest at Save Spheres to unlock fast travel.</div><div id="adv-map">';
            this.zones.forEach((z, i) => { const vis = !!S.visited[z.id], sph = (z.saves || []).filter((s) => S.spheres[s.id]); h += (i ? '<div class="adv-link' + (S.visited[this.zones[i - 1].id] && vis ? ' on' : '') + '"></div>' : '') + `<div class="adv-node ${vis ? 'vis' : ''} ${z.id === cur ? 'cur' : ''}"><div class="dot"></div><b>${vis ? esc(z.name) : '???'}</b><small>${vis ? esc(z.sub || '') : 'Unexplored'}</small><div class="adv-sph">${sph.map((s) => `<button data-go="${s.id}">${esc(s.name)}</button>`).join('')}</div></div>`; });
            const flags = Object.keys(S.flags).length, mins = Math.floor(S.ms / 60000);
            h += `</div><div class="adv-stats"><div>Spheres<br><b>${nodes.length} / ${this.zones.reduce((n, z) => n + (z.saves || []).length, 0)}</b></div><div>Areas found<br><b>${Object.keys(S.visited).length} / ${this.zones.length}</b></div><div>Battles won<br><b>${S.battles}</b></div><div>Play time<br><b>${mins} min</b></div><div>Story flags<br><b>${flags}</b></div></div><div class="btns"><button class="big alt" id="adv-close">Close</button></div>`;
            UI.panelOpen(h, (p) => { p.querySelector('#adv-close').onclick = () => UI.panelClose(); p.querySelectorAll('[data-go]').forEach((b) => { b.onclick = () => { const id = b.dataset.go, n = nodes.find((q) => q.id === id); UI.panelClose(); if (n) this.enter(n.zone, 'sphere:' + id); }; }); });
        },
        /* the title menu: continue or start over */
        title(onGo) {
            const has = Progress.has(); UI.panelOpen(`<h2>${esc(this.data.title || 'Adventure Mode')}</h2><div class="sub">A road of ${this.zones.length} areas. Walk, fight what finds you, rest at Save Spheres.</div><div class="btns">${has ? '<button class="big" id="adv-cont">Continue</button>' : ''}<button class="big ${has ? 'alt' : ''}" id="adv-new">${has ? 'New Game' : 'Begin'}</button><button class="big alt" id="adv-cancel">Back</button></div>`, (p) => {
                const go = (nw) => { UI.panelClose(); onGo(nw); }; const c = p.querySelector('#adv-cont'); if (c) c.onclick = () => go(false); p.querySelector('#adv-new').onclick = () => { if (has && !confirm('Start over? Your current adventure save will be erased.')) return; go(true); }; p.querySelector('#adv-cancel').onclick = () => { UI.panelClose(); onGo(null); };
            });
        },
        leave() { if (this.busy) return; cb.leave && cb.leave(); },
        debugVolumes(on) { if (!this.group) return; if (this.dbg) { this.dbg.removeFromParent(); this.dbg = null; } if (!on) return; const g = new THREE.Group(); for (const v of this.volumes) { const a = this.path.at(v.t0 === undefined ? 0 : v.t0), b = this.path.at(v.t1 === undefined ? 1 : v.t1); for (let k = 0; k <= 40; k++) { const p = this.path.at((v.t0 + (v.t1 - v.t0) * k / 40)), m = new THREE.Mesh(new THREE.BoxGeometry(this.path.width, 0.2, 2), new THREE.MeshBasicMaterial({ color: 0xff3366, transparent: true, opacity: 0.35, depthWrite: false })); m.position.set(p.x, 0.15, p.z); m.rotation.y = Math.atan2(p.tx, p.tz); g.add(m); } } this.group.add(g); this.dbg = g; },
        /* the owner (index.html) hands over its scene so the zone can set sky and fog */
        attach(host, scene, camera) { this.host = host; this.scene = scene; this.camera = camera; },
        on(v) { this.active = !!v; if (!v) { UI.hudOn(false); Audio.stop(); UI.setPrompt(''); UI.panelClose(); } },
    };
    function hash(s) { let h = 2166136261; s = String(s); for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
    function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
    return A;
}
