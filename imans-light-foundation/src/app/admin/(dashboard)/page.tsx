import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { contactSubmissions } from '@/db/schema';

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

      {submissions.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>No messages yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>Date</th>
                <th style={{ padding: '12px 8px' }}>Name</th>
                <th style={{ padding: '12px 8px' }}>Email</th>
                <th style={{ padding: '12px 8px' }}>Phone</th>
                <th style={{ padding: '12px 8px' }}>Subject</th>
                <th style={{ padding: '12px 8px' }}>Message</th>
                <th style={{ padding: '12px 8px' }}>Lang</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top' }}>
                  <td style={{ padding: '12px 8px', whiteSpace: 'nowrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    {new Date(s.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td style={{ padding: '12px 8px' }}>{s.name}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <a href={`mailto:${s.email}`}>{s.email}</a>
                  </td>
                  <td style={{ padding: '12px 8px' }}>{s.phone ?? '—'}</td>
                  <td style={{ padding: '12px 8px' }}>{s.subject}</td>
                  <td style={{ padding: '12px 8px', maxWidth: '360px' }}>{s.message}</td>
                  <td style={{ padding: '12px 8px', textTransform: 'uppercase', fontSize: '0.8rem' }}>{s.lang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
