'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import NebulaBackground from './NebulaBackground';

/**
 * /admin gets its own layout (src/app/admin/layout.tsx) and must never show
 * the public marketing chrome — the fixed navbar was literally sitting on
 * top of and intercepting clicks on the admin sidebar before this existed.
 * Checked here (not via a route group covering the whole public site)
 * because moving every public route would touch far more files for no
 * benefit — this is the one place that needs to know the difference.
 */
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <NebulaBackground />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
