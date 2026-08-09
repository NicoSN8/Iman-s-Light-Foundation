import { pgTable, uuid, text, timestamp, date, boolean, integer, jsonb } from 'drizzle-orm/pg-core';

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  lang: text('lang').notNull().default('en'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  adminReply: text('admin_reply'),
  repliedAt: timestamp('replied_at', { withTimezone: true }),
});

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  titleEn: text('title_en').notNull(),
  titleEs: text('title_es').notNull(),
  descriptionEn: text('description_en').notNull().default(''),
  descriptionEs: text('description_es').notNull().default(''),
  location: text('location').notNull().default(''),
  image: text('image'),
  // Null eventDate means "no specific day set yet" — dateLabel (e.g. "October
  // 2026") is shown instead. See EventsContent.tsx for the display logic.
  eventDate: date('event_date'),
  dateLabel: text('date_label'),
  isFeatured: boolean('is_featured').notNull().default(false),
  isPublished: boolean('is_published').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Ticket tiers (table sizes/prices) belong to a specific event — currently
// only the 3rd Annual Gala has any, but this generalizes to any future
// ticketed event without a schema change.
export const ticketTiers = pgTable('ticket_tiers', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  nameEn: text('name_en').notNull(),
  nameEs: text('name_es').notNull(),
  descriptionEn: text('description_en').notNull().default(''),
  descriptionEs: text('description_es').notNull().default(''),
  priceCents: integer('price_cents').notNull(),
  seatsIncluded: integer('seats_included').notNull().default(1),
  // Null capacity means unlimited — e.g. individual seats vs. a capped
  // number of sponsor tables.
  capacity: integer('capacity'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// Every row here is entered by staff (no public write path) — either a
// cash/at-the-door commitment taken by phone/in-person, or a Zeffy sale
// reconciled manually once that's live. This is the seating source of
// truth: table assignment + check-in status live here, not anywhere else.
export const ticketOrders = pgTable('ticket_orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  tierId: uuid('tier_id').notNull().references(() => ticketTiers.id),
  buyerName: text('buyer_name').notNull(),
  buyerEmail: text('buyer_email'),
  buyerPhone: text('buyer_phone'),
  quantity: integer('quantity').notNull().default(1),
  // Denormalized (tier.seatsIncluded * quantity at order time) so seating
  // math never has to join back to a tier that may later change.
  totalSeats: integer('total_seats').notNull(),
  // Always computed server-side from the tier's priceCents — never trust a
  // client-submitted amount for anything involving money.
  amountCents: integer('amount_cents').notNull(),
  paymentMethod: text('payment_method').notNull().default('cash_door'), // cash_door | zeffy | comp
  status: text('status').notNull().default('confirmed'), // confirmed | paid | cancelled
  tableAssignment: text('table_assignment'),
  seatNotes: text('seat_notes'),
  checkedIn: boolean('checked_in').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  // Set only for orders the Zeffy webhook created automatically (matched by
  // exact amount to a single active tier) — lets retried webhook deliveries
  // be ignored instead of creating a duplicate seated order.
  zeffyPaymentId: text('zeffy_payment_id').unique(),
});

// Populated automatically by the Zeffy webhook (src/app/api/webhooks/zeffy)
// when a donation payment comes through. rawPayload always stores the full
// JSON Zeffy sent us, no matter what — a safety net so no donor data is
// ever silently lost even if the parsed fields below turn out to be wrong
// once we see a real payload and confirm the field names.
export const donations = pgTable('donations', {
  id: uuid('id').primaryKey().defaultRandom(),
  donorName: text('donor_name'),
  donorEmail: text('donor_email'),
  amountCents: integer('amount_cents'),
  campaignName: text('campaign_name'),
  receiptUrl: text('receipt_url'),
  // Zeffy's own payment ID, used to ignore duplicate webhook retries.
  zeffyPaymentId: text('zeffy_payment_id').unique(),
  rawPayload: jsonb('raw_payload').notNull(),
  receivedAt: timestamp('received_at', { withTimezone: true }).notNull().defaultNow(),
});

// A Zeffy ticket sale that came through the webhook but couldn't be
// confidently matched to one of our ticket tiers (e.g. unrecognized tier
// name, or the payload shape didn't match what we expected). Staff reviews
// these in /admin and manually creates the matching ticketOrders row —
// safer than guessing and creating a ticket order with the wrong seat
// count, since that directly affects physical seating at the event.
export const unmatchedZeffySales = pgTable('unmatched_zeffy_sales', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerName: text('buyer_name'),
  buyerEmail: text('buyer_email'),
  amountCents: integer('amount_cents'),
  zeffyPaymentId: text('zeffy_payment_id').unique(),
  rawPayload: jsonb('raw_payload').notNull(),
  reviewed: boolean('reviewed').notNull().default(false),
  receivedAt: timestamp('received_at', { withTimezone: true }).notNull().defaultNow(),
});
