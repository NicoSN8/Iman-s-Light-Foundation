'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteEventButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      router.refresh();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="btn btn-outline"
      style={{ fontSize: '0.8rem', padding: '6px 14px', color: '#E86A6A', borderColor: 'rgba(232,106,106,0.4)' }}
    >
      {deleting ? 'Deleting…' : 'Delete'}
    </button>
  );
}
