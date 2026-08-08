'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { upload } from '@vercel/blob/client';

export interface EventFormValues {
  id?: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  location: string;
  image: string | null;
  eventDate: string | null;
  dateLabel: string | null;
  isFeatured: boolean;
  isPublished: boolean;
}

export default function EventForm({ initialEvent }: { initialEvent?: EventFormValues }) {
  const router = useRouter();
  const isEdit = !!initialEvent?.id;

  const [values, setValues] = useState<EventFormValues>(
    initialEvent ?? {
      titleEn: '',
      titleEs: '',
      descriptionEn: '',
      descriptionEs: '',
      location: '',
      image: null,
      eventDate: '',
      dateLabel: '',
      isFeatured: false,
      isPublished: true,
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/events/upload',
      });
      setValues((v) => ({ ...v, image: blob.url }));
    } catch {
      setError('Image upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...values,
      eventDate: values.eventDate || null,
      dateLabel: values.dateLabel || null,
    };

    try {
      const res = await fetch(isEdit ? `/api/admin/events/${initialEvent.id}` : '/api/admin/events', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong.');
        return;
      }
      router.push('/admin/events');
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '640px' }}>
      <div className="form-group">
        <label htmlFor="titleEn">Title (English) *</label>
        <input id="titleEn" required value={values.titleEn} onChange={(e) => setValues((v) => ({ ...v, titleEn: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="titleEs">Title (Spanish) *</label>
        <input id="titleEs" required value={values.titleEs} onChange={(e) => setValues((v) => ({ ...v, titleEs: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionEn">Description (English)</label>
        <textarea id="descriptionEn" value={values.descriptionEn} onChange={(e) => setValues((v) => ({ ...v, descriptionEn: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="descriptionEs">Description (Spanish)</label>
        <textarea id="descriptionEs" value={values.descriptionEs} onChange={(e) => setValues((v) => ({ ...v, descriptionEs: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input id="location" value={values.location} onChange={(e) => setValues((v) => ({ ...v, location: e.target.value }))} />
      </div>
      <div className="form-group">
        <label htmlFor="eventDate">Event Date</label>
        <input id="eventDate" type="date" value={values.eventDate ?? ''} onChange={(e) => setValues((v) => ({ ...v, eventDate: e.target.value }))} />
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
          Leave blank if the exact day isn&apos;t set yet.
        </p>
      </div>
      <div className="form-group">
        <label htmlFor="dateLabel">Date Label (only used when Event Date is blank)</label>
        <input
          id="dateLabel"
          placeholder='e.g. "October 2026"'
          value={values.dateLabel ?? ''}
          onChange={(e) => setValues((v) => ({ ...v, dateLabel: e.target.value }))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="image">Photo</label>
        <input id="image" type="file" accept="image/*" onChange={handleFileChange} />
        {uploading && <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Uploading…</p>}
        {values.image && !uploading && (
          <Image src={values.image} alt="" width={220} height={140} style={{ marginTop: '10px', maxWidth: '220px', height: 'auto', borderRadius: '8px', objectFit: 'cover' }} />
        )}
      </div>
      <div className="form-group" style={{ display: 'flex', gap: '24px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={values.isFeatured} onChange={(e) => setValues((v) => ({ ...v, isFeatured: e.target.checked }))} />
          Featured
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={values.isPublished} onChange={(e) => setValues((v) => ({ ...v, isPublished: e.target.checked }))} />
          Published
        </label>
      </div>

      {error && <p style={{ color: '#E86A6A', fontSize: '0.9rem' }}>{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={saving || uploading} style={{ marginTop: '16px' }}>
        {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Event'}
      </button>
    </form>
  );
}
