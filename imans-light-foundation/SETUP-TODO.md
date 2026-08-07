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

## Phase 1 — Database (not started)

- [ ] **LATER — Create the database.** From your Vercel project dashboard:
  **Storage** tab → **Create Database** → choose **Neon** → pick a region
  (closest to Florida is `us-east-1`) → **Connect to Project** → select all
  three environments (Production, Preview, Development). Vercel and Neon
  handle the connection automatically — you won't need to copy any keys by
  hand for this step.
  **Verify:** the Storage tab shows a connected Neon database, and your
  Vercel project's Environment Variables list gains a `DATABASE_URL` entry
  automatically.

## Phase 2 — Admin login (not started)

- [ ] **LATER — Choose an admin password.** I'll ask you to pick a strong
  password for the site's private `/admin` area (donations, contact
  messages, later ticket check-in). You'll paste it somewhere temporarily so
  I can generate a secure hash of it, then that hash — never the plain
  password — goes into a Vercel environment variable. Keep the real password
  somewhere safe (a password manager); it isn't stored anywhere in the code.

## Phase 3 — PayPal donations, sandbox (not started)

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

## Phase 4 — Email receipts (not started)

- [ ] **LATER — Add Resend from the Vercel Marketplace.** From your Vercel
  dashboard: **Integrations** (or **Storage**, Resend is listed alongside
  databases) → find **Resend** → **Add Integration**. This creates the
  account and injects the API key automatically.
- [ ] **LATER — Add DNS records so receipts send from your own domain.**
  Resend will show you 2–3 DNS records (SPF/DKIM) to add wherever
  `imanslightfoundation.org`'s DNS is managed. Tell me who manages that DNS
  when we reach this step and I'll give you the exact records to paste in.
  Until this is done, test emails still work, just from a generic
  `resend.dev` address instead of your own.

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

## Phase 6 — Events in the database (not started)

- [ ] **LATER — Nothing for you to configure.** Once built, you'll add and
  edit events yourself from `/admin` — no dashboard clicking required.

## Phase 7 — Ticket sales (not started)

- [ ] **LATER — Nothing new to configure**, reuses the PayPal setup from
  Phase 3/5. You'll manage ticket types and prices from `/admin`, and check
  attendees in at the door from `/admin/checkin` using your phone's camera.

---

*Updated at the end of Phase 0, 2026-08-07.*
