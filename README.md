<div align="center">
The Oasis
A 3D social space that runs entirely in your browser.
Bring your own VRM avatar, dress it, hang out in the Central Mall or your own Harbor Studio, and meet friends with nothing to install and no game server.
dev by Kasume the Legend
</div>
---
What is it?
The Oasis is a single-file web app (`Oasis.html`) inspired by the classic console-era 3D home spaces. You load a character, walk around a cel-shaded world, chat with speech bubbles, wave, dance, watch videos together on the big screen, and invite friends with a room code. It is plain HTML, CSS and JavaScript on top of Three.js. There is no backend, no account and no build step.
Features
Characters
VRM avatars (VRoid Studio, VRoid Hub, Booth and similar). Upload a `.vrm` and it is ready to walk, run, jump and emote.
Other 3D models. `.glb`, `.gltf`, `.fbx`, `.obj` and 3D character zips work too. If the model has a humanoid skeleton it is detected automatically and uses the standard animations.
2D sprite characters can be imported from a sprite sheet.
My Characters keeps everything you have uploaded in your browser, with stock characters to start from.
Custom animations. Replace any base animation slot (idle, walk, run, jump and so on) with your own clip.
Equipment (FFXIV-style)
A gear window with 12 slots: Head, Ears, Body, Neck, Hands, Wrists, Legs, Ring, Feet, Back, Main Hand and Off Hand.
Import clothes from your own storage (`.vrm` or `.glb`). Outfits made for a humanoid skeleton are re-fitted to your character's bones and move with every animation.
Hats, jewellery, wings and weapons attach to a bone and can be moved, turned and resized with sliders.
Untick the parts of a full VRM you do not want to wear, and hide parts of your character's original outfit.
Gear is saved per character, and other players see what you wear.
Worlds
Central Mall, a multi-storey atrium with shops and public channels.
Harbor Studio, your own private apartment: a sunlit room with a skylight, a wall TV, a pool, and a harbor patio with stone pavers, a glass-and-orange railing and a view over a marina and old town. Share its code and friends can visit.
Cel-shaded look with outlines, a live sky and a day-lit harbor.
Social
Peer-to-peer multiplayer with no game server. Players connect directly over WebRTC; public matchmaking relays are only used to introduce them.
Public channels and private rooms with shareable codes and invite links (`?room=CODE`).
Speech bubbles with your own colour. Everyone in the room sees your bubble colour.
Start menu (Start on a controller, or `M`): emotes, bubble colour and shortcuts in one place.
Emotes: wave, dance, cheer, spin and sit.
Lobby counts show how many people are online in each public district.
Shared TV. Play a video on the big screen and the room watches together.
Name plates carry the Oasis mark.
Controls
Input	Action
`W A S D` / arrows	Move
`Shift`	Run
`Q` / `E`	Turn on the spot
`Space`	Jump
`1`-`5`	Emotes
`Enter`	Chat
`M`	Start menu
`G`	Equipment
`F`	TV panel
`V`	Toggle walk style
Mouse drag	Orbit camera
Game controllers (wired or Bluetooth, any browser-supported gamepad): left stick moves, right stick turns the camera, `A` jumps, `X` `Y` `B` `LB` `RB` are emotes, triggers run, `Start` opens the Start menu and the D-pad navigates menus.
Run it
Because it is one file, there is nothing to build.
Locally: open `Oasis.html` in a modern browser. For the networking features, serve it over `https://` or `http://localhost` (browsers disable the encryption peer-to-peer needs on plain `file://` pages).
On GitHub Pages:
Put the file in your repository (name it `index.html` if you want the plain site address to work).
Repository Settings → Pages, choose your branch and the root folder, then save.
Open `https://<your-name>.github.io/<repo>/`.
Multiplayer notes
Players connect directly to each other, so people in the same room can see each other's IP addresses. That is how peer-to-peer works.
Most home networks connect fine. Strict networks (some mobile and corporate ones) may need a TURN server: add one under Space Info → Network. The same panel has a Run network test button that tells you what your connection can do.
Avatars are shared player-to-player, so very large files take a moment to arrive. Avatar and item files over 48 MB / 24 MB cannot be shared.
Tech
Three.js for rendering
@pixiv/three-vrm for VRM avatars
Trystero for serverless WebRTC (Nostr, BitTorrent and MQTT matchmaking)
Tailwind CSS (CDN) and Font Awesome for the interface
Characters, items and settings are saved in your browser (IndexedDB and localStorage); nothing is uploaded to a server
Known limits
Skirt and hair physics from imported outfits stay still (they follow the body but do not sway).
A character's skin can poke through tight clothing.
Internet multiplayer depends on public relays and your network; use Run network test if friends cannot connect.
Credits
Built by Kasume the Legend. Inspired by the 3D home spaces of the console era; the Oasis name, logo and artwork are the author's own. Thanks to the authors of the open-source libraries above.
License
Add your preferred license here (for example MIT). Third-party libraries keep their own licenses. Avatars, outfits and videos loaded by players remain the property of their creators.
