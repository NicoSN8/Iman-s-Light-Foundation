import { pgTable, uuid, text, timestamp, date, boolean } from 'drizzle-orm/pg-core';

export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  lang: text('lang').notNull().default('en'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
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
