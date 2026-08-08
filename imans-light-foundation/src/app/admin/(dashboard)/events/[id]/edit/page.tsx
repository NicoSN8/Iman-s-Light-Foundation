import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { getDb } from '@/db';
import { events } from '@/db/schema';
import EventForm from '../../EventForm';

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [event] = await getDb().select().from(events).where(eq(events.id, id)).limit(1);
  if (!event) notFound();

  return (
    <>
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Edit Event</h1>
      <EventForm initialEvent={event} />
    </>
  );
}
