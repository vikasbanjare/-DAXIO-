# Daxio — website (flat, no folders)

Marketing site + a single-file review-app demo. Plain HTML/CSS/JS, **no folders** — every file sits at the top
level, so you can upload them one-by-one on GitHub with nothing to organise.

## Files (all at the top level)
```
index.html      ← homepage (the Daxio landing)
product.html    ← product / features page
pricing.html    ← pricing page
app.html        ← the whole review app, in ONE file (no app.css/app.js needed)
daxio.css         ← styles for the marketing pages
daxio.js          ← theme toggle + interactions
.nojekyll       ← (optional) keeps GitHub Pages serving files as-is
```
The landing's **"Open app" / "Start for free"** buttons link to `app.html`.

## Upload to GitHub (web, one file at a time — no folders)
1. Create a GitHub account → **New repository** (e.g. `cue-web`), Public.
2. On the repo page: **Add file → Upload files**.
3. Select **all 6 files above** (index.html, product.html, pricing.html, app.html, daxio.css, daxio.js) and drop them in. Commit.
   - ⚠️ Do **not** put a second `index.html` anywhere — there's only one homepage.
4. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
5. ~1 min later it's live at `https://<your-username>.github.io/cue-web/` (the app opens at `…/app.html`).
6. Custom domain (optional): Settings → Pages → Custom domain.

> Even easier: **GitHub Desktop** → add this folder → Publish. It uploads everything correctly in one step.

## Test locally first (optional)
From this folder: `python3 -m http.server` → open `http://localhost:8000`.

## Note on the app
`app.html` is a **front-end demo** — data lives in the visitor's browser, perfect for a live clickable showcase.
To make it a real multi-user product (shared logins, video hosting, shared data), follow the launch kit
(Supabase + Mux + Vercel) — see `INTEGRATION.md` / `launch/` in the main project.
