# The Oasis — Project Notes

Living document. Read this first at the start of every session (human or Claude), and update it at the end.
Owner: Kasume. Last updated: 2026-10-15.

## What it is
A browser PlayStation-Home-style social space. Players load VRM avatars, meet in lobbies, use companions, watch TV, ride hoverboards and play mini games. Everything is plain HTML/JS with three.js, so it hosts on GitHub Pages with no server.

## Repo layout
| File | What it is |
|---|---|
| `index.html` | The Oasis itself (was `Oasis.html`). Main three.js module, UI, companions, TV, multiplayer. |
| `assets/*.txt` | Heavy data split out of the page: stock avatars (VRM, base64), animation packs, emotes, sfx, weapons, FX atlas, p2p lib. Loaded at startup by a small preloader at the top of the main module, which fills each `<script id="...">` tag before the game reads it. |
| `RyderX.html` | Ryder X, hoverboard racing with rail grinding and tricks. Opened inside Oasis in an iframe. |
| `Survivor.html` | Survivor mini game. Opened inside Oasis. |
| `Blitzball.html` | Blitzball mini game. |
| `Equipment.html`, `Levels.js` | Equipment screen and level data. |
| `manifest.webmanifest`, `icon-*.png` | Install-as-app files. |

Oasis fetches the mini games by relative filename, so they must sit next to `index.html`.

## Rules that bite
- **Must be served over http(s)** (GitHub Pages, or `oasis-server.mjs` locally). Double-clicking the file blocks the `assets/` fetches.
- If you add a new big embedded data block, put it in `assets/<id>.txt` and add its id to the preloader list at the top of the main module in `index.html`.
- `splash-mp3` stays inline on purpose. An early script reads it before the module runs.
- GitHub limits: 25 MiB per file in the browser uploader, 100 MB via git. Keep every file well under that.
- **API keys never go in files.** Companion AI keys live only in the player's browser (localStorage `oasis.cmp.ai`). Don't paste keys into chat or commit them.

## How things work (short version)
- **Avatars:** three-vrm normalised humanoid rig. Non-VRM FBX/GLB rigs get a pseudo-VRM wrapper. Mixamo FBX clips are baked into VRM-local quaternions, with a T-pose fix for Unreal-style rigs.
- **Companions:** summoned VRM characters that chat. Provider chosen by key prefix: `AIza`/`AQ.` = Gemini, `gsk_` = Groq, `hf_` = Hugging Face, `sk-or-` = OpenRouter, otherwise Anthropic. No key means the keyless fallback. Settings are in the Companions panel.
- **TV:** parses a pasted link as YouTube, vdo.ninja, video file, web page or game. Web pages are in an iframe, so many sites (Tubi was tried and refuses, as do most streaming sites) refuse to show. Use **Pop-out** for those. Bookmarks, Reload and Pop-out buttons are in the TV panel.
- **Ryder X:** Track (centreline s, lateral u, height h), Racer.step sim, AI input, rails with a balance-bar grind, trick set, Mario-Kart-close camera. Loads the player's current Oasis avatar and board by default.

## Battle orders (chat)
In a Warriors of Light battle, type e.g. `Ryoko use a potion on me`, `Sakura cast Fire on the Dread Knight`, `everyone attack`, `Ryoko limit break`, `Sakura heal me`, `Ryoko revive Sakura`, `defend`. Plain keyword parsing (free, no AI key needed). The order is queued and runs on that companion's next turn; if it cannot be done (no MP, no items) they say so and fall back to normal AI. Code: `cmpBtOrder`, `cmpRunOrder` (index.html). Companions also receive a full battle-state summary (`cmpBtState` + `cmpBtGear`) in their AI prompt, so remarks and chat replies in a fight know HP, turns, enemies, shared items, the player's class level, equipment, bag and Gil, and their own gear. Only the battle host can give orders for now.

