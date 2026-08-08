/**
 * Shared by every /admin route, logged in or not (including /admin/login).
 * Deliberately minimal — just a solid, calm background. No animated
 * NebulaBackground here (too busy for a data tool) and no public nav/footer
 * (see src/components/SiteChrome.tsx, which is what actually keeps those
 * off every /admin route).
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      {children}
    </div>
  );
}
