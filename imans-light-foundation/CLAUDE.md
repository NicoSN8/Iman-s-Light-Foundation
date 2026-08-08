# Iman's Light Foundation — Project Context

## What this is

Website for Iman's Light Foundation, a registered 501(c)(3) nonprofit (EIN
93-4410846) in South Florida. Mission: fentanyl and drug awareness education,
mental health workshops, legislative advocacy, and support for grieving
families. Motto: "Preventing Tragedies, Illuminating Futures."

- Contact: imanslightfoundation@gmail.com / +1 (786) 853-3347
- Instagram / Facebook: @imanslightfoundation
- Currently deployed at: https://iman-s-light-foundation.vercel.app
- Target production domain: https://www.imanslightfoundation.org — **currently
  still serves the old Wix site.** DNS cutover is done by the site owner
  (Nicolas), never by an agent. Do not point the domain at Vercel until
  donations work end-to-end (see "Known constraints" below).
- Repo root is one level above this folder — `imans-light-foundation/` is the
  actual Next.js app. `git` commands run from the repo root.

## Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript (`strict: true`).
- **This is NOT the Next.js you're trained on.** `AGENTS.md` in this repo warns
  that v16 has real breaking changes (e.g. `middleware.ts` → `proxy.ts`,
  `cookies()`/`headers()` are async, route `params` is a `Promise`). Before
  writing anything Next-specific, check `node_modules/next/dist/docs/`
  (present after `npm install`) rather than relying on training data.
- **Styling:** mixed by design — most routes pair a CSS Module
  (`*.module.css`) with global utility classes from `src/app/globals.css`
  (`.section`, `.container`, `.btn`, `.card`, `.grid-2/3/4`, design tokens in
  `:root`). Three routes (`programs`, `saving-lives`, `data-metrics`) use only
  global classes + inline `style={{}}` — this is pre-existing and intentional
  to leave alone unless asked to redesign.
- **i18n:** custom, not a library. `src/context/LanguageContext.tsx` is a
  client React Context holding `lang: 'en' | 'es'`, persisted to
  `localStorage` and restored after mount (avoids hydration mismatch — see
  the comment in that file before "fixing" the effect). `document.documentElement.lang`
  is kept in sync. Every page reads `lang` and branches inline or via a
  `t = { en: {...}, es: {...} }` dictionary — there is no extraction
  tooling, so **every new user-facing string must be added to both `en` and
  `es` by hand, in the same edit.**
- **Routing:** App Router, all routes are folders under `src/app/*/page.tsx`.
  Every route's `page.tsx` is a thin **Server Component** that only exports
  `metadata` and renders a same-folder `*Content.tsx` **Client Component**
  holding the actual UI. This split exists because `metadata` exports only
  work in Server Components, but every page needs `lang` from the client
  context. **Follow this pattern for any new route:** `page.tsx` (server,
  metadata only) + `FooContent.tsx` (`'use client'`, everything else).
- **Images:** `next/image` throughout, with one deliberate exception in
  `about/AboutContent.tsx` that falls back to a raw `<img>` for two team
  members whose photos are inline `data:` URIs — leave that branch alone.
  All media that used to be pulled from Wix (`static.wixstatic.com`) is now
  self-hosted under `public/media/`.
- **Data:** `src/data/events.json`, `src/data/gallery.json`, `src/data/sponsors.ts`
  are static, imported directly — no CMS. As of Phase 1 there is also a real
  database (below) for the first genuinely dynamic data.
