import Link from 'next/link';
import { asc } from 'drizzle-orm';
import { getDb } from '@/db';
import { events, ticketTiers } from '@/db/schema';
import DeleteTierButton from '../DeleteTierButton';

export default async function AdminTicketTiersPage() {
  const db = getDb();

  const [allTiers, allEvents] = await Promise.all([
    db.select().from(ticketTiers).orderBy(asc(ticketTiers.sortOrder)),
    db.select({ id: events.id, titleEn: events.titleEn }).from(events),
  ]);

  const eventById = new Map(allEvents.map((e) => [e.id, e]));

  return (
    <>
      <div style={{ marginBottom: '8px' }}>
        <Link href="/admin/tickets" style={{ color: 'var(--gold)', fontSize: '0.85rem' }}>
          ← Back to Tickets
        </Link>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.8rem' }}>Ticket Tiers</h1>
        <Link href="/admin/tickets/tiers/new" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '8px 18px' }}>
          + Add Tier
        </Link>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '640px' }}>
        This sets pricing and how many of each tier can ever be sold (&quot;Sales Cap&quot;) — it&apos;s
        not where you seat anyone. To see who bought a ticket and assign them a table, go to{' '}
        <Link href="/admin/tickets" style={{ color: 'var(--gold)' }}>Tickets</Link>.
      </p>

      {allTiers.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>No ticket tiers yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>Event</th>
                <th style={{ padding: '12px 8px' }}>Tier</th>
                <th style={{ padding: '12px 8px' }}>Price</th>
                <th style={{ padding: '12px 8px' }}>Seats</th>
                <th style={{ padding: '12px 8px' }} title="How many of this tier can ever be sold, total">Sales Cap</th>
                <th style={{ padding: '12px 8px' }}>Active</th>
                <th style={{ padding: '12px 8px' }}></th>
              </tr>
            </thead>
            <tbody>
              {allTiers.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <td style={{ padding: '12px 8px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>{eventById.get(t.eventId)?.titleEn ?? '—'}</td>
                  <td style={{ padding: '12px 8px' }}>{t.nameEn}</td>
                  <td style={{ padding: '12px 8px' }}>${(t.priceCents / 100).toFixed(2)}</td>
                  <td style={{ padding: '12px 8px' }}>{t.seatsIncluded}</td>
                  <td style={{ padding: '12px 8px' }}>{t.capacity ?? 'Unlimited'}</td>
                  <td style={{ padding: '12px 8px' }}>{t.isActive ? 'Yes' : 'No'}</td>
                  <td style={{ padding: '12px 8px', whiteSpace: 'nowrap' }}>
                    <Link href={`/admin/tickets/tiers/${t.id}/edit`} className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 14px', marginRight: '8px' }}>
                      Edit
                    </Link>
                    <DeleteTierButton id={t.id} name={t.nameEn} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
