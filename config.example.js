// Daxio browser configuration (PUBLIC, safe to expose).
//
// SETUP:
//   1. Copy this file to `config.js` in the same folder:  cp config.example.js config.js
//   2. Open `config.js` and paste your real values from
//      Supabase Dashboard -> Project Settings -> API.
//   3. `config.js` is git-ignored, so your local copy is never committed.
//
// Only the project URL and the ANON (public) key go here. NEVER put the
// service role key or any other secret in this file — those live as encrypted
// Cloudflare Pages environment variables on the server side.

window.DAXIO_CONFIG = {
  // Settings -> API -> Project URL (e.g. https://abcdefghijklm.supabase.co)
  SUPABASE_URL: 'https://YOUR-PROJECT-ref.supabase.co',

  // Settings -> API -> Project API keys -> `anon` `public`
  SUPABASE_ANON_KEY: 'YOUR-SUPABASE-ANON-KEY',

  // Your R2 bucket's PUBLIC base URL (the app builds media URLs as
  // `${R2_PUBLIC_BASE}/${r2_key}`). This is a public URL, safe here. Set it to
  // your bucket's r2.dev domain or a custom domain bound to the bucket, e.g.
  //   https://pub-xxxxxxxx.r2.dev   or   https://media.yourdomain.com
  R2_PUBLIC_BASE: 'https://YOUR-R2-PUBLIC-BASE'
};
