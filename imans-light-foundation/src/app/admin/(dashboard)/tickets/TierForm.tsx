'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export interface TierFormValues {
  id?: string;
  eventId: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  priceCents: number;
  seatsIncluded: number;
  capacity: number | null;
  sortOrder: number;
  isActive: boolean;
}

interface EventOption {
  id: string;
  titleEn: string;
}

export default function TierForm({ initialTier, events }: { initialTier?: TierFormValues; events: EventOption[] }) {
  const router = useRouter();
  const isEdit = !!initialTier?.id;

  const [values, setValues] = useState<Omit<TierFormValues, 'priceCents' | 'capacity'> & { priceDollars: string; capacity: string }>(
    initialTier
      ? { ...initialTier, priceDollars: (initialTier.priceCents / 100).toFixed(2), capacity: initialTier.capacity != null ? String(initialTier.capacity) : '' }
      : {
          eventId: events[0]?.id ?? '',
          nameEn: '',
          nameEs: '',
          descriptionEn: '',
          descriptionEs: '',
          priceDollars: '',
          seatsIncluded: 1,
          capacity: '',
          sortOrder: 0,
          isActive: true,
        }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const priceCents = Math.round(parseFloat(values.priceDollars || '0') * 100);
    const capacity = values.capacity.trim() ? parseInt(values.capacity, 10) : null;

    const payload = {
      eventId: values.eventId,
      nameEn: values.nameEn,
      nameEs: values.nameEs,
      descriptionEn: values.descriptionEn,
      descriptionEs: values.descriptionEs,
      priceCents,
      seatsIncluded: values.seatsIncluded,
      capacity,
      sortOrder: values.sortOrder,
      isActive: values.isActive,
    };

    try {
      const res = await fetch(isEdit ? `/api/admin/tickets/tiers/${initialTier.id}` : '/api/admin/tickets/tiers', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong.');
        return;
      }
      router.push('/admin/tickets');
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '560px' }}>
      <div className="form-group">
        <label htmlFor="eventId">Event *</label>
        <select id="eventId" required value={values.eventId} onChange={(e) => setValues((v) => ({ ...v, eventId: e.target.value }))}>
          {events.map((evt) => (
            <option key={evt.id} value={evt.id}>{evt.titleEn}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="nameEn">Tier Name (English) *</label>
        <input id="nameEn" required placeholder="e.g. Full Table (10 Seats)" value={values.nameEn} onChange={(e) => setValues((v) => ({ ...v, nameEn: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="nameEs">Tier Name (Spanish) *</label>
        <input id="nameEs" required value={values.nameEs} onChange={(e) => setValues((v) => ({ ...v, nameEs: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionEn">Description (English)</label>
        <textarea id="descriptionEn" value={values.descriptionEn} onChange={(e) => setValues((v) => ({ ...v, descriptionEn: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionEs">Description (Spanish)</label>
        <textarea id="descriptionEs" value={values.descriptionEs} onChange={(e) => setValues((v) => ({ ...v, descriptionEs: e.target.value }))} />
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="priceDollars">Price (USD) *</label>
          <input id="priceDollars" required type="number" min="0" step="0.01" placeholder="125.00" value={values.priceDollars} onChange={(e) => setValues((v) => ({ ...v, priceDollars: e.target.value }))} />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="seatsIncluded">Seats Included *</label>
          <input id="seatsIncluded" required type="number" min="1" step="1" value={values.seatsIncluded} onChange={(e) => setValues((v) => ({ ...v, seatsIncluded: parseInt(e.target.value, 10) || 1 }))} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="capacity">Max Number Available</label>
          <input id="capacity" type="number" min="0" step="1" placeholder="Leave blank for unlimited" value={values.capacity} onChange={(e) => setValues((v) => ({ ...v, capacity: e.target.value }))} />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label htmlFor="sortOrder">Display Order</label>
          <input id="sortOrder" type="number" step="1" value={values.sortOrder} onChange={(e) => setValues((v) => ({ ...v, sortOrder: parseInt(e.target.value, 10) || 0 }))} />
        </div>
      </div>
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={values.isActive} onChange={(e) => setValues((v) => ({ ...v, isActive: e.target.checked }))} />
          Active (visible on the public site)
        </label>
      </div>

      {error && <p style={{ color: '#E86A6A', fontSize: '0.9rem' }}>{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: '16px' }}>
        {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Tier'}
      </button>
    </form>
  );
}
