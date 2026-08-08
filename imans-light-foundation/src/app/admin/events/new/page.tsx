import { requireAdmin } from '@/lib/adminAuth';
import AdminNav from '../../AdminNav';
import EventForm from '../EventForm';

export default async function NewEventPage() {
  await requireAdmin();

  return (
    <div className="container" style={{ padding: '48px 24px' }}>
      <AdminNav />
      <h1 style={{ fontSize: '1.8rem', marginBottom: '24px' }}>Add Event</h1>
      <EventForm />
    </div>
  );
}
