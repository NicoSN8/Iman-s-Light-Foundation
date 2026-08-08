import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { requireAdmin } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import AdminNav from '../AdminNav';
import DeleteEventButton from './DeleteEventButton';

export default async function AdminEventsPage() {
  await requireAdmin();

  const allEvents = await getDb().select().from(events).orderBy(desc(events.eventDate));

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      <AdminNav />
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

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
              <th style={{ padding: '12px 8px' }}>Title</th>
              <th style={{ padding: '12px 8px' }}>Date</th>
              <th style={{ padding: '12px 8px' }}>Featured</th>
              <th style={{ padding: '12px 8px' }}>Published</th>
              <th style={{ padding: '12px 8px' }}></th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map((evt) => (
              <tr key={evt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <td style={{ padding: '12px 8px' }}>{evt.titleEn}</td>
                <td style={{ padding: '12px 8px', whiteSpace: 'nowrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                  {evt.dateLabel || evt.eventDate || '—'}
                </td>
                <td style={{ padding: '12px 8px' }}>{evt.isFeatured ? '★' : ''}</td>
                <td style={{ padding: '12px 8px' }}>{evt.isPublished ? 'Yes' : 'No — draft'}</td>
                <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
                  <Link href={`/admin/events/${evt.id}/edit`} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 14px', marginRight: '8px' }}>
                    Edit
                  </Link>
                  <DeleteEventButton id={evt.id} title={evt.titleEn} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
