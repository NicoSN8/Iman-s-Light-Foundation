import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { contactSubmissions } from '@/db/schema';
import MessagesTable from './MessagesTable';

export default async function AdminPage() {
  const submissions = await getDb()
    .select()
    .from(contactSubmissions)
    .orderBy(desc(contactSubmissions.createdAt));

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Messages</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          {submissions.length} contact submission{submissions.length === 1 ? '' : 's'}
        </p>
      </div>

      <MessagesTable submissions={submissions} />
    </>
  );
}
