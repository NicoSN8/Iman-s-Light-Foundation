'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteTierButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/tickets/tiers/${id}`, { method: 'DELETE' });
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
