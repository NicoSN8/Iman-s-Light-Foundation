import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { donations } from '@/db/schema';

function formatMoney(cents: number | null) {
  if (cents == null) return '—';
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminDonationsPage() {
  const rows = await getDb().select().from(donations).orderBy(desc(donations.receivedAt));
  const total = rows.reduce((sum, d) => sum + (d.amountCents ?? 0), 0);

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Donations</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          {rows.length} donation{rows.length === 1 ? '' : 's'} received via Zeffy
          {total > 0 && <> · {formatMoney(total)} total</>}
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
                <th style={{ padding: '12px 8px' }}>Amount</th>
                <th style={{ padding: '12px 8px' }}>Campaign</th>
                <th style={{ padding: '12px 8px' }}>Receipt</th>
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
                  <td style={{ padding: '12px 8px', fontWeight: 600, color: 'var(--gold)' }}>{formatMoney(d.amountCents)}</td>
                  <td style={{ padding: '12px 8px' }}>{d.campaignName ?? '—'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    {d.receiptUrl ? (
                      <a href={d.receiptUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)' }}>
                        View
                      </a>
                    ) : '—'}
                  </td>
                  <td style={{ padding: '12px 8px', maxWidth: '320px' }}>
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
