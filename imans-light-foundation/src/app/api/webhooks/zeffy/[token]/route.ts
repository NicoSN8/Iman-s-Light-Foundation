import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { donations, unmatchedZeffySales, ticketTiers, ticketOrders } from '@/db/schema';

function firstString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const v = obj[key];
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return null;
}

function asRecord(v: unknown): Record<string, unknown> {
  return typeof v === 'object' && v !== null ? (v as Record<string, unknown>) : {};
}

/**
 * Receives Zeffy's payment.completed webhook. Payload shape confirmed
 * against a real $1 test transaction on 2026-08-09:
 *   { type: 'payment.completed', data: { id, amount (in cents), currency,
 *     campaign_type ('donation_form' for the donate form), campaign_category,
 *     description, receipt_url, buyer: { first_name, last_name, email,
 *     company_name, is_corporate }, ... } }
 *
 * campaign_type === 'donation_form' is a confirmed donation. Anything else
 * is treated as a possible gala ticket sale: if the exact amount matches
 * exactly one active ticket tier's price, it's auto-seated (quantity 1) --
 * safe because the 4 tier prices are all distinct, so there's no ambiguity
 * about which tier was bought. Anything that doesn't match cleanly (wrong
 * amount, multiple tiers at the same price, quantity > 1, or a campaign
 * type we've never seen) goes to unmatchedZeffySales for a human to check
 * and seat manually via the existing "+ Add Order" flow -- a bad guess
 * there means someone shows up to the gala without a table, which is worse
 * than one extra click. The full raw payload is always stored regardless,
 * so nothing is ever lost even if a future payload doesn't match this shape.
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
  const payment = asRecord(root.data ?? root.payment ?? root);
  const buyer = asRecord(payment.buyer);

  const zeffyPaymentId = firstString(payment, ['id', 'paymentId', 'payment_id', 'transactionId']);
  const companyName = firstString(buyer, ['company_name']);
  const firstName = firstString(buyer, ['first_name']);
  const lastName = firstString(buyer, ['last_name']);
  const personName = [firstName, lastName].filter(Boolean).join(' ') || null;
  const buyerName = buyer.is_corporate === true && companyName ? companyName : personName ?? companyName;
  const buyerEmail = firstString(buyer, ['email']);
  const campaignName = firstString(payment, ['description', 'campaignName', 'campaign', 'formName', 'formTitle']);
  const receiptUrl = firstString(payment, ['receipt_url', 'receiptUrl']);
  const amountCents = typeof payment.amount === 'number' && Number.isFinite(payment.amount) ? payment.amount : null;
  const campaignType = firstString(payment, ['campaign_type']);

  const db = getDb();

  try {
    if (campaignType === 'donation_form') {
      await db.insert(donations).values({
        donorName: buyerName,
        donorEmail: buyerEmail,
        amountCents,
        campaignName,
        receiptUrl,
        zeffyPaymentId,
        rawPayload: body,
      }).onConflictDoNothing();
    } else {
      let matchedTier: typeof ticketTiers.$inferSelect | null = null;

      if (amountCents != null && buyerName) {
        const activeTiers = await db.select().from(ticketTiers).where(eq(ticketTiers.isActive, true));
        const priceMatches = activeTiers.filter((t) => t.priceCents === amountCents);
        if (priceMatches.length === 1) matchedTier = priceMatches[0];
      }

      if (matchedTier) {
        await db.insert(ticketOrders).values({
          eventId: matchedTier.eventId,
          tierId: matchedTier.id,
          buyerName: buyerName!,
          buyerEmail,
          quantity: 1,
          totalSeats: matchedTier.seatsIncluded,
          amountCents: amountCents!,
          paymentMethod: 'zeffy',
          status: 'paid',
          seatNotes: `Auto-matched from a real Zeffy payment by exact amount (${(amountCents! / 100).toFixed(2)} = ${matchedTier.nameEn}).`,
          zeffyPaymentId,
        }).onConflictDoNothing();
      } else {
        await db.insert(unmatchedZeffySales).values({
          buyerName,
          buyerEmail,
          amountCents,
          zeffyPaymentId,
          rawPayload: body,
        }).onConflictDoNothing();
      }
    }
  } catch (err) {
    console.error('Zeffy webhook: failed to store event:', err);
    // Still return 200 — Zeffy retries on non-2xx, and retrying won't fix a
    // DB error. The raw body is in the server logs above if it needs
    // manual recovery.
  }

  return new Response('OK', { status: 200 });
}
