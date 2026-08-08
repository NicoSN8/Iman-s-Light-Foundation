import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function AdminNav() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/admin" className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
          Messages
        </Link>
        <Link href="/admin/events" className="btn btn-outline" style={{ fontSize: '0.875rem', padding: '10px 20px' }}>
          Events
        </Link>
      </nav>
      <LogoutButton />
    </div>
  );
}
