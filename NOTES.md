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
