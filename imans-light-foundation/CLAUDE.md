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
- **Data:** `src/data/events.json` and `src/data/gallery.json` are static
  JSON, imported directly — no CMS, no database (yet; see roadmap below).

## Conventions

- No test suite exists yet.
- No API routes exist yet — this is currently a fully static/client-rendered
  site with no backend.
- Don't invent facts, statistics, testimonials, partner names, or event
  details. If a real-world fact is needed and hasn't been provided, ask.
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
```

Node.js was not preinstalled on the original dev machine; if `npm`/`node`
aren't found, install Node LTS first (`winget install OpenJS.NodeJS.LTS` on
Windows).

## Known constraints / roadmap

- **Donate buttons currently link out** to the old Wix donations page
  (`imanslightfoundation.org/donations`). This is intentional and temporary —
  do not point the production domain at this Vercel deployment until real
  PayPal checkout replaces that link, or donations will 404 silently. Full
  context and the do-not-do-this-yet list lives in `SETUP-TODO.md`.
- Planned build-out (see `SETUP-TODO.md` for the human side of each phase):
  Neon Postgres → password-protected `/admin` → PayPal donations in sandbox →
  bilingual IRS-compliant receipts → donations go live → events move into the
  database → ticket sales with QR check-in.
- When that work starts, treat the server as the source of truth for any
  amount of money — never trust a client-submitted price/amount.
