'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TierOption {
  id: string;
  nameEn: string;
  priceCents: number;
  seatsIncluded: number;
}

export default function AddOrderForm({ eventId, tiers }: { eventId: string; tiers: TierOption[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [values, setValues] = useState({
    buyerName: '',
    buyerEmail: '',
    buyerPhone: '',
    tierId: tiers[0]?.id ?? '',
    quantity: 1,
    paymentMethod: 'cash_door',
    status: 'confirmed',
  });

  const selectedTier = tiers.find((t) => t.id === values.tierId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/admin/tickets/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId, ...values }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }
      setValues({ buyerName: '', buyerEmail: '', buyerPhone: '', tierId: tiers[0]?.id ?? '', quantity: 1, paymentMethod: 'cash_door', status: 'confirmed' });
      setOpen(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="btn btn-primary" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
        + Add Order
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '20px', marginBottom: '8px', maxWidth: '700px' }}
    >
      <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>
        Use this for a cash/door commitment you took by phone or in person, or to log a Zeffy sale once that&apos;s live — every ticket order is entered by staff, not the public site.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: '1 1 200px' }}>
          <label>Buyer Name *</label>
          <input required value={values.buyerName} onChange={(e) => setValues((v) => ({ ...v, buyerName: e.target.value }))} />
        </div>
        <div className="form-group" style={{ flex: '1 1 200px' }}>
          <label>Email</label>
          <input type="email" value={values.buyerEmail} onChange={(e) => setValues((v) => ({ ...v, buyerEmail: e.target.value }))} />
        </div>
        <div className="form-group" style={{ flex: '1 1 160px' }}>
          <label>Phone</label>
          <input value={values.buyerPhone} onChange={(e) => setValues((v) => ({ ...v, buyerPhone: e.target.value }))} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <div className="form-group" style={{ flex: '1 1 240px' }}>
          <label>Tier *</label>
          <select required value={values.tierId} onChange={(e) => setValues((v) => ({ ...v, tierId: e.target.value }))}>
            {tiers.map((t) => (
              <option key={t.id} value={t.id}>{t.nameEn} — ${(t.priceCents / 100).toFixed(2)} ({t.seatsIncluded} seat{t.seatsIncluded === 1 ? '' : 's'})</option>
            ))}
          </select>
        </div>
        <div className="form-group" style={{ flex: '1 1 100px' }}>
          <label>Quantity</label>
          <input type="number" min="1" step="1" value={values.quantity} onChange={(e) => setValues((v) => ({ ...v, quantity: parseInt(e.target.value, 10) || 1 }))} />
        </div>
        <div className="form-group" style={{ flex: '1 1 160px' }}>
          <label>Payment Method</label>
          <select value={values.paymentMethod} onChange={(e) => setValues((v) => ({ ...v, paymentMethod: e.target.value }))}>
            <option value="cash_door">Cash / Door</option>
            <option value="zeffy">Zeffy</option>
            <option value="comp">Comp</option>
          </select>
        </div>
        <div className="form-group" style={{ flex: '1 1 160px' }}>
          <label>Status</label>
          <select value={values.status} onChange={(e) => setValues((v) => ({ ...v, status: e.target.value }))}>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {selectedTier && (
        <p style={{ fontSize: '0.85rem', color: 'var(--gold-light)', marginTop: '4px' }}>
          Total: ${((selectedTier.priceCents * values.quantity) / 100).toFixed(2)} for {selectedTier.seatsIncluded * values.quantity} seat{selectedTier.seatsIncluded * values.quantity === 1 ? '' : 's'}
        </p>
      )}

      {error && <p style={{ color: '#E86A6A', fontSize: '0.9rem', marginTop: '8px' }}>{error}</p>}

      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
        <button type="submit" className="btn btn-primary" disabled={saving} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
          {saving ? 'Saving…' : 'Add Order'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
          Cancel
        </button>
      </div>
    </form>
  );
}
