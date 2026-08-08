# Setup To-Do — Iman's Light Foundation Website

This is the one place to check for anything **you** (Nicolas) need to do by
hand — clicking in a dashboard, copying a key, approving something. I can't
create accounts, log into PayPal/Wix/Vercel, or move money, so these steps
are always yours.

Each item says exactly where to click and how to verify it worked. Items are
grouped by phase, in the order you'll hit them. **BLOCKING** = work on the
site can't safely continue (or shouldn't go live) until you do this.
**LATER** = nothing is waiting on it yet, but it's coming.

---

## Phase 0 — Audit & Repair (this phase)

- [ ] **BLOCKING — Start the PayPal Confirmed Charity application today.**
  This is the single longest-lead item in the whole project (1–3 weeks) and
  doesn't depend on anything I build, so starting now saves real time later.
  It cuts your PayPal processing fee from 2.89% + $0.49 to **1.99% + $0.49**
  per donation — meaningful money over a year of donations.
  1. Log into the PayPal account that's linked to the foundation's bank
     account.
  2. Under account settings, confirm it's a **Business account**, type
     **Nonprofit Organization**, with the box checked that this is a
     registered charity. (If it's not currently a Business account, PayPal
     will walk you through converting it — do that first.)
  3. Go to **paypal.com/us/nonprofits** (search "PayPal charity
     confirmation" if that link moves) and start the confirmation process.
  4. Have ready to upload: your EIN (**93-4410846**), your IRS 501(c)(3)
     determination letter, a voided check or recent bank statement for the
     linked account, and a photo ID for yourself (or whoever is the
     authorized account holder).
  5. **Verify it worked:** you'll get a confirmation email from PayPal, and
     your account settings will eventually show a "Confirmed Charity" badge.
     If PayPal asks for a clearer copy of any document, just resubmit —
     that's the normal back-and-forth, not a rejection.

- [ ] **BLOCKING (before real donations) — Review the Privacy Policy and
  Terms of Use pages.** I wrote `/privacy` and `/terms` using standard
  nonprofit boilerplate because you asked me to — **I'm not a lawyer, and
  this is not legal advice.** Read them (run the site locally or view the
  deployed preview) and, ideally, have an actual lawyer glance at them before
  the site starts processing real donations. This doesn't block anything
  today — it blocks going live with money.

- [ ] **BLOCKING — Do not point `imanslightfoundation.org` at Vercel yet.**
  The Donate buttons on the new site currently link out to your existing Wix
  donations page (`imanslightfoundation.org/donations`) — that's
  intentional, and it only works because the domain still points at Wix.
  Cutting over DNS today would make that link 404 and donations would
  silently stop. Wait until I tell you PayPal donations are live and tested
  on the new site (Phase 5 below).

- [ ] **Keep the Wix account active for now.** One reason to keep it is now
  gone — every image and video that used to load from Wix has been
  downloaded and now lives inside this project, so the site no longer
  depends on Wix for media. The remaining reason: the Donate buttons still
  point at your live Wix donations page until PayPal replaces it (see
  above). Once that's done, you're free to let the Wix account lapse.

- [ ] **LATER — Merge and deploy this work.** Everything above lives on a
  git branch called `phase-0-audit-fixes`, not yet on `main`. When you're
  ready to see it live on the `iman-s-light-foundation.vercel.app` preview,
  say so and I'll merge it — Vercel will auto-deploy `main`.

---

## Phase 1 — Database ✅ done (2026-08-08)

- [x] **Create the database.** Done — Neon Postgres is connected to the
  `iman-s-light-foundation` Vercel project (connection named
  `Imans_Payments`), all three environments (Production, Preview,
  Development).
- [x] **Contact form now writes to the database**, in addition to still
  opening your email app as before. There's no admin view to read these
  yet (that's Phase 2) — for now the only way you see a new message is the
  email that still opens automatically.
- Note: there's a harmless, empty, unused Vercel project called
  `imans-light-foundation` (no hyphen after "imans") — created by an
  accidental command during this setup. It has no deployments and nothing
  points at it. Safe to delete from your Vercel dashboard (Settings →
  General → Delete Project) whenever you feel like tidying up, or just
  ignore it.

## Phase 2 — Admin login ✅ done (2026-08-08)

> **What this is:** a private staff-only dashboard at `yoursite.com/admin` —
> **not** something donors ever see or use. A donor never creates an account
> or logs in anywhere; they pay through PayPal and we capture their name,
> email, and amount straight from that transaction, automatically. `/admin`
> is just where *you* go afterward to see who gave, resend a receipt, or
> (later) check someone in at the door. One shared password for your team,
> not per-person accounts.

- [x] **Password set.** You generated the hash yourself using a local tool
  that never leaves your browser, so I never saw or stored your actual
  password — only you know it. **Make sure it's saved somewhere safe (a
  password manager)** — if it's lost, generating a new one is easy (open
  `admin-password-tool.html` in the project folder again), but there's no
  "forgot password" recovery flow.
