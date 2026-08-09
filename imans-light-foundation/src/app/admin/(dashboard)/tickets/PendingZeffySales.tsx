'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PendingSale {
  id: string;
  buyerName: string | null;
  buyerEmail: string | null;
  rawPayload: unknown;
  receivedAt: string | Date;
}

export default function PendingZeffySales({ sales }: { sales: PendingSale[] }) {
  const router = useRouter();
  const [dismissingId, setDismissingId] = useState<string | null>(null);

  if (sales.length === 0) return null;

  const handleDismiss = async (id: string) => {
    setDismissingId(id);
    try {
      await fetch(`/api/admin/tickets/unmatched/${id}`, { method: 'PATCH' });
      router.refresh();
    } finally {
      setDismissingId(null);
    }
  };

  return (
    <section style={{ marginBottom: '40px' }}>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Pending Zeffy Ticket Sales</h2>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '16px', maxWidth: '640px' }}>
        These came through Zeffy but weren&apos;t automatically matched to a seat count —
        check the raw data, then use &quot;+ Add Order&quot; below with payment method
        &quot;Zeffy&quot; to create the real order and assign a table. Once it&apos;s added,
        click Dismiss here so it doesn&apos;t show up twice.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sales.map((s) => (
          <div key={s.id} style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '16px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <strong>{s.buyerName ?? 'Name not found in payload'}</strong>
                {s.buyerEmail && <span style={{ color: 'rgba(255,255,255,0.6)', marginLeft: '8px' }}>{s.buyerEmail}</span>}
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  {new Date(s.receivedAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                </div>
              </div>
              <button
                onClick={() => handleDismiss(s.id)}
                disabled={dismissingId === s.id}
                className="btn btn-outline"
                style={{ padding: '6px 16px', fontSize: '0.8rem' }}
              >
                {dismissingId === s.id ? 'Dismissing…' : 'Dismiss'}
              </button>
            </div>
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--gold)', fontSize: '0.85rem' }}>Raw data</summary>
              <pre style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '8px', maxHeight: '300px', overflow: 'auto' }}>
                {JSON.stringify(s.rawPayload, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>
    </section>
  );
}
