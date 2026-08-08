'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
      Log Out
    </button>
  );
}
