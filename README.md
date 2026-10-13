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

**Unreleased** (2026-10-10)
- **Warriors of Light (new map, co-op turn-based fights, formerly "Arena Battle"):** up to 4 players plus CPU allies fight endless waves with ATB gauges, a command menu (Attack, Magic, Item, Defend, Limit), a moving battle camera, and a boss every 5th wave. Games menu → Arena Battle, or `/battle`. See the Warriors of Light section.
- **Settings window (Info → Settings, or `/settings`):** currently holds a frame counter (fps and drawing size, bottom right). The resolution, frame-rate cap and emulator-priority options were tried and removed again; the game is back to its original automatic quality governor.
- **Warriors of Light Cast panel:** VRM models from your bag can be CPU allies and custom enemies (name, HP, weakness, size, boss). Warriors of Light → Cast.
- **Removed** the "Screen blank? Watch it here" button.
- **AFK mannequin:** after 90 seconds without input (or when the tab is hidden) other players see a see-through glass mannequin in your place.
- **Studio weather is shared:** a weather or season choice made in the Harbor Studio is now seen by everyone in the room. On other maps it stays personal.
- **Square menu:** *Invite to party* was added next to Examine and Profile.
- **Performance:** studio scenery merged, a frame-rate governor, and an emulator mode that gives the emulator the processor time. TV web pages can open pop-ups. See Frame rate and the TV.
- **Zen Bowl:** a new multiplayer bowling alley (4 lanes, real 10-frame scoring, aim / spin / power, CPU bowlers, overhead score screens). Games menu → Zen Bowl, or `/bowl`. See the Zen Bowl section.
- **Games:** Triple Triad (2D cards, Same / Plus / combos, your own 5-card deck) and Connect 4 (a 3D board you can turn by dragging). Open them from Start → More → Games, the **Games** slot on the *Emotes 2* hotbar (right side), or type `/games`. Play the computer (Easy / Normal / Hard) or challenge a player in the room; they get an invite to accept. The card frame, card back and table are the pictures you supplied (embedded in the file, about 80 KB); the deck is the first 52 cards of the FFXIV list (1★ to 4★) with their names, stars and numbers copied from the community wiki; the monsters on the cards are emoji stand-ins until card art is added. The numbers were read off the wiki page by a text extractor, so spot-check them. The 5★ and later cards are not in yet. The card back carries its printed credit line (© Square / Bandai); leave it in or crop it as you see fit. Texas hold'em, Spades and Scrabble are not in yet.
- **Gunner, third-person shooter style:** hold right mouse (pad **LT**) to aim over the shoulder with a crosshair, **C** (pad **L3**) crouch with its own crouch walk, **L** (pad **B**) dodge roll with brief invulnerability, hold **Q** (pad **LB**) for a weapon wheel. Firing and reloading play on the upper body only, so the legs keep walking, running or crouching.
- **Gun holding:** each weapon is now held by solving both arms to its grip and foregrip, with the fingers wrapped round the handle and the trigger finger on the trigger. Pistol: the left hand cups underneath the grip like an officer holding a pistol; rifles and the shotgun: left palm under the forend; launchers: left fist on the front grip. The gun kicks on each shot and the left hand drops to the magazine on reload.
- **Blood:** bullet and blast hits on a person in a duel throw a spray, a red mist and fading splats on the ground (for both the shooter and the one hit).
- **Controller:** the cross hotbar now has two emote sets (**Emotes 1 / Emotes 2**, 16 slots each, every emote and pose in the game) in front of the old sets; with a controller connected the bottom bar stays hidden and **Select / Back** brings it up (and it hides again when you leave it). Start still opens the main menu.
- **Gunner weapons:** the Military Weapons pack replaces the single pistol (pistol, assault rifle, shotgun, sniper, rocket and grenade launchers, knife) with models, sounds, per-weapon ammo and reload, projectiles with explosions, weapon switching on keys, pad and touch, and synced to other players. **VRoid Motions:** seven new emotes. New muzzle-flash and bullet-impact effects.
- Seasons and weather (radar, accumulating snow, rain, storms, fog), Oasis Galleria, Key's Diner and Dive, Oasis Industries, O-Boy held pose and player targeting (including yourself).
- First person view fixed: movement now follows where you look, you can look straight up and down, and Q/E turn the camera.
- Decorate: **undo / redo** (also `Ctrl+Z` / `Ctrl+Y`), a **Delete** button, previous / next piece buttons and a **Placed** tab that lists everything with a delete (✕) on each row, plus a two-step Delete everything. Locked pieces can be deleted from their bar too.
- Builder's Plot: the Harbor Studio floor and wall finishes (oak, parquet, tile, marble, carpet, brick, subway tile, stripes, dots, lattice, boards, paint) join wood, stone, metal and concrete.
- Uploads (photos and 3D models) can have a **name and description**; people who aim at an item (centre of the screen, within a few metres) see its description; nothing pops up just from standing near it.
- Harbor Studio: the real Destiny City now stands across the bay as the skyline.
- **Kitchen Clash:** a 3D, multiplayer cooking contest map in Key's Diner and Dive (see below).
- Earlier unreleased: Builder's Plot, party system, new sky, 45 more furniture pieces, colour recents.

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
- **My Characters** keeps everything you have uploaded in your browser, with two stock characters to start from, **Base Male** and **Base Female**, both built into the file so they are there from the first launch.
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
- **Names and descriptions:** after you import a photo or model a small window asks for a name and an optional description (up to 240 characters). Edit it later with the ✎ button in the library or the Description box in the item bar. Visitors who stand near an item see its name and description at the bottom of the screen.
- **Undo, redo and delete:** the toolbar at the top of the Decorate panel (and the item bar) has Undo, Redo, ◀ ▶ (select the previous or next piece) and Delete. `Ctrl+Z` undoes, `Ctrl+Y` or `Ctrl+Shift+Z` redoes (up to 80 steps; dragging a slider counts as one step). The **Placed** tab lists every piece with ✕ to delete it.
- **Room tab:** floor (oak, maple, cherry, walnut, ebony, parquet, tile, marble, concrete, carpet, solid colour or **your own image**), inner walls (paint, stripes, dots, lattice, brick, tiles, boards, concrete or **your own wallpaper image**) and ceiling colour, each with a colour and a tile-size slider.
- Pieces marked **Solid** stop people walking through them. Your layout is saved in this browser per studio, and **visitors see it** (your photos and models are sent to them when they arrive). Only the studio's owner can edit.

**Wallpaper and floor images:** the tile size slider now goes up to 16 m, so one picture can cover a whole wall. Under Floor and Walls, **My image layers** lets you stack up to 5 of your own images on each, every layer with its own size (up to 30 m), stretch, opacity and position, and up/down to reorder. Layers are saved with the room and shown to visitors.

**Lock furniture:** select an item and press **Lock in place** (or `L`). A locked item can't be dragged, turned, resized, recoloured or deleted by accident, and shows a padlock; select it and press Unlock to change it again. Locks are saved with the room.

**Colour anything, with recent colours:** every colour picker in Decorate (furniture, floor, walls, ceiling, structures) remembers your recent colours as swatches. Click one to reuse it.

**More furniture (about 45 new pieces):** chairs, benches and poufs; dining, round and work tables, desks; nightstand, dresser, wardrobe, cabinet and chest; lamps (table, arc, pendant, lantern, neon, candles) that really light the room at night (the four nearest lamps cast light at a time to keep phones smooth); **fish tanks** (a wall tank, a table tank, a tall column and a coral tank, with animated fish); oven, bathtub, toilet and sink; vases, books, a mirror, a grandfather clock and a piano; and a **survival** set (crates, barrels, fire barrel, workbench, metal shelf, cot, locker, sandbags, tires, pallet, generator, camp stove). Use the category chips at the top of the Furniture tab.

**Sky in the studio:** the Harbor Studio windows now show the same sky as Destiny City: sun, moon, stars and drifting clouds on the same day and night cycle.

### Builder's Plot (build a house, Sims and Once Human style)
A new kind of private space. In the lobby, under **Your Builder's Plots**, press **New plot**; each plot has its own code (starts with **P**) that you share like any room code.
- You arrive on a wild hillside with pines, rocks, a campfire and a sign. Press **`B`** and open the **Build** tab.
- **Pieces:** foundations, floors, walls, doorways, doors, window walls, pillars, stairs, roofs, fences and more. They snap to a 2 m grid; each level is 3 m high and you can build up to three levels (use the **Level** buttons in the selection bar).
- **Materials:** wood, stone, metal and concrete, plus the Harbor Studio floors and walls: oak, parquet, tile, marble, carpet, brick, subway tile, stripes, dots, lattice, boards and plain paint. Each can be recoloured, with recent colours.
- **Templates:** one click places a starter cabin (flat or pitched roof) to build from.
- **Cutaway:** stand under a roof and the floors above hide so you can see inside.
- All the furniture, lamps, fish tanks and photos work inside your house, and the sky changes with day and night.
- Limit: 1100 pieces per plot. Only the owner builds; visitors see the house and walk in it.

### Party (up to 8 friends)
Press **`J`** (or Social > Party).
- **Create a party** and share its code (starts with **Q**) or the **Copy link** invite. A friend pastes the code or opens the link and joins from anywhere.
- **Invite from this room:** anyone standing in your room appears in the list with an Invite button; they get a Join / No thanks prompt.
- **Call party to my room** sends everyone a button that takes them to your room (public room, private room, studio or plot).
- Members see each other's level, room and a leader crown; **Go to** jumps to a member's room. The leader can run a **ready check**, make someone leader or remove someone.
- **`/p message`** chats with the party only.
- A party is its own small encrypted room (the party code is the key). If you invite someone inside a public room, the invite crosses that room unencrypted, so use a private room or the code/link for anything sensitive.

### Harbor Studio, penthouse edition
- You are at the top of an apartment tower. The front door is centred and is a working **elevator** (step in to open the lobby).
- The studio **comes empty**. The kitchen counter, island, fridge, bar stools, tall bookcase and six realistic plants (monstera, fiddle-leaf fig, snake plant, areca palm, bird of paradise, fern) are **Decorate furniture** you place where you like (`B`).
- Bigger oval skylight with glass, rings and ribs, warm cove lighting and skirting boards.
- The view from the Harbor Studio windows is now a **forest edge** (see below). The old bay, islands and Destiny City skyline behind the studio were removed. The studio still shares Destiny City's sky: the same day and night cycle, sun, moon, stars and clouds.
- Also in this version: house sizes (S/M/L), levelling, a menu hologram, D-pad player targeting.

### Destiny City (new map; the lobby has a Destiny City card with a Join button, and a Destiny City option for private rooms)
A Tokyo-inspired harbor district on a tropical island, built to keep growing. Join **Destiny City** from the elevator lobby.
- **The Scramble**: a big crossing with zebra stripes, traffic lights that really change, cars that stop and go, giant LED screens on the corner towers.
- **Streets and shops**: Japanese-style storefronts (konbini, ramen, izakaya, cafe, arcade, pharmacy, sushi, books), vending machines, bicycles, utility poles with sagging wires, neon blade signs, and an izakaya alley hung with red lanterns.
- **The Paopu plaza**: a sunburst compass plaza with a star-shaped fountain and a floating golden paopu fruit, palms and benches.
- **Elevated rail line** with moving trains and Destiny Station, **Destiny Tower** (a red-and-white lattice tower), a **Ferris wheel**, food stalls, and **Mount Fuji** on the horizon.
- **Destiny Islands theme**: a beach, a wooden bridge out to Destiny Islet with the leaning paopu tree, an east pier with a gazebo and lighthouse, small islands, sailboats and a bay bridge.
- **Shrine park** to the north: torii gates, stone lanterns, a shrine hall, a koi pond with a red arched bridge, cherry blossoms and drifting petals.
- **Rebuilt architecture (v2)**: every building now has a podium or shopfront at street level and a tower or block above it. Styles are glass curtain-wall towers, tiled mid-rises with ribbon windows, apartment blocks with balconies and sliding doors, narrow tenant buildings (a different business on each floor) and older brick buildings. Heights step down from the centre, with setbacks, roof plant, antennas and aircraft-warning lights. Streets are lined with fascia and blade signs, awnings and street trees.
- **A one-hour day**: the city runs a full 24-hour cycle every real hour, taken from the clock, so everyone in the same city sees the same time of day. Sunrise, midday, sunset, dusk and night each have their own sky, fog and lighting. Windows light up at night and shopfronts glow, with lamps, neon haloes and pools of coloured light on the pavement.
- **Sky**: a procedural sky with a sun and halo, drifting clouds (cumulus and high cirrus), and at night about 150 real bright stars in their correct places plus thousands of fainter ones that twinkle, a Milky Way and a moon whose phase changes day to day. Stars fade out near the horizon and when the moon is bright.
- **Roads that lead somewhere**: Destiny Ave. (east-west) and Harbor St. leave the district through tunnel mouths in concrete walls, with green highway boards (Tokyo / Shinjuku, Odaiba, Yokohama), overhead gantry signs and street-name plates at every junction. Sakura St. and Port St. run north to tunnels signed for Hakone / Mt. Fuji and Chiba / Narita. The shrine avenue ends at the shrine, with a U-turn at each end.
- **Walk-in shops**: the shopping streets outside the main grid have real shops with a door, glass front, awning, lights and an interior you can walk into: konbini (shelves, fridge wall, register), ramen bar (counter, stools, noren, lanterns), cafe, arcade (glowing cabinets), bookshop, florist, boutique and izakaya, each with flats above.
- **Street details**: bins and recycling bins, post boxes, benches, bike racks with bikes, planters, hedges, bus shelters, A-frame signs and manholes.
- **Traffic** only drives on the roads (no parked cars), stops at the Scramble lights, and turns around at the ends of the shrine avenue.
- **Cars** are shaped sedans, kei cars, vans, taxis and a bus, with glass, wheels and head and tail lights that cast light on the road after dark.
- Everything is drawn in code (no image files). The city builds the first time you enter it, which can take a moment on a phone.

