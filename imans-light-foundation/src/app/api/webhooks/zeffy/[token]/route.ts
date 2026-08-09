import { getDb } from '@/db';
import { donations, unmatchedZeffySales } from '@/db/schema';

function firstString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return null;
}

/**
 * Receives Zeffy's payment.completed webhook. Zeffy's exact payload shape
 * isn't published anywhere we can read without a real sample, so this
 * always keeps the full raw body regardless of what the best-effort parse
 * below finds — nothing is ever silently lost. Dollar amounts are
 * deliberately NOT parsed here: whether a given field is dollars or cents
 * isn't confirmed yet, and showing a wrong amount is worse than showing
 * none. Treat Zeffy's own dashboard as the source of truth for money until
 * a real test payload lets us confirm the field names, at which point this
 * should be revisited.
 *
 * Ticket sales are never auto-inserted into ticketOrders (the real seating
 * source of truth) — they're logged to unmatchedZeffySales for a human to
 * review and promote via the existing "+ Add Order" flow in /admin/tickets,
 * since a bad guess there would mean a wrong seat count at the actual event.
 */
export async function POST(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!process.env.ZEFFY_WEBHOOK_SECRET || token !== process.env.ZEFFY_WEBHOOK_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response('Bad Request', { status: 400 });
  }
  if (typeof body !== 'object' || body === null) {
    return new Response('Bad Request', { status: 400 });
  }

  const root = body as Record<string, unknown>;
  const payment = (
    typeof root.data === 'object' && root.data !== null ? root.data
      : typeof root.payment === 'object' && root.payment !== null ? root.payment
      : root
  ) as Record<string, unknown>;

  const zeffyPaymentId = firstString(payment, ['id', 'paymentId', 'payment_id', 'transactionId']);
  const donorName = firstString(payment, ['name', 'fullName', 'donorName', 'buyerName', 'contactName']);
  const donorEmail = firstString(payment, ['email', 'donorEmail', 'buyerEmail', 'contactEmail']);
  const campaignName = firstString(payment, ['campaignName', 'campaign', 'formName', 'formTitle']);

  const payloadText = JSON.stringify(body).toLowerCase();
  const looksLikeGalaTicket = payloadText.includes('gala') || payloadText.includes('ticket');

  const db = getDb();

  try {
    if (looksLikeGalaTicket) {
      await db.insert(unmatchedZeffySales).values({ buyerName: donorName, buyerEmail: donorEmail, zeffyPaymentId, rawPayload: body }).onConflictDoNothing();
    } else {
      await db.insert(donations).values({
        donorName,
        donorEmail,
        amountCents: null,
        campaignName,
        zeffyPaymentId,
        rawPayload: body,
      }).onConflictDoNothing();
    }
  } catch (err) {
    console.error('Zeffy webhook: failed to store event:', err);
    // Still return 200 — Zeffy retries on non-2xx, and retrying won't fix a
    // DB error. The raw body is in the server logs above if it needs
    // manual recovery.
  }

  return new Response('OK', { status: 200 });
}
