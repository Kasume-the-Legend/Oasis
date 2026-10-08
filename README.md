<div align="center">

# The Oasis

**A 3D social space that runs entirely in your browser.**
Bring your own VRM avatar, dress it, hang out in the Central Mall or your own Harbor Studio, and meet friends with nothing to install and no game server.

*dev by Kasume the Legend*

![version](https://img.shields.io/badge/version-1.0.0-0070d1) ![single file](https://img.shields.io/badge/single%20file-Oasis.html-53bdff) ![no backend](https://img.shields.io/badge/backend-none-2ea043)

</div>

---

## About

| | |
|---|---|
| **Version** | 1.0.0 (network protocol `net-2`). Shown in Space Info > Network. |
| **What it is** | A browser 3D social space in the style of console-era home spaces: avatars, rooms, chat, emotes, a shared TV with retro games, and decorating. |
| **Author** | Kasume the Legend |
| **Runs on** | Any modern desktop or mobile browser with WebGL. Chrome, Edge and Firefox are the main targets. |
| **Needs** | Nothing to install. Internet is needed for the libraries (CDN), for multiplayer and for the retro-game emulator cores. |
| **Saves to** | Your own browser (IndexedDB and localStorage). Nothing is uploaded to a server. |

### What is in this repository

| File | What it is |
|---|---|
| `Oasis.html` | The whole app: open it or host it as `index.html`. |
| `README.md` | This page. |
| `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png` | Optional. Upload them next to `Oasis.html` so Android can install The Oasis from the browser menu and open it fullscreen (no browser bars). Nothing breaks without them. |
| `oasis-server.mjs` | Optional Node relay server for networks that block direct connections. |
| `cloudflare/` | Optional Cloudflare Worker: Cloudflare TURN (hides players' IP addresses, keeps video working) and a relay. See `cloudflare/DEPLOY-NO-TERMINAL.md` (browser only) or `cloudflare/DEPLOY.md` (terminal). |

### Changelog

**1.0.0** (2026-10-07), first tagged release
- Characters: VRM, glTF/GLB, FBX, OBJ, Blockbench and sprite characters; custom animations.
- Equipment: 13 slots, VRoid clothing and hair from a `.vrm`, items seen by other players, drag-and-drop import, Booth search shortcuts.
- Worlds: Central Mall and Harbor Studio, plus Decorate (furniture, photos, your own models, floors, walls, ceiling).
- Social: private rooms with 12-character codes, speech bubbles, Discord-style text styles, 16 emotes, look-at-player, shared TV and retro games for 1-4 players.
- Networking: peer-to-peer, relay through another player, optional relay server, and Cloudflare TURN to hide IP addresses.
- Interface: PlayStation Home-style windows and an XMB bottom menu; controller support including a camera that can look up.

---

## What is it?

The Oasis is a single-file web app (`Oasis.html`) inspired by the classic console-era 3D home spaces. You load a character, walk around a cel-shaded world, chat with speech bubbles, dance, strike poses, watch videos together on the big screen, and invite friends with a room code. It is plain HTML, CSS and JavaScript on top of Three.js. There is no backend, no account and no build step.

## Features

### Characters
- **VRM avatars** (VRoid Studio, VRoid Hub, Booth and similar). Upload a `.vrm` and it is ready to walk, run, jump and emote.
- **Other 3D models.** `.glb`, `.gltf`, `.fbx`, `.obj` and **3D character zips** work too. If the model has a humanoid skeleton it is detected automatically and uses the standard animations.
- **Blockbench characters** (`.bbmodel`). Cubes, meshes and embedded textures are rebuilt on a humanoid skeleton (parts are sorted into head, body, arms and legs by name or position), so they walk and emote like any other avatar. Pixel-art textures stay crisp. Blockbench animations are not imported.
- **2D sprite characters** can be imported from a sprite sheet.
- **My Characters** keeps everything you have uploaded in your browser, with stock characters to start from.
- **Custom animations.** Replace any base animation slot (idle, walk, run, jump and so on) with your own clip.

### Equipment (FFXIV-style)
- A gear window with **13 slots**: Hair, Head, Ears, Body, Neck, Hands, Wrists, Legs, Ring, Feet, Back, Main Hand and Off Hand.
- **Import clothes from your own storage** (`.vrm` or `.glb`). Outfits made for a humanoid skeleton are re-fitted to your character's bones and move with every animation.
- **VRoid Studio clothes:** import a `.vrm` exported from VRoid Studio and only its clothing is worn (its body, face, eyes and hair are left behind); use the **Hair** slot to wear just a VRoid hairstyle. VRoid's own `.vroidcustomitem` files only hold textures and colours for clothing shapes built into VRoid Studio, with no 3D model, so they cannot be worn directly: put the item on a model in VRoid Studio, export it as VRM, and import that.
- Hats, jewellery, wings and weapons attach to a bone and can be moved, turned and resized with sliders.
- Untick the parts of a full VRM you do not want to wear, and hide parts of your character's original outfit.
- Gear is saved per character, and **other players see what you wear**.

### Worlds
- **Central Mall**, a multi-storey atrium with shops.
- **Harbor Studio**, your own private apartment: a sunlit room with a tall ceiling and a skylight, a wall TV, a pool, and a **harbor patio** with stone pavers, a glass-and-orange railing and a view over a marina and old town. Share its code and friends can visit.
- Cel-shaded look with outlines, a live sky and a day-lit harbor.

### Decorate your Harbor Studio
Press **`B`** (or Start menu > More > Decorate) inside your own studio.
- **Furniture:** sofas (3-seat, loveseat, an L-shaped **sectional**, armchair, ottoman), a **bed**, coffee and side tables, TV console, bookshelf, rugs, a floor lamp and a plant. Every piece can be recoloured. Build your own sectional from **Sofa module** and **Corner module**.
- **Place and adjust:** click a piece to select it, drag it across the floor, turn it (`R`, or the slider), resize it (`+` / `-`, or the slider), raise it, duplicate it or delete it (`Delete`). **Grid snap** can be turned on or off, with 10 cm, 20 cm, 50 cm or 1 m cells; with snap on, turning goes in 15 degree steps.
- **Photos:** import your own pictures and hang them on any inner wall (they stick to the wall you drag across). Pick a frame: none, black, white, wood or gold.
- **Your own 3D models:** import `.glb`, `.gltf` (single file), `.vrm` or `.obj` as furniture. Models keep their real size when it is plausible. Up to 16 MB each.
- **Room tab:** floor (oak, maple, cherry, walnut, ebony, parquet, tile, marble, concrete, carpet, solid colour or **your own image**), inner walls (paint, stripes, dots, lattice, brick, tiles, boards, concrete or **your own wallpaper image**) and ceiling colour, each with a colour and a tile-size slider.
- Pieces marked **Solid** stop people walking through them. Your layout is saved in this browser per studio, and **visitors see it** (your photos and models are sent to them when they arrive). Only the studio's owner can edit.

### Interface
The whole UI follows the PlayStation Home look: a round location card with the room code, a player-count pill with a who's-here list, an XMB-style menu along the bottom (hover, click or `Tab`; `H` hides it), a pill-shaped chat bar, and graphite-glass windows with round close buttons. Typing in chat never pauses the world.

### Booth clothes
Equipment has a **Get items on Booth** row that opens Booth's VRoid searches in a new tab. Download with your own Booth account, then drop the file onto the Equipment window to import it. Check each item's licence: worn items are shared with the other players in the room.

VRoid Studio `.vroidcustomitem` files hold only textures and colours for clothing shapes built into VRoid Studio, with no 3D model, so they cannot be worn directly. In VRoid Studio import the item onto a character, use Export > VRM, then import that `.vrm`.

### Social
- **Multiplayer with no server required.** Players connect directly over WebRTC (peer-to-peer); public matchmaking relays only introduce them. Players who cannot reach each other directly are linked through a third player in the room, and an **optional relay server** (`oasis-server.mjs`) makes it work on any network.
- **Every room is private.** A room has a long random code (12 characters, like `MABC-DEFG-HJKL`) that is also the encryption key for the room. There is no public room list. Invite links look like `https://.../#room=CODE`; the code sits after the `#`, so it is never sent to a web server.
- **Speech bubbles with your own colour.** Everyone in the room sees your bubble colour.
- **Start menu** (Start on a controller, or `M`): emotes, bubble colour and shortcuts in one place.
- **Names:** change yours any time, even inside a room: type `/name Something` in chat, or use the name box in the Start menu's bubble tab. Everyone's name plates and the player list update straight away.
- **Chat:** speech bubbles are solid colour, in your name colour (or the bubble colour you picked). Newer messages stack above, and only the newest bubble keeps its tail, so a burst of messages reads as one chain. The chat log sits in the bottom-left corner as a dark, translucent box; hover it to see who is in the room.
- **Text styles** (Discord-style, in chat and speech bubbles): `*italic*` or `_italic_`, `**bold**`, `***bold italic***`, `__underline__`, `~~strike~~`, `` `code` ``, `||spoiler||` (click to reveal in the chat feed; hidden in the bubble). Put `\` before a symbol to type it literally.
- **Look at someone:** click a player (or press `T` to cycle through the room, and once more to stop) and your head and eyes turn to them with a short reaction delay and soft limits, and your body follows if they are off to the side. A small marker shows who you are looking at, and everyone in the room sees it.
- **Emotes:** cheer and sit on keys `1` and `2`, plus seven dances (Bboy, Rumba, Twerk, Hip Hop, Gangnam Style, Slide, Snake) and eight poses (standing, sitting, laying) in the Start menu. Dances loop and poses hold until you move or pick them again. Non-VRM avatars use a generic dance or sit.
- **Retro games on the TV, 1-4 players.** Load a game file you own (NES, SNES, Genesis, Master System, Game Boy / Color, GBA, N64, PlayStation, arcade / Neo Geo) from the TV panel. It runs in an emulator ([EmulatorJS](https://emulatorjs.org)) on the host's computer and its picture and sound stream to everyone in the room. Anyone can **plug in as Player 1-4** from the panel and play with their own keyboard or Bluetooth / USB controller. No game files are included or uploaded anywhere.
- **Shared TV.** Play a video on the big screen and the room watches together.
- Name plates carry the Oasis mark.

### Controls
| Input | Action |
|---|---|
| `W A S D` / arrows | Move |
| `Shift` | Run |
| `Q` / `E` | Turn on the spot |
| `Space` | Jump (also onto beds, tables and mall benches) |
| `1` `2` | Cheer, sit |
| `Enter` | Chat (arrow keys keep walking while you type) |
| `Tab` | Bottom menu (XMB): ←/→ category, ↑/↓ items, `Enter` select, `Esc` or `Tab` leave |
| `M` | Start menu |
| `G` | Equipment |
| `F` | TV panel (retro games live here) |
| `P` | Pick up the game controls (when plugged in) |
| `V` | Toggle walk style |
| `B` | Decorate your studio |
| `T` | Look at the next player (click a player to look at them) |
| Click a player | Open their profile card (RetroAchievements stats, Look at) |
| Mouse drag | Orbit camera |

**Game controllers** (wired or Bluetooth, any browser-supported gamepad): left stick moves, right stick turns the camera (up looks up, and in the studio it can dip below eye level like the mouse), `A` jumps, `Y` shows or hides the bottom bar, triggers run, `Start` opens the Start menu and the D-pad navigates menus.

**Player profiles:** click someone to see a card built from their public RetroAchievements profile (points, rank, recently played). Set yours in Start menu > Profile by pasting your profile link (optional, shared only with people in your room). No API keys are involved. Reading the page goes through the Cloudflare helper, which only reads retroachievements.org; see `cloudflare/DEPLOY-NO-TERMINAL.md`.

**Furniture:** low pieces in Harbor Studio (sofas, armchairs, ottomans, coffee and side tables) can be walked over, taller ones (bed, TV console, mall benches) need a jump, and bookshelves stay solid. Stand on a piece and press `2` to sit, or pick a lying pose from the Start menu, and the pose happens at the height of the surface. Pieces now have fabric, leather, wood and wool surfaces, all drawn in code (no image files).

**Screen fit (console style):** three modes, changed from the bottom menu (Info > Screen Fit) and remembered. **Wide** (default on touch screens): the 3D picture fills your whole screen at the same height as on a PC, so you see a bit more to the sides, while the menus and HUD stay in a centred 16:9 frame. **16:9**: everything in a 16:9 frame with black bars. **Fill** (default on desktop): everything uses the whole window. On a touch screen a fullscreen button sits next to the player count (also Info > Fullscreen); on iPhone use Share > Add to Home Screen, and on Android you can install it from the browser menu to open without browser bars.

## Run it

Because it is one file, there is nothing to build.

**Locally:** open `Oasis.html` in a modern browser. For the networking features, serve it over `https://` or `http://localhost` (browsers disable the encryption peer-to-peer needs on plain `file://` pages).

**On GitHub Pages:**
1. Put the file in your repository (name it `index.html` if you want the plain site address to work).
2. Repository **Settings → Pages**, choose your branch and the root folder, then save.
3. Open `https://<your-name>.github.io/<repo>/`.

## Multiplayer notes

**Rooms and codes.** Create a room in the lobby and send friends the code or the invite link (the code button at the top). Whoever has the code can join, so treat it like a password. Rooms hold up to 16 players. Codes from older versions (5 characters) no longer work.

**How players connect.** In order of preference:
0. **Relay-only (default when a relay server is set).** Nobody sees anyone's IP.
1. **Directly (peer-to-peer), only without a relay server or if you opt in.** Fastest, and the only way the retro-game video reaches other players. Everyone in the room can then see everyone's IP address.
2. **Through another player.** If two players cannot connect directly but both reach a third, messages and avatars are passed along by that player (a one-hop relay).
3. **Through your relay server** (optional, see below). Works on networks that block direct connections.

The **Run network test** button in **Space Info → Network** shows what your connection can do. Strict networks (some mobile and corporate ones) may also need a **TURN server**, which can be added in the same panel; a TURN server carries only encrypted data.

**Avatars** are sent player-to-player (or through the relay server), so very large files take a moment. Avatar and item files over 48 MB / 24 MB cannot be shared.

### Cloudflare TURN (recommended, free)
`cloudflare/` holds a small Worker that hands the game short-lived Cloudflare TURN passwords. Players still connect with WebRTC (so video works) but through Cloudflare, so they never see each other's IP addresses. No terminal needed: follow `cloudflare/DEPLOY-NO-TERMINAL.md`, then put your Worker address in `turnApi` near the top of `Oasis.html`. The same folder has a relay for networks that block WebRTC (`DEPLOY.md`).

### Your own relay server (optional)

`oasis-server.mjs` is a small Node program that copies messages between the players of a room. It makes the game work for everyone, whatever their network, without any company in the middle.

```
npm install ws
node oasis-server.mjs          # listens on :8787
```

- Put it behind HTTPS so players can use `wss://`. The easiest way is [Caddy](https://caddyserver.com): a `Caddyfile` with `relay.example.com { reverse_proxy localhost:8787 }` gets a certificate automatically. A GitHub Pages site needs `wss://` (not `ws://`).
- In the game, open **Space Info → Network → your own relay server**, paste `wss://relay.example.com` and save. To give everyone the server without setting it up per browser, put the address into `NET.server` near the top of the script in `Oasis.html` (look for `// <- your wss:// address here`).
- **Safe by default:** once a relay server is set, the game uses only the server. Players never see each other's IP addresses. The retro-game video cannot reach other players in this mode (it needs a direct connection). Tick **Also allow direct peer-to-peer connections** in the same panel if you want that, knowing everyone in the room can then see each other's IP.
- Optional settings (environment variables): `PORT`, `MAX_ROOM` (default 16), `MAX_ROOMS` (500), `MAX_FRAME_MB` (64), and `ALLOWED_ORIGINS` (for example `https://you.github.io`) so only your site can use it.

What the server can and cannot see: it never receives room codes. A room is named by a SHA-256 hash of its code, and every message is encrypted in the browser (AES-GCM, key derived from the code) before it is sent, so the server only copies scrambled bytes between members. It can see how many players are connected to which hashed room, their connection times and their network addresses. It stores nothing on disk.

For the retro-game video on networks that block direct connections, run a TURN server such as [coturn](https://github.com/coturn/coturn) and add it under **Space Info → Network → TURN**.

## Tech

- [Three.js](https://threejs.org) for rendering
- [@pixiv/three-vrm](https://github.com/pixiv/three-vrm) for VRM avatars
- [Trystero](https://github.com/dmotz/trystero) for serverless WebRTC (Nostr, BitTorrent and MQTT matchmaking)
- Tailwind CSS (CDN) and Font Awesome for the interface
- Optional: Cloudflare Workers and TURN, or a Node relay (`oasis-server.mjs`)
- Characters, items and settings are saved in your browser (IndexedDB and localStorage); nothing is uploaded to a server

## Known limits

- Blockbench models are assumed to face north (-Z); tick **Turn it around** in the import window if yours faces away. Unusual rigs (tails, wings, extra limbs) are attached to the nearest body part and move rigidly.
- Retro games: the emulator cores download from the EmulatorJS CDN the first time, so that needs internet. Heavy systems (N64, PlayStation) depend on the host's computer. Analog sticks work best-effort (on N64 the stick is the analog stick only; on other systems it also drives the D-pad). The game picture is streamed at up to 60 fps, but the real frame rate is set by the host's computer (the emulators run single-threaded in the browser), so N64 and PlayStation can run below 60 on slower machines. Some systems need a BIOS file you own (use the BIOS button).
- VRoid items bring no spring-bone physics, so skirts and hair stay still; and a VRoid item cut for different body proportions can poke through or float. Skirt and hair physics from imported outfits stay still (they follow the body but do not sway).
- A character's skin can poke through tight clothing.
- Without your own relay server, internet multiplayer depends on public matchmaking relays and on your network; use **Run network test** if friends cannot connect. About 10-20% of networks need a relay server or TURN.
- A player relaying for others could in principle forge messages from someone in the room (the code keeps strangers out, not members honest). Relaying through your own server does not have that weakness.
- Decorating: there is no undo yet; pictures only go on the studio's inner walls; pieces do not stack automatically (use the Height slider); layouts live in this browser, so clearing site data or switching browsers loses them (export is not built yet).
- There is no kick or ban yet; if a code leaks, make a new room.

## Credits

Built by **Kasume the Legend**. Inspired by the 3D home spaces of the console era; the Oasis name, logo and artwork are the author's own. Thanks to the authors of the open-source libraries above.

## License

Add your preferred license here (for example MIT). Third-party libraries keep their own licenses. Avatars, outfits and videos loaded by players remain the property of their creators.
