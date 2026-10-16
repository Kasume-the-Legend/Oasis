# Oasis save server (Cloudflare Worker + D1)

Free-tier friendly. One-time setup, about 10 minutes, all in the Cloudflare dashboard:

1. **Create the database.** Workers & Pages -> D1 SQL Database -> Create -> name it `oasis-saves`.
   Open it -> Console tab -> paste and run:

       CREATE TABLE IF NOT EXISTS saves (id TEXT PRIMARY KEY, a TEXT NOT NULL, t INTEGER NOT NULL, blob TEXT NOT NULL);
       CREATE TABLE IF NOT EXISTS fails (id TEXT PRIMARY KEY, n INTEGER NOT NULL, t INTEGER NOT NULL);

2. **Create the Worker.** Workers & Pages -> Create -> Create Worker -> name it `oasis-save` -> Deploy -> Edit code.
   Delete the sample, paste all of `worker.js`, Deploy.
3. **Connect the database.** The Worker -> Settings -> Bindings -> Add -> D1 database ->
   Variable name `DB` (exactly), database `oasis-saves` -> Deploy.
4. **Copy the Worker address** (looks like `https://oasis-save.yourname.workers.dev`) and paste it into the game:
   Info tab -> Settings -> Account save -> "Save server address". (Or put it in `AC_API` in index.html.)

Open the Worker address in a browser: you should see `{"ok":true,"name":"oasis-save"}`.

## How it protects players
- The game derives an encryption key from username + password (PBKDF2, 250,000 rounds) and encrypts the save (AES-GCM) before upload.
  The server stores only the encrypted blob, and a hash of a separate login secret. It never sees a password or a readable save.
- The account id is derived from username AND password, so the server cannot tell a wrong password from a new account. Use a long, unique password: that, not a lockout, is what protects a save.
- There is no password reset: a forgotten password means the encrypted save cannot be opened.
