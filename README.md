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

**Unreleased** (2026-10-09)
- Seasons and weather (radar, accumulating snow, rain, storms, fog), Oasis Galleria, Key's Diner and Dive, Oasis Industries, O-Boy held pose and player targeting (including yourself).
- First person view fixed: movement now follows where you look, you can look straight up and down, and Q/E turn the camera.
- Decorate: **undo / redo** (also `Ctrl+Z` / `Ctrl+Y`), a **Delete** button, previous / next piece buttons and a **Placed** tab that lists everything with a delete (✕) on each row, plus a two-step Delete everything. Locked pieces can be deleted from their bar too.
- Builder's Plot: the Harbor Studio floor and wall finishes (oak, parquet, tile, marble, carpet, brick, subway tile, stripes, dots, lattice, boards, paint) join wood, stone, metal and concrete.
- Uploads (photos and 3D models) can have a **name and description**; people who walk up to an item see its description.
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
- The view from the windows is the real **Destiny City** skyline across the bay (the city's own buildings, merged into 11 draw calls; on phones the heaviest window layers are left out). It follows the same day, night and sky as the rest of the studio.
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

- **Rules:** 100 HP, a knockout costs the other team a point, you are back at your base after 5 seconds with 2.5 s of protection. Most knockouts after 4 minutes wins, or the first team to 30. Late joiners watch until the next match.
- **Pulse Blaster (1):** fires Star Wars style bolts, glowing streaks with a white core in your team colour that fly at 70 m/s, so you can see them cross the arena and have to lead a moving target. 12 shots, 18 damage on impact, R reloads (also automatic when empty). Bolts stop at cover and walls with a spark. Drones shoot visible bolts too, and their hits land when the bolt arrives.
- **Longbow (2):** hold to draw (0.7 s), release to shoot; a full draw does 48 damage, a quick tap 12. Arrows drop over distance, and you walk slowly while drawing.
- **Photon Blade (3):** 3-hit combo (24 / 24 / 38), 2.7 m reach in front of you, a little faster on foot.
- **Aiming (Resident Evil 4 style):** in the arena the camera sits over your right shoulder and the character faces where you look. **Click once** in the game to capture the mouse (Esc releases it), then move the mouse to look. **Hold the right mouse button to aim**: the camera pulls in closer, zooms, you walk at half speed, a small red crosshair shows and a red laser sight runs from the gun to whatever you point at (it turns yellow over an enemy). Left mouse fires. Aimed shots go exactly through the crosshair with a slight pull onto an enemy right next to it. Hip fire (not aiming) is wider and the gun spreads a little. The bow aims the same way (arrow drop is compensated) and drawing it zooms in automatically. The camera pulls in against cover so walls never hide you. The blade needs no aiming. **Controller:** right stick looks, hold L1 or L2 to aim (zoom), click the right stick (R3) to toggle aim on and off, R2 fires. In the arena L1 no longer toggles auto-run and R3 no longer changes the camera mode. **Touch:** drag to look, hold the AIM button to aim, FIRE to shoot.
- **Keys:** left mouse or F fire (hold to draw the bow), right mouse hold aims, 1 / 2 / 3 weapons, R reload, F also uses the console. **Controller:** R2 fire, L1 / L2 aim, R3 aim toggle, D-pad left / right weapon, X reload, A use, Y jump. **Touch:** FIRE and AIM buttons, weapon and reload buttons, drag to turn.
- Each hit is decided by the shooter and reported to the victim, so other players' hits on you show up as they arrive; drones walk fixed routes on a shared clock.

**The built-in Rifle set.** The gun animations you sent are stored inside `Oasis.html` as a set (like the stock male / female sets), so there is no folder to host and nothing to upload. Any character that carries a gun uses it, and Laser Tag does today. It holds: blaster idle (Rifle Idle), an aiming idle used while you aim (Rifle Aiming Idle), blaster walk and run forward (Rifle Run), strafes left and right (Run Left / Run Right; backwards is the run played in reverse), blaster fire (Fire Rifle) and three knockouts (Death From Front Headshot, Death Crouching Headshot Front, Death From The Back: the back one is used when the shot came from behind, otherwise one of the front two at random). Your own uploads in the Animations panel replace these slot by slot for your character. Not used yet: Kneel idle / to aim / to stand, Aim To Down, Put Away, Crouch Backward Walk, Walk To Stop and Firing Rifle (the game has no crouch or holster yet). The weapon models follow your pictures: the blaster is a white and navy carbine with a glowing team strip, and the blade is a white and chrome saber hilt whose blade is your team colour.

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
- **Emotes:** cheer and sit on keys `1` and `2`, plus seven dances (Bboy, Rumba, Twerk, Hip Hop, Gangnam Style, Slide, Snake) and eight poses (standing, sitting, laying) in the Start menu. Dances loop and poses hold until you move or pick them again. Non-VRM avatars use a generic dance or sit.
- **Theater button** on the TV panel (and a "Screen blank? Watch it here" button that appears on phones while YouTube is playing) lifts the picture out of the 3D scene and shows it flat. YouTube's free movies with ads are copy-protected, and phones cannot draw protected video inside the tilted 3D screen, so it shows blank there; Theater and Full screen both fix it.
- **Retro games on the TV, 1-4 players.** Load a game file you own (NES, SNES, Genesis, Master System, Game Boy / Color, GBA, N64, PlayStation, arcade / Neo Geo) from the TV panel. It runs in an emulator ([EmulatorJS](https://emulatorjs.org)) on the host's computer and its picture and sound stream to everyone in the room. Anyone can **plug in as Player 1-4** from the panel and play with their own keyboard or Bluetooth / USB controller. No game files are included or uploaded anywhere.
- **Shared TV.** Play a video on the big screen and the room watches together.
- Name plates carry the Oasis mark.

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
| X (Square) | While moving: sprint. Standing still: open the map (rooms) | |
| Y (Triangle) | Jump | |
| Back (Select) | Select the HUD: D-pad moves around the bottom bar, A opens, B leaves | |
| Start (Options) | Main menu (emotes, bubble colour, lobby) | Close |

**Hotbars.** Hold LT for the left bar or RT for the right bar, then press a D-pad direction or A / B / X / Y to use that slot (8 slots per bar, 16 per set). The crossbar sits at the bottom centre and only appears when a controller is connected. The three default sets are Social (cheer, sit, target yourself, clear target, emotes, O-Boy, hoverboard, board colour; chat, party, TV, strafe, equipment, inventory, map, weather), View (zoom, camera, lock on, hide bar, fullscreen; decorate, profile, bubble colour...) and Home (decorate, inventory, equipment, party, map, TV, weather, O-Boy; hoverboard, sit, cheer, emotes, profile, chat). Slots can be rebound from the browser console with `__pad.bind(set, 'L' or 'R', slot, 'actionName')` (set 0-2, slot 0-7 = D-pad up, right, down, left, then Y, B, A, X; `__pad.acts()` lists the action names); the choice is saved in this browser. **Sprint:** while the left stick is moving, tap A (Cross) or X (Square) to start sprinting; it keeps going through turns until you let go of the stick for about half a second; standing still, A selects a target and X opens the map as before. Auto-run (LB + R3) and `Shift` also sprint.

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
- Decorating: undo covers up to 80 steps in this session (it is cleared when you re-enter the room); pictures only go on the studio's inner walls; pieces do not stack automatically (use the Height slider); layouts live in this browser, so clearing site data or switching browsers loses them (export is not built yet).
- Weather, seasons, the Galleria, the diner, Oasis Industries, the O-Boy pose and targeting were tested only in an emulated desktop browser (one or two tabs), not on a phone or with a controller. Not yet verified: how heavy the snow, rain and the Galleria are on a phone; the live-weather option (needs network access); thunder and lightning, and the weather sounds; the D-pad down self-target on a real controller; touch play of the diner.
- First person, Decorate undo/redo and delete, upload descriptions, the plot's studio textures and the studio's Destiny City skyline were checked in an emulated desktop browser only. Not yet checked: touch and controller feel in first person, and how heavy the studio skyline is on a phone (it is about 11 draw calls and 360k vertices; the heaviest window layers are skipped on touch screens).
- Weather and seasons do not reach inside interiors (shops, roofed houses, the Galleria hall); the Harbor Studio gets the sky, light, lightning, snow on the patio and rain sounds. The studio rain sounds, the light switch panel with a keyboard or pad, and the new cloud look were checked only by screenshots and script in an emulated desktop browser, not listened to or tried on a phone or controller. The weather you see follows the game calendar, so in real October you see autumn unless you preview another season.
- The Galleria's other shop fronts are decoration; the solo diner shift and the lab are overlays, but the Kitchen Clash is a real room.
- Kitchen Clash: tested in an emulated desktop browser only (one player against Chef Key's crew, serving and scoring checked by script). Not yet tried: two or more real players over the network, phones, or a controller. Team match results are computed on each player's own device from the points everyone broadcasts, so a lost network message could make two devices show slightly different totals. Players who walk in after a match has started spectate until the next one. Stations are shared by teammates, but if two teammates grab the same patty in the same instant one of them just gets nothing.
- Laser Tag: tested in an emulated desktop browser only: solo against the drones (gun, bow, blade, knockout, respawn and result checked by script), two tabs (teams, start, hits, knockouts and respawn shared), the built-in poses on the stock character, and the filename reading for uploads. Blaster bolts were checked by script (they fly, travel at speed and damage a drone on impact) and in one screenshot, but not how they look or feel at full frame rate. Over-the-shoulder aiming was checked by script (shots through the crosshair and aim assist hit a drone, plus one aimed screenshot) but the mouse capture itself, touch drag-to-look, the controller's right stick / LT, and how the camera feels hugging cover are untested. Not yet tried: a phone (button layout and touch aiming), a real controller, three or more players, your own VRM files (the weapon positions were calibrated on the stock character; a VRM 0.x model may need a nudge) or your own weapon clips, and how it sounds (the effects are synthesised).
- There is no kick or ban yet; if a code leaks, make a new room.
- Builder's Plot, party and the new sky were tested only in an emulated desktop browser with two tabs, not on a phone. Very large builds may be slow on phones. Stairs, upper levels and walking on floors still need real-world testing.

## Credits

Built by **Kasume the Legend**. Inspired by the 3D home spaces of the console era; the Oasis name, logo and artwork are the author's own. Thanks to the authors of the open-source libraries above.

## License

Add your preferred license here (for example MIT). Third-party libraries keep their own licenses. Avatars, outfits and videos loaded by players remain the property of their creators.
- The controller layout (hotbars, auto-run, lock-on, HUD select, camera cycle) was tested with a simulated gamepad in an emulated desktop browser, not with a real controller. Button numbers follow the standard gamepad mapping, so non-standard pads may differ. Lock-on and party cycling need other players in the room and were not exercised.
- Kitchen Clash top-down camera: checked in one screenshot only (the view, the follow, the zoom range). Not tried: how it plays with a controller or touch pinch, or with several people in the kitchen. The new footstep sounds were measured (less bright, longer tail) but I could not listen to them. The carbine model was built but not seen up close; the saber and the bundled rifle / death clips load and play, but the Run Left / Run Right strafes may or may not hold the rifle pose (I could not tell from the data).
- Footstep sounds: surface detection and step timing were checked by script in the studio, city, galleria and plot (no sound could be listened to). Not yet checked: how each surface actually sounds, or other players' steps over a real network. Snow and wet steps use the same weather values as the ground effect, tested only for errors.
