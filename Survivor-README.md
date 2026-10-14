# Harbor Inn: Survivor, the long version

**Length.** The game is now three acts and 69 rooms: Act 1 the inn and its garden (25 rooms), Act 2 the lab under the boiler room (21), Act 3 the sewers, cannery and harbor (23). Resident Evil 2 (1998) takes about 5.5 hours according to HowLongToBeat (as quoted by 3DJuegos), and that was the target.

**How long does it really take? This is a model, not a measurement.** I can't play it as a human, so I wrote a bot that follows the shortest sensible route through the whole game (walking time between doors, fight time from enemy HP and your pistol damage, reading files, solving puzzles, item box trips, retries after deaths). With first-time-player assumptions it comes out at about **4.9 hours**, with a range of **2.7 h** (you know the map, skip files, run past enemies) to **6.6 h** (explore everything, die often). The assumptions are guesses, and your real time depends mostly on how long the puzzles take you. If it is much shorter or longer, tell me and I will retune it.

**Counts.** 10 boss fights, 17 puzzles, about 210 enemies, 44 files, 6 typewriter save rooms.

**Story and route.**
- Act 1: as before, plus three puzzles (Guest Corridor portraits open the Suite; Ballroom piano gives the Bronze Medal; Captain's Study safe, code from the logbook in the Library, gives the Silver Medal). Fire the flare on the roof and the radio sends you to the lab. The lift hatch in the Boiler Room needs a two-piece crank: the top half from the Greenhouse watering puzzle, the bottom half from the Crypt Warden. The garden key is on the roof; the Chapel bell code is on the hymn board.
- Act 2 (lab): Reception > Corridor A > Server Room (code from the office memo gives Fuse A) > Cryo Chamber (boss, drops the Level 2 keycard) > Corridor B > Quarantine Ward (Fuse B) > Surgery (order puzzle, checklist is in the Archive, gives Fuse C) > Generator Room (all three fuses) > Incinerator (boss, Level 3 keycard) and Specimen Vault (date code, Gold Medal) > Genetics Lab (DNA vial from the Morgue plus reagent from the Pharmacy unlocks the chute) > Containment Hall (Tyrant T-103, drops the sewer key).
- Act 3: Sewer Gate > Outfall > Drain Passage > Junction > Collapsed Tunnel > Hound Den (Sewer Beast drops the valve wheel) > Pump Room (drains the Drained Hall) and Cistern (valve order puzzle, gives the dock gate key) > Cargo Warehouse > Cannery (Cold Store Brute drops fuel, Boiler feed, Foreman's locker code 0731, Crane Hall) > Loading Quay > Boathouse (three medals open the pier gate) > Harbor Pier, final fight with Parasite Hale.

**Puzzle types.** Code locks (dials), sequence panels (press in the right order), and "use" sockets that need items. Every code and order is written in a file somewhere earlier in the game.

**Co-op save.** When two players are in the same game, saving at a typewriter writes a shared save on both machines. It only loads when both of the same two players are present again.

**New Map screen.** One floor at a time, with floor buttons (LAB, SEWERS AND HARBOR and GARDEN are new floors).

**Rank** for the ending now uses a 5-hour scale.

**Tested:** every one of the 69 rooms loads and every door, item, puzzle, enemy and typewriter is reachable; the door graph is symmetric; a progression simulation completes the game with no softlock; code, sequence and "use" puzzles work in the browser; the three kinds of boss (zombie, hound, giant) die, drop their item and spawn adds; the flare event, the hatch lock and the ending screen work; co-op shared saves still work.
**Not tested:** a full hands-on playthrough, and balance (ammo is a little tight, the blade is free); co-op through the new bosses.

---

# Earlier notes

# Harbor Inn: Survivor, update notes

**Fixed: stuck on arrival.** Several doors dropped you inside furniture (the Dining Hall, Storage, Lobby west door, Kitchen and Pantry). You are now always placed on the nearest clear floor, and the worst doors were moved. If you still get stuck somewhere, tell me the room name.

**19 rooms.** Nine new ones: Pantry, Wine Cellar, Laundry, Lounge Bar, Grand Ballroom, Upper Landing (second typewriter and item box), Guest Corridor, Guest Suite, Captain's Study.
Route: Kitchen locker (code 417) > Brass Key > West Wing > Laundry > Cellar Key > Pantry stairs > Wine Cellar > Ballroom Key > Lounge doors > Ballroom > Level 1 ID Card > card reader in the Lobby > Upper Landing > Guest Suite > Study Key > Captain's Study > Signal Flare. The Roof Key (dropped by the boiler stoker) opens the roof; fire the flare there to leave.

**Resident Evil 2 style menu.** File / Map / Item / Sound / Option / Exit tabs, portrait with ECG "Fine/Caution/Danger", equipped weapon box with ammo, 2 column item grid with red selection, description box, Equip / Check / Combine / Discard. Q/E, PageUp/PageDown or the pad bumpers change tab. Check shows a spinning 3D render. Item art: your Samurai Edge (pistol), Umbrella ID card and first aid spray models. The map has four floors and fills in as you explore.

**8 zombie models**: Whiteclown, Prisoner, Skeleton, Parasite, War zombie, Yaku, Cop, Zombie girl, skinned onto the Scary Zombie Pack animations (idle, walk, scream, crawl, attacks, death). Reduced to about 3,200 triangles and 256px textures each so the file stays about 4.6 MB.

**Tyrants.** The Skeleton zombie is now a huge, slow brute in the Grand Ballroom (70 HP, big reach). The Parasite is a tall, fast stalker in the Guest Corridor (55 HP, about 2.4 m tall). Both are barely staggered by hits and always scream when they spot you. The other six models stay as ordinary zombies.
