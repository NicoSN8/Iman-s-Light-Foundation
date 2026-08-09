import { eq } from 'drizzle-orm';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { ticketOrders, ticketTiers } from '@/db/schema';

interface OrderInput {
  eventId?: unknown;
  tierId?: unknown;
  buyerName?: unknown;
  buyerEmail?: unknown;
  buyerPhone?: unknown;
  quantity?: unknown;
  paymentMethod?: unknown;
  status?: unknown;
  tableAssignment?: unknown;
  seatNotes?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

const PAYMENT_METHODS = ['cash_door', 'zeffy', 'comp'];
const STATUSES = ['confirmed', 'paid', 'cancelled'];

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  let body: OrderInput;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isNonEmptyString(body.eventId) || !isNonEmptyString(body.tierId) || !isNonEmptyString(body.buyerName)) {
    return Response.json({ ok: false, error: 'Event, tier, and buyer name are required.' }, { status: 400 });
  }

  const quantity = typeof body.quantity === 'number' && Number.isInteger(body.quantity) && body.quantity >= 1
    ? body.quantity
    : 1;

  // Price and seats always come from the tier row on the server — never
  // trust a client-submitted amount for anything involving money.
  const [tier] = await getDb().select().from(ticketTiers).where(eq(ticketTiers.id, body.tierId)).limit(1);
  if (!tier) return Response.json({ ok: false, error: 'Ticket tier not found.' }, { status: 404 });

  const amountCents = tier.priceCents * quantity;
  const totalSeats = tier.seatsIncluded * quantity;

  const paymentMethod = typeof body.paymentMethod === 'string' && PAYMENT_METHODS.includes(body.paymentMethod)
    ? body.paymentMethod
    : 'cash_door';
  const status = typeof body.status === 'string' && STATUSES.includes(body.status) ? body.status : 'confirmed';

  const [created] = await getDb()
    .insert(ticketOrders)
    .values({
      eventId: body.eventId,
      tierId: body.tierId,
      buyerName: body.buyerName,
      buyerEmail: typeof body.buyerEmail === 'string' && body.buyerEmail.trim() ? body.buyerEmail.trim() : null,
      buyerPhone: typeof body.buyerPhone === 'string' && body.buyerPhone.trim() ? body.buyerPhone.trim() : null,
      quantity,
      totalSeats,
      amountCents,
      paymentMethod,
      status,
      tableAssignment: typeof body.tableAssignment === 'string' && body.tableAssignment.trim() ? body.tableAssignment.trim() : null,
      seatNotes: typeof body.seatNotes === 'string' && body.seatNotes.trim() ? body.seatNotes.trim() : null,
    })
    .returning({ id: ticketOrders.id });

  return Response.json({ ok: true, id: created.id });
}
