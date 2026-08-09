import { eq, desc } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { getDb } from '@/db';
import { events, ticketTiers } from '@/db/schema';
import TierForm from '../../../TierForm';

export default async function EditTierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [tier] = await getDb().select().from(ticketTiers).where(eq(ticketTiers.id, id)).limit(1);
  if (!tier) notFound();

  const allEvents = await getDb().select({ id: events.id, titleEn: events.titleEn }).from(events).orderBy(desc(events.createdAt));

  return (
    <>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Edit Ticket Tier</h1>
      <TierForm initialTier={tier} events={allEvents} />
    </>
  );
}
