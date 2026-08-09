'use client';

import { useState } from 'react';
import Link from 'next/link';
import DeleteEventButton from './DeleteEventButton';

interface EventRow {
  id: string;
  titleEn: string;
  titleEs: string;
  location: string | null;
  dateLabel: string | null;
  eventDate: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export default function EventsTable({ events }: { events: EventRow[] }) {
  const [search, setSearch] = useState('');

  const visible = search.trim()
    ? events.filter((evt) => {
        const q = search.trim().toLowerCase();
        return evt.titleEn.toLowerCase().includes(q)
          || evt.titleEs.toLowerCase().includes(q)
          || (evt.location ?? '').toLowerCase().includes(q);
      })
    : events;

  return (
    <div>
      <div className="form-group" style={{ maxWidth: '320px' }}>
        <input
          type="text"
          placeholder="Search by title or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {events.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>No events yet.</p>
      ) : visible.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>No events match &quot;{search}&quot;.</p>
      ) : (
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
              {visible.map((evt) => (
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
      )}
    </div>
  );
}
