import { eq, desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import HomeContent from './HomeContent';

// The homepage's "Highlighted Events" section is admin-managed data, so
// this must render fresh on every request -- same reasoning as /events and
// /gala. Without this, new or edited events wouldn't appear here without a
// full redeploy.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const featuredEvents = await getDb()
    .select()
    .from(events)
    .where(eq(events.isFeatured, true))
    .orderBy(desc(events.eventDate));

  return <HomeContent featuredEvents={featuredEvents.filter((e) => e.isPublished)} />;
}
