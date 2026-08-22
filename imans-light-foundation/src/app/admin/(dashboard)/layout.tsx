import { requireAdmin } from '@/lib/adminAuth';
import Sidebar from './Sidebar';
import styles from './layout.module.css';

/**
 * The single requireAdmin() check for this entire authenticated subtree.
 * A layout always renders for every nested page — unlike middleware/proxy,
 * which Next.js 16 can silently skip if misnamed — so one check here is
 * exactly as reliable as repeating it in every page, without the
 * repetition. API routes are unaffected: every /api/admin/* route still
 * calls requireAdminApi() itself, since route handlers aren't part of a
 * page layout tree.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