### Seasons and weather (Destiny City, Builder's Plot, Harbor Studio sky, Oasis Galleria garden)
The year follows game time: a one-hour real day, and the seasons turn every few real days, so everyone in a room sees the same sky. Weather is a believable model, not a random roll: a seasonal temperature curve, a day and night swing, slow pressure waves, and weather systems that arrive in half-day bins, so a front gives you a clear spell, then thickening cloud, then rain or snow, then clearing. Rain turns to sleet and snow by temperature (snow at about 0 °C or below), thunderstorms need warmth, and fog forms on cold, still mornings.
- **Snow settles like a game engine would show it**: ground, roofs, cars, trees, benches and bins gather snow on their upward-facing surfaces, patchy at first and thicker over hours, and it melts when it warms. Rain wets and darkens surfaces. Interiors (shops, houses with roofs, the Galleria hall) stay dry, and precipitation stops when you are under a roof or in a tunnel.
- **Radar and forecast**: press `U` (or Home > Weather) for a radar that sweeps west to east, a 12-hour forecast, the season and temperature. Weather systems in the radar are the same ones that reach you.
- **Seasons** change tree colours, grass, falling petals and leaves (cherry blossom in spring, red-orange in autumn, bare in winter), and the sun's path and the stars.
- **Preview**: `/weather clear|cloudy|rain|snow|storm|fog|auto` and `/season spring|summer|autumn|winter|auto` change only what you see. The panel can also use your real local weather (Open-Meteo) when the network allows.
- Sound: rain, wind and thunder.

### Oasis Galleria (new map, the big mall)
A glass-roofed shopping hall in the spirit of a PlayStation Home mall: white curved pillars carrying big screens that cycle ads, a brick back wall with arched windows, shop fronts on two levels with balconies, a fountain plaza with a turning sculpture and spray, benches and planted trees, and a great arch out to a **garden** (lawn, paved paths, a pond, a gazebo, hedges and flower beds, and the weather and seasons).
- Join it from the lobby (the **Oasis Galleria** card) or create a private Galleria room (codes start with `G`).
- **Key's Diner and Dive** (left) and **Oasis Industries** (right) are the glowing doors near the entrance: walk into the doorway and the game or the lab opens.
- Ten more shop fronts (boutique, bubble tea, records, gadgets, home, arcade, books, sweets) are decoration for now.
- The hall is under a roof, so it stays dry in the weather; the garden does not.

### Key's Diner and Dive (cooking game)
A rush-hour shift game as a full-screen overlay: order tickets arrive with a patience bar; cook patties on the grill (raw, medium, well, burnt), fries in the fryer, hot dogs and pancakes; build burgers topping by topping; pour soda, coffee and milkshakes; serve from the tray before the customer leaves. Perfect orders earn tips and a streak bonus. Each day unlocks more of the menu (onions, pickles, coffee, hot dogs, shakes, pancakes, pie, bacon) and gets faster; two stars or the money goal unlocks the next day. Progress and best scores are saved in this browser, a finished shift earns XP, and **Share to chat** posts your result.
### Kitchen Clash (3D, multiplayer)
The map is now compact (each kitchen is 12 m wide instead of 20): plates, soda, shake, fryer and grill sit in one row, the six toppings run down the outer wall, and the serving window and bin are a few steps away, so the whole map fits on screen in the top-down view. The big floating scoreboard is gone (the top bar shows the score).
On the Key's Diner title screen press **Kitchen Clash**, or pick **Key's Kitchen Clash** in the lobby (public channel) or **Kitchen Clash** under private rooms (code starts with **K**, so friends can join the same match). It is a real 3D room with your own character: a **Red** kitchen on the left, a **Blue** kitchen on the right and a dining floor with a **START** console.
- Walk into a kitchen with your friends and press START (button, console, or `F` at the console). Both teams cook the **same orders** for **2:30**, and everyone on a team shares the same grill and fryer. Alone, or with nobody on the other side, you cook against **Chef Key's crew**.
- Per dish: grab a **plate**, put a **patty** on the grill (raw, medium, well, burnt: watch the bar above it), take it when it is done, add **toppings** from the bins, take **fries** from the fryer, pour a **soda** or **shake**, then **serve** it at the pass. Burnt food has to be scraped off. You carry one plate at a time and other players see it.
- **Scoring is done by the game, 0 to 100 per dish:** patty doneness (30), toppings (15, extras cost points), fries ready (25), drink (15), and a speed bonus (up to 12) for serving before the ticket's patience runs out; ranks D, C, B, A and S. A plate is judged against the order it fits best. The team with the higher total wins; the results show each chef's points, dishes and best rank.
- **View:** the kitchens are played from above, like an arcade cooking game: the camera looks almost straight down with north at the top, glides after your character, and the mouse wheel / pinch zooms (the camera cannot be turned in here). Movement keys move you across the screen.
- Controls: `F` use / grab, `K` drop plate, big on-screen **USE** button on touch, controller A to use / grab and B to drop.
- Opening the title screen still gives you the original solo shift game.

Open the solo game from the Galleria doorway, Home > Key's Diner, or `/diner`. `Esc` pauses. This is my own take on a "cooking rush" game (I did not have the Discord game to copy), so tell me which rules to change.

### Laser Tag (guns, bows and blades; its own room)

A neon arena in the spirit of Gun Gale Online. Open it from **Home → Laser Tag**, the lobby (a private **Laser Tag** room has a code starting with T), or type `/tag`. Walk into the **Red** (left) or **Blue** (right) area of the briefing room, pick a weapon and press **START** (F at the console, or the button). Everyone who stood in a team area plays; alone, you face **training drones** (each side is filled up to 3 fighters).

- **Rules:** 100 HP, a knockout costs the other team a point, you are back at your base after 5 seconds with 2.5 s of protection. Most knockouts after 3 minutes wins, or the first team to 20. The arena is about a third smaller than before, so fights start sooner; knockouts last 3.5 seconds and drones come back after 6. Late joiners watch until the next match.
- **Pulse Blaster (1):** fires Star Wars style bolts, glowing streaks with a white core in your team colour that fly at 70 m/s, so you can see them cross the arena and have to lead a moving target. 14 shots, 17 damage on impact, R reloads (also automatic when empty). Bolts stop at cover and walls with a spark. Drones shoot visible bolts too, and their hits land when the bolt arrives.
- **Longbow (2):** hold to draw (0.7 s), release to shoot; a full draw does 48 damage, a quick tap 12. Arrows drop over distance, and you walk slowly while drawing.
- **Pulse Pistol (4):** your white pistol as a fourth weapon: slower (one shot every 0.3 s), 9-round magazine, 26 damage and almost no spread from the hip. Each gun keeps its own magazine when you swap. It uses the blaster animations. Rifle and pistol both get a muzzle flash, a flash of light and new layered shot sounds.
- **Health pads:** two green pads on the middle line heal 40 health when you walk over them (they recharge for 14 seconds).
- **Photon Blade (3):** 3-hit combo (24 / 24 / 38), 2.7 m reach in front of you, a little faster on foot.
- **Aiming (Resident Evil 4 style):** in the arena the camera sits over your right shoulder and the character faces where you look. **Click once** in the game to capture the mouse (Esc releases it), then move the mouse to look. **Hold the right mouse button to aim**: the camera pulls in closer, zooms, you walk at half speed, a small red crosshair shows and a red laser sight runs from the gun to whatever you point at (it turns yellow over an enemy). Left mouse fires. Aimed shots go exactly through the crosshair with a slight pull onto an enemy right next to it. Hip fire (not aiming) is wider and the gun spreads a little. The bow aims the same way (arrow drop is compensated) and drawing it zooms in automatically. The camera pulls in against cover so walls never hide you. The blade needs no aiming. **Controller:** right stick looks, hold L1 or L2 to aim (zoom), click the right stick (R3) to toggle aim on and off, R2 fires. In the arena L1 no longer toggles auto-run and R3 no longer changes the camera mode. **Touch:** drag to look, hold the AIM button to aim, FIRE to shoot.
- **Keys:** left mouse or F fire (hold to draw the bow), right mouse hold aims, 1 / 2 / 3 / 4 weapons, R reload, F also uses the console. **Controller:** R2 fire, L1 / L2 aim, R3 aim toggle, D-pad left / right weapon, X reload, A use, Y jump. **Touch:** FIRE and AIM buttons, weapon and reload buttons, drag to turn.
- Each hit is decided by the shooter and reported to the victim, so other players' hits on you show up as they arrive; drones walk fixed routes on a shared clock.

**The built-in Rifle set.** The gun animations you sent are stored inside `Oasis.html` as a set (like the stock male / female sets), so there is no folder to host and nothing to upload. Any character that carries a gun uses it, and Laser Tag does today. It holds: blaster idle (Rifle Idle), an aiming idle used while you aim (Rifle Aiming Idle), blaster walk and run forward (Rifle Run 1), strafes left and right (Run Left / Run Right; backwards is the run played in reverse), blaster fire (Firing Rifle 2: the old Fire Rifle clip crouched, so it was replaced) and three knockouts (Death From Front Headshot, Death Crouching Headshot Front, Death From The Back: the back one is used when the shot came from behind, otherwise one of the front two at random). Your own uploads in the Animations panel replace these slot by slot for your character. The blasters now use the Gunner animations instead (see Laser Tag upgrade); the clips above still drive the bow and anyone without the Gunner set. Not used: Kneel idle / to aim / to stand, Aim To Down, Put Away, Crouch Backward Walk, Walk To Stop and Firing Rifle. The weapon models follow your pictures: the blaster is a white and navy carbine with a glowing team strip, and the blade is a white and chrome saber hilt whose blade is your team colour.

**Your own animations.** Open Animations: there are now sections for each weapon. Per weapon you can set idle, walk (forward / back / left / right), run (the same four) and jump, which replace your normal movement while you carry that weapon (anything you leave empty uses your normal clip). Plus action clips: blaster fire and reload, bow draw and release, blade slash 1 / 2 / 3, and for every weapon: got hit, knocked out (stays down), victory, defeat. Drop several FBX files at once and the names are read: for example `Rifle Idle`, `Rifle Walk Backward`, `Pistol Run Left Strafe`, `Rifle Fire`, `Rifle Reload`, `Bow Draw`, `Bow Shoot`, `Sword Idle`, `Katana Run`, `Sword Slash 1` / `2` / `3` (or `Attack_03`), `Hit Reaction`, `Death`, `Victory`, `Defeat`. A word like rifle / gun / pistol / blaster, bow / archer, or sword / blade / katana / melee picks the weapon. Until you upload clips, simple built-in poses are used (blaster held level, bow drawn, blade raised, swing and recoil).

### Oasis Industries (hoverboard lab)
Ported from your Extreme Gear customizer. A live 3D lab (own preview, orbit and five camera views) with nine presets, three paint colours (body, trim, plasma), six deck decals (Racing, Flame, Cyber, Checker, Stars, Oasis), length, width and nose-flare sliders, exhaust density, hover height, a boost demo with engine sound and speed lines, and OBJ export. Eight save slots; **Save & ride** makes it your board in the world, and other players see your custom board. `Shift+X` also cycles through your saved boards after the five stock colourways.
Open it from the Galleria doorway, Home > Oasis Industries, or `/industries`. Changes I made while porting: the decal now covers the whole deck (in the original it only showed on one corner), the foot pads and straps sit on top of the deck instead of inside it, and the OBJ export includes the deck faces.

