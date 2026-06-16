# Cue — website

Marketing site + a clickable review-app demo. Plain HTML/CSS/JS — no build step.

## What's here
```
index.html        ← landing (this is the homepage)
product.html      ← product / features page
pricing.html      ← pricing page
cue.css, cue.js   ← shared styles + theme toggle
review/           ← the Frame.io-style review app (clickable demo)
  index.html, app.css, app.js
.nojekyll         ← tells GitHub Pages to serve every file as-is
```
The landing's **"Start for free" / "Open app"** buttons open the review demo at `review/`.
Light/dark theme toggle is in the top-right of every page.

---

## Option A — Host on GitHub Pages (free, easiest)
1. Create a GitHub account → **New repository** (e.g. `cue-web`), Public.
2. Upload these files: on the repo page, **Add file → Upload files**, then drag in **everything inside this
   folder** (so `index.html` sits at the top level — not the `cue-web` folder itself). Commit.
3. **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)`** → Save.
4. Wait ~1 minute. Your site is live at `https://<your-username>.github.io/cue-web/`.
   - Landing: that URL · Review app: add `review/` to it.
5. **Custom domain** (optional): Settings → Pages → Custom domain → enter `cue.yourdomain.com`, then add the
   CNAME record your DNS provider asks for.

> Prefer GitHub Desktop? Install it → *Add Local Repository* → choose this folder → *Publish repository*. Then do step 3.

## Option B — Host on Vercel (recommended once you add the real backend)
1. Push this folder to a GitHub repo (as above).
2. Go to **vercel.com → Add New → Project → Import** your repo → **Deploy** (no settings needed for a static site).
3. Live instantly at `your-project.vercel.app`. Add a custom domain under **Settings → Domains**.
4. Every push to GitHub auto-redeploys.

Use Vercel when you build the real multi-user app (login, video, database) — it can run the backend that
GitHub Pages cannot. See `launch/START-HERE.md` in the main project for that.

## Test locally first (optional)
From this folder: `python3 -m http.server` → open `http://localhost:8000`.

---

## Note on the review app
The `review/` app here is a **front-end prototype** — data lives in the visitor's browser. It's perfect as a
live, clickable demo. To make it a real multi-user product (shared data, real logins, real video hosting),
follow the launch kit (`launch/`): Supabase + Mux + Vercel.
