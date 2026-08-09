import { eq } from 'drizzle-orm';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { unmatchedZeffySales } from '@/db/schema';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await params;

  await getDb().update(unmatchedZeffySales).set({ reviewed: true }).where(eq(unmatchedZeffySales.id, id));

  return Response.json({ ok: true });
}
