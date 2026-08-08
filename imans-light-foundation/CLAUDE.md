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
- **Data:** `src/data/gallery.json` and `src/data/sponsors.ts` are static,
  imported directly — no CMS. Events (`events` table, below) moved to the
  database in Phase 6, managed from `/admin/events`; there is no
  `events.json` anymore.
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
(reads the cookie, redirects to `/admin/login` if invalid).

**Route structure:** `src/app/admin/layout.tsx` is a thin wrapper shared by
*every* `/admin` route including `/login` (just a solid background — no
public nav/footer, see `SiteChrome` below). Everything that needs a logged-in
user lives under the route group `src/app/admin/(dashboard)/` — the
parentheses don't appear in the URL, so `/admin` and `/admin/events` are
unaffected. `src/app/admin/(dashboard)/layout.tsx` calls `requireAdmin()`
**once** for that whole subtree and renders `Sidebar.tsx`; individual pages
under it don't call `requireAdmin()` or render nav themselves. This is safe
specifically because a layout always renders for every nested page — unlike
`proxy.ts`/`middleware.ts` (Next.js 16 renamed `middleware.ts` to
`proxy.ts`, and a stray leftover `middleware.ts` is silently ignored with no
build error), which is why *that* mechanism was never trusted alone.
**`/api/admin/*` routes still each call `requireAdminApi()` individually**
— route handlers aren't part of a page layout tree, so this principle is
unchanged there. If you add a new authenticated admin page, put it under
`admin/(dashboard)/` and it's protected automatically; if you add a new
`/api/admin/*` route, you must still add the `requireAdminApi()` check
yourself.

**`SiteChrome.tsx`** (`src/components/SiteChrome.tsx`) is what actually
keeps the public Navbar/Footer/NebulaBackground off `/admin` — it's a client
component in the root layout that checks `usePathname()` and renders
`{children}` directly (no public chrome) for any path starting with
`/admin`. This existed because `/admin` didn't have its own layout early on
and inherited the public site's fixed navbar, which visually and
*functionally* sat on top of the admin sidebar (real bug: the nav tabs were
unclickable because the fixed public navbar intercepted the clicks). If a
future top-level section also needs to skip public chrome, extend the check
here rather than duplicating the pattern.

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

`requireAdmin()` (redirect-based) is for pages/Server Components only. Any
`/api/admin/*` route must use `requireAdminApi()` instead — it returns a
`Response | null` instead of calling `redirect()`, because a `fetch()` caller
needs a real 401 it can check, not an HTTP redirect it'll silently follow.

```ts
const unauthorized = await requireAdminApi();
if (unauthorized) return unauthorized;
```

## Events (`/admin/events`)

