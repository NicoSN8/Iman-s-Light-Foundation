import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { requireAdmin } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import AdminNav from '../../../AdminNav';
import EventForm from '../../EventForm';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  const [event] = await getDb().select().from(events).where(eq(events.id, id)).limit(1);
  if (!event) notFound();

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      <AdminNav />
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Edit Event</h1>
      <EventForm initialEvent={event} />
    </div>
  );
}