- [x] **`/admin` is live** (once this branch is merged/deployed) — shows
  contact form submissions. Log in at `yoursite.com/admin/login`.

## Phase 3 — PayPal donations, sandbox (on hold — see Zeffy below)

> **Status update from you (2026-08-08):** the CEO is waiting on an email
> from PayPal to link the account to the new site — they're using PayPal's
> API (application programming interface), not a simple account-number
> linking. That matches the plan below exactly: the "API" they mean is the
> Client ID/Secret pair from a PayPal Developer app, which is what the two
> steps below produce. Nothing for you to do until that email arrives.
>
> **2026-08-08 — switching to Zeffy first.** The CEO decided to use Zeffy
> (zeffy.com) instead of waiting on PayPal, and I agreed it's a strong
> choice: genuinely 100% free (no platform/transaction/card fees — Zeffy
> makes money from an optional donor tip, the foundation keeps every
> dollar), it captures donor name + email automatically at checkout, and it
> also handles event ticket sales, which PayPal alone wouldn't. See the
> **"Zeffy setup"** section right below — that's the active next step, not
> the PayPal steps beneath it. The PayPal steps stay here in case the CEO
> wants both, or wants to switch back later.

### Zeffy setup (do this first)

- [ ] **BLOCKING — Sign up at zeffy.com.** Needs: your email, your name,
  the foundation's legal name, phone number, and the site's URL.
- [ ] **BLOCKING — Have the EIN and legal address ready.** Zeffy verifies
  the foundation's EIN (**93-4410846**) and legal name/address against IRS
  records, so make sure what you enter matches your IRS filing exactly.
- [ ] **BLOCKING — An authorized representative completes Stripe identity
  verification.** Zeffy processes payments through Stripe behind the
  scenes. Whoever is a board member, executive director, or other
  authorized signatory (this may need to be the CEO, not you, depending on
  who's authorized) will need to upload a government-issued ID, take a
  selfie, and provide the last 4 digits of their SSN, directly to
  Stripe/Zeffy's own verification flow — **never send any of that to me or
  type it in chat.** Stripe typically reviews within 24-72 hours.
- [ ] **BLOCKING — Connect the foundation's bank account** (must be the
  organization's own account, not a personal one) so donations/ticket
  revenue has somewhere to deposit to.
- [ ] **LATER — Once the account is approved,** send me the Zeffy
  donation/ticket form link (or give me access to create one) and I'll
  embed it on `/donate` and wire the Gala's ticket flow to it — this
  replaces the PayPal Checkout integration work described below, so once
  Zeffy is live we likely won't need the PayPal steps at all.

- [ ] **LATER — Create a PayPal Developer account and a sandbox app.** At
  **developer.paypal.com**, log in with the same PayPal account, go to **My
  Apps & Credentials**, make sure you're on the **Sandbox** tab, and click
  **Create App**. This gives you a sandbox **Client ID** and **Client
  Secret** — copy both into Vercel's Environment Variables (I'll give you
  the exact variable names when we get here). Sandbox uses fake money, so
  this is safe to set up any time.
