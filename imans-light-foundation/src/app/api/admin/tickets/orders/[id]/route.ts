import { eq } from 'drizzle-orm';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { ticketOrders } from '@/db/schema';

interface OrderPatchInput {
  buyerName?: unknown;
  buyerEmail?: unknown;
  buyerPhone?: unknown;
  tableAssignment?: unknown;
  seatNotes?: unknown;
  status?: unknown;
  paymentMethod?: unknown;
  checkedIn?: unknown;
}

const PAYMENT_METHODS = ['cash_door', 'zeffy', 'comp'];
const STATUSES = ['confirmed', 'paid', 'cancelled'];

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  let body: OrderPatchInput;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body.buyerName === 'string' && !body.buyerName.trim()) {
    return Response.json({ ok: false, error: 'Buyer name cannot be empty.' }, { status: 400 });
  }

  const status = typeof body.status === 'string' && STATUSES.includes(body.status) ? body.status : 'confirmed';
  const paymentMethod = typeof body.paymentMethod === 'string' && PAYMENT_METHODS.includes(body.paymentMethod) ? body.paymentMethod : 'cash_door';

  const [updated] = await getDb()
    .update(ticketOrders)
    .set({
      ...(typeof body.buyerName === 'string' && body.buyerName.trim() ? { buyerName: body.buyerName.trim() } : {}),
      buyerEmail: typeof body.buyerEmail === 'string' && body.buyerEmail.trim() ? body.buyerEmail.trim() : null,
      buyerPhone: typeof body.buyerPhone === 'string' && body.buyerPhone.trim() ? body.buyerPhone.trim() : null,
      tableAssignment: typeof body.tableAssignment === 'string' && body.tableAssignment.trim() ? body.tableAssignment.trim() : null,
      seatNotes: typeof body.seatNotes === 'string' && body.seatNotes.trim() ? body.seatNotes.trim() : null,
      status,
      paymentMethod,
      checkedIn: body.checkedIn === true,
    })
    .where(eq(ticketOrders.id, id))
    .returning({ id: ticketOrders.id });

  if (!updated) return Response.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  await getDb().delete(ticketOrders).where(eq(ticketOrders.id, id));
  return Response.json({ ok: true });
}