### Hoverboards
Press `X` (or the wind button at the top right, or the Hoverboard slot on a controller hotbar) to hop on a jet-pod hoverboard: faster than running, with a glide when you let go, banking in turns, a hover bob and a pool of light under it. `Shift+X` cycles five colourways (Cyan Streak, Solar Flare, Sakura Drift, Venom Wing, Midnight). Other players see your board. They are not allowed in the Harbor Studio. The board is an original design, and the rider uses a skateboarding pose (a crouched, sideways stance). Boards you design in **Oasis Industries** join the cycle.

### O-Boy (portable screen)
Press `O` (or the gamepad button at the top right) for a personal handheld. **Load game** takes a ROM you own (NES, SNES, Genesis, Master System, Game Boy / Color / Advance, N64, PlayStation, arcade) and runs it in its own emulator, separate from the TV and not shared with anyone. It opens held up in front of your view (first person); **Full screen** shows only the game. Keys: arrows or WASD, `Z` = B, `X` = A, `Enter` = Start, `Shift` = Select, `Esc` closes; a controller works, and the on-screen buttons work by touch. **Colour** takes any colour you like (picker plus swatches) and is remembered. The emulator core downloads from cdn.emulatorjs.org the first time. **Others can see you playing**: your character holds a small version of the device in both hands with its screen lit in your colour (and the game's frames are not shared), so people know you are busy rather than standing still.

**Targeting**: `T` cycles through nearby players, then yourself, then off. Targeting someone (on a controller: D-pad left / right, or A) shows a floating, see-through card at them (name, level, and whether they are playing O-Boy or just online); targeting yourself shows your own card. On a controller, tap D-pad down to target yourself (hold it to zoom out) and B clears.

### Inventory and trading
- **Inventory** (`I`, or Avatar > Inventory): a 60-slot bag. Store **.vrm** models and **PNG / JPG / GIF / WebP** images (other file types are refused; files are checked by their contents, not just their names). Your Equipment clothes and items show up in the bag too. You can **download** anything back out, set a stored .vrm as your avatar, or delete things. The bag lives in your browser.
- **Trading**: click a player and press **Trade** on their profile card (or target them and press *Trade with target* in the Inventory). They get an accept / decline prompt. Both players put up to six items in the offer, both **lock**, both **confirm**, and then the files travel directly from player to player into each other's bag. Anything the other player gives you (a .vrm, an image, or gear) is yours to download. Changing an offer unlocks both sides, either player can cancel until the end, and a trade is cancelled automatically if someone leaves. Limits: .vrm up to 40 MB, images up to 8 MB.
- **Asset folder**: in the Inventory, press *Choose asset folder* and pick any folder on your computer (desktop Chrome / Edge). Downloads are then filed into `Models/`, `Images/` and `Gear/` inside it, never loose, with duplicates numbered. Items you receive in a trade are filed automatically into `Models/From <player>/` (and likewise for images and gear); *Auto-save trades* can be switched off. The browser may ask you to re-allow the folder after a restart; press Download once to re-allow it. Phones and Firefox/Safari cannot pick folders, so there downloads go to the normal Downloads folder, named `Oasis_models_…` / `Oasis_images_…`.

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
- **Emotes:** cheer and sit on keys `1` and `2`, seven **VRoid Motions** (Show Full Body, Greeting, Peace Sign, Shoot, Spin, Model Pose, Squat; they play once and end), plus seven dances (Bboy, Rumba, Twerk, Hip Hop, Gangnam Style, Slide, Snake) and eight poses (standing, sitting, laying) in the Start menu. Dances loop and poses hold until you move or pick them again. Non-VRM avatars use a generic dance or sit.
- **Theater button** on the TV panel (; the old "Screen blank? Watch it here" button was removed) lifts the picture out of the 3D scene and shows it flat. YouTube's free movies with ads are copy-protected, and phones cannot draw protected video inside the tilted 3D screen, so it shows blank there; Theater and Full screen both fix it.
- **Retro games on the TV, 1-4 players.** Load a game file you own (NES, SNES, Genesis, Master System, Game Boy / Color, GBA, N64, PlayStation, arcade / Neo Geo) from the TV panel. It runs in an emulator ([EmulatorJS](https://emulatorjs.org)) on the host's computer and its picture and sound stream to everyone in the room. Anyone can **plug in as Player 1-4** from the panel and play with their own keyboard or Bluetooth / USB controller. No game files are included or uploaded anywhere.
- **Shared TV.** Play a video on the big screen and the room watches together.
- Name plates carry the Oasis mark.

### Start-up music
Your MP3 plays on the splash page. Browsers do not allow sound before you interact, so the splash now waits on "Click or press any key / button to start", the tune begins on that first click, key press or button press, and the splash stays up for about two more seconds while it plays before the world appears. Browsers that allow autoplay start it straight away and keep the old timing.

### Weather in the studio and the sky
- **Snow now settles on the Harbor Studio patio** (floor, table, umbrella, chairs, planters) and rain wets it, like the outdoor maps. Indoors stays clear.
- **Rain on the windows:** inside the studio you hear rain and little glass taps, louder and brighter near the windows, softer at the back.
- **Ceiling light switch:** the studio has a wall switch (right side, by the entrance wall). Stand close and press **F** (or the 💡 Lights button, or A on a pad) to open the panel: On/Off, a dimmer slider, and Bright / Warm / Cozy / Night presets. It dims the ceiling lamps, the cove glow and the real light they cast. The setting is saved per browser and is only your own view.
- **Clouds:** rounder cauliflower-topped cumulus, shading that follows the sun, flatter greyer undersides, smoother overcast, and the shapes slowly morph instead of just sliding.

### Footstep sounds

Every character (you and everyone else in the room) makes a step sound as each foot lands (a heel strike and a softer toe-down; the sounds were reworked to be less hissy and to carry no beeps), and a thud when landing from a jump. The sound follows what is underfoot:

| Where | Surface |
|---|---|
| Harbor Studio room | the floor style you picked (wood by default, or marble, tile, carpet, concrete, stone); stone around the pool, wood on the deck, metal in the lift; sofas and beds sound soft, tables and chests like wood |
| Builder's Plot | the material of the floor you built (wood, oak, parquet, boards, stone, brick, tile, marble, metal, concrete, carpet), grass on open ground |
| The city | asphalt on roads, concrete pavement, grass in the two lawns and on the islet, sand on the beach, wood on the piers, a splash in the shallows |
| Galleria | marble in the hall, grass in the garden, stone on the garden path |
| Mall, Key's Diner, Kitchen Clash | tile |

Outdoors, snow lying on the ground (see Weather) turns steps into a crunch, and wet ground adds a splash. Others' steps get quieter with distance and pan left or right; nothing plays beyond about 26 m, on a hoverboard, or while sitting. The sounds are synthesised in the browser (no sound files). Turn them off or change the volume in the Start menu under More; the choice is saved in this browser. Browsers keep audio silent until you click or press a key once.

## Controls
| Input | Action |
|---|---|
| `W A S D` / arrows | Move |
| `Shift` | Run (hold), or tap it repeatedly to sprint like GTA. On a controller hold LB and click R3 for auto-run |
| `Q` / `E` | Turn on the spot |
| `Space` | Jump (also onto beds, tables and mall benches) |
| `1` `2` | Cheer, sit |
| `Enter` | Chat (arrow keys keep walking while you type) |
| `Tab` | Bottom menu (XMB): ←/→ category, ↑/↓ items, `Enter` select, `Esc` or `Tab` leave |
| `M` | Start menu |
| `O` | O-Boy portable screen |
| `C` | First person view on/off (controller: R3 cycles near, far, first person) |
| `X` | Hoverboard on/off (`Shift+X` changes colour). Not in the studio. Controller: X / Square |
| `G` | Equipment |
| `I` | Inventory (bag, files, trading) |
| `F` | TV panel (retro games live here). In the Kitchen Clash: use / grab |
| `K` | Drop your plate (Kitchen Clash) |
| `P` | Pick up the game controls (when plugged in) |
| `V` | Toggle walk style |
| `B` | Decorate your studio |
| `T` | Target the next player, then yourself, then off (click a player to target them) |
| `U` | Weather panel (radar, forecast, season) |
| Click a player | Open their profile card (RetroAchievements stats, Look at) |
| Mouse drag | Orbit camera |

**Game controllers** (wired or Bluetooth, any browser-supported gamepad; Xbox names, PlayStation in brackets). The layout follows an MMO-style scheme:

| Control | In the world | In windows and menus |
|---|---|---|
| Left stick | Move | Move the highlight |
| Right stick | Move the camera (up looks up) | Scroll |
| L3 (click left stick) | Lock the camera on your target (or the nearest player); press again to release | |
| R3 (click right stick) | Change camera: near, far, first person | |
| LT / RT (L2 / R2) | Hold to bring up the left / right hotbar | |
| LB (L1) | **Hold LB and push the right stick up / down to zoom in / out. Hold LB and click the right stick (R3) while moving: auto-run on / off** (it also stops if you pull the stick back or press B) | Previous tab |
| RB (R1) | Change hotbar set (3 sets) | Next tab |
| D-pad | Left / right: cycle targets. Up / down: cycle you and your party members | Move the highlight |
| A (Cross) | While moving: sprint. Standing still: select target (nearest player), then open their profile; Kitchen Clash: use / grab | Confirm |
| B (Circle) | Cancel: clear target, release lock-on, stop auto-run; Kitchen Clash: drop plate | Back |
| X (Square) | While moving: sprint. Standing still: with a target, the Examine menu; otherwise the map (rooms) | |
| Y (Triangle) | Jump | |
| Back (Select) | Select the HUD: D-pad moves around the bottom bar, A opens, B leaves | |
| Start (Options) | Main menu (emotes, bubble colour, lobby) | Close |

**Hotbars.** Hold LT for the left bar or RT for the right bar, then press a D-pad direction or A / B / X / Y to use that slot (8 slots per bar, 16 per set). The crossbar sits at the bottom centre and only appears when a controller is connected. The three default sets are Social (cheer, sit, target yourself, clear target, emotes, O-Boy, hoverboard, board colour; chat, party, TV, strafe, equipment, inventory, map, weather), View (zoom, camera, lock on, hide bar, fullscreen; decorate, profile, bubble colour...) and Home (decorate, inventory, equipment, party, map, TV, weather, O-Boy; hoverboard, sit, cheer, emotes, profile, chat). Slots can be rebound from the browser console with `__pad.bind(set, 'L' or 'R', slot, 'actionName')` (set 0-2, slot 0-7 = D-pad up, right, down, left, then Y, B, A, X; `__pad.acts()` lists the action names); the choice is saved in this browser. **Sprint:** while the left stick is moving, tap A (Cross) or X (Square) repeatedly to sprint, like GTA: each tap gives a burst of sprint and when you stop tapping you ease back to a jog; standing still, A selects a target and X opens the map as before. Auto-run (LB + R3) and `Shift` also sprint.

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

### Classes, the Hero set and duels

Open **Character Setup** and pick **Fists** or **Sword** under *Class & weapon*. The weapon in your hand is your class: with the **Sword** you are a **Hero**, your animations switch to the Hero set (combat idle, run, Combos A/B/C, guard, evades, jump, hit reactions) and the Construct's combo system works in every room except your **Harbor Studio** (and the two minigame arenas, Laser Tag and Kitchen Clash, which keep their own rules). With **Fists** you use the normal VRoid animations. Other players see your sword and Hero animations too.

- **Draw / sheathe:** R (tap), L1 + L3 on a pad, or the 🗡 button on touch. While the sword is sheathed the normal keys work; while it is drawn the combat keys (J sword, 6-8 combos, 2-5 skills, L evade, Q / E steps, Tab lock-on, Z cycle target, hold R to guard, Space jump) are used instead. The gun and Bullet Time only exist in the Construct.
- **Levels:** every class has its own level from **1 to 99**. Level 1 to 2 takes 300 XP and the climb follows the shape of Final Fantasy XIV's table (it is not an exact copy; the numbers are one array, `CLS_XP`, near the top of the Hero code). Each level adds 3 HP and +1% damage. XP comes from duels (a win is about 18% of the level's cost, a loss 6%, scaled by the level difference) and from Construct kills (4%).
- **Duels:** open a player's profile card and press **Duel**. They get an Accept / Decline box. After accepting, both of you get a 5-4-3-2-1-BEGIN countdown, then it is a fight to the death with the weapon in hand: HP bars at the top, blocks, just-evades and knockdowns all work, nobody else can be hurt. The loser plays the death animation and gets back up where they fell. Leaving the room, unequipping or disconnecting forfeits the duel.
- Nothing else can be hit yet (treasure chests and breakable entrances are planned).

### Gunner class (Military Weapons pack) and the Starter Pack base movement

- **Gunner:** in *Class & weapon* pick **Gunner** (or tap one of the seven weapon tiles under it). You become a **Gunner** with its own level 1 to 99 (same XP table, separate progress from Hero), your animations switch to the Pistol set (two-handed aim idle, walk, run, jump, equip, fire recoil, dry fire, reload, four hit reactions, three deaths), and the chosen gun appears in your right hand. It works in every room where fighting is allowed (not the Harbor Studio, Laser Tag or Kitchen Clash). In the Construct you are always a Hero.
- **Weapons (models, textures and sounds from the Military Weapons pack):** Pistol (12 rounds, semi-auto), Assault Rifle (30, full auto), Shotgun (6, eight pellets, short range), Sniper Rifle (5, heavy damage, long range), Rocket Launcher (1 round, explodes in a wide blast), Grenade Launcher (4, lobbed grenades that explode on landing) and Knife (melee, three-swing chain). Each has its own ammo, reload time, fire and reload sounds, and muzzle flash. Ammo is kept per weapon and refills when you re-equip the class.
- **Controls (shooter style):** hold right mouse (pad **LT**) to aim, **C** (pad **L3**) crouch, **L** (pad **B**) dodge roll, hold **Q** (pad **LB**) for the weapon wheel and move the mouse (or right stick) to pick; pad **A** jumps, **X** reloads, hold **RB** and press a pad button for the weapon hotbar. Older keys still work: hold **J** (or **K**) to shoot, **R** to reload, **1-7** or **Q** to switch weapon, **Space** jump, **Tab** lock on, **Z** cycle target. Pad: **R2** fire, **□** reload, **D-pad left/right** switch weapon, **L1** lock on. Touch: the 🔫 button fires, ⟳ reloads, 🔁 switches weapon. Bullets are instant hits to the player under your aim (or your locked target); rockets and grenades are real projectiles with a blast radius, and other players see the shots, flashes, projectiles and explosions. Damage is the weapon's own plus 1% per level.
- **Duels** accept a Gunner against a Hero or another Gunner. The sword's block can stop bullets from the front.
- **Base movement:** *Character Setup → Base movement* now offers **Default** (the VRoid set) or **Starter Pack** (the Unreal mannequin idle, walk, jog, run, strafes and jump). It applies while you have no weapon class equipped, is saved on your device, and other players see it.

## The Construct and the Hero class

A white, Matrix-style training room (menu: **The Construct**, or type `/construct`). Walk to the phone booth and press **N** (D-pad down, or tap the prompt) to leave. Black-suited Agents walk up, wind up a red-fist attack and spar with you; they run on your own device, so it is solo training (other players in the room see you and your moves).

**Hero class animation pack:** your Unreal Engine "Frank RPG" clips (idle, combat idle, sword walk and run, strafes, step clips, dashes, evades, jump, draw, sheathe) are baked into the file and retargeted to VRM bones. They show in the Animations panel under "Hero class" (sword drawn / sheathed sets), so you can replace any slot. The second batch (clips 21-40) added the real sword chain (Attack01-05), the parry counter, Combo A/B/C, Skills 1-4 and the hit reactions. Clip 21 (4way Front) is not used yet. The final batch (clips 41-58) added **Guard and Block** (hold R / R2 / the shield button; tapping R or R2 still draws or sheathes), the **Stun**, **Get Up** and **Die 1/2** clips, and the individual **Combo A1-A5, B1-B4 and C1-C3** clips, which now play as real chains (Combo A/B/C = keys 6-8, or L1+○ for A).

You now have **HP** (bar above Bullet Time, regenerates after a few seconds without damage). A guarded hit costs nothing, gives Style and a little Bullet Time gauge, and pushes you back. A hard hit knocks you down and you get up with the Get Up clip. At 0 HP you play a Die clip and respawn at the booth end with brief invulnerability.

| Action | Pad | Keyboard |
|---|---|---|
| Sword (tap to chain 3 hits; push forward toward an Agent + sword = Stinger dash) | Square / X | J |
| Gun (hold to keep firing, auto-aims) | Triangle / Y | K |
| Jump (press again in the air for a double jump) | Cross / A | Space |
| Evade (stick direction; i-frames; "Just Evade" in an attack = bonus and slow-mo) | Circle / B | L |
| Lock on (hold on pad) / change target | L1 / R3 | Tab / Z |
| Bullet Time (charge it by landing hits) | R1 | F |
| Draw / sheathe sword | R2 | R |
| Side-step | L2 | Q / E |
| Taunt | D-pad up | 1 |
| Skills 1-4 (cost a fifth of the Bullet Time gauge) | D-pad left / right, L1+Square, L1+Triangle | 2 / 3 / 4 / 5 |
| Combos A / B / C (free, long multi-hit strings) | L1+Circle (A) | 6 / 7 / 8 |
| Counter attack: press the sword button right after a Just Evade | Square | J |

The sword chain has five hits. Getting hit plays a random hit reaction (knockback, knock-down, or an air hit if you are airborne). Skills and combos hit in pulses, because I don't know the exact strike frames in those clips.

A style meter (D to SSS) rises with varied moves and falls when you stop or get hit. On-screen buttons are provided for touch.

### Spell and impact effects (FX)

The textures from the **FX Variety Pack** (flares, smoke, rings, magic circle, dust, stones) are packed into one small atlas inside Oasis.html, and a particle system built on them plays the effects. Elements: `fire`, `thunder`, `water`, `dark`, `heal`, `plain`.

- **In play:** every sword, pistol and Construct hit gets an impact burst (bigger on launchers and finishers); blocks flash blue; the Stinger sends a shock ring; a just-evade sends a ring; a level-up plays a heal aura and a magic circle. The four Hero **skills** (2-5 / D-pad) now summon a storm around you: skill 1 Fire Storm, 2 Thunder Storm, 3 Aqua Storm, 4 Dark Storm. Other players see the storms. Gun shots get a muzzle flash stretched along the barrel, bullet impacts throw dust and sparks (red on a body), and rocket and grenade blasts use the explosion effect.
- **Try them:** type `/fx` in chat for the list, then for example `/fx storm fire`, `/fx ball thunder`, `/fx explosion`, `/fx magicCircle dark`, `/fx laser water`.
- **For the magic set:** call `fxPlay(name, {x,y,z}, {kind, to, follow, life, scale})` from any attack. Names: `hit`, `muzzle`, `bullet`, `explosion`, `shockwave`, `shotShockwave`, `lightning`, `magicCircle`, `heal`, `storm`, `ball` (a projectile from the position to `to`, with `onHit`), `laser`, `shootingStar`. New recipes are small functions in the `FXR` table.

- **Targeting and Examine:** targeting a player now only puts a small ▢ marker over their head; their info card stays hidden. Press **Square** (or **A**) on the controller, or tap / click the marker, to open a small menu with **Examine** (shows the card), **Profile** and **Close**. The card goes away when you change or clear the target.

- **Controller fixes in the game modes:** in Kitchen Clash the D-pad no longer cycles player targets (or targets you); it now walks like the stick, X no longer opens the map mid-game, and any leftover target is cleared on entry. Also fixed a crash ("turnDeg of undefined") that could fire when turning on the spot in the Hero / Fighter / Gunner / Laser Tag animation sets. Checked with a simulated controller in an emulated browser: pressed every pad button in Laser Tag, the Construct and Kitchen Clash and moved between them and back to the studio with no errors, but not with a real controller.

### Oasis High School (new map)
A composite school drawing on the floor-plan booklet (you picked "a mix of several"): a three-storey main block with a central glass-roofed media-court atrium and grand stair, two stair towers, a roof garden, a gym, a dojo with a rooftop pool, a sports field with a running track, tennis courts, a school garden, a koi pond, a bike shed and a cherry-tree plaza with a gate and a flag pole.
- Inside: 16 classrooms (desks, chairs, lockers, boards, clocks, posters), physics/chemistry/biology labs, prep room, home-economics, art, two music rooms, library, computer and language rooms, nurse, counseling, staff room, principal, reception, cafeteria with vending machines, student council, seminar rooms, study lounge, lecture hall with tiered seating, tea-ceremony room, club rooms, broadcasting and AV rooms, an entrance hall with shoe lockers and a trophy case.
- Open it from the lobby ("Oasis High School", Channel 1) or make a private room (code starts with S). Weather, seasons, day/night, footsteps and the real-time wall clocks work as on the other maps.
- Cutaway view: when you are inside the main block the floors above you disappear so the camera never sits under a ceiling; gym and dojo roofs lift away the same way.
- Verified (emulated desktop browser): the map builds without errors; I walked a scripted path from the gate, through the hall and court, up the atrium stairs to floor 3, through a tower to the roof, to the gym stage and bleachers, and up the outside stair to the pool (no stuck points); screenshots of plaza, hall, court, classroom, library, cafeteria, lecture hall, gym and pool looked right.
- Not verified: performance on the Nothing Phone 3 (the map is large, so it may be heavier than the other maps), the touch camera inside narrow rooms, other players seen through the cutaway floors, night lighting inside rooms, and rain/snow on the roofs.

### Zen Bowl (new map, multiplayer bowling)
An original bowling alley, built from scratch in the spirit of the free gecko-themed Zen Bowling game you sent. I did **not** use that game's files: it is a compiled Windows Unity build with no licence, so I did not extract or copy its models, sounds or art. If its author says it is fine to reuse the assets, tell me and I can look at that.
- **The alley:** a 28 x 48 m hall with four real-size lanes (18.3 m, 10 pins, gutters, pin deck, masking unit, ball returns), overhead score monitors per lane, a neon sign, shoji walls, shoe counter, snack bar, arcade cabinets, lounge tables, plants, lanterns and a big gecko mascot. A small gecko sits above every lane and hops when you bowl a strike.
- **Play:** walk to a podium in front of a lane and press **F** (or tap *Join lane*). Up to 4 players per lane, each lane is its own game. **+ CPU** adds a computer bowler (the person who is first on the lane runs the CPU turns for everyone). Turns follow real 10-frame bowling: strikes, spares, the 10th-frame bonus balls, gutter balls, a running scoreboard on the overhead screen and in the card on your screen, and a "game over" with a winner and a **New game** button. Joining a game in progress is allowed; the newcomer catches up frame by frame.
- **Throwing:** on your turn your avatar steps onto the foul line and the camera goes behind you. **A / D** move along the line, **← / →** aim, **Q / E** put spin on the ball (it hooks), a dotted guide shows the path, then **hold Space and release** to throw (the power bar swings up and down; release at the power you want). Touch: three sliders and a hold-to-throw button. Controller: left stick position, right stick aim, LB / RB spin, hold **A** to throw.
- **Camera:** behind you while aiming, follows the ball down the lane, then a close-up of the pins. The **Lane cam** button turns this off if you would rather move the camera yourself.
- **Multiplayer:** every player gets the same throw and sees the same pins fall (the throw is a deterministic simulation; the thrower also sends the pins left standing so a tiny difference between devices cannot change the score). Players who leave are removed after a few seconds and the turn passes on. Late joiners get the lane's state from the others.
- Open it from the Games menu (**Zen Bowl**), the lobby ("Zen Bowl", Channel 1), type `/bowl`, or make a private room (code starts with **B**).
- Verified (emulated desktop browser): the hall builds with no errors; joining a lane, adding a CPU, aiming, a full throw with the camera moves, pin fall, STRIKE banner, scoreboards, turn passing; the scoring function against known games (perfect game 300, all spares of 5 = 150, all gutters 0, a mixed game); the physics gives sensible results (head-on throws strike sometimes, hooks work, gutters happen); the arm swing from the side; two linked browser windows plus a CPU bowler agreeing on the players, the turn order, the pins left and every roll over nine throws (the check also exposed a weakness where a stuttering connection could drop a player from the lane; players now stay until they have been silent for a while and are re-added if dropped by mistake).
- Not verified: the close-up camera on the pin deck (I saw the strike banner and scoreboard but did not capture a clean pin-deck screenshot), touch layout and the sliders on the Nothing Phone 3, controller input, how the ball and pins sound on real speakers, how heavy the hall is on the phone (lots of lights), the throwing pose on avatars that have an uploaded animation pack, and play with three or more real people.

### Warriors of Light (new map, co-op turn-based fights)
- **How it works:** open Games → Warriors of Light (or `/battle`). Walk to the console and press **F**, or use the buttons: Join the party, + CPU ally (up to 4 in the party), Start battle. Each fighter has a gauge that fills; when yours is full the battle pauses for you and a menu opens: **Attack, Magic** (Fire, Blizzard, Thunder on all enemies, Cure, Life), **Item** (Potion, Ether, Phoenix Down, shared stock), **Defend**, and **Limit** (Radiant Cross, when the orange gauge is full; it fills as you take hits). Keys: arrows or W/A/S/D to move, Enter / Space / F to choose, Esc / X to go back. Controller: d-pad, A, B. Touch: tap the rows. Enemies are weak to certain elements (shown as *Weak!*).
- **Waves:** endless. Enemies get tougher every wave, every 5th wave is the Mako Golem boss. Between waves you get a little HP and sometimes items. Your best wave is saved in this browser.
- **Battle camera:** a sweeping intro, a side-on view while choosing, a cut to the target for each hit, a wide shot for spells, an orbit during Limit, a pull-back on game over. The *Battle cam* button turns it off if you want to look around yourself.
- **Attacks use your class animation** (the sword slashes, or the Fighter set's strikes for the Fighter class). Spells, items and guarding use simple arm poses.
- **Co-op:** the player who presses Start is the host and decides the numbers; everyone else's menu sends commands to the host and all windows play the same events. Friends can join mid-wave. If the host leaves, the others are returned to the lobby after about 16 seconds.
- **AFK:** after 90 seconds without input, or when the tab is hidden, other players see a glass mannequin in your place. This works on every map.
- **Cast (your own VRM models):** the **Cast** button opens a panel. *CPU ally* picks a VRM from your bag (Inventory) for the next CPU ally you add; it stands in the party with the character idle and the class attack clip. *New enemy* turns a bag VRM into an enemy with a name, HP (50-3000), a weakness (Fire, Blizzard, Thunder or none), a size, and an optional boss flag; a boss replaces the Golem on boss waves, other custom enemies are mixed into normal waves. The list is saved in this browser. Models are sent to the other players in the room automatically (the same way avatars are), up to 40 MB each, so large models can take a while on phones.
- **Music (copyright note):** the built-in battle, boss and victory themes are original and made in code. Each slot also has **File** (pick an audio file from your device; it is stored only in your browser and never uploaded) and **Link** (paste a YouTube video or playlist link; it streams from YouTube on your device, and some videos block embedding). Nothing from Square Enix or anyone else is included in or hosted by this project, so it cannot be taken down from your repository.
#### Warriors of Light: the big update
- **Gil and items now count.** Every cleared wave pays Gil to everyone in the party (it lands in the top-bar Gil, once per wave) and the wave's item drops go into **your own bag**. The old problem was that the win screen only displayed Gil and the drops lived only for that one run.
- **One bag for the whole Oasis.** Click your **Gil** in the top bar to open the bag and the moogle supply shop (Potion 40, Hi-Potion 150, Ether 90, Elixir 600, Phoenix Down 200 Gil). The bag is kept on this device. Warriors of Light starts a run with your bag (at least 3 Potions, 2 Ethers, 1 Phoenix Down). In a party the shared supplies are the **host's**; using an item takes it from the host's bag, while everyone keeps their own drops. Items are sold between fights only.
- **Loot from every mode.** A win in Triple Triad / Connect 4 and the other table games, a duel, a Diner shift with at least 1 star, a Kitchen Clash or Laser Tag team win each drop some Gil and sometimes an item into that same bag. Losses give nothing.
- **Levels come from victories.** The top-bar level now rises mainly from wins: table game 120 XP, duel 100, Kitchen Clash / Laser Tag win 150, Diner shift 40-130 by stars, each Warriors of Light wave 40+ (grows with the wave); small consolation XP for a loss. Time in the game gives just 1 XP every 2 minutes. Walking, chatting, emotes and building no longer give XP. XP you already have is kept. Zen Bowl has no victory reward yet.
- **Classes in battle.** Sword users run in and slash, **Fighter** uses the fists set, and a **Gunner** (pistol) now stays at their spot, aims, fires with a muzzle flash and a tracer (six shots for the limit break). Each class holds its own thing in battle: sword, a small pistol, or bare fists. Other players' classes are read from what they broadcast.
- **Your-turn camera.** When it is your turn the camera swoops in behind your fighter and looks across the field (turn it off with Battle cam).
- **Music.** Paste a YouTube link while you are in the party and **everyone in the party hears it** (shown as "Party link · name"; late joiners get it too). Each person can turn this off with the "Hear the party's YouTube links" box. A local file you picked always wins. Every link you paste is saved to a **library** (Music → Library) with its title, and you can assign any saved track to Battle, Boss or Win in one tap. The menu cursor uses your Triple Triad **cursor sound** when you set one there.
- **New:** Hi-Potion and Elixir, the spells Curaga (wave level 3) and Flare (level 5), the foes Bomb (fire), Dusk Wraith (drains HP) and the boss **Ember Drake** (fire breath, every 10th wave; the Golem is waves 5, 15, ...). A run summary on game over (waves, kills, Gil, MVP). A moogle shopkeeper, and the moogle also sits on the Triple Triad board corners.
- **Verified (emulated browser, two players over the real relay):** the shared YouTube link arrives and is restored from the host's snapshots; both players get the Gil and the same items once per wave, with no double pay; the bag saves; all new foe moves run with no errors; buying works; levels from loot and wave wins; library saving; a pistol class stays at its slot during Attack; the shop, the bag panel, the moogles and the Drake on screen.
- **Not verified:** YouTube actually playing (this machine cannot reach YouTube, and the title lookup needs the internet), the pistol and fists poses and the muzzle flash up close, other players' class detection on real devices, the your-turn camera on a phone, the cursor sound in battle (needs a file you upload in Triple Triad), loot and Gil from Diner / Kitchen Clash / Laser Tag wins (the hooks are in, not played through).
- **Zen Bowl versus (new):** on your lane press **Invite room**; everyone else in the bowling alley sees a green "Join NAME's lane" button for 30 seconds and one tap puts them on it (up to 4 per lane, CPUs fill in). When the game ends the final ranking is shown and **Rematch** starts another. The winner gets victory XP and loot (full reward needs another human on the lane, a win against only CPUs gives a smaller one), everyone else a little XP. Verified (two emulated browsers over the real relay): the invite arrives, the join button appears and works, both players end up on the lane, and the winner and loser get their rewards. Not verified: a whole 10-frame game played through between two people.
- **Fighter class in Warriors of Light:** the Fighter now uses the fists guard stance as its idle in battle (checked on screen).
- **Blitzball inside the Oasis (new):** Games → **Blitzball** opens the whole game (exhibition, Sphere Cup, Season, multiplayer with a friend) full screen on top of the Oasis, with a "Back to the Oasis" button in the corner. When you host a multiplayer game, **everyone in your Oasis room gets a "NAME invites you to Blitzball - Join" bar**; one tap opens Blitzball and joins that room. A **win** gives victory XP and loot into the shared bag (110 XP and a better loot roll for a multiplayer win, 70 for a solo win), a draw or loss a little XP. The standalone Blitzball.html still works on its own (for GitHub etc.). Verified (emulated browser): it opens from the menu and closes, the title screen shows, an invite bar appears and its Join button opens Blitzball straight into the join screen for that code, a win pays XP, Gil and loot. Not verified: a real two-device Blitzball match started from an invite (the test machine cannot reach the public relays Blitzball uses for matchmaking; the same game was verified earlier over local relays).
- **Not done yet - your uploaded characters as swimmers:** Blitzball still uses its own swimmer models. Using each player's uploaded VRM (yours, Reina's, and NPCs for the empty slots) means loading VRM models inside Blitzball and sending them between players; that is the next step if you want it.
- **Studio weather:** in the Harbor Studio, a weather or season choice (Weather window or `/weather`, `/season`) is shared with everyone in the room and resent every 12 seconds so late joiners get it. Leaving the studio restores your own saved choice.
- **Verified (emulated browser), Cast:** a bag VRM works as a CPU ally and as a custom enemy in a single-player run, with no errors. **Not verified:** sending the models to a second real player, enemy and ally attack clips on screen, the Cast form on a phone, large models on phones.
- **Verified (emulated browser):** single-player runs with CPU allies through waves 1-2 (menu, targeting, melee run-in, spells, victory, next wave, no errors); two windows in one room stayed in sync through a full wave (party, host, enemy HP identical, commands from the second window worked); the AFK mannequin appears for the other window; studio weather sync both ways; the mannequin look.
- **Not verified:** the music on real speakers, the YouTube link (the test machine cannot reach YouTube), the class attack clip on screen at the moment of impact, the sword attachment (this rig has no hand bone, so it sits on the forearm and may need tuning), touch and controller play, the boss and Limit break visuals, phone frame rate, and 3 or more real players.

- **Triple Triad card pictures from XIVAPI:** when you open Games, the game asks XIVAPI (v2.xivapi.com) for the card list and shows each card's real picture instead of the emoji. The pictures are loaded by your browser from XIVAPI (not stored in the file), so it needs internet, and any card whose picture fails keeps its emoji. **The Games lobby now prints the result on its top bar** (for example "Card pictures: working (50 of 52 cards)", "could not reach XIVAPI (...)", or "names matched but no picture address worked"), and it tries four forms of the picture address and keeps the first that works. Verified with a stand-in server: working, XIVAPI unreachable, and a different address form. **Not verified:** the real XIVAPI server (the test machine cannot reach it), so I do not know yet that the real pictures show. The 5-star and later cards are still not added.

- **Automatic resolution switched off:** the game no longer lowers or raises its sharpness by itself; it stays at your screen's full density (up to 2x), and at 1x while a retro game is on the TV. Verified in an emulated browser: the drawing size stays fixed at 2x. Not verified: the frame rate on your phone. If it is slower than before, tell me and I will bring a lower fixed size back.

### Harbor Studio: forest edge (replaces the bay and city)
- The studio now sits on a hillside at the edge of a forest, like a deck over a valley: pines and leafy trees (the leaves are drawn as detailed leaf cards with veins, in green, gold and orange, and sway gently in the wind), shrubs and tall grass, rocks, a valley with woods and layered mountains fading into haze. The old city, sea, islands, sailboats, Ferris wheel and blimp are gone, and Destiny City is no longer built just for the view.
- Cost: the whole scenery is about 15 draw calls (the old one was roughly 1,000 draw calls in the studio, of which about 50 were the city) and about 120,000 triangles, with no shadows from the trees. It is built the first time you enter the studio. The room's own furniture is still the biggest cost, so this should help but will not by itself fix a slow frame rate.
- Verified (emulated desktop browser): the forest builds without errors, views from the deck forwards, left and right, the draw call and triangle counts. Not verified: how it looks and runs on a phone, night and weather appearance (the trees are lit by the studio's sun and moon, but I did not check a night render), how it looks from other spots on the deck, and the exact look of the leaves on a real screen.
- **Seasons and weather on the forest:** the trees and ground follow the studio's season and snow: spring blossom, summer green, autumn gold and orange, winter bare branches with snow on the ground, pines, rocks and ridges. Verified by screenshots of all four seasons plus snow in the emulated browser (the changes blend slowly, so on a slow machine they take a few seconds). Not verified: on a phone.

- **Triple Triad music:** during a Triple Triad match a speaker button in the Games window mutes or unmutes the music (saved). Which track plays, in order: (1) a file you load with **🎵 Music file** in the Games lobby (kept in this browser on that device, so on your phone you pick it once; **Use default music** removes it), (2) a file named `triple-triad-theme.mp3` placed next to Oasis.html, if you choose to host one (if you put it on a public site, it is public), (3) otherwise the FFXIV Triple Triad theme from your YouTube link through YouTube's own player (needs internet). The soundtrack is not bundled in the game file. Verified with your mp3: it loads, plays and loops, mutes, stops when you close, and is still there after a reload. Not verified: the sound itself on a real speaker, the YouTube fallback (the test machine cannot reach YouTube), the next-to-the-game file option on a real host, and phone autoplay rules.

- **Triple Triad start sound:** a short sound plays when a Triple Triad match begins (along with the music, and silenced by the same speaker button). Load it with **🔔 Start sound** in the Games lobby (kept in this browser on that device; **Remove start sound** clears it), or place a file named `triple-triad-start.mp3` next to Oasis.html. It is not bundled in the game file, so with nothing loaded there is no start sound. Verified with your Moogle sound: it loads and plays once at the start of a match, together with the music. Not verified: on real speakers or a phone, and the next-to-the-game file on a real host.

- **Triple Triad capture sound:** a sound plays when one of your moves takes (flips) at least one of your rival's cards. It plays once per move, not once per card, and not when the computer or your rival takes a card. Load it with **🃏 Capture sound** in the Games lobby (kept in this browser on that device; **Remove capture sound** clears it), or place a file named `triple-triad-take.mp3` next to Oasis.html. It is not bundled in the game file. Verified with your Item Discovered sound: it plays on moves that flip cards and stays silent on moves that flip none. Not verified: on real speakers or a phone, in a match against a real player, and the next-to-the-game file on a real host. If you meant a different moment (for example when you win a card at the end of a match), tell me.

- **Games menu cursor sound:** a short blip plays when the cursor moves onto a button, a card in your hand or a board space in the Games window (mouse hover, keyboard or controller focus, or a touch). Load it with **🖱️ Cursor sound** in the Games lobby (kept in this browser on that device; **Remove cursor sound** clears it), or place `triple-triad-cursor.mp3` next to Oasis.html. It only covers the Games window, not the main menus. The three sound effects (start, capture, cursor) now skip the silence at the start and end of the file: your three mp3s each have about 1.4 seconds of silence before the sound, which would otherwise delay every sound by that much. Verified with your cursor mp3 (it starts at 1.39 s and plays for 0.23 s, one blip per new hover) and your Moogle sound (starts at 1.44 s, plays for 0.6 s, with the music). Not verified: on real speakers, with a controller, or on a phone.
- **Sound effects trimmed at load:** your start, capture and cursor clips had about 1.4 s of silence at the front. They are now cut at load (the silence is detected and removed), stored trimmed in the browser, and played as ordinary audio clips. Verified in the emulated browser: lead silence after trimming is about 0.01 s. Not verified: how it sounds on a phone speaker.
- **Your three sound files are now built in, already trimmed:** the Moogle sound (match start), Item Discovered (taking a card) and the PS1 Menu Cursor sound were cut properly (about 1.4 s of silence removed from the front and the dead tail from the end, short fade-out, volume evened out) and are inside Oasis.html, so nothing needs to be loaded or placed next to the game. Clip lengths: start 0.58 s, take 1.5 s, cursor 0.2 s. A file you load yourself from the Games lobby, or a triple-triad-start/take/cursor.mp3 next to the game, still takes priority. The trimmed copies are also in the trimmed-sounds folder as WAV files. Verified (emulated browser): all three load and play from a fresh profile. Not verified: how they sound on the phone.
- **Win / loss / draw record:** the Games lobby now has a "Your record" table for the game you have selected (Triple Triad or Connect 4): wins, losses, draws and win % against each opponent (Computer Easy, Normal or Hard, and each player by name), with an All games total and a Reset record button (tap twice). It counts a game when it finishes; leaving a game early is not counted. The record is saved in this browser, so it only shows your own results on this device. Other players' records are not shown because there is no server to hold them. Verified (emulated): a finished AI game was counted and the table displays correctly. Not verified: on the phone.
- **Card names:** each Triple Triad card shows its name along the bottom (stars top-left). Verified in screenshots.
- **Card sounds:** a snap when you place a card and a flip sound for each flipped card (synthesized, so no files needed). Verified: the sounds are triggered; not heard on real speakers.
- **Victory and defeat:** a fanfare with confetti and a gold flash for a win, a low sting with a red shade and a shaking banner for a loss, a short jingle for a draw. SAME, PLUS and COMBO each get their own stinger, plus a shuffle at the start and a ping when it is your turn. Verified: a full game against the AI ends with the right banner and the sounds fire. Not verified: how loud or good it sounds, or the confetti look on a phone.


- **All 475 Triple Triad cards:** the card list is now the real game's set (names, stars and the four numbers taken from the game's data tables), up from 52. Pictures use each card's own row number on XIVAPI, so they no longer depend on name matching. The deck screen has star filters (All, 1★ to 5★) and a search box, and loads pictures only as you scroll. Deck rules are unchanged (5 cards, at most 14 stars, at most two 4★+ and one 5★). Your saved deck was reset once because the card numbers changed; a random one is made for you. Card types (Primal, Scion and so on) are not used. Verified (emulated): 475 cards listed, filters and search work, the AI game still runs. Not verified: the pictures for every card on real XIVAPI (the first 52 had pictures working for you; the rest use the same address pattern), and phone speed with the long deck list.
- **Triple Triad music volume:** a slider in the Games window header (next to the speaker button), 0 to 200%. Up to 100% is normal volume (twice the old default of about 50%); above 100% boosts it. The setting is saved. Moving it up un-mutes the music. Verified (emulated): the setting saves, plays at 100% element volume plus 1.5x gain at 150% for a loaded music file. Not verified: how loud it is on your phone, and the boost above 100% does not apply to the YouTube fallback (that one tops out at 100%).

### Gil and the treasure chest
- **Gil:** the in-game money. It shows in the top bar (Gil pill next to your level) and is saved in this browser. There is no server, so Gil does not follow you to another device or browser.
- **Gift for RoyalReina:** when the display name is RoyalReina (capitalisation and spaces ignored), a Final Fantasy X style treasure chest sits in the middle of the Harbor Studio. Walk up and press F (or tap the "Open the chest" button): the lid opens, a light beam and sparkles rise, the Gil counter rolls up to 1,000,000 and "Received 1,000,000 Gil!" appears. The chest then shrinks away and is gone for good. It appears once only: the opened flag is saved, so it does not come back after a reload or re-entering the studio.
- **Reusable chest:** `oasisChest.spawn({ id, gil, x, z, ry, scale, only })` puts another chest in the studio (the id makes it one-time; `only` limits it to a name). `oasisGil.add(n)` and `oasisGil.get()` change and read the balance.
- Verified (emulated browser): the chest appears for RoyalReina and not for another name, F opens it, Gil goes 0 to 1,000,000, the chest vanishes, and nothing returns after a reload. Not verified: how it feels on the phone, and the sound.
- Limits: the chest and Gil live in each person's own browser, so nobody else in the studio sees the chest, and clearing site data or using another browser would show it again for RoyalReina. Nothing earns or spends Gil yet.

### Triple Triad: card fights, cursor, deck screen (new)
- **FF9-style fights.** When you place a card, each neighbouring enemy card is faced in turn: the two touching numbers light up, a VS badge rolls both numbers and compares them, and a loser changes colour with a flash. Same / Plus / Combo chains are shown the same way. The computer waits for the animation before it plays.
- **A clear cursor.** Whatever is highlighted (keys, D-pad, stick, tap) now has a bright pulsing gold frame with a marker. Cards in the deck view show a blue "looking at" frame.
- **Deck screen.** The deck you are building is shown at the top; clicking a card shows it big on the right (name, stars, the four numbers) with an Add / Take out button, and clicking it again does the same (like Master Duel). Hovering previews it on desktop. The grid keeps its scroll position. A **Saved decks** tab keeps up to 8 decks (Use, Edit, rename, delete); "In use" marks the one played in games. The Games lobby shows your current deck.
- Card art is larger. Verified (emulated): the deck screen, saving a slot, the fight badges and flips during a full game against the computer. Not verified: the cursor on a real gamepad, the larger art with the real XIVAPI pictures.

### AFK badge
Players who are away now keep their normal character; the others see a small "AFK" badge above the head. It appears only after **20 minutes** with no input.

### Frame rate and the TV
- **Emulator frame rate:** the Settings options for this were removed; the original emulator mode is back unchanged.
- **Settings:** Info → Settings shows only the frame counter now. Verified (emulated browser): the window opens, the counter shows, the choice is saved, resolution stays Auto with no cap.
- **Studio scenery:** replaced by the forest edge below (the old baked scenery no longer exists).
- **Frame-rate governor:** if the game averages under 50 fps it lowers the render resolution one notch at a time (never below 80 %) and raises it again only after a long smooth stretch. While you host or play an emulator (it runs inside this same page and shares its processor time) the 3D world is drawn at half rate with slowly updating shadows and at most 1x resolution, so the emulator gets the time. The TV picture is redrawn on the same frames so it stays lined up.
- Verified (emulated browser): the scenery looks identical before and after, no errors, the governor steps the resolution down when frames are slow. Not verified: the actual fps on the Nothing Phone 3 or with an emulator running (I cannot run a game here); tell me the numbers you see and I will tune further.
- **TV and web pages:** the TV already shows any https page (paste the link in the TV panel), not only YouTube. Pop-ups and sign-in windows from the page are now allowed. Whether a site appears depends on the site: many video sites (Tubi may be one) forbid being shown inside another page. I could not test Tubi from here. If it stays blank, use "Open in a new tab".

### Laser Tag upgrade (Gunner animations and moves)

- **Gunner animations and gun rig.** The Pulse Blaster and Pulse Pistol are now held the way the Gunner class holds a rifle / pistol: the Gunner's idle, walk, run, jump and crouch animations, and the same two-handed IK grip (both hands solved onto the weapon, fingers wrapped round it). Fire recoil, reload and equip use the Gunner clips, enemies flinch with the Gunner hit reactions and drop with its three death animations. The guns carry your team colour (tinted body plus a glowing strip), and the muzzle flash and the bolt now come out of the real barrel. The Longbow and Photon Blade keep their own animations.
- **Your aim zoom is untouched.** The over-the-shoulder camera and its zoom (right mouse / LT / AIM) are exactly as before; the new code only reads the aim direction to tilt the gun.
- **Dodge roll:** **V** (or L), pad **B**, or the **ROLL** touch button. About 3.4 m in the direction you are moving (or facing), you cannot be hit while rolling, 1.4 s cooldown, no firing during it. Other players see the roll.
- **Crouch:** **C**, pad **L3**, or the **DUCK** touch button. Slower, and a tighter hip-fire spread. Other players see it.
- **Other players now show more:** their gun tilts up and down to where they aim, and they play your reload and weapon swap.
- **Hit direction:** a red arc at the edge of the screen points at whoever just hit you.
- Checked in an emulated desktop browser only: solo match with the drones (rifle, pistol, bow and blade swap, fire, reload, crouch, roll, hit flinch, knockout, respawn), a controller simulated by script (B rolls, L3 crouches), and two tabs (the other player sees your rifle, fire clip, reload, roll, crouch and aim tilt, and hits, knockouts and respawn still work). Not checked: a phone (the two new touch buttons), a real controller, how the roll and recoil feel at full frame rate, how it sounds, the red hit-direction arc (written but never seen on screen), or whether the glowing strip sits well on both guns at every angle.

### Fighter class and new swords

- **Fighter** (Character Setup → Class & weapon → 🥋 Fighter): a bare-handed martial-arts class built on the Hero combat engine, so every control is the same (J combos, skills, evade, steps, guard, lock-on, bullet time, duels). It uses the "Frank RPG Fighter" Unreal clips, baked and retargeted to VRM bones: boxing stance idle, 4-way walk, 8-way run, jump, five basic attacks, three combo strings, running attack, four skills, evades, steps, hit reactions, knockdown and get-up, guard, block and two deaths. Fighter has its own level and XP, separate from Hero and Gunner, and other players see your Fighter animations. No weapon is shown and there is no draw / sheathe.
- **Sword styles** (same panel): the Hero can swap the stock blade for the ten Genshin-inspired models you supplied (Cool Steel, Boreas, Lion's Roar, Freedom-Sworn, Dull Blade, Mistsplitter, Prototype Rancour, Narukami, Katana, Bakufu). Your choice is remembered and other players see it.


### Warriors of Light: backdrops, weather, camera, allies (latest)

- **13 biome backdrops**, built in code in the style of FF8/FF9 battle scenery: Mako Reactor (the original neon arena), Whispering Glade, Frostwood Pass, Harbor Town Plaza, Windswept Plains, Royal Garden, Grand Hall (interior, the sky shows through arched windows), Overgrown Jungle, Scorched Dunes, Ashen Crater, Sunset Shore, Crystal Cavern, Skyward Cliffs. Each has its own arena floor, scenery, sky and lighting.
- **The biome changes every 10 waves**; the order is shuffled per run. **Weather changes every wave** and is picked from the weather that suits the biome: clear, sunset, starry night, rain, thunderstorm, fog, snow, night variants of rain/storm/fog/snow, drifting petals, rising embers, sandstorm, glowing spores, ashfall. Boss waves lean towards the dramatic ones (storms, night, sandstorm, ashfall, embers). A banner shows the place and weather when it changes.
- Weather is live: soft particle rain, snow, petals, embers, sand, spores and ash; fog density, sky colour, lighting and clouds ease between weather; thunderstorms have lightning bolts with a screen flash, thunder rumble and a small camera shake; the floor turns glossy in rain and white in snow; lamps and windows glow at dusk and night.
- Everyone in the party sees the same place and sky: it is worked out from the run id and the wave number, so nothing extra is sent over the network.
- **Level detail pass**: every biome has extra set pieces (mushrooms and a stream in the glade, a cabin and frozen lake in the pines, market stalls and flapping flags in the plaza, a windmill on the plains, statues and rose arches in the garden, braziers and a throne dais in the hall, a waterfall in the jungle, an oasis and obelisk in the dunes, lava falls, a lighthouse with a sweeping beam and a boat at the shore, glowing mushrooms in the cavern, an airship over the cliffs, a reactor tower at the Mako arena). All arenas have a stone curb round the edge, rain leaves dark puddles with ripples, and birds (gulls at the shore) fly in daytime skies.
- **Cast and skill camera**: when someone casts a spell or uses a limit break the camera cuts to a close portrait of the caster, pushes in on their face while panning round, then pulls back to the target on impact.
- **Particle effects** in battle (bursts, rings, bolts, ice, gun tracers) are now soft glowing sprites from the FX pack instead of solid low-poly shapes.
- **Naming CPU allies**: a name prompt appears when you tap "+ CPU ally", and tapping an ally in the party list renames them (host only in a shared fight). Leaving it blank gives the default name. (Before, a blank name could be saved as "Player".)
- **Music shuffle**: each slot shuffles only the songs tagged for it (battle with battle, boss with boss, victory with victory). If a slot has tagged songs they win over a single uploaded file.

### Movement and Zen Bowl (latest)

- **Double-tap to sprint**: tap W/A/S/D or an arrow key twice quickly and hold to sprint; on a controller, flick the stick, let it spring back and flick again.
- **Dodge roll** (Laser Tag and the Gunner): faster start, longer reach, dust puffs, the animation now matches the roll length, a short window of being untouchable at the end, and a "DODGED!" pop-up (and a shorter wait before your next roll) when a roll saves you from a hit.
- **Zen Bowl arms**: both hands now cradle the ball while you line up, the throwing arm swings straight like a pendulum, and the other arm opens out for balance.

**Verified here (desktop browser emulation):** all 13 biomes render, rain/snow/fog/storm/petals/embers/sand/spores look right in screenshots, the plan changes biome on wave 11, 21 and so on, a live fight shows the backdrop and banner, ally naming and blank-name fallback, the cast portrait camera positions (numbers checked), music shuffle per slot.
**Not verified (needs your phone/real play):** double-tap sprint and the new dodge roll feel, the bowling arm pose in a full game (only a still frame was checked), thunder audio, performance of the heavier biomes on the Nothing Phone, the cast camera as it looks in motion, FX pack look for the last two converted effects (ice, gun tracer).

## Known limits
- Games (Triple Triad, Connect 4) were checked in an emulated desktop browser: playing the computer to the end, the 3D board, the invite / accept / move messages (with a simulated opponent) and illegal-move rejection. Not tried: two real players, a phone, a controller on the Games window (it uses the same menu navigation as the other windows). The Triple Triad cards are my own stylized set, not the FFXIV cards; if you want the real card art, attach the images.
- The shooter-style Gunner (aim camera, crouch, dodge roll, weapon wheel, gun grips, blood, emote hotbar, Select-only bottom bar) was checked only in an emulated desktop browser with a simulated gamepad: the poses were looked at in screenshots on the stock male avatar, the arm and finger fitting was measured numerically (hand and fingertip positions against each weapon's grip and trigger) and the controller and menu paths were driven with fake button presses. Not tried: a phone, a real controller (and whether it reports Select as button 8; some pads label it differently), touch aiming, two real players, or other avatars (different arm lengths or hand shapes may leave the left hand slightly off a long gun). The dodge-roll pose and the crouch-with-gun poses were looked at only briefly.
- The weapons pack (7 guns and knife, with sounds) and the seven new emotes were checked only in an emulated desktop browser: each gun was looked at in the stock male avatar's hand, and firing, reloading, switching, projectiles and explosions were run against a simulated opponent. Not tried: a phone, a controller, two real players, or other avatars (the grip may sit differently on rigs with unusual hands). The pack's own weapon animations and the Pickups pack are not used; the Gunner keeps the pistol animation set for every weapon, so a rocket launcher is held and fired in the pistol pose.

- Blockbench models are assumed to face north (-Z); tick **Turn it around** in the import window if yours faces away. Unusual rigs (tails, wings, extra limbs) are attached to the nearest body part and move rigidly.
- Retro games: the emulator cores download from the EmulatorJS CDN the first time, so that needs internet. Heavy systems (N64, PlayStation) depend on the host's computer. Analog sticks work best-effort (on N64 the stick is the analog stick only; on other systems it also drives the D-pad). The game picture is streamed at up to 60 fps, but the real frame rate is set by the host's computer (the emulators run single-threaded in the browser), so N64 and PlayStation can run below 60 on slower machines. Some systems need a BIOS file you own (use the BIOS button).
- VRoid items bring no spring-bone physics, so skirts and hair stay still; and a VRoid item cut for different body proportions can poke through or float. Skirt and hair physics from imported outfits stay still (they follow the body but do not sway).
- A character's skin can poke through tight clothing.
- Without your own relay server, internet multiplayer depends on public matchmaking relays and on your network; use **Run network test** if friends cannot connect. About 10-20% of networks need a relay server or TURN.
- A player relaying for others could in principle forge messages from someone in the room (the code keeps strangers out, not members honest). Relaying through your own server does not have that weakness.
- Decorating: undo covers up to 80 steps in this session (it is cleared when you re-enter the room); pictures only go on the studio's inner walls; pieces do not stack automatically (use the Height slider); layouts live in this browser, so clearing site data or switching browsers loses them (export is not built yet).
- Weather, seasons, the Galleria, the diner, Oasis Industries, the O-Boy pose and targeting were tested only in an emulated desktop browser (one or two tabs), not on a phone or with a controller. Not yet verified: how heavy the snow, rain and the Galleria are on a phone; the live-weather option (needs network access); thunder and lightning, and the weather sounds; the D-pad down self-target on a real controller; touch play of the diner.
- First person, Decorate undo/redo and delete, upload descriptions, the plot's studio textures and the studio's Destiny City skyline were checked in an emulated desktop browser only. Not yet checked: touch and controller feel in first person, and how heavy the studio skyline is on a phone (it is about 11 draw calls and 360k vertices; the heaviest window layers are skipped on touch screens).
- Weather and seasons do not reach inside interiors (shops, roofed houses, the Galleria hall); the Harbor Studio gets the sky, light, lightning, snow on the patio and rain sounds. The studio rain sounds, the light switch panel with a keyboard or pad, and the new cloud look were checked only by screenshots and script in an emulated desktop browser, not listened to or tried on a phone or controller. The weather you see follows the game calendar, so in real October you see autumn unless you preview another season.
- The Galleria's other shop fronts are decoration; the solo diner shift and the lab are overlays, but the Kitchen Clash is a real room.
- Kitchen Clash: tested in an emulated desktop browser only (one player against Chef Key's crew, serving and scoring checked by script). Not yet tried: two or more real players over the network, phones, or a controller. Team match results are computed on each player's own device from the points everyone broadcasts, so a lost network message could make two devices show slightly different totals. Players who walk in after a match has started spectate until the next one. Stations are shared by teammates, but if two teammates grab the same patty in the same instant one of them just gets nothing.
- Laser Tag: tested in an emulated desktop browser only: solo against the drones (gun, bow, blade, knockout, respawn and result checked by script), two tabs (teams, start, hits, knockouts and respawn shared), the built-in poses on the stock character, and the filename reading for uploads. Blaster bolts were checked by script (they fly, travel at speed and damage a drone on impact) and in one screenshot, but not how they look or feel at full frame rate. Over-the-shoulder aiming was checked by script (shots through the crosshair and aim assist hit a drone, plus one aimed screenshot) but the mouse capture itself, touch drag-to-look, the controller's right stick / LT, and how the camera feels hugging cover are untested. Not yet tried: a phone (button layout and touch aiming), a real controller, three or more players, your own VRM files (the weapon positions were calibrated on the stock character; a VRM 0.x model may need a nudge) or your own weapon clips, and how it sounds (the effects are synthesised).
- Laser Tag (tightened arena), the new weapons (Pulse Rifle, Pulse Pistol), health pads, the compact Kitchen Clash map and the start-up music were checked in an emulated desktop browser only (live solo match, screenshots, scripted station reach). Not heard: the new gun sounds; not tried: a phone, a controller, other players. The pistol uses the two-handed blaster pose. The start-up music starts after your first click or key press (browsers block sound before that); a controller button press may not count, depending on the browser.
- Classes, equipping, the main-world combat and duels were tested in an emulated desktop browser against a simulated opponent (the sandbox cannot connect two real players), so a real two-player duel, phone buttons and a real controller still need a try. Peers' Hero animations at the faster attack speed are sent along, but remote hit timing depends on your connection.
- Guard, block, combo chains, get-up and death/respawn were also run only in the emulated desktop browser; the touch shield button and controller R2 hold are untested on hardware.
- The effects were checked in an emulated desktop browser only (colors, timing and the frame rate on a phone are untested). They are rebuilt from the pack's textures, not converted from its Unreal particle systems, so they look similar in spirit but not identical. The pack's flip-book sheets and materials are not used, apart from the pistol muzzle-flash and smoke sprites.
- The Gunner class and the Starter Pack base movement were tested only in an emulated desktop browser: poses were looked at on the stock male avatar, and shooting, lock-on, reload, hit reactions, death and a duel were run against a simulated opponent. Not tried: a phone, a controller, two real players, or other avatars (the pistol grip and the retargeted poses may sit differently on rigs with unusual proportions). Shots are instant and do not stop at walls, and while a shot or reload clip plays the legs follow that clip instead of the walk cycle (no upper-body-only layer yet). The pistol's aim-offset and diagonal-walk clips from the pack are not used.
- The Construct and Hero class were tested only in an emulated desktop browser (room loads, Agents attack, lock-on, sword, gun, evade and Bullet Time run without errors). Not tried: a phone, a real controller, other players. The sword grip, the gun arm pose and the attack hit timings are first versions that may need nudging; the Unreal clips were retargeted from joint directions without the skeleton asset, so hand twist can be slightly off. Gun and sword sounds are synthesised and unheard.
- There is no kick or ban yet; if a code leaks, make a new room.
- Builder's Plot, party and the new sky were tested only in an emulated desktop browser with two tabs, not on a phone. Very large builds may be slow on phones. Stairs, upper levels and walking on floors still need real-world testing.
- The Fighter class and the sword styles were checked only in an emulated desktop browser with the stock male avatar: combos, hits, kills and XP work and the stance and swing poses look right, but I could not test on a phone or pad. Fighter hit windows are estimated from hand and foot speed in each clip, so some strikes may feel a little early or late and need tuning. Skills 1 to 4 reuse the Hero's skill effects (no martial-arts-specific effects), and the fifth skill clip (a long dash) is not wired in.
- Sword models were matched to textures by eye (the pack has no material links), so a texture may not be the one you intended for some swords. Textures are shrunk to 256 px to save space, and the swords sit in the hand with the Hero's grip, which may need a small tweak for some models.

## Credits

- **VRoid Motions** (emotes: Show Full Body, Greeting, Peace Sign, Shoot, Spin, Model Pose, Squat): "Animation credits to pixiv Inc.'s VRoid Project". The pack's terms allow commercial use with that credit but prohibit distributing the motions "in a way that can be rigged or extracted" without permission. In Oasis.html they are baked into a compact custom animation pack (not .vrma files), which is a judgement call; if you want to be strictly safe, ask pixiv (contact link in the pack's readme) or remove the VRoid Motions emotes.
- **Military Weapons** models, textures and sounds, and the **FX Variety Pack** textures, come from the packs you supplied; check each pack's licence before you publish the page, because the weapon models and sounds are embedded in `Oasis.html` and so are downloadable by anyone who opens it.

Built by **Kasume the Legend**. Inspired by the 3D home spaces of the console era; the Oasis name, logo and artwork are the author's own. Thanks to the authors of the open-source libraries above.

## License

Add your preferred license here (for example MIT). Third-party libraries keep their own licenses. Avatars, outfits and videos loaded by players remain the property of their creators.
- The controller layout (hotbars, auto-run, lock-on, HUD select, camera cycle) was tested with a simulated gamepad in an emulated desktop browser, not with a real controller. Button numbers follow the standard gamepad mapping, so non-standard pads may differ. Lock-on and party cycling need other players in the room and were not exercised.
- Kitchen Clash top-down camera: checked in one screenshot only (the view, the follow, the zoom range). Not tried: how it plays with a controller or touch pinch, or with several people in the kitchen. The new footstep sounds were measured (less bright, longer tail) but I could not listen to them. The carbine model was built but not seen up close; the saber and the bundled rifle / death clips load and play, but the Run Left / Run Right strafes may or may not hold the rifle pose (I could not tell from the data).
- Footstep sounds: surface detection and step timing were checked by script in the studio, city, galleria and plot (no sound could be listened to). Not yet checked: how each surface actually sounds, or other players' steps over a real network. Snow and wet steps use the same weather values as the ground effect, tested only for errors.

## Update: shared snow, battle music, class stances, attack sounds
Verified in the emulated desktop test = tested here; Unverified = needs your phone.

- **Snow / weather for everyone.** The Oasis weather (U panel, `/weather snow`) used to be per-player ("only you see this"). It is now shared by everyone in the city, plot, galleria and school maps (the studio keeps its own shared weather). The newest choice wins and latecomers pick up the current one. Verified: two players in one city room, A sets snow, B gets snow; B sets clear, A follows. The Warriors of Light arena snow (Frostwood Pass etc.) was re-checked and still renders. Unverified: how the shared snow looks and performs on the Nothing Phone 3.
- **Battle music.** Fixed the track restarting on every phase change (the YouTube player was recreated each time, so battle music started twice). Guests now wait briefly for the host's pick so it starts once. Boss waves (every 5th) choose boss music straight away, never battle first. Verified: one player created per slot, boss on wave 5 first. Unverified: live YouTube playback.
- **Idle stances by class.** Every character now stays in its class stance for the whole fight (Hero sword guard, Gunner pistol low-ready, Fighter fists), not just on its turn. Verified: idle pose is active for the Hero. Gunner and Fighter idles not separately checked.
- **Hero sword in hand.** The blade now angles up and forward from the hand (measured: about 25 degrees up, pointing at the enemy). Verified on the rigged base avatar. The plain blocky guest avatar has no arm bones, so it holds no weapon (unchanged).
- **Attack sounds.** Real recorded samples (knife swing, hits, pistol shots, rocket/grenade booms) are layered over the old synth beeps with pitch variation: sword swing, fighter punch, normal and critical hits, enemy claws, enemy hits, spell cast, fire, bolt, ice, limit break, quake, beam, KO. Verified: every sound triggers a sample. Unverified: loudness balance on the phone.

## Hot fix: Blitzball in the room list
- **Blitzball Arena** now appears in the Lobbies room list with the other rooms, with a **Play** button that closes the list and opens Blitzball. It is still also under Games. Verified: the entry is listed and Play opens the game. Blitzball isn't a walk-around room, so there is no online count for it.
- Blitzball swimmers: skin tone slightly warmer and limbs a little thicker (they looked grey and thin).
- Arena weather: fixed the particle fade-in snap (snow and rain now appear at full strength immediately when a new biome is forced).

## New: Save Sphere (housing item) and the real Blitzball
- **Save Sphere (Blitzball)**: new Decorate piece under the new **Games** tab (Decorate > Furniture > Games), usable in the Harbor Studio and your plot. It is the FF10 save sphere: a glowing blue orb floating in a gold ring over a runed pedestal, with a soft light beam, rising droplets and a ripple off the rune disc. The glow and particles use the VFX-pack water effect (soft additive sprites), and the orb, ring and beam are plain glow materials, so none of it is cel shaded. The pedestal is cel shaded like the other furniture. Click or tap the sphere (within about 8 m) for a blue FF-style menu: **Play Blitzball** opens Blitzball's main menu, **Never mind** closes it. Verified: it places, renders, and Play Blitzball opens the game. Unverified: how it looks and performs on the phone, and controller use (click/tap only for now).
- **Real Blitzball**: the ball in Blitzball is now your Blitzball model with its blue and gold pattern (texture shrunk to 1024 px, about 270 KB extra). Verified in a render. Unverified: how it reads at the camera distances in play.
- **Save Sphere beam:** the light cylinder is now hidden by default and only glows while you click the sphere (fades in with the menu, fades out when you close it). Verified: idle render shows no beam, and the menu opens on click. Unverified: the beam itself after a click, because the menu covers it in my screenshot.

## Blitzball is now a separate file (size split)
Oasis.html is ~24.9 MB (under 25 MB). Blitzball lives in `Blitzball.html` and is fetched at runtime when you open it from the menu button, the Lobbies "Blitzball Arena" entry or the Save Sphere. **Upload Blitzball.html next to Oasis.html** (same folder). Opened from file:// where fetch is blocked, it falls back to loading Blitzball.html in the frame directly.
Verified (emulated desktop): fetch + load + match start with rigged swimmers. Unverified: phone, file:// fallback.

## Touch stick (phones / tablets without a controller)
Touch the left part of the 3D view and drag: a floating analog stick appears under your thumb and walks your character (push to the rim to run; the knob turns gold). It vanishes when you lift your finger and dims if you hold it still. The other thumb on the right half still orbits the camera. It switches itself off when a controller is connected, in the shooter modes (Laser Tag / Construct aiming), and while decorating.
Verified (emulated touch in desktop Chromium): the stick appears, the character walks and the camera follows, it hides on release, and a touch on the right half doesn't trigger it. Unverified: a real phone, thumb feel and dead-zone tuning, running via the rim.

## Levels.js: Warriors of Light monsters + biomes load separately
The eight Warriors of Light monsters and the 13 battle biomes now live in `Levels.js`, loaded on demand: it fetches in the background a few seconds after start and is needed when you enter the battle map. **Upload Levels.js next to Oasis.html** (same folder, exact name, capital L). If it is missing (or the page is opened straight from disk) battles still run with plain placeholder monsters and bare ground, and a chat line tells you the file is missing. Oasis.html is now 24.80 MB.
Monsters rebuilt with PS2-style detail (4,000 to 9,000 triangles each, painted scale/fur/metal/rock/cloth textures with bump, smooth shading, eyes, teeth, claws, armour, wings with bone fingers): Gel Slime, Sentry Drone, Dusk Wolf, Iron Guard, Bomb, Dusk Wraith, Ember Drake, Mako Golem. They keep the same animation hooks (rotor spin, tail sway, wing flap, flame flicker, slime squash), so combat is unchanged.
Verified (emulated desktop): Levels.js loads and battles run without errors; each monster rendered in a lineup. Unverified: phone speed (more triangles per monster; not measured on the Nothing Phone), all eight animating in a long fight, the missing-file fallback.

Battle biomes got a detail pass too (on top of the existing scenery, same locations and weather): bump-mapped floors and ground, textured leafy trees, pines with snow caps, palms with fronds, grass and fern cards, mossy rocks, mushrooms and logs; plaza houses with windowed facades, tiled roofs, chimneys and flower boxes, market stalls with awnings, barrels, crates and glass lamp posts; grand hall statues, banners, pillars and torches; garden topiary, flower beds, statues and lamps; desert cacti, skulls and ruined pillars; volcano basalt with lava veins and fire crystals; shore palms, driftwood and barrels; crystal cavern crystals and glowing mushrooms; cliff grass and ruined pillars; reactor tanks, pipes and mako crystals. Roughly 30 to 70 extra props per biome.
Verified (emulated desktop): Forest, Plains, Plaza, Hall, Jungle, Volcano, Shore, Cavern, Pines, Garden rendered in battle without errors. Unverified: phone frame rate with the extra props (not measured on the Nothing Phone 3), the Desert, Cliffs and Reactor dressings by eye, and the torch/lamp flames are static (no flicker yet).

## New: the full bestiary (44 monsters) and FF9-style status effects

**Keep `Levels.js` next to `Oasis.html`** (upload both). It was rebuilt with all new monsters.

### Bestiary
- Tiers D → S, then bosses and secrets. Weak monsters come first; stronger ones unlock as waves go up (each has a first wave). Biome-themed ones show up more in their home biome.
- D (wave 1+): Gel Slime, Sentry Drone, Frost Gel, Spore Cap, Sand Beetle. C (3+): Dusk Wolf, Bomb, Ember Gel, Cave Scorpion, Maw Sprout, Bone Soldier, Strike Drone. B (6+): Iron Guard, Dusk Wraith, Frost Wolf, Rex Raptor, Gale Harpy, Venom Serpent, Cinder Bomb, Volt Gel, Banshee, Razor Mantis. A (12+): Dread Knight, Alpha Wolf, Storm Roc, Reaper, Crystal Scorpion, Strangler Vine, Ice Golem. S (20+): Void Wraith, Lich Mage, Iron Colossus.
- Bosses every 5th wave: Mako Golem, Ember Drake, Marsh Hydra, Horned Behemoth, Lich King, War Titan.
- Secrets (rare, bigger Gil): Gilded Slime (any wave 2+, ~7%), Treasure Mimic (wave 3+, more often in hall/plaza/garden/cavern), Phantom Knight (wave 8+, night weather only), Crystal Drake (replaces a boss wave 15+ in cavern/volcano/cliffs, ~18%). "A rare monster appeared!" shows when one spawns.

### Status effects
- Good: Regen, Haste, Protect, Shell, Float (dodges Quake), Vanish (physical hits miss), Auto-Life. Bad: Poison, Venom, Darkness, Silence, Sleep (wakes when hit), Slow, Stop, Confuse (attacks anyone), Berserk (auto-attacks, hits harder), Mini, Petrify. All end after the wave.
- New menus: **Support** (Esuna lv2, Haste/Protect lv3-4, Shell, Regen, Float, Vanish, Auto-Life) and **Hex** (Sleep, Poison, Blind, Slow, Silence) on enemies. Items: Antidote, Remedy (drops, also in Supplies).
- Monsters inflict them with moves (Sting/Spore Burst poison, Chill slow, Wail silence, Drain sleep, Soul Scythe petrify...) and big ones buff themselves (Fortify, Frenzy). Bosses are immune to Sleep/Stop/Petrify/Confuse/Berserk/Mini; undead and machines resist Poison etc.
- Icons show under each name; poison/regen tick every 3 s; synced to everyone in the room.

### HUD
- Party panel now reads like FF7: `HP 300 / 300`, MP, LIMIT bar (pink), TIME bar (green).

### Verified / not verified
- Verified in emulated desktop Chromium: all 44 monsters load and appear at the right waves (including bosses), no console errors; poison ticks, sleep, blind, protect, haste, Esuna, Fortify, Frenzy, Spore Burst poison; new HUD layout.
- Not verified: balance, the other hexes landing (they are chance-based), Petrify/Confuse/Berserk in a live fight, multiplayer sync between two real devices, phone frame rate with the bigger monsters.

## Fix: Hero class in battle
- The Hero now uses your imported sword and the sword animation pack in battle (same as the lobby). The old prop blade and the hand-posed guard are gone for the sword class (Gunner keeps its stance).
- Verified (emulated desktop): the class is the Hero set, the imported sword is attached to the right hand and visible, no prop blade. Not verified by eye: close-up of the pose and sword (emulator camera couldn't frame it).
- Fighter: not changed. Needs a screenshot to see what looks off with the pose/hands.

## Equipment Shop (Equipment.html)
Separate page, opened from the menu ("Equipment Shop", 🛡️) or the Gear button in Warriors of Light. Deploy it next to Oasis.html.
- 434 items: weapons (235), head (36), body (43), wrist (56), accessories (64), from FF7, FF8 and FF9. Buy with Gil, sell for 40%, equip per class (Hero, Gunner, Fighter).
- Gear levels with class XP (to 99, +2% stats per level). Clearing waves now awards class XP.
- Worn gear applies in Warriors of Light: attack, magic, defense, HP/MP, speed, evade, crit, status immunities and start-of-wave statuses. It is synced to the party host, with values clamped.
- Names and ranks come from the FF7/8/9 equipment lists. Stats are normalized to this game's scale and not the originals. Some values were extracted from web pages and are approximate. FF9 armour stats are estimated from rank.
- Verified (emulated desktop Chromium): overlay opens/closes, worn gear reaches battle stats, no console errors. Not verified: phone layout, multiplayer sync with a second player.
- Not done: splitting imported VRM sets (e.g. gunblade set) into per-slot pieces, and the Fighter pose/hands issue (needs a screenshot).

## Warriors of Light menu
The side buttons are now: **Play** (joins and starts), **Gear**, **Settings**, **Exit**. Settings opens Leave/Join party, + / - CPU ally, Battle cam, Cast, Music and Supplies. Verified in emulated desktop Chromium (button list/toggle); not checked on phone.

## Warriors of Light menu (v2)
Side buttons: **Play**, **Shop** (Supplies, Equipment; only outside a battle), **Settings** (Leave/Join party, CPU allies, Battle cam, Cast, Music), **Exit**. During a fight only Settings and Exit show. Verified in emulated desktop Chromium (lobby, shop open, battle).

## Fix: shared weather in the Harbor Studio / outdoor maps
Cause (found by reading the code, not reproduced): the sync trusted each phone's/PC's clock to decide whose weather choice was "newest", so a device whose clock ran ahead or behind would ignore other people's changes, or get its own change overwritten within 12 s. Now a deliberate change always wins and is applied on every device, timestamps never go backwards, and anyone who enters a studio or outdoor map keeps asking the room for the current weather until someone answers (this used to happen for outdoor maps only, not the studio).
Verified: weather changes apply locally in the studio (emulated). **Not verified**: the multi-player sync itself; the sandbox blocks peer-to-peer, so I could not test two players. Please test with a friend and tell me.
Note: inside the studio the rain is deliberately hidden (shelter) until you walk out onto the deck.

## Fix: battle YouTube music for other players
The host's saved YouTube link (from a previous session, in the host's own settings) was only shared with the party when it was freshly pasted. Now it is shared with the party automatically when the music starts. Guests must not have "shared music" turned off. Not tested with two players.
