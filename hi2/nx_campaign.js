/* ================= HARBOR INN 2: RESIDENT EVIL NX (Oymyakon-13) =================
 * Injected into a copy of Survivor.html by tools/build_hi2.py. Everything Harbor Inn 1 built (menus, co-op, saves, weapons, enemies) is reused;
 * this block throws away the inn and lays out the facility from Andre Coffey's fan book. Chapters are separate sections below: add a new
 * chapter by adding its rooms (R_), links (lnk), notes (FILES) and locks, then listing its rooms in NX.chapters.
 */
window.__NX = true;
// ---- wipe Harbor Inn
for (const k of Object.keys(ROOMS)) delete ROOMS[k];
for (const k of Object.keys(DECOR)) delete DECOR[k];
GR.specs = {}; GR.order = []; GR.links = [];
// ---- themes
Object.assign(THEME, {
    snow: { floor: ['stone', 0xc9d4de, 6, 5], wall: ['wall', 0x8a98a6, 5, 1.2], amb: [0x34465e, 1.1], fog: 0x0a121c, lc: [0xaac8ff, 0xd8e8ff], h: 4, pc: [0x8a98a6, 0x6a7886, 0xb8c4d0], pt: 'stone' },
    conc: { floor: ['stone', 0x6a6e72, 6, 5], wall: ['wall', 0x585c60, 5, 1.4], amb: [0x2a3036, 0.95], fog: 0x07090c, lc: [0xd8e8ff, 0xaac0d8], h: 4, pc: [0x5a5e62, 0x4a4e52, 0x6e7276], pt: 'stone' },
    ice: { floor: ['tile', 0x8ca8b8, 5, 4], wall: ['tile', 0x6a8494, 5, 1.4], amb: [0x24384a, 1.0], fog: 0x050c14, lc: [0x9ad8ff, 0xc8f0ff], h: 5, pc: [0x7a96a6, 0x5a7686, 0x9ab4c4], pt: 'metal' },
    pipe: { floor: ['metal', 0x3a4046, 7, 5], wall: ['brick', 0x464c54, 6, 1.8], amb: [0x1c242c, 0.9], fog: 0x04070a, lc: [0xff6a4a, 0x9ac8ff], h: 3.6, pc: [0x4a5058, 0x3a4048, 0x5a6068], pt: 'metal' },
    furn: { floor: ['metal', 0x3a3430, 7, 5], wall: ['brick', 0x4a3a30, 6, 1.8], amb: [0x2a1810, 0.95], fog: 0x0a0402, lc: [0xff7a30, 0xffa050], h: 4.6, pc: [0x4a4440, 0x3a3430, 0x5a4a40], pt: 'metal' },
    cold: { floor: ['tile', 0xaac4d4, 5, 4], wall: ['tile', 0x7a98a8, 5, 1.4], amb: [0x20323e, 1.0], fog: 0x040a10, lc: [0x8ae0ff, 0xd0f4ff], h: 4.2, pc: [0xb4c8d4, 0x8aa4b4, 0x6a8494], pt: 'metal' },
    obsd: { floor: ['tile', 0x1c2226, 5, 4], wall: ['tile', 0x8a9498, 5, 1.4], amb: [0x182a34, 1.0], fog: 0x03080c, lc: [0x9ae8ff, 0x7ac8ff], h: 4, pc: [0xb4bcc0, 0x7a8488, 0x5a6468], pt: 'metal' },
});
// ---- items, notes, bosses, locks
Object.assign(ITEMS, {
    iceaxe: { n: 'Ice Axe', type: 'key', d: 'A maintenance ice axe, the head chipped from years of breaking rime off the pipes. It might free a frozen mechanism.' },
    palm: { n: 'Biometric Wristband', type: 'key', d: 'A lab ID band with a live biometric chip. A scanner in Sector 3 will read it.' },
    kc1: { n: 'Security Keycard', type: 'key', d: 'A scorched red keycard from the Head of Security. Half of what the Spire elevator needs.' },
    kc2: { n: 'Researcher Keycard', type: 'key', d: 'A frost-rimed blue keycard from the Lead Researcher. The other half of what the Spire elevator needs.' },
});
ITEMS.pistol.n = 'M93R Pistol'; ITEMS.pistol.d = 'Your standard-issue BSAA sidearm with a burst compensator. 12 rounds to a magazine.';
ITEMS.blade.n = 'Combat Knife'; ITEMS.blade.d = 'A BSAA combat knife. Quiet, and it does not leave a heat signature.';
Object.assign(FILES, {
    nx_josh: { n: 'Mission Brief', t: 'PRIORITY ALPHA. EYES ONLY.\n\nTarget: Oymyakon-13, northern Siberia. Scrubbed from Russian maps in the 90s as a "geological collapse".\n\nIntercepted data: Ashford line, an ancestral strain called the Northern X-Type. Project NX.\n\nNo strike team without UN approval. Confirm the threat, tag it for a bunker-buster, get out.\n\nOff the books. If you are caught, the BSAA cannot claim you.\n\n- J. Stone' },
    nx_glove: { n: "Child's Glove", t: 'A small red glove, frozen stiff. Stitched inside the cuff in marker: "Dasha, 4B".\n\nThe swings keep creaking. Nobody has used them in twenty years.' },
    nx_vest: { n: 'Mercenary Field Journal', t: 'DAY 2.\n\nContract says "retrieval". The scientists will not look us in the eye. Thermal cameras on every ceiling, and the doc says to keep our suit heaters LOW when we pass the tanks.\n\nDAY 3.\n\nThe Chief took the east stairs to Incineration and has not come back. The cold storage doors are sealed from the inside.\n\nIf you read this: do not light a flare. Do not fire in the lab. They come for the heat.' },
    nx_tank: { n: 'Tank Plaque', t: 'CONTAINMENT UNIT 1\n\nSPECIMEN: NORTHERN X-TYPE (CULTURE)\nSTATUS: BREACHED FROM WITHIN\n\nThe glass was pushed out, not in. Whatever was in here left on its own two legs.' },
    nx_ivan: { n: "Ivanoff's Recorder", t: 'RECORDING, V. IVANOFF, SORTING CONTROL.\n\n"It was not the cold that killed them. It was the heat. We turned on the furnace to thaw the samples, and they woke up. They hunt thermal signatures. Keep the lights low. Keep the temperature down. Do not -"\n\nThe tape ends with a wet tearing sound.' },
    nx_heat: { n: 'Heater Memo', t: 'ALL STAFF: SUIT HEATER SETTINGS\n\nSector 3 and below: 10%.\nMuzzle flash and flares read as a thermal spike. Use knives where you can.\n\nHazmat suits are in these lockers. They are too bulky to fight in. Just stay cold.\n\nHypothermia is survivable. The Hive is not.' },
    nx_alexia: { n: "Ashford's Notes", t: '12 SEPTEMBER 1998.\n\nMy brother is a fool, but the Russians are visionaries. They found the Source: the Sleeper in the ice. It bonded with the fauna of the Pleistocene and made a perfect cold-resistant hive.\n\nMy Veronica used ants to imitate a queen. This organism needs no queen. The ice itself is the conductor.\n\nIt speaks in thermal gradients.' },
    nx_hive: { n: 'Hive Map', t: 'FACILITY HEAT MAP.\n\nThe red mass under the Observation Deck is not only the cavern. It runs through the walls, the plumbing and the ventilation. The facility is the organism.\n\nSub-Level 4: THE CORE.\n\nSpire elevators are locked down. Two keycards required: HEAD OF SECURITY (Incineration Disposal, signal unstable) and LEAD RESEARCHER (Cold Storage).' },
    nx_chief: { n: "Security Chief's Log", t: 'I went down to check the incinerator pit. The heat feels good. I have stopped wearing the suit.\n\nMy skin has gone hard. I do not feel the cold at all.\n\nI keep the keycard on a lanyard. Nobody is taking it.' },
    nx_cold: { n: 'Cold Storage Log', t: 'COLD STORAGE - LEAD RESEARCHER\n\nWe moved the grown specimens here to keep them dormant. The doors lock from inside, by design.\n\nIf the temperature rises above -30 the racks open on their own.\n\nThe keycard stays with me. I am not going out there.' },
});
Object.assign(BS, {
    secchief: { v: 'skeletonzombie', sc: [1.7, 1.4], hp: 140, spd: 1.5, rad: 0.9, dmg: 30, cd: 1.4, wind: 0.7, reach: 2.4, phases: 3, name: 'Fused Security Chief' },
    direwolf: { kind: 'hound', sc: 2.3, hp: 90, spd: 4.0, rad: 0.9, dmg: 18, cd: 1.0, wind: 0.4, reach: 2.3, phases: 2, name: 'Pleistocene Wolf' },
});
Object.assign(LOCKS, {
    wheel: { flag: 1, no: 'The blast door is frozen shut. The manual override wheel beside it is locked in ice.' },
    biolock: { flag: 1, no: 'The Sector 3 blast door wants a biometric scan. Whoever was using the console is not helping.' },
    spire: { flag: 1, no: 'The Spire lift is locked down. It needs two keycards.' },
});
// ---- Chapter 1: the Ghost of Kijuju (Oymyakon-13)
R_('ridge', 'Landing Ridge', 'snow', 16, 12, { sky: 1, items: ['ammo:12', 'rherb', 'file:nx_josh'], en: '' });
R_('yard', 'Courtyard Playground', 'snow', 18, 12, { sky: 1, items: ['file:nx_glove', 'ammo:12', 'gherb'], en: 'z' });
R_('vest', 'Admin Vestibule', 'conc', 12, 8, { items: ['file:nx_vest', 'gherb', 'ammo:10'], en: 'dc' });
R_('atrium', 'The Atrium', 'ice', 20, 14, { items: ['file:nx_tank', 'ammo:12', 'spray', 'gpf:2'], en: 'zzc' });
R_('maint', 'Maintenance Access', 'pipe', 18, 6, { items: ['iceaxe', 'ammo:10', 'rherb'], en: 'zc' });
R_('sort', 'Sorting Facility', 'pipe', 22, 14, { items: ['file:nx_ivan', 'ammo:12', 'gherb', 'gpr:2'], en: 'zzzc', puz: [{ type: 'use', flag: 'wheel', need: ['iceaxe'], title: 'Manual Override Wheel', text: 'Override wheel', ask: 'Wedge the ice axe into the gears and break the ice?', ok: { msg: 'CRACK. The ice shatters and the wheel turns. The blast door groans open.' }, no: 'The wheel is encased in ice. You need something to lever it with.', done: 'The blast door is open.' }] });
R_('locker', 'Employee Locker Room', 'conc', 12, 9, { safe: 1, items: ['ribbon:2', 'spray', 'file:nx_heat', 'ammo:12'], en: '' });
R_('s3', 'Sector 3: Paleo-Genomics Wing', 'ice', 20, 14, { items: ['file:nx_alexia', 'palm', 'ammo:12', 'gherb', 'gps:2'], en: 'zd', boss: { bs: BS.direwolf, drop: { item: 'ammoS', flag: 'wolfDead', key: 's3:wolf', msg: 'The wolf thrashes and goes still. Something spills from the cracked tank beside it.' } }, puz: [{ type: 'use', flag: 'biolock', need: ['palm'], title: 'Biometric Scanner', text: 'Biometric scanner', ask: 'Hold the wristband to the scanner?', ok: { msg: 'ACCESS GRANTED. The blast door hisses open.' }, no: 'The scanner wants a biometric wristband.', done: 'The blast door is open.' }] });
R_('obs', 'Observation Deck', 'obsd', 16, 10, { items: ['file:nx_hive', 'shotgun', 'ammoS:6', 'spray'], en: '' });
R_('incin', 'Incineration Room', 'furn', 20, 14, { items: ['file:nx_chief', 'ammoS:6', 'spray', 'gps:2'], en: 'zz', boss: { bs: BS.secchief, drop: { item: 'kc1', flag: 'chiefDead', key: 'incin:kc1', msg: 'The Chief burns and collapses. A scorched card lies in the ash.' } } });
R_('cold', 'Cold Storage', 'cold', 20, 14, { items: ['file:nx_cold', 'ammoS:6', 'spray', 'gpr:2'], en: 'zzc', boss: { bs: BS.coldbrute, drop: { item: 'kc2', flag: 'brutedead', key: 'cold:kc2', msg: 'The brute falls apart in the frost. A blue keycard drops from its hand.' } } });
R_('elev', 'Spire Elevator Lobby', 'obsd', 10, 8, { items: ['ammo:12', 'gherb'], en: '', puz: [{ type: 'use', flag: 'spire', need: ['kc1', 'kc2'], title: 'Spire Lift Panel', text: 'Spire lift panel', ask: 'Slide both keycards through the reader?', ok: { msg: 'Two green lights. The Spire lift unlocks.' }, no: 'The panel has two card slots. It needs the Security and Researcher keycards.', done: 'The Spire lift is unlocked.' }] });
R_('lift', 'Spire Lift', 'obsd', 8, 6, { items: [], en: '', event: 'end2' });
lnk('ridge', 'E', 0, 'yard', 'W', 0);
lnk('yard', 'E', 0, 'vest', 'W', 0);
lnk('vest', 'E', 0, 'atrium', 'W', 0);
lnk('atrium', 'N', 4, 'maint', 'S', -6);
lnk('maint', 'E', 0, 'sort', 'W', 0);
lnk('sort', 'E', 0, 'locker', 'W', 0, 'wheel');
lnk('locker', 'E', 0, 's3', 'W', 0);
lnk('s3', 'E', 0, 'obs', 'W', 0, 'biolock');
lnk('obs', 'N', 0, 'incin', 'S', 0);
lnk('obs', 'S', 0, 'cold', 'N', 0);
lnk('obs', 'E', 0, 'elev', 'W', 0);
lnk('elev', 'E', 0, 'lift', 'W', 0, 'spire');
{
    const MP = { ridge: [0, 0, 5, 4, 6], yard: [5, 0, 5, 4, 6], vest: [0, 1, 4, 2, 1], atrium: [4, 0, 6, 4, 1], maint: [0, 1, 5, 2, 4], sort: [5, 0, 6, 4, 4], locker: [11, 0, 4, 3, 4], s3: [0, 2, 6, 4, 5], obs: [6, 4, 5, 3, 5], incin: [6, 0, 6, 4, 5], cold: [6, 7, 6, 4, 5], elev: [11, 5, 3, 2, 5], lift: [14, 5, 2, 2, 5] };
    for (const id of GR.order) { ROOMS[id] = genRoom(GR.specs[id]); ROOMS[id].mp = MP[id]; DECOR[id] = themeDecor(GR.specs[id]); }
}
// a quick intro line the first time you step into a room
const NX_INTRO = {
    ridge: 'Oymyakon-13. -40C and the storm is jamming your radio. Three kilometres north, a tomb of concrete.',
    yard: 'A rusted swing set creaks in the wind. Creak. Creak. Creak.',
    vest: 'Three mercenaries, frozen solid. Each has one small puncture wound in the neck.',
    atrium: 'A tank shattered from the inside. The glass lies outward. Something walked out of here.',
    maint: 'Rime ice on every pipe. Something moves in the pipes overhead.',
    sort: 'Cages with biometric locks. The frost on the viewing slits is melting. Keep the lights low.',
    locker: 'A quiet room. Rows of lockers, and a place to breathe.',
    s3: 'Polished obsidian and brushed aluminium: a clinic preserved in the ice. Do not fire in here.',
    obs: 'Glass walls, and behind them the Hive. A pulsing heart the size of a bus, wired into the rock.',
    incin: 'The heat rising from the pit is the first warmth you have felt in hours.',
    cold: 'Racks of frozen shapes. The door locks behind you by design.',
    elev: 'Two card slots. Both keycards, or the Spire stays dark.',
};
{
    const _lr = loadRoom;
    loadRoom = function (id, ...a) { const r = _lr.call(this, id, ...a); try { if (NX_INTRO[id] && G && G.flags && !G.flags['i_' + id]) { G.flags['i_' + id] = 1; setTimeout(() => { if (RM.id === id) say(NX_INTRO[id], 4600); }, 1100); } } catch (e) { /* no intro */ } return r; };
}