`events` table (Phase 6): `titleEn/Es`, `descriptionEn/Es`, `location`,
`image` (nullable Blob URL), `eventDate` (nullable — null means no specific
day is set yet), `dateLabel` (nullable text shown instead, e.g. "October
2026"), `isFeatured`, `isPublished`. `src/app/events/page.tsx` fetches
published events server-side and passes them to `EventsContent.tsx` as
props — **it has `export const dynamic = 'force-dynamic'`, and that must
stay.** Without it, Next statically prerenders the page at build time and
admin edits silently stop showing up on the public site until the next
deploy. Featured-vs-grid and the "UPCOMING"/"PAST HIGHLIGHT" badge are both
derived from `isFeatured` and whether `eventDate` is null-or-future, not
hardcoded per event — don't reintroduce a special-cased event in
`EventsContent.tsx` the way the old hardcoded gala card worked.

**Image upload:** Vercel Blob, connected the same way as Neon (Storage tab →
Create Database → Blob → Connect to Project). The browser uploads
**directly** to Blob storage via `@vercel/blob/client`'s `upload()`,
authorized by `src/app/api/admin/events/upload/route.ts` (`handleUpload`,
gated by `requireAdminApi()`) — the file bytes never pass through our own
serverless function, which matters since a couple of the original event
photos are 10+ MB and would otherwise hit Vercel's request body limit.
Blob URLs live on a dynamic per-project hostname
(`*.public.blob.vercel-storage.com`), allow-listed in `next.config.ts`. The
store is named `imans-light-blob` and connects via the plain
`BLOB_READ_WRITE_TOKEN` env var — no name prefix this time (unlike Neon's
`Imans_Payments_` prefix), so `handleUpload()` doesn't need an explicit
`token:` option.

**Two real gotchas hit setting this up, in case the store is ever recreated:**
- **Access mode (public/private) is set once at store creation and cannot
  be changed after.** A store made through the Vercel dashboard's "Connect
  to Project" flow with default settings comes out **private**, which
  breaks public-facing images with "Cannot use public access on a private
  store." If this ever happens again, the fix is delete-and-recreate
  (`vercel blob delete-store <id>`, then `vercel blob create-store <name>
  --access public --yes --environment production --environment preview
  --environment development`), not a settings toggle — there isn't one.
- **`@vercel/blob` v2+ tries Vercel's OIDC auth before falling back to
  `BLOB_READ_WRITE_TOKEN`**, and the OIDC path is unreliable outside actual
  Vercel infrastructure — a token pulled locally via `vercel env pull` can
  fail to refresh from a bare `next dev` process with an opaque "No blob
  credentials found" error that has nothing to do with whether the token or
  store are actually fine. If local upload testing fails mysteriously,
  confirm a plain `BLOB_READ_WRITE_TOKEN` exists in `.env.local` (not just
  an OIDC token) before assuming the code is broken — production deploys
  don't hit this since OIDC is native there.

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
  checkout (Zeffy or PayPal) replaces that link, or donations will 404
  silently. Full context and the do-not-do-this-yet list lives in
  `SETUP-TODO.md`.
- **2026-08-08 — donation platform switched to Zeffy first, not PayPal.**
  The CEO chose Zeffy (zeffy.com): genuinely 0% fees (revenue comes from an
  optional donor tip), captures donor name/email automatically, and also
  handles event ticket sales — PayPal alone wouldn't. Zeffy needs the
  foundation to sign up, verify via Stripe (ID + bank account, by an
  authorized rep), and hand me a form link/embed once approved — see
  `SETUP-TODO.md` Phase 3 for the exact steps. PayPal's steps are left in
  place in case it's ever needed alongside or instead of Zeffy, but Zeffy
  is the active path.
- Planned build-out (see `SETUP-TODO.md` for the human side of each phase):
  Neon Postgres (done) → password-protected `/admin` (done) → events in the
  database (done) → Zeffy donations → donations go live → ticket sales with
  seat assignment. Everything not dependent on the donation platform is
  done; remaining phases are blocked on Zeffy's signup/verification (or
  PayPal API credentials, if that path is used instead).
- When that work starts, treat the server as the source of truth for any
  amount of money — never trust a client-submitted price/amount.
- **Ticketing (Phase 7) needs seat/table assignment, not just a quantity
  counter** — attendees have to be seated when they arrive, so the schema,
  `/admin` UI, and check-in flow all need to carry seat info, not just
  valid/used status. Confirmed by Nicolas 2026-08-08, don't lose this when
  designing that phase.
- **Donations (Phase 3-5) and tickets (Phase 7) must capture the payer's
  name and email as part of checkout**, not just process an anonymous
  PayPal payment. Nicolas needs to know who gave and who bought a ticket —
  a new `/admin` "Donations" tab and "Tickets" tab (separate from
  Messages) are the planned home for this. Confirmed by Nicolas
  2026-08-08.
- Contact form submissions (`/contact`) currently only go to the database
  (`contactSubmissions` table, visible in `/admin`) — there is no email
  notification. No mail-sending library is installed yet. Confirmed with
  Nicolas that `imanslightfoundation@gmail.com` does NOT currently receive
  a copy of these; if that's wanted, it needs its own small phase (a mail
  API/service + credentials), not a side effect of another phase.