## Items, chests and Gil
- **Items:** the full Final Fantasy-style list lives in `BT_ITEMS` and one effects table `BT_IFX` (HP/MP heals, party items, status cures like Eye Drops/Echo Screen/Soft, revives, Hero/Speed Drink, Tent/Cottage). Add a new item by adding it to `BT_ITEMS`, `BT_ICON` and `BT_IFX`; the bag, shop and battle menu pick it up. Chat orders know the names too (`CMP_O_ITEMS`).
- **Treasure chests:** when a wave is cleared (phase `victory`) an item chest appears every wave; the equipment chest only on waves 5, 10, 15… and about 1 in 4 other waves after wave 1, and each member has a 65% chance of gear (else Gil) (`btcSpawn`, `btcOpen`, `btcGrant`). Each opened chest gives a share to you and each of your companions. Unopened chests are opened for you when the next wave starts. Equipment comes from the Equipment shop catalog (`window.EQ_CATALOG` in Equipment.html), scaled by wave; extra copies are sold for Gil.
- **Gil trading:** `/give Ryoko 500`, `give 500 gil to Ryoko`, `/take 200 from Ryoko`, `/take all from Ryoko`, `/pay PlayerName 1000` (players in the same room). Handled by `gilTrade` / `gilGiftRecv`.
- **Gil from games:** every mini game pays through `lootWin` or the Gil wallet; Ryder X now pays after each race (`rxPayout`).

