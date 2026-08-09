import { pgTable, uuid, text, timestamp, date, boolean, integer } from 'drizzle-orm/pg-core';

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
});
