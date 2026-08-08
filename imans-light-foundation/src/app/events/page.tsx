import type { Metadata } from 'next';
import { desc, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
  title: 'Events',
  description:
    "See upcoming and past Iman's Light Foundation events, including the Annual Gala and Music & Lights for Life community fundraisers.",
};

// Events are managed from /admin — this must render fresh on every request,
// not be statically prerendered at build time, or new/edited events would
// never appear on the public site without a full redeploy.
export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const allEvents = await getDb()
    .select()
    .from(events)
    .where(eq(events.isPublished, true))
    .orderBy(desc(events.eventDate));

  const featuredEvents = allEvents.filter((e) => e.isFeatured);
  const gridEvents = allEvents.filter((e) => !e.isFeatured);

  return <EventsContent featuredEvents={featuredEvents} gridEvents={gridEvents} />;
}