## Companions seen by other players
Everyone in a room sees your summoned companions (`cmps` message ~5/s: id, name, colour, position; model sent on request like avatars via `cmpwant`/`cmpbuf`, robot until it arrives; max 4 per player, 12 total). What they say goes only to your party (`pcs` over the party's own room, `cmpnTell`; bubble above the companion if you share a room, chat line otherwise). `/cmpshare off` hides your companions from others. Code: `CMPN`, `cmpnSend/OnMsg/Frame`. Tested with a fake peer only; not yet with two real players.

## Cloud save (Google Drive)
Settings (Info tab or `/cloud`) has a Cloud save section. Sign in with Google (Google Identity Services token flow) and progress (`CS_KEYS`: gear, bag, Gil, class XP, battle records, companions, cards, hoverboard designs) is saved to the player's own Drive hidden app folder as `oasis-save.json` (scope `drive.appdata`). Never uploaded: AI keys, graphics settings, avatar files. Needs a Google OAuth *Web* client ID: put it in `CS_CLIENT_ID` in index.html (it is public) or paste it in Settings. Sync runs on Sign in / Sync now, every 2 min while signed in, and when the page is hidden. A device with no real progress loads the Drive save automatically; if both differ you are asked. Google blocks sign-in inside plain WebViews: the Android app must open Chrome (TWA / Bubblewrap / PWABuilder) or use a native sign-in plugin. Tested only against a mocked Google.

## Limit break minigames
Hero with a sword = **Renzokuken** (Gunblade): 8 slashes, press the trigger as the ring meets the circle; triggers = bonus hits and a bigger finisher (Rough Divide / Fated Circle / Blasting Zone / Lion Heart for all 8). Blitzball stance = **Overdrive**: **Attack Reels** (Wakka: stop 3 elemental reels, the ball in his hand is thrown at the foe, matching elements hit harder, weakness x1.6), **Spiral Cut** (follow the arrows) or **Energy Rain** (mash). The throw is `blzThrow` (ball flies hand -> target -> hand). Fighter = command combos (unchanged). Gunner = per-gun limits (no minigame yet). Code: `BT_LIMITS` (`vr` entries), `btVarHits`, `btMgHtml/btMgInput/btMgTick`, `btMyMg`. The minigame result travels as `q` in the limit command (gunblade: bitmask of triggers, spiralcut: arrows right, energyrain: taps, reels: 3 symbols x 2 bits). CPU allies pick a random result (`btBotPick`).

## Graphics settings (Info → Settings, or `/settings`)
Six presets (Optimal, Performance, Balanced, Nice, Super Nice, Perfect) set resolution scale, shadow quality, frame-rate cap and the in-game-world setting together; each can also be changed on its own (then it reads Custom). **Auto** runs a short benchmark and picks the best preset that holds ~60 fps. New installs start on Balanced. Shadows: `GFX_SH` / `gfxShadowSweep` cap each light's shadow-map size (or turn shadows off) and refresh them less often on Low/Medium. Aspect ratio: Fill / Wide picture / Framed with 16:9, 16:10, 3:2, 4:3, 21:9 (`window.__setAR`, early fit script). Code: `GFX_PRESETS`, `gfxBench`, `gfxRender` in index.html.

## Roadmap (small steps, ship one at a time)
**Next up**
- [ ] Turn on GitHub Pages and confirm the live site loads (check `assets/` has 17 files).
- [ ] Move to real source files plus a build script (like Ryder X has) so `index.html` stops being one giant bundle.
- [ ] Real-world test of companion AI with a free Gemini key.

**Soon**
- [ ] Cloud save: create the Google client ID, paste it in, and test with a real account and the Android app.
- [ ] Minigames for the Gunner limits (Dead Eye etc.) and Hero's other limits.
- [ ] TV: nicer message when a site refuses to embed (auto-suggest Pop-out).
- [ ] Gunner companion visuals check.
- [ ] Companion live commentary in battles / other game modes.
- [ ] Ryder X: real-keyboard feel pass on grinding, more tracks.

**Later / ideas**
- [ ] Optional proxy so blocked sites play inside the TV (fragile, check terms of service).
- [ ] Survivor zombie get-up animation.
- [ ] More mini games, seasonal events, player housing, a quest/story layer.
- [ ] Moderation and safety tools for public lobbies.

**Parked**
- World.html (paused, not delivered).

## Decision log
- 2026-10-15: Split heavy data out of the page into `assets/` so the repo uploads cleanly (25 MB to about 5 MB page).
- 2026-10-15: Free AI providers added for companions so chat can be free for players.
- 2026-10-14/15: Ryder X rails, tricks, camera, default avatar and board added.

## Session checklist
1. Read this file.
2. Do one thing, test it, ship it.
3. Update Roadmap and Decision log.
4. Commit to GitHub.

## Account save (username + password)
- `server/worker.js` (Cloudflare Worker + D1, setup in `server/README.md`). Client: `AC` module next to `CS` in index.html; Settings -> Account save; address in `AC_API` or localStorage `oasis.acapi`.
- PBKDF2 (250k) -> 96 bytes = AES-GCM key + account id + login secret. Save is encrypted client-side; same `CS_KEYS` snapshot as Drive. No password reset.
- Tested against a mock server only (create, sign in, duplicate, resave, fresh-device load). Not yet tested on a real Worker.

- One-time welcome (`acWelcome`): after the splash, if a server address is set and no login yet, offers Create login with this save / Sign in / Not now (new players: Create / Sign in / Play as guest). Flag `oasis.acprompt`.

## Friends
- Social > Friends (`FR` module, window.__fr). Permanent player id `PID` (localStorage oasis.pid, in CS_KEYS so it follows the login) is sent in hello. Add friend button on profile card; request/accept via net msgs frq/fra; list in oasis.friends.
- Online/offline: save Worker `/ping` + `/seen` with a `presence` table (run the new CREATE TABLE line, re-paste worker.js). "Appear offline" toggle.
- Tested with a fake peer + mocked server only.

## Windows app
- `desktop/` = Electron wrapper (main.js serves the game from oasis://game/, fixed origin so saves stay). Built with @electron/packager (electron 33, win32 x64) from a copy of this folder placed in app/game. Output zip: Oasis-Windows.zip. Unsigned (SmartScreen warning). Needs internet (CDN libs + multiplayer).

## This session (Oct 15 night)
- Stick click (L3) in open-world maps draws / puts away weapon (clsStowToggle; holster in oasisHolster). L1+L3 / RB still reach other pad actions.
- Warriors of Light: no item icons in top bar; icons shown next to found items and a Bag line on the VICTORY screen.
- Warriors of Light: wait mode (no auto-defend for humans), allies keep charging, Y / Triangle (btSwapTurn) hands the turn to a ready human ally who then goes first; you stay ready.
- Ship step 1: Home > Your Ship (or /ship) boards a private ship interior (map ship, code prefix H); hatch (Y) returns to the dock room. Helm = world map, NEXT STEP (step 2), landing pads = step 3.

## Warriors of Light jobs + own weapons (Oct 2026)
- **Jobs** (lobby "Job" button, saved as `oasis.btjob`): Knight, Dragoon, Thief, Black Mage, White Mage, Summoner. Tables: `BT_JOBS` (stat multipliers, command name, limit, spell filter), `BT_ARTS` (job commands incl. Steal/Mug, Summons), new `BT_LIMITS` entries. Command kind `art` is handled in `btHandle`/`btArtEv`; events reuse atk/mag kinds so every client animates them with no new code. Job syncs via join msg, `job` msg and snapshot tuple idx 14. Job-specific animations still to come (default ones for now). "Classic" = the old class-based battle.
- **Own weapons**: Settings > class card > "Your own weapons". Pick class (Hero/Gunner/Fighter) + type (sword/gun/bow/staff/knuckles), upload .glb/.fbx. Stored in IndexedDB `oasis-csw` (files) + `oasis.csw2` (type/sliders, cloud-saved). `cswDress` attaches by type (bow left hand, knuckles both, others right; put-away: back, or hip for guns). Hero uses it via sword style "My weapon" (CLS.skin 99); Fighter whenever uploaded; Gunner replaces the gun model in `hcGunDress`. Local only: others see stock looks (skin 99 is sent as 0). Auto-picks the longest model axis as the tip; sliders fix the rest.
- Not yet verified on a real VRM avatar (headless has none): hand/put-away offsets are best guesses, tune with sliders.

## Sign-in gate (Oct 2026)
- After the splash: Log in / Sign up (`acGate`, shown while `acGateOn()`; tiny "Play without an account" link = guest for the session). Sign up -> joins your Harbor Studio, opens "Create your character". Log in -> `acLand()`: your studio, or the public open-world room you last left (`oasis.lastroom`, written in `joinRoom`, cloud-synced). Never an invite/other player's room when signed in (invite links only work for guests). `psHomeLoft` is now in the cloud save so your studio follows your account. Test bypass: localStorage `oasis.nogate`=1.

## Party invites to online friends
- Friends panel shows "Invite to party" for friends who are online in another room (same room still uses the direct peer message). Goes through the save Worker: `/pinv` (drop) and `/pinbox` (poll every 8 s, invites expire after 3 min, table `invites` auto-created). **The Worker must be redeployed** (`server/worker.js`) for this to work.

## Harbor Inn co-op: partner VRM + host's music/UI
- On connect each side sends its VRM (chunked, `avh`/`avc`, up to 26 MB) and the partner is drawn as that VRM (procedural walk/aim pose) instead of the block figure.
- Host's music (YouTube links + uploaded files per slot) and menu-sound uploads are sent to the guest (`mus` + chunked `m:`/`u:` blobs); in co-op the guest hears the host's choices. `window.__svco` is a test hook.
- Partner shots: the `p` message carries a shot/swing counter (`f`); the receiver shows muzzle flash + light, recoil, sword swing and plays the shot/swing sound. The partner VRM holds pistol / blade / gloves in its hands.
- Co-op enemy sync: zombie look is seeded from the enemy's key (same for host and guest); enemies the guest is missing (risen zombies, boss adds) are spawned from the room's real spec, and a risen zombie clears the guest's "dead" mark.
- Partner avatar is re-packed before sending (`avLite`: 512 px webp textures, ~60% smaller) and paced at one 12 KB chunk / 14 ms so it doesn't starve position updates. The partner VRM is animated with the same clip packs and arm-aim IK as the local player (`rpVrmPose`, `withPuppet` swaps AV/PL for `ikArm`).
- Avatar transfer is now acknowledged and windowed (5 chunks in flight, receiver acks each: `avk`), gzip-compressed (7.6 MB → ~1.4 MB for the sample), and cached per partner on the receiving device (`pav_<pid>`, matched by a size+checksum hash) so a repeat session shows the partner instantly. An old-version peer that never acks is dropped after 20 s instead of being flooded.
- Harbor Inn co-op menu (Tab / Y / triangle): a **Partner** tab appears while connected: their condition, health, weapon, room, their item list, and "Give 1 / Give all" for your own items. Messages: `iq`/`ir` (item list), `gv`/`gva` (give + ack; a full bag or no answer in 12 s returns the item to the sender).

### Door cutscene
- Partner walks through the door beside you (DC.rp); new SFX: layered door creak (wood/metal), latch click, room swell.

- Boiler Room boss is now "The Stoker": big skeleton-zombie brute model, 150hp, faster, 3 phases with zombie adds, slimmer collision + anti-stuck sidestep, shorter charge cycle.

### Harbor Inn: Gunner arsenal + gunpowder
- Guns: rifle (auto, hold fire), shotgun (8 pellets), sniper (pierce), rocket + grenade launcher (splash). `WPN`/`ITEMS`, per-gun mags in `G.mags`, `equipW(id)` swaps guns.
- Ammo types: ammo (9mm), ammoR, ammoS, ammoH, ammoX, ammoG. Powders gpf/gpr/gps/gph/gpx/gpg: item menu "Load rounds" (`POW` table) turns 2-3 powder into rounds.
- Models + sounds come from the parent Oasis `weapons-pack`/`sfx-pack` (same-origin iframe); standalone uses box guns + synth. Partner puppet shows the same guns (`rpWeaponVis`).
- Loot: `EXTRA_` table (generated rooms) + shotgun in Ballroom, powders in Storage/Lounge.

- Cameras: small rooms (24+ area) get a mirrored far-corner angle for the half nearest the first camera; big rooms (90+) also get a low stalker angle down the middle. Co-op: gameOver() sends {t:"over"} so the whole party gets Game Over together.

## Equipment menu: imported weapon card
Equipment.html shows a "MY" card at the top of the Weapon slot for the current class when that class has an imported weapon: editable name + power, computed stats (`cswStats`, scaled by gear level), Equip/Unequip. Uses `window.oasisGear.csw.get/set` (index.html, next to `cswGear`).
Imported weapon: power is capped by class level (`cswCap`, 4..154 over lv 1..99) and name/power can be set ONCE (`cfg.lock`); after that the class panel inputs and the Equipment card are read-only. Gear stats still grow with gear level.
Imported weapon build-up: after the one-time Set, each class's weapon levels with class XP like shop gear and can be upgraded +1..+9 in Equipment (cost 1500*n^2 Gil, needs gear Lv 10*n, +12% stats per tier; `cfg.up`, `oasisGear.csw.upgrade`).

## Graphics pass 1 (Warriors of Light) + the build method
Method from now on: kit pieces -> clusters -> districts -> city (see the lead-dev plan in chat).
Levels.js: `paintTex(v)` gives every scenery material (kit `M()`) a baked gradient + brush strokes + edge shade (flat shading off); grass/jungle floors got tonal blotches, tufts and flowers; cobble stones got per-stone shading. Backup of the pre-pass file: none in repo (was /tmp/Levels.pre-gfx.js).
Masaki house: rebuilt from the floor plan in index.html (exterior verified, interiors NOT yet checked) - paused by request.

## Graphics pass 2: geometry kit (Levels.js `btGeoKit`)
Detailed merged, vertex-painted models shared by all biomes: broadleaf/blossom/autumn trees (flared bent trunk, roots, branches, clustered lumpy canopies), ragged-tier pines (+snow), displaced faceted rocks (stone/mossy/snow/sand/dark), bushes, grass tufts (green/dry/snow/jungle), 5 flower colours, segmented palms with drooping fronds, cypress/topiary/hedge, crystal clusters, and 5 town-house variants (plinth, string courses, pilasters, framed windows with sills/shutters/flower boxes, awning door, ridged or hip roof, chimney; glass is a separate geometry so it glows at night). Wired into forest, pines, plaza, plains, garden, jungle, shore, cavern, volcano, cliffs. Method: build kit pieces -> clusters -> districts -> city. Still to do: desert, hall details, Harbor City, Harbor Inn.

## Graphics pass 3 — FF10-style paths (Levels.js)
- `btPathTex(kind)`, `BT_PATHS` (per-biome trail + end landmark: forest ruin, pines cabin, plains windmill+fence, garden gate, jungle ruin, desert colonnade, volcano torii, shore lighthouse/plank), `btPathBuild(id,K)`; wrapper loop before final `return` wraps `BT_DETAIL`.
- Ribbon material must be DoubleSide + polygonOffset (else culled/z-fights).
- TODO: exclude tree scatter near trail; add paths to plaza/hall/cavern/cliffs; tune cavern crystals.

## College Raimon (school map)
- Lobby "College Raimon" (room `school-01`, map `raimon`) replaces the old Oasis High School entry; the old `school` map code is still in index.html (private-room option still uses it).
- Source: user's CollegeRaimon.glb (430 MB, 4.8M tris instanced). Optimized with gltf-transform + meshopt (scripts were in /tmp/gt: opt3.mjs, nav.mjs): decimated by kind (trees 5%, buildings 30%), 1024px WebP textures, 80 m chunks, far sky shells removed, quantized -> `school/raimon.glb` 42 MB / 1.57M tris.
- `school/raimon.nav`: baked walk map (1 m ground heights as Int16 cm; 0.5 m blocked bit grid from walls/steep steps). Index.html block "College Raimon": `rmH` ground, `rmCollide` (slide along walls), `rmSpawn` (south gate, 0,182 facing north), chunk culling (r+240 m), own sky/lights, loading overlay.
- Heavy for phones (~1.3M tris at spawn). Next: more decimation / LOD, interiors, time of day, classroom/NPC spots, trees collision.

## Blade Forge (Oasis Industries)
- `Forge.js` (on demand) + glue in index.html before `industriesOpen` ("Blade Forge") + `window.oasisGear.csw.{forge,design,cap,lv}`. Opened from the "Blade Forge" button in the Oasis Industries top bar (`window.__forgeOpen()` for tests).
- Player picks blade shape, material (Gil tiers x power), guard/grip/pommel/colors, enchant glow, and 6 attributes (Keen, Swift, Vital, Arcane, Bulwark, Fury; levels 0-5, slots = 3 + classLv/10). Cost = 500 fee + parts + material + glow + attribute levels. Pay with `oasisGil`.
- Forging replaces the hero custom weapon: `cfg {lock:1, dyn:1, fx:{bonus stats}, forge:design, size, grip}`. `dyn` = power is min(forged power, class-level cap) and refreshes on class level-up (`clsAdd`). Worn immediately via `cswGear('hero', true)`; the Equipment card / Upgrade +1..+9 work on it as before. Blade is built +Y with the grip height computed so the existing equipment placement (hand/sheath) lines it up; no model file: it is rebuilt from `cfg.forge` at startup (`forgeRestore`). Importing a model clears the forge data.
- Infinity Blade zip the user sent is Unreal .uasset (unreadable here); would need GLB/FBX export.

## Weather + day/night on big GLB maps (Raimon)
- Both maps build their own sky with `cySkyBuild(root, true)` and call `cySkyUpdate(dt, pos, ctx)` from their `update`; night lamps use `CYT.nightF`.
- Map ids `raimon`, `nuu` are in every outdoor list (`wxGrp`, `wxMapChanged`, `outdoor`, fog density, audio, weather chip) and in `fsSurface`.

## College Raimon, split + streamed
- Raimon is 8 streamed pieces `school/raimon{S0,S1,N2,N3,F6,F7,T}.glb` (S/N/F = inner/stadium/front, 0/2/6 west half x<0, 1/3/7 east half; T = town), 3-7MB each, one shared nav. Rules in `RM_REGS` (near/far by player x,z). Rebuild: split.mjs (reg codes 0-7) then `opt4.mjs <region[,region]> out.glb`.
- `RM_REGS` in index.html: each region loads when the player gets near (`near`) and is disposed when far (`far`); fetched buffers are cached. Spawn loads S + T.
- Rebuild: `/tmp/gt/split.mjs` (3 regions via node extras `reg`) then `opt4.mjs <region> out.glb`.


## Removed
- Adventure Mode (Adventure.js, adventure/) and Forest of Nuu (nuu/) were deleted on request; `BT.advEnc` hooks in the arena code are left in place but unused.
- Masaki House (custom room, `masaki` map) was deleted on request.

## Ryder X: tuning + Daily Course
- Garage TUNING row: four stats per board type (top speed, acceleration, handling, boost), 5 levels each, paid from the Oasis Gil wallet through `window.parent.oasisGil` (add with a negative number; needs launching from the Oasis). Stored in `SAVE.tune[boardType]`; applied to the player's racer only via `tunedType()` in `e_board.js` (`pr.ty = tunedType(...)` in `startRace`). Costs/effects are the `TUNE` table.
- Daily Course: `d_track.js` pushes one generated track (id `daily-YYYY-MM-DD`, seeded by the UTC date, same for everyone) at the end of `TRACKS`; it shows up in Quick Race / Time Trial with its own best times and ghost. Autopilot-tested on 8 different days: all finish, no stuck racers.
- Source for Ryder X lives in `/tmp/fg/rx` (split `*.js` + `build.sh`), only the built `RyderX.html` is in this repo.

## AAA pass (first slice)
- `aaaRender()` in index.html: EffectComposer (HalfFloat MSAA target) -> bloom -> grade/vignette/grain -> OutputPass (ACES). Only on `city` and `diner` maps, Balanced graphics and up, never during emulator. Per-map settings in `AAA.maps`. Kill switch: `window.__noAAA=true`. Backup: /tmp/index.pre-aaa.html.
- City: cars use MeshPhysicalMaterial clear-coat; car models gained bumpers/mirrors/grille/rims; tree canopies are displaced icosphere detail 4.
- Still toon-lit: buildings, canopies, road. Next real step is replacing them with authored GLB assets.
- Facades (FFXII method): `facade()` shader now ends with a baked-look wear block (window reveal shadow `wrv`, ground AO, ledge shadow, grime streaks, mottling; program key `cyfac2`). `cyBuild` adds cornice + drip, base course, floor bands (every 3-4 floors) and corner piers per tier (skipped on party walls). Car paint is its own `M.car` (physical clear-coat); `M.vc` stays toon for props.
- Key's Kitchen: `ensureKitchen` floors repainted (grouted/worn tile, planked wood with knots), static shader patch `kcM` (wall tile+grout, toe-kick/ceiling AO, cabinet door seams, speckled worktops; key `kc1`), real shadows from the sun light, plus cabinet fronts/handles/toe kicks, shelves with jars, pan rail, skirting, pendant shades. Backup /tmp/index.pre-kc.html.
- Ryder X (source /tmp/fg/rx): composer now MSAA x4 HalfFloat + bloom + grade pass (sat/contrast/split-tone/vignette/chromatic aberration/grain, scales with speed) + ACES via renderer; road texture 512x1024 with rubber lines, joints, cracks, worn paint; window texture with frames/mullions/gradients; city towers get setback caps, antennas and red beacons. Backups: d2_scenery.pre-aaa.js, g_game.pre-aaa.js, b_util.pre-aaa.js.
- Key's Kitchen food: `kcItemMesh` rewritten with lathe buns (sesame), displaced patties with grill marks (`kcPattyGeo`, `kcGrillMarks`), ruffled lettuce, seeded tomato slices, ringed onion, seeded pickles, wavy striped bacon, draped cheese, fries in a carton, cups with straw/lid/shake cream+cherry, lumpy potatoes. Grill patties and fryer fries use the same geometry. Test: `__kc.item(it)` returns the group. Backup /tmp/index.pre-food.html.
- Grab-from crates (lettuce, tomato, cheese, onion, pickle, bacon crates; potato and meat bins) now hold `kcPile(k, ...)` heaps of real ingredient models in a steel tray. Backup /tmp/index.pre-crates.html.
- Cosy diner dining room (in `ensureKitchen`): rugs, red cloths, candles (flicker in `kcUpdate`), vases, pendant shades, string lights, potted plants, framed pictures, clock, neon OPEN, welcome mat, curtained dusk windows, 3 warm point lights, warmer hemisphere/sun and a warm grade (`AAA.maps.diner.tint`). Static merge now non-indexes everything (Icosahedron is non-indexed; mixing returns null). Backup /tmp/index.pre-cozy.html.
- GLB characters: `handleFile` now sends any .glb/.gltf with a recognised humanoid skeleton (or a VRM) through Character Setup (gender + saved to My Characters) instead of dropping it in as a prop. A skinned model with an unrecognised skeleton asks (OK = wear anyway, Cancel = prop). Static models still place as props with a hint. Test: /tmp scratchpad dx/glb1.mjs with plain_humanoid.glb (VRM tags stripped). Backup /tmp/index.pre-glbav.html.
- Zip/FBX character import fixes (tested with Leon S. Kennedy RE4 FBX + loose PNG textures): `unifySkeleton` merges duplicated per-mesh skeleton copies (so retargeting moves every part); `autoTextures` matches pictures to materials by name when the FBX has no texture links (ignores _diff/_NM/_SP, plurals, .tga.png; normal maps picked up; hair/lashes alpha-cut); `autoHumanoid` now skips fix/unused/holster helper bones, ignores face bones when finding the head, picks the top of `head_neck_*` chains as the head, and lifts the hips above a separate pelvis bone.
- Cel-shaded switch for imported characters: checkbox in the 3D import dialog (`z3-toon`) and Character Setup (`char-toon`, shown for non-VRM characters). Stored per character (`myAvatar.toon`, library entry `toon`), restored on reload, broadcast in hello as `tn` so other players see the same look (re-applied live when it changes). Backup /tmp/index.pre-leon.html.


## Sheva GLB arms fix
- `autoHumanoid`: arm and leg chains now drop bones with no readable name (garbled-Japanese MMD twist helpers like `??????.R_059`) via `named()`, so the elbow/upper arm map to the real bones instead of twist bones (arms were stuck bent forward). Tested with RE5 Sheva GLB + female base. Backup /tmp/index.pre-sheva.html.

## Harbor Inn (Survivor.html) with GLB characters
- `avParse(buffer)` (before `avMat`): VRM as before, otherwise GLB goes through a copy of the Oasis `autoHumanoid` / `tposeFix` / `makePseudoVrm` (so Sheva etc. work). Used by `avLoad` (you) and `rpLoadVRM` (co-op partner). `avLoad` aliases missing spine/chest/neck. Tested: Sheva GLB aiming the Gunner Pistol in the lobby. FBX/zip characters are not supported there yet. Backup /tmp/Survivor.pre-glb.html.

## Harbor Inn Item screen: you + partner stacked
- Item tab in co-op shows two stacked cards (photo + ECG + condition) for you and your partner; click a card to view that player's 8 slots (partner's come from the `iq`/`ir` inventory sync; read-only with Check). Your own items get "Give <name>" / "Give all" in the action list (same `tradeGive` as the Partner tab, which stays). Photos: `svPhoto` renders the head of the character in the scene into a small target (falls back to the pixel face). `reCard`, `M.who`.

## Harbor Inn 2: NX (Resident Evil NX fan book)
- `HarborInn2.html` is generated: `python3 tools/build_hi2.py` copies Survivor.html and injects `hi2/nx_campaign.js` (rooms, notes, bosses, locks). Edit the campaign file, not the HTML.
- Chapter 1 (13 rooms, Landing Ridge -> Spire Lift) is in. Add chapters by appending `R_`/`lnk` blocks + `FILES`/`LOCKS` and a map-position entry in `MP`.
- Library entry `surv-02` (`map:'survivor2'`) opens it via `svOpen('HarborInn2.html')`. Campaign must end up longer than Harbor Inn 1.

## Imported humanoid pivot fix
- Non-VRM imports (`vrm.auto`) are now centred on the hips (x/z) and grounded at the feet in `Actor.setModel` (index.html), and in Survivor/HarborInn2 `avLoad` + `rpLoadVRM`, so models whose skeleton origin is off the feet turn in place instead of swinging wide.
