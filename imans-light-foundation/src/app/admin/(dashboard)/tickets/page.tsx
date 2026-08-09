import { desc, asc, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { events, ticketTiers, ticketOrders, unmatchedZeffySales } from '@/db/schema';
import AddOrderForm from './AddOrderForm';
import OrdersTable from './OrdersTable';
import PendingZeffySales from './PendingZeffySales';

export default async function AdminTicketsPage() {
  const db = getDb();

  const [allTiers, allOrders, allEvents, pendingZeffySales] = await Promise.all([
    db.select().from(ticketTiers).orderBy(asc(ticketTiers.sortOrder)),
    db.select().from(ticketOrders).orderBy(desc(ticketOrders.createdAt)),
    db.select({ id: events.id, titleEn: events.titleEn }).from(events).orderBy(desc(events.createdAt)),
    db.select().from(unmatchedZeffySales).where(eq(unmatchedZeffySales.reviewed, false)).orderBy(desc(unmatchedZeffySales.receivedAt)),
  ]);

  const tierById = new Map(allTiers.map((t) => [t.id, t]));

  const ordersWithTierName = allOrders.map((o) => ({
    ...o,
    tierNameEn: tierById.get(o.tierId)?.nameEn ?? 'Unknown tier',
  }));

  const activeOrders = allOrders.filter((o) => o.status !== 'cancelled');
  const totalSeats = activeOrders.reduce((sum, o) => sum + o.totalSeats, 0);
  const totalRaised = activeOrders.filter((o) => o.status === 'paid').reduce((sum, o) => sum + o.amountCents, 0);
  const assignedCount = activeOrders.filter((o) => o.tableAssignment).length;
  const unassignedCount = activeOrders.length - assignedCount;

  // Default the "add order" form to the most recent event that has tiers —
  // in practice, the Gala, but this stays correct if that ever changes.
  const eventIdWithTiers = allTiers[0]?.eventId ?? allEvents[0]?.id ?? '';
  const tiersForDefaultEvent = allTiers.filter((t) => t.eventId === eventIdWithTiers && t.isActive);

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Tickets</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          {totalSeats} seat{totalSeats === 1 ? '' : 's'} confirmed · {assignedCount} order{assignedCount === 1 ? '' : 's'} with a table assigned, {unassignedCount} not yet seated
          {totalRaised > 0 && <> · ${(totalRaised / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })} collected (paid)</>}
        </p>
      </div>

      <PendingZeffySales sales={pendingZeffySales} />

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '1.3rem' }}>Every Ticket Purchase</h2>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <AddOrderForm eventId={eventIdWithTiers} tiers={tiersForDefaultEvent} />
        </div>

        <OrdersTable orders={ordersWithTierName} />
      </section>
    </>
  );
}
