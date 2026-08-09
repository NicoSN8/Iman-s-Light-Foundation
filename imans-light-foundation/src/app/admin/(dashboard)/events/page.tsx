import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import EventsTable from './EventsTable';

export default async function AdminEventsPage() {
  const allEvents = await getDb().select().from(events).orderBy(desc(events.eventDate));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Events</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            {allEvents.length} event{allEvents.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link href="/admin/events/new" className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
          + Add Event
        </Link>
      </div>

      <EventsTable events={allEvents} />
    </>
  );
}