- **Database:** Neon Postgres, connected via the Vercel dashboard's Storage
  tab. Schema lives in `src/db/schema.ts` (Drizzle ORM). `src/db/index.ts`
  exports `getDb()` — call it fresh per request, don't hoist a client to
  module scope (Neon's HTTP driver has no connection to pool, and a
  module-level client would crash the build if the env var isn't set yet at
  build time). Push schema changes with `npm run db:push` (declarative,
  no migration files — fine for this project's size).
  **Env var naming:** the Vercel↔Neon integration prefixes every variable
  with whatever name you gave the connection during setup — this project's
  is `Imans_Payments_` (e.g. `Imans_Payments_DATABASE_URL`), not the plain
  `DATABASE_URL` you'd expect from the docs. Check `.env.local` for the
  actual key names before assuming.

## API Routes

`src/app/api/*/route.ts`, standard Next.js Route Handlers (`POST`/`GET`
exports). The pattern so far (`src/app/api/contact/route.ts`): validate the
JSON body defensively, check a honeypot field before touching the database,
insert via `getDb()`, return `Response.json(...)`. Not cached by default —
fine for anything that writes data.

## Admin auth (`/admin`)

Single shared password (not per-person accounts) protecting a staff-only
dashboard — donors/visitors never see this, never log in anywhere.
`src/lib/adminAuth.ts` has the whole pattern: `verifyPassword()` (PBKDF2
against `ADMIN_PASSWORD_HASH`), `createSessionToken()`/`verifySessionToken()`
(HMAC-signed with `ADMIN_SESSION_SECRET`, 8h expiry), and `requireAdmin()`
(reads the cookie, redirects to `/admin/login` if invalid). **The real
security check is `requireAdmin()` called directly inside every `/admin`
page and `/api/admin/*` route — never rely on `proxy.ts`/`middleware.ts`
alone.** Next.js 16 renamed `middleware.ts` to `proxy.ts`, and a stray
leftover `middleware.ts` is silently ignored with no build error; if that
were the only gate, `/admin` could go fully public with no warning. There is
deliberately no `proxy.ts` in this project — one enforcement point, not two
that can drift apart.

**Env var gotcha that cost real debugging time:** Next.js's built-in
`.env.local` loader treats `$` as a variable-substitution character (like
shell interpolation) and silently truncates a value at the first `$` it
finds — no error, no warning, it just quietly becomes a shorter string. This
is why `ADMIN_PASSWORD_HASH` uses `:` as its field delimiter
(`pbkdf2:<iterations>:<saltHex>:<hashHex>`), not `$`. Keep this in mind for
any future secret format (e.g. PayPal keys) — if a value contains a literal
`$`, verify what actually lands in `process.env` (e.g. via a throwaway debug
route that echoes it back) rather than assuming the file's contents are what
gets loaded.

To change the admin password: open `admin-password-tool.html` in the project
root (gitignored, stays local-only) in a browser — it computes the PBKDF2
hash client-side with Web Crypto, nothing is sent anywhere. Paste the result
into `ADMIN_PASSWORD_HASH` via `vercel env add ADMIN_PASSWORD_HASH
<environments> --value "..." --sensitive` (production/preview) and again
without `--sensitive` for development, then `vercel env pull .env.local`.

## Conventions

- No test suite exists yet.
- Don't invent facts, statistics, testimonials, partner names, or event
  details. If a real-world fact is needed and hasn't been provided, ask.
  This includes name/logo and name/photo pairings that are *already in the
  codebase* — several sponsor logos and a gallery caption set were found
  mislabeled by a prior tool that never actually looked at the images.
  Visually verify before trusting an existing label, not just before adding
  a new one.
- Match the existing design system; don't restyle working pages as a side
  effect of an unrelated fix.
- Every new page needs metadata (title/description) and must work in both
  languages — see the `page.tsx` / `*Content.tsx` split above.

## How to run things

```bash
npm install       # first time, or after pulling a package.json change
npm run dev        # local dev server, http://localhost:3000
npm run build       # production build — run before every commit
npm run lint         # eslint — run before every commit
npm run db:push       # push schema.ts changes to the database
```

Node.js was not preinstalled on the original dev machine; if `npm`/`node`
aren't found, install Node LTS first (`winget install OpenJS.NodeJS.LTS` on
Windows).

**Local `.env.local`:** this project is linked to the `iman-s-light-foundation`
Vercel project (see `.vercel/project.json`, gitignored). Pull real env vars
with `vercel env pull .env.local` (requires `vercel login` once — opens a
browser). Never type real secret values directly into chat or commit them;
`.env.example` documents the variable names without values.

**Vercel CLI gotcha:** both `vercel link` and `vercel env pull` have, more
than once, auto-created a *second* `.gitignore` inside
`imans-light-foundation/` containing just `.env*`. That pattern is broader
than the root `.gitignore`'s (which correctly excludes `.env`/`.env.local`
but allows `.env.example`) and silently blocks `.env.example` from ever
being staged again. If `git status` shows `.env.example` missing after
running either command, check for and delete this nested file — the root
`.gitignore` already covers everything needed.

## Known constraints / roadmap

- **Donate buttons currently link out** to the old Wix donations page
  (`imanslightfoundation.org/donations`). This is intentional and temporary —
  do not point the production domain at this Vercel deployment until real
  PayPal checkout replaces that link, or donations will 404 silently. Full
  context and the do-not-do-this-yet list lives in `SETUP-TODO.md`.
- Planned build-out (see `SETUP-TODO.md` for the human side of each phase):
  Neon Postgres (done) → password-protected `/admin` → PayPal donations in
  sandbox → bilingual IRS-compliant receipts → donations go live → events move
  into the database → ticket sales with QR check-in.
- There is a harmless, empty, never-deployed Vercel project called
  `imans-light-foundation` (no hyphen after "imans") sitting alongside the
  real `iman-s-light-foundation` project — created by an accidental
  `vercel link` during Phase 1 setup. Safe to delete from the Vercel
  dashboard whenever; nothing points at it.
- When that work starts, treat the server as the source of truth for any
  amount of money — never trust a client-submitted price/amount.
