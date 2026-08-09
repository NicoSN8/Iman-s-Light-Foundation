import { desc } from 'drizzle-orm';
import { getDb } from '@/db';
import { donations } from '@/db/schema';
import DonationsTable from './DonationsTable';

function formatMoney(cents: number) {
  return `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function AdminDonationsPage() {
  const rows = await getDb().select().from(donations).orderBy(desc(donations.receivedAt));
  const total = rows.reduce((sum, d) => sum + (d.amountCents ?? 0), 0);

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Donations</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          {rows.length} donation{rows.length === 1 ? '' : 's'} received via Zeffy
          {total > 0 && <> · {formatMoney(total)} total</>}
        </p>
      </div>

      <DonationsTable donations={rows} />
    </>
  );
}
