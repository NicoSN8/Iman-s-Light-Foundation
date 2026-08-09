import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { donations } from '@/db/schema';

export default async function AdminDonationsPage() {
  const rows = await getDb().select().from(donations).orderBy(desc(donations.receivedAt));

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Donations</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          {rows.length} donation{rows.length === 1 ? '' : 's'} received via Zeffy
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px', maxWidth: '640px' }}>
          Amounts aren&apos;t shown here yet — Zeffy&apos;s exact payload format hasn&apos;t
          been confirmed against a real transaction, so a wrong dollar amount isn&apos;t
          worth the risk of showing. Treat your Zeffy dashboard as the source of truth
          for exact amounts until this note goes away. Expand &quot;Raw data&quot; on any
          row to see everything Zeffy actually sent.
        </p>
      </div>

      {rows.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          No donations received yet. Once someone gives through the Zeffy form on /donate,
          it&apos;ll show up here automatically.
        </p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', textAlign: 'left' }}>
                <th style={{ padding: '12px 8px' }}>Received</th>
                <th style={{ padding: '12px 8px' }}>Donor</th>
                <th style={{ padding: '12px 8px' }}>Email</th>
                <th style={{ padding: '12px 8px' }}>Campaign</th>
                <th style={{ padding: '12px 8px' }}>Raw data</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', verticalAlign: 'top' }}>
                  <td style={{ padding: '12px 8px', whiteSpace: 'nowrap', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    {new Date(d.receivedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td style={{ padding: '12px 8px' }}>{d.donorName ?? '—'}</td>
                  <td style={{ padding: '12px 8px' }}>{d.donorEmail ?? '—'}</td>
                  <td style={{ padding: '12px 8px' }}>{d.campaignName ?? '—'}</td>
                  <td style={{ padding: '12px 8px', maxWidth: '360px' }}>
                    <details>
                      <summary style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: '0.85rem' }}>View</summary>
                      <pre style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '8px', maxHeight: '300px', overflow: 'auto' }}>
                        {JSON.stringify(d.rawPayload, null, 2)}
                      </pre>
                    </details>
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