- [ ] **LATER — Register the sandbox webhook URL.** Still in the Developer
  Dashboard, under your sandbox app, add a webhook pointing at
  `https://<your-preview-url>/api/paypal/webhook` and subscribe it to
  payment-related events (I'll list the exact ones). Copy the **Webhook ID**
  PayPal gives you into Vercel as well.
- [ ] **LATER — Run the full sandbox test before we go further:** make a
  test donation using PayPal's sandbox buyer account, confirm it appears in
  your `/admin` dashboard, confirm a donation receipt email arrives, and
  confirm refunding it in the sandbox updates the status correctly.

## Phase 4 — Email receipts, sent from the org's Gmail (not started)

> Using `imanslightfoundation@gmail.com` directly (instead of a separate
> email-sending service) as requested. It's genuinely simpler — no new
> account, no DNS changes — and Gmail's free sending limit is 500 emails a
> day, far more than a local nonprofit's donation/ticket volume will ever
> hit. Every receipt is also BCC'd back to the org inbox, so you always have
> a copy of what went out.
>
> **2026-08-08:** the two steps below don't need to wait for PayPal/Zeffy —
> Nicolas asked whether `/contact` submissions could reach
> `imanslightfoundation@gmail.com` without adding a new service. The same
> App Password created here can power that immediately (a contact-form
> email whenever someone submits, in addition to the future donation/ticket
> receipts) — so it's worth doing these two steps now rather than later.

- [ ] **LATER — Turn on 2-Step Verification on the org's Gmail** (required
  before Google will let us create the app-specific password below).
  1. Sign in to **imanslightfoundation@gmail.com**.
  2. Go to **myaccount.google.com/security**.
  3. Under "How you sign in to Google," click **2-Step Verification** →
     **Get Started**, and follow the prompts (you'll need a phone number to
     receive a one-time code).
  4. **Verify:** the Security page shows "2-Step Verification: On."

- [ ] **LATER — Create an App Password** (a special 16-character password
  just for the website to send mail — it's separate from the real Gmail
  password and can be revoked any time without changing the real password).
  1. Still signed in to the org Gmail, go to
     **myaccount.google.com/apppasswords** (you may be asked to sign in
     again).
  2. Under "App name," type **Website Receipts** and click **Create**.
  3. Google shows a 16-character password in a yellow box — copy it right
     away, it's shown only once. Spaces in it don't matter.
  4. Send that password to me somewhere private (not in a public chat or
     doc) so I can add it to Vercel, or paste it directly into Vercel
     yourself if you'd rather — I'll tell you the exact variable name when
     we get here.
  5. **Verify:** back on the App Passwords page, you'll see "Website
     Receipts" listed. (You can revoke it there any time.)

- [ ] **LATER — I'll wire up sending.** I'll add the Gmail address and that
  app password as two Vercel environment variables, and the site will send
  bilingual receipts through Gmail's own mail servers whenever a donation or
  ticket purchase completes — no further setup needed after the two steps
  above.

## Phase 5 — Go live with donations (not started)

- [ ] **BLOCKING (before this phase) — Confirmed Charity status must be
  approved.** Otherwise every live donation is overcharged and PayPal does
  not refund the difference retroactively.
- [ ] **LATER — Create a LIVE PayPal app and LIVE webhook**, same steps as
  Phase 3 but on the **Live** tab instead of Sandbox, pointing at your real
  production URL.
- [ ] **LATER — Swap Vercel's environment variables from sandbox to live
  values** for the four PayPal variables (I'll tell you exactly which ones).
  No code changes happen at this step — only values.
- [ ] **LATER — The real-money end-to-end test before we call it done:**
      1. Donate **$1.00** with a real card.
      2. Confirm the $1 actually lands in the foundation's linked bank
         account (may take a day or two to settle).
      3. Confirm you receive a proper bilingual donation receipt by email.
      4. Refund that $1 from PayPal and confirm the site's `/admin` shows it
         as refunded.
      Only after all four pass should real fundraising go live.
- [ ] **Now safe to cut over DNS** — point `www.imanslightfoundation.org` at
  Vercel once the above test passes.

## Phase 6 — Events managed from `/admin` ✅ done (2026-08-08)

- [x] **Blob storage connected and working.** One hiccup along the way: the
  first store got created as "Private" by default, which would have blocked
  every event photo from displaying on the public site — access mode can
  only be set at creation, so I deleted that empty store and created a
  correctly-configured public one in its place (`imans-light-blob`). Fully
  tested with a real file upload and confirmed publicly viewable before
  cleaning up the test file. Nothing further needed from you.
- [x] All 36 existing events plus the previously-hardcoded gala card are now
  real, editable rows — manage them at **`yoursite.com/admin/events`**: add,
  edit, delete, mark featured, or unpublish/stage an event before it's
  public.

## Phase 7 — Ticket sales (not started)

- [ ] **LATER — Nothing new to configure**, reuses the PayPal setup from
  Phase 3/5. You'll manage ticket types and prices from `/admin`, and check
  attendees in at the door from `/admin/checkin` using your phone's camera.

---

*Updated 2026-08-08: Phase 6 (events in the database, with working photo
upload) fully complete. Everything not dependent on PayPal is done — next
step is Phase 3, waiting on the PayPal API email.*
