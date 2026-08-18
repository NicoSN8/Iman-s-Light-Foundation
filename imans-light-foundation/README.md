# Iman's Light Foundation

Website and admin platform for [Iman's Light Foundation](https://iman-s-light-foundation.vercel.app), a 501(c)(3) nonprofit — built and maintained end-to-end, including hosting, domain, content, donations, and event ticketing.

**Live site:** https://iman-s-light-foundation.vercel.app

## What it does

- **Public site** — home, about, programs, gallery, events, and a data/metrics page presenting the foundation's impact
- **Donations** — online giving integrated with [Zeffy](https://www.zeffy.com/), with donation records synced into the admin dashboard
- **Event ticketing** — event pages with ticket sales, order tracking, and manual order entry for offline sales
- **Custom admin dashboard** (auth-gated) — create/edit/delete events, review ticket orders, track donations, and read contact-form messages, all from one panel
- **Contact form** — messages delivered by email via Nodemailer and stored for the admin dashboard

Since launch, on-page optimization and content management grew organic traffic 20% in three months.

## Tech stack

| | |
|---|---|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Database** | Neon (serverless Postgres) via Drizzle ORM |
| **Storage** | Vercel Blob (images/media) |
| **Email** | Nodemailer |
| **Payments/ticketing** | Zeffy |
| **Hosting** | Vercel |

## Project structure

```
src/app/
├── about/ programs/ gallery/ events/ gala/    Public marketing pages
├── donate/                                    Donation flow
├── data-metrics/                              Public impact/metrics page
├── contact/                                    Contact form
├── admin/
│   ├── login/                                 Admin authentication
│   └── (dashboard)/
│       ├── events/                            Event CRUD
│       ├── tickets/                           Order tracking, manual orders, Zeffy sales
│       ├── donations/                         Donation records
│       └── MessagesTable.tsx                  Contact-form inbox
└── api/                                        Route handlers
```

## Getting started

```bash
npm install
cp .env.example .env.local   # Neon connection string, Vercel Blob token, SMTP creds
npm run db:push              # push the Drizzle schema to your database
npm run dev
```

Runs at http://localhost:3000.
