/* Blade Forge (Oasis Industries): spend Gil, build a blade, enchant it with attributes, and it is moved into your equipment.
 * Loaded on demand by index.html. No imports: it is given THREE and OrbitControls.
 *   const F = mod.default({ THREE, OrbitControls, api });
 *   api = { gil(), spend(n), info() -> {lv, cap, cur}, forged(result), close(), toast(msg) }
 *   F.build(design) -> THREE.Group (blade up +Y, hilt origin at the bottom)   F.open(current)   F.restore(design) -> result
 */
export default function (C) {
    const { THREE, OrbitControls, api } = C; const PI = Math.PI;
    const SHAPES = {
        long: { n: 'Longsword', len: 0.95, w: 0.085, th: 0.016, taper: 0.25, tip: 0.14, curve: 0, base: 36, cost: 0, fx: {}, d: 'Balanced, all-round blade.' },
        katana: { n: 'Katana', len: 0.98, w: 0.06, th: 0.014, taper: 0.1, tip: 0.1, curve: 0.07, ridge: 0.35, base: 40, cost: 600, fx: { crit: 3 }, d: 'Curved single edge: +3 crit.' },
        broad: { n: 'Broadsword', len: 0.9, w: 0.13, th: 0.02, taper: 0.3, tip: 0.18, curve: 0, base: 44, cost: 700, fx: { def: 4 }, d: 'Wide and heavy: +4 def.' },
        rapier: { n: 'Rapier', len: 1.1, w: 0.035, th: 0.014, taper: 0.1, tip: 0.2, curve: 0, base: 30, cost: 500, fx: { eva: 4 }, d: 'Thin and quick: +4 evasion.' },
        zwei: { n: 'Greatsword', len: 1.45, w: 0.15, th: 0.026, taper: 0.2, tip: 0.2, curve: 0, base: 52, cost: 1400, fx: { hp: 30 }, d: 'Massive: +30 HP.' },
    };
    const GUARDS = { cross: ['Cross', 0], wing: ['Winged', 120], disc: ['Disc', 100], claw: ['Claw', 160] };
    const GRIPS = { wrap: ['Wrapped', 0], bone: ['Bone', 60], wire: ['Gold wire', 140] };
    const POMMELS = { ball: ['Ball', 0], spike: ['Spike', 60], ring: ['Ring', 90], gem: ['Gem', 180] };
    const MATS = {
        iron: { n: 'Iron', col: 0x8a8f98, met: 0.55, rou: 0.5, em: 0, mult: 1.0, cost: 0 },
        steel: { n: 'Steel', col: 0xc6d0dc, met: 0.7, rou: 0.35, em: 0, mult: 1.12, cost: 800 },
        mythril: { n: 'Mythril', col: 0x8fe4ff, met: 0.7, rou: 0.25, em: 0.18, mult: 1.25, cost: 3500 },
        adamant: { n: 'Adamant', col: 0xa86bff, met: 0.75, rou: 0.28, em: 0.22, mult: 1.4, cost: 12000 },
        orichalc: { n: 'Orichalcum', col: 0xffc65a, met: 0.8, rou: 0.25, em: 0.3, mult: 1.6, cost: 40000 },
    };
    const ELEMS = { none: ['None', 0, 0x000000], fire: ['Fire', 600, 0xff5a1a], ice: ['Ice', 600, 0x6fd8ff], bolt: ['Thunder', 600, 0xffe94a], holy: ['Holy', 900, 0xfff2c0], dark: ['Dark', 900, 0x9a4cff] };
    const ATTRS = {
        keen: { n: 'Keen', d: '+2 crit', st: { crit: 2 } }, swift: { n: 'Swift', d: '+2 evasion', st: { eva: 2 } }, vital: { n: 'Vital', d: '+25 HP', st: { hp: 25 } },
        arcane: { n: 'Arcane', d: '+6 magic, +8 MP', st: { mag: 6, mp: 8 } }, bulwark: { n: 'Bulwark', d: '+5 defense', st: { def: 5 } }, fury: { n: 'Fury', d: '+4 attack', st: { atk: 4 } },
    };
    const attrCost = (n) => 300 * n * (n + 1) / 2;   // cumulative cost of an attribute at level n
    const FEE = 500, MAXLV = 5;
    const clean = (d) => { d = d || {}; const o = { shape: SHAPES[d.shape] ? d.shape : 'long', guard: GUARDS[d.guard] ? d.guard : 'cross', grip: GRIPS[d.grip] ? d.grip : 'wrap', pommel: POMMELS[d.pommel] ? d.pommel : 'ball', mat: MATS[d.mat] ? d.mat : 'iron', elem: ELEMS[d.elem] ? d.elem : 'none', gripCol: /^#[0-9a-f]{6}$/i.test(d.gripCol) ? d.gripCol : '#6b3a1e', trimCol: /^#[0-9a-f]{6}$/i.test(d.trimCol) ? d.trimCol : '#c9a24a', name: String(d.name || 'Forged Blade').slice(0, 18), attrs: {} }; for (const k of Object.keys(ATTRS)) o.attrs[k] = Math.max(0, Math.min(MAXLV, (d.attrs && d.attrs[k]) | 0)); return o; };
    const attrTotal = (d) => Object.values(d.attrs).reduce((a, b) => a + b, 0);
    /* every number a design is worth */
    function evaluate(d0, lv) {
        const d = clean(d0), S = SHAPES[d.shape], M = MATS[d.mat];
        const pow = Math.round(S.base * M.mult), fx = { ...S.fx };
        for (const k of Object.keys(ATTRS)) for (const s of Object.keys(ATTRS[k].st)) fx[s] = (fx[s] || 0) + ATTRS[k].st[s] * d.attrs[k];
        if (d.elem !== 'none') fx.mag = (fx.mag || 0) + 6;
        let cost = FEE + S.cost + GUARDS[d.guard][1] + GRIPS[d.grip][1] + POMMELS[d.pommel][1] + M.cost + ELEMS[d.elem][1]; for (const k of Object.keys(ATTRS)) cost += attrCost(d.attrs[k]);
        const slots = 3 + Math.floor((lv || 1) / 10), used = attrTotal(d);
        const len = S.len + 0.3;
        return { d, pow, fx, cost, slots, used, len };
    }
    /* ------------------------------------------------------------ geometry */
    function bladeGeo(S, len) {
        const N = 12, pos = [], idx = [], bl = len, tipStart = bl - bl * S.tip * 1.6; const ring = [];
        for (let i = 0; i <= N; i++) {
            const t = i / N, y = t * bl; let hw = S.w / 2 * (1 - S.taper * Math.min(1, y / tipStart));
            if (y > tipStart) hw *= Math.max(0, 1 - (y - tipStart) / (bl - tipStart)); if (i === N) hw = 0;
            const cx = S.curve * t * t, th = S.th * (i === N ? 0.2 : 1) * (1 - 0.25 * t), rg = (S.ridge || 0) * hw;
            ring.push([[cx - hw, y, 0], [cx + rg, y, th], [cx + hw, y, 0], [cx + rg, y, -th]]);
        }
        for (const r of ring) for (const v of r) pos.push(...v);
        for (let i = 0; i < N; i++) for (let k = 0; k < 4; k++) { const a = i * 4 + k, b = i * 4 + (k + 1) % 4, c = (i + 1) * 4 + k, d = (i + 1) * 4 + (k + 1) % 4; idx.push(a, c, b, b, c, d); }
        const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals(); return g;
    }
    function build(d0) {
        const d = clean(d0), S = SHAPES[d.shape], M = MATS[d.mat], E = ELEMS[d.elem], root = new THREE.Group();
        const gc = new THREE.Color(d.gripCol), tc = new THREE.Color(d.trimCol);
        const bladeM = new THREE.MeshStandardMaterial({ color: M.col, metalness: M.met, roughness: M.rou, flatShading: true, emissive: d.elem !== 'none' ? E[2] : M.col, emissiveIntensity: d.elem !== 'none' ? 0.35 : M.em, side: THREE.DoubleSide });
        const trimM = new THREE.MeshStandardMaterial({ color: tc, metalness: 0.75, roughness: 0.35, flatShading: true });
        const gripM = new THREE.MeshStandardMaterial({ color: gc, roughness: 0.9, flatShading: true });
        const glowM = new THREE.MeshStandardMaterial({ color: d.elem !== 'none' ? E[2] : M.col, emissive: d.elem !== 'none' ? E[2] : M.col, emissiveIntensity: d.elem !== 'none' ? 1.3 : 0.3 + M.em, roughness: 0.3 });
        const add = (g, m, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, s = [1, 1, 1]) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.rotation.set(rx, ry, rz); o.scale.set(...s); o.userData.noOutline = true; root.add(o); return o; };
        // grip
        const gl = 0.2, gy0 = 0.05; const grip = new THREE.CylinderGeometry(0.02, 0.022, gl, 8); add(grip, gripM, 0, gy0 + gl / 2);
        const bands = d.grip === 'wire' ? 8 : d.grip === 'bone' ? 4 : 5; for (let i = 0; i < bands; i++) add(new THREE.TorusGeometry(0.023, 0.004, 4, 8), d.grip === 'bone' ? new THREE.MeshStandardMaterial({ color: 0xe8e0c8, flatShading: true }) : trimM, 0, gy0 + 0.02 + i * (gl - 0.04) / (bands - 1), 0, PI / 2);
        // pommel
        const py = gy0 - 0.005;
        if (d.pommel === 'ball') add(new THREE.SphereGeometry(0.035, 8, 6), trimM, 0, py - 0.01); else if (d.pommel === 'spike') add(new THREE.ConeGeometry(0.03, 0.09, 6), trimM, 0, py - 0.03, 0, PI); else if (d.pommel === 'ring') add(new THREE.TorusGeometry(0.035, 0.008, 5, 12), trimM, 0, py - 0.03, 0, 0, PI / 2); else add(new THREE.OctahedronGeometry(0.04, 0), glowM, 0, py - 0.02);
        // guard
        const gy = gy0 + gl + 0.01;
        if (d.guard === 'cross') add(new THREE.BoxGeometry(0.3, 0.03, 0.05), trimM, 0, gy);
        else if (d.guard === 'wing') for (const s of [-1, 1]) { add(new THREE.BoxGeometry(0.16, 0.025, 0.04), trimM, s * 0.09, gy + 0.02, 0, 0, 0, s * 0.35); add(new THREE.ConeGeometry(0.02, 0.07, 4), trimM, s * 0.17, gy + 0.07, 0, 0, 0, -s * 0.2); }
        else if (d.guard === 'disc') add(new THREE.CylinderGeometry(0.1, 0.1, 0.018, 12), trimM, 0, gy);
        else for (const s of [-1, 1]) { add(new THREE.ConeGeometry(0.025, 0.2, 5), trimM, s * 0.1, gy + 0.02, 0, 0, 0, s * (PI / 2 + 0.5)); }
        add(new THREE.BoxGeometry(0.05, 0.05, 0.05), trimM, 0, gy + 0.02);
        // blade (and a glowing fuller)
        const by = gy + 0.03, bl = S.len; const bg = bladeGeo(S, bl); add(bg, bladeM, 0, by);
        const fl = new THREE.BoxGeometry(0.008, bl * 0.62, S.th * 2.15); add(fl, glowM, S.curve * 0.04, by + bl * 0.36, 0);
        root.userData.len = by + bl; root.userData.grip = gy0 + gl / 2; root.userData.glow = d.elem !== 'none' ? E[2] : (M.em ? M.col : 0);
        return root;
    }
    /* ------------------------------------------------------------------ UI */
    let UI = null;
    function css() {
        if (document.getElementById('fg-css')) return; const s = document.createElement('style'); s.id = 'fg-css';
        s.textContent = `#fg{position:fixed;inset:0;z-index:9600;display:none;background:radial-gradient(circle at 60% 40%,#2a1608,#0a0605 70%);color:#ffe9cc;font:600 1em Nunito,system-ui,sans-serif;font-size:min(2.3vh,1.5vw);user-select:none}
#fg.on{display:block}#fg *{box-sizing:border-box}#fg button,#fg select,#fg input{font:inherit}#fg canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#fg .gl{background:rgba(24,12,6,.8);border:.1em solid rgba(255,170,70,.35);backdrop-filter:blur(8px);border-radius:.9em}
#fg .tp{position:absolute;left:.6em;right:.6em;top:.5em;display:flex;align-items:center;gap:.6em;padding:.45em .8em;z-index:3}
#fg .tp b{font:900 1.25em Orbitron,sans-serif;font-style:italic;letter-spacing:.07em;color:#ffc46b;text-shadow:0 0 .6em #ff8a1a}#fg .tp small{opacity:.7}
#fg .b{background:rgba(255,255,255,.08);border:.1em solid rgba(255,170,70,.45);color:#ffd9a0;border-radius:.6em;padding:.35em .8em;cursor:pointer;white-space:nowrap}#fg .b:active{transform:scale(.96)}#fg .b.on{background:rgba(255,150,40,.35);color:#fff}#fg .b:disabled{opacity:.35;cursor:default}
#fg .b.go{background:linear-gradient(180deg,#ff9b2f,#c4540a);color:#fff;border-color:#ffd08a;font-weight:900;padding:.55em 1.3em}
#fg aside{position:absolute;left:.6em;top:3.7em;bottom:.6em;width:min(23em,48%);padding:.7em;overflow-y:auto;z-index:2;display:flex;flex-direction:column;gap:.7em;touch-action:pan-y}
#fg aside>*{flex:none}#fg h5{margin:0 0 .35em;font:800 .72em Orbitron,sans-serif;letter-spacing:.12em;color:#ffb35a;text-transform:uppercase}
#fg .opt{display:flex;flex-wrap:wrap;gap:.35em}#fg .opt .b{font-size:.85em;padding:.3em .55em}#fg .opt .b small{display:block;opacity:.7;font-size:.8em}
#fg .cols{display:grid;grid-template-columns:1fr 1fr;gap:.4em}#fg .cols label{display:flex;flex-direction:column;align-items:center;gap:.2em;background:rgba(0,0,0,.3);padding:.35em;border-radius:.5em;font-size:.8em}#fg input[type=color]{width:100%;height:1.8em;border:0;background:none;padding:0}
#fg input[type=text]{width:100%;background:#1a0e08;color:#ffe2b8;border:.1em solid rgba(255,170,70,.4);border-radius:.5em;padding:.4em .5em}
#fg .at{display:flex;align-items:center;gap:.4em;background:rgba(0,0,0,.28);border-radius:.5em;padding:.3em .5em;font-size:.88em}#fg .at span{flex:1}#fg .at i{font-style:normal;min-width:1.6em;text-align:center;color:#ffd08a}#fg .at .b{padding:.1em .55em}
#fg .st{position:absolute;right:.6em;top:3.7em;width:min(17em,40%);padding:.7em;z-index:2;font-size:.9em}#fg .st div{display:flex;justify-content:space-between;margin:.12em 0}#fg .st b{color:#ffd08a;font-family:monospace}#fg .st .warn{color:#ff9a6a;font-size:.85em;margin-top:.4em;line-height:1.3}
#fg .bar{position:absolute;left:50%;bottom:.6em;transform:translateX(-50%);display:flex;align-items:center;gap:1em;padding:.5em 1em;z-index:3;border-radius:2em}#fg .bar .gil{font:800 1.05em Orbitron,sans-serif;color:#ffe08a}
#fg .ts{position:absolute;top:3.8em;left:50%;transform:translateX(-50%);z-index:4;padding:.45em .9em;pointer-events:none;opacity:0;transition:opacity .25s}#fg .ts.on{opacity:1}
#fg .flash{position:absolute;inset:0;z-index:5;pointer-events:none;background:radial-gradient(circle,#fff,#ffb347 40%,transparent 70%);opacity:0}#fg .flash.go{animation:fgF .9s ease-out}@keyframes fgF{0%{opacity:.95}100%{opacity:0}}
@media (max-width:760px){#fg aside{width:48%}#fg .st{display:none}}`; document.head.appendChild(s);
    }
    const fmt = (n) => Math.round(n).toLocaleString('en-US');
    function ensureUI() {
        if (UI) return UI; css(); const r = document.createElement('div'); r.id = 'fg';
        const opts = (key, o, f) => `<div class="opt" data-k="${key}">${Object.entries(o).map(([k, v]) => `<button class="b" data-v="${k}">${f(v)}</button>`).join('')}</div>`;
        r.innerHTML = `<div class="tp gl"><b>BLADE FORGE</b><small>Oasis Industries</small><span style="flex:1"></span><button class="b" id="fg-x">Close</button></div>
<aside class="gl">
<div><h5>Name</h5><input type="text" id="fg-name" maxlength="18" placeholder="Name your blade"></div>
<div><h5>Blade</h5>${opts('shape', SHAPES, (v) => `${v.n}<small>${v.cost ? fmt(v.cost) + ' Gil' : 'free'}</small>`)}</div>
<div><h5>Material</h5>${opts('mat', MATS, (v) => `${v.n}<small>x${v.mult} ${v.cost ? fmt(v.cost) : 'free'}</small>`)}</div>
<div><h5>Guard</h5>${opts('guard', GUARDS, (v) => v[0])}</div>
<div><h5>Grip</h5>${opts('grip', GRIPS, (v) => v[0])}</div>
<div><h5>Pommel</h5>${opts('pommel', POMMELS, (v) => v[0])}</div>
<div><h5>Colors</h5><div class="cols"><label>Grip<input type="color" id="fg-gc"></label><label>Trim<input type="color" id="fg-tc"></label></div></div>
<div><h5>Enchant glow</h5>${opts('elem', ELEMS, (v) => `${v[0]}<small>${v[1] ? fmt(v[1]) : 'free'}</small>`)}</div>
<div><h5>Attributes <span id="fg-slots" style="color:#ffd08a"></span></h5><div id="fg-attrs"></div></div>
</aside>
<div class="st gl" id="fg-st"></div>
<div class="bar gl"><span class="gil" id="fg-gil"></span><span id="fg-cost" style="color:#ffd08a"></span><button class="b go" id="fg-go">Forge blade</button></div>
<div class="ts gl" id="fg-ts"></div><div class="flash" id="fg-fl"></div>`;
        document.body.appendChild(r); UI = { r, d: clean({}), cur: null };
        const q = (id) => r.querySelector('#' + id);
        r.querySelectorAll('.opt').forEach((o) => o.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; UI.d[o.dataset.k] = b.dataset.v; sync(); rebuild(); }));
        q('fg-name').addEventListener('input', () => { UI.d.name = q('fg-name').value; });
        q('fg-gc').addEventListener('input', () => { UI.d.gripCol = q('fg-gc').value; rebuild(); }); q('fg-tc').addEventListener('input', () => { UI.d.trimCol = q('fg-tc').value; rebuild(); });
        q('fg-attrs').innerHTML = Object.entries(ATTRS).map(([k, a]) => `<div class="at" data-a="${k}"><span>${a.n}<small style="opacity:.65"> ${a.d}</small></span><button class="b" data-d="-1">-</button><i></i><button class="b" data-d="1">+</button></div>`).join('');
        q('fg-attrs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; const k = b.parentNode.dataset.a, v = UI.d.attrs[k] + (+b.dataset.d); const ev = evaluate(UI.d, api.info().lv); if (v < 0 || v > MAXLV) return; if (+b.dataset.d > 0 && ev.used >= ev.slots) { toast('No attribute slots left (+1 slot every 10 class levels).'); return; } UI.d.attrs[k] = v; sync(); });
        q('fg-x').addEventListener('click', () => close()); q('fg-go').addEventListener('click', forge);
        return UI;
    }
    function toast(m) { const t = UI.r.querySelector('#fg-ts'); t.textContent = m; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2600); }
    function sync() {
        const r = UI.r, d = UI.d = clean(UI.d), info = api.info(), ev = evaluate(d, info.lv);
        r.querySelectorAll('.opt').forEach((o) => o.querySelectorAll('button').forEach((b) => b.classList.toggle('on', d[o.dataset.k] === b.dataset.v)));
        r.querySelector('#fg-name').value = d.name; r.querySelector('#fg-gc').value = d.gripCol; r.querySelector('#fg-tc').value = d.trimCol;
        r.querySelectorAll('#fg-attrs .at').forEach((a) => { a.querySelector('i').textContent = d.attrs[a.dataset.a]; });
        r.querySelector('#fg-slots').textContent = `${ev.used}/${ev.slots} slots`;
        const eff = Math.min(ev.pow, info.cap), rows = [['Power', ev.pow + (ev.pow > info.cap ? ' → ' + info.cap : '')], ['Class level', info.lv]]; for (const k of ['atk', 'mag', 'hp', 'mp', 'def', 'eva', 'crit']) if (ev.fx[k]) rows.push([{ atk: 'Attack', mag: 'Magic', hp: 'HP', mp: 'MP', def: 'Defense', eva: 'Evasion', crit: 'Crit' }[k] + ' bonus', '+' + ev.fx[k]]);
        r.querySelector('#fg-st').innerHTML = `<h5 style="margin:0 0 .4em;font:800 .75em Orbitron;letter-spacing:.12em;color:#ffb35a">${SHAPES[d.shape].n.toUpperCase()} · ${MATS[d.mat].n.toUpperCase()}</h5>` + rows.map(([a, b]) => `<div><span>${a}</span><b>${b}</b></div>`).join('') + `<div style="opacity:.7;font-size:.85em;margin-top:.3em">${SHAPES[d.shape].d}</div>` + (ev.pow > info.cap ? `<div class="warn">Your class level only supports power ${info.cap} right now. It keeps rising with level: this blade reaches ${ev.pow} at the level its power needs.</div>` : '');
        r.querySelector('#fg-gil').textContent = fmt(api.gil()) + ' Gil'; r.querySelector('#fg-cost').textContent = 'Cost ' + fmt(ev.cost) + ' Gil'; r.querySelector('#fg-go').disabled = api.gil() < ev.cost;
        r.querySelector('#fg-go').textContent = (info.cur ? 'Re-forge (replaces ' + info.cur + ')' : 'Forge blade');
    }
    /* 3D preview */
    function init3d() {
        if (UI.r3) return; const r = new THREE.WebGLRenderer({ antialias: true, alpha: true }); r.setPixelRatio(Math.min(devicePixelRatio, 2)); UI.r.insertBefore(r.domElement, UI.r.firstChild);
        const s = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, 1, 0.05, 50); cam.position.set(0, 0.9, 3.1);
        s.add(new THREE.HemisphereLight(0xfff0dd, 0x3a2410, 1.1)); const k = new THREE.DirectionalLight(0xffffff, 1.6); k.position.set(2, 3, 2.5); s.add(k); const rim = new THREE.DirectionalLight(0xff9a40, 1.1); rim.position.set(-3, 1, -2); s.add(rim);
        const gl = new THREE.PointLight(0xffaa44, 0, 4); gl.position.set(0, 0.9, 0.6); s.add(gl);
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.1, 18), new THREE.MeshStandardMaterial({ color: 0x2b2018, roughness: 0.8, metalness: 0.3 })); base.position.y = -0.06; s.add(base);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.012, 6, 40), new THREE.MeshBasicMaterial({ color: 0xff9a40 })); ring.rotation.x = PI / 2; ring.position.y = 0.0; s.add(ring);
        const ctl = new OrbitControls(cam, r.domElement); ctl.target.set(0, 0.75, 0); ctl.enablePan = false; ctl.minDistance = 1.2; ctl.maxDistance = 4.5; ctl.autoRotate = true; ctl.autoRotateSpeed = 2.2; ctl.update();
        UI.r3 = { r, s, cam, gl, ctl, blade: null, ring, t: 0 }; resize();
    }
    function resize() { if (!UI || !UI.r3) return; const w = innerWidth, h = innerHeight; UI.r3.r.setSize(w, h); UI.r3.cam.aspect = w / h; UI.r3.cam.updateProjectionMatrix(); }
    function rebuild() { const R = UI.r3; if (!R) return; if (R.blade) { R.s.remove(R.blade); R.blade.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); } const b = build(UI.d); b.position.y = 0.0; R.s.add(b); R.blade = b; R.gl.color.setHex(b.userData.glow || 0xffaa44); R.gl.intensity = b.userData.glow ? 1.4 : 0; const sc = Math.min(1.1, 1.15 / b.userData.len); b.scale.setScalar(sc); R.ctl.target.set(0, b.userData.len * sc * 0.5, 0); }
    function frame() { if (!UI || !UI.r.classList.contains('on')) return; requestAnimationFrame(frame); const R = UI.r3; R.t += 0.016; R.ctl.update(); R.ring.rotation.z += 0.01; if (UI.flashT > 0) { UI.flashT -= 0.016; } R.r.render(R.s, R.cam); if (((R.t * 60) | 0) % 30 === 0) { const g = UI.r.querySelector('#fg-gil'); if (g) { g.textContent = fmt(api.gil()) + ' Gil'; } } }
    function clang() { try { const AC = window.AudioContext || window.webkitAudioContext, c = UI.ac || (UI.ac = new AC()); const t = c.currentTime; for (const [f, v] of [[1760, 0.12], [2637, 0.08], [880, 0.1]]) { const o = c.createOscillator(), g = c.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0005, t + 1.1); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + 1.2); } } catch (e) { /* no audio */ } }
    /* turning a design into the weapon the game equips: the blade stands +Y, the grip is where the hand goes */
    function result(d0, lv) {
        const ev = evaluate(d0, lv), d = ev.d, tpl = build(d), L = tpl.userData.len, hg = tpl.userData.grip, S = SHAPES[d.shape];
        const size = ev.len / 1.1, len = 1.1 * size;   // the game scales every sword to 1.1 m x size: this keeps the blade's true length
        return { tpl, name: d.name, pow: ev.pow, fx: ev.fx, size: Math.round(size * 100) / 100, grip: Math.round(len * (0.11 - hg / L) * 1000) / 1000, design: d, cost: ev.cost };
    }
    async function forge() {
        const info = api.info(), ev = evaluate(UI.d, info.lv); if (api.gil() < ev.cost) { toast('Not enough Gil.'); return; }
        if (info.cur && !confirm('This replaces your current blade "' + info.cur + '". Forge a new one?')) return;
        if (!api.spend(ev.cost)) { toast('Not enough Gil.'); return; }
        const fl = UI.r.querySelector('#fg-fl'); fl.classList.remove('go'); void fl.offsetWidth; fl.classList.add('go'); clang(); UI.r3.ctl.autoRotateSpeed = 14; setTimeout(() => { if (UI) UI.r3.ctl.autoRotateSpeed = 2.2; }, 900);
        const res = result(UI.d, info.lv); api.forged(res); toast(res.name + ' forged and equipped. It is in your gear.'); sync();
    }
    function open(current) { ensureUI(); if (current) UI.d = clean(current); UI.r.classList.add('on'); init3d(); resize(); sync(); rebuild(); addEventListener('resize', resize); requestAnimationFrame(frame); }
    function close() { if (!UI) return; UI.r.classList.remove('on'); removeEventListener('resize', resize); api.close && api.close(); }
    return { open, close, build, clean, evaluate, result, restore: (d, lv) => result(d, lv), SHAPES, MATS, ATTRS };
}
