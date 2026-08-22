'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, Calendar, Ticket, HandCoins, Presentation } from 'lucide-react';
import LogoutButton from './LogoutButton';
import styles from './Sidebar.module.css';

const NAV_LINKS = [
  { href: '/admin', label: 'Messages', icon: Mail },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/tickets', label: 'Tickets', icon: Ticket },
  { href: '/admin/donations', label: 'Donations', icon: HandCoins },
  { href: '/admin/presentation', label: 'Presentation', icon: Presentation },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Image src="/logo.jpg" alt="" width={36} height={36} className={styles.brandLogo} />
        <div className={styles.brandText}>
          <span className={styles.brandName}>Iman&apos;s Light</span>
          <span className={styles.brandLabel}>Admin Panel</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <LogoutButton />
      </div>
    </aside>
  );
}
