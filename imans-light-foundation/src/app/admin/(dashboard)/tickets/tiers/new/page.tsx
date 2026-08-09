import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import TierForm from '../../TierForm';

export default async function NewTierPage() {
  const allEvents = await getDb().select({ id: events.id, titleEn: events.titleEn }).from(events).orderBy(desc(events.createdAt));

  return (
    <>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Add Ticket Tier</h1>
      <TierForm events={allEvents} />
    </>
  );
}
