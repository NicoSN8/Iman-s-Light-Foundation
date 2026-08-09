'use client';

import { useState } from 'react';

interface Donation {
  id: string;
  donorName: string | null;
  donorEmail: string | null;
  amountCents: number | null;
  campaignName: string | null;
  receiptUrl: string | null;
  receivedAt: string | Date;
}

function formatMoney(cents: number | null) {
  if (cents == null) return '—';
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function DonationsTable({ donations }: { donations: Donation[] }) {
  const [search, setSearch] = useState('');

  const visible = search.trim()
    ? donations.filter((d) => {
        const q = search.trim().toLowerCase();
        return (d.donorName ?? '').toLowerCase().includes(q) || (d.donorEmail ?? '').toLowerCase().includes(q);
      })
    : donations;

  if (donations.length === 0) {
    return (
      <p style={{ color: 'rgba(255,255,255,0.7)' }}>
        No donations received yet. Once someone gives through the Zeffy form on /donate,
        it&apos;ll show up here automatically.
      </p>
    );
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or email…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '16px', maxWidth: '320px' }}
      />
      {visible.length === 0 && (
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>No donations match &quot;{search}&quot;.</p>
      )}
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
            </tr>
          </thead>
          <tbody>
            {visible.map((d) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
