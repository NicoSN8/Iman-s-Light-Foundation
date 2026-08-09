import type { Metadata } from 'next';
import { eq, and } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { getDb } from '@/db';
import { events, ticketTiers } from '@/db/schema';
import GalaContent from './GalaContent';

export const metadata: Metadata = {
  title: '3rd Annual Gala',
  description:
    "Music and Lights for Life: Iman's Light Foundation's biggest night of the year. Reserve your table for the 3rd Annual Gala.",
};

// Same reasoning as /events — this is an admin-managed event row, so it
// must render fresh on every request, not be statically prerendered.
export const dynamic = 'force-dynamic';

const GALA_EVENT_ID = 'b58cabc5-7cdc-4719-80a7-283f2932a07c';

export default async function GalaPage() {
  const [event] = await getDb().select().from(events).where(eq(events.id, GALA_EVENT_ID)).limit(1);
  if (!event || !event.isPublished) notFound();

  const tiers = await getDb()
    .select()
    .from(ticketTiers)
    .where(and(eq(ticketTiers.eventId, GALA_EVENT_ID), eq(ticketTiers.isActive, true)))
    .orderBy(ticketTiers.sortOrder);

  return <GalaContent event={event} tiers={tiers} />;
}
