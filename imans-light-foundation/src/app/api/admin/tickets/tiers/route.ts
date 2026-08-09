import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { ticketTiers } from '@/db/schema';

interface TierInput {
  eventId?: unknown;
  nameEn?: unknown;
  nameEs?: unknown;
  descriptionEn?: unknown;
  descriptionEs?: unknown;
  priceCents?: unknown;
  seatsIncluded?: unknown;
  capacity?: unknown;
  sortOrder?: unknown;
  isActive?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

function isNonNegativeInt(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0;
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  let body: TierInput;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (
    !isNonEmptyString(body.eventId) ||
    !isNonEmptyString(body.nameEn) ||
    !isNonEmptyString(body.nameEs) ||
    !isNonNegativeInt(body.priceCents) ||
    !isNonNegativeInt(body.seatsIncluded) ||
    body.seatsIncluded < 1
  ) {
    return Response.json({ ok: false, error: 'Event, names (EN/ES), price, and seats are required.' }, { status: 400 });
  }

  const capacity = isNonNegativeInt(body.capacity) ? body.capacity : null;
  const sortOrder = isNonNegativeInt(body.sortOrder) ? body.sortOrder : 0;

  const [created] = await getDb()
    .insert(ticketTiers)
    .values({
      eventId: body.eventId,
      nameEn: body.nameEn,
      nameEs: body.nameEs,
      descriptionEn: typeof body.descriptionEn === 'string' ? body.descriptionEn : '',
      descriptionEs: typeof body.descriptionEs === 'string' ? body.descriptionEs : '',
      priceCents: body.priceCents,
      seatsIncluded: body.seatsIncluded,
      capacity,
      sortOrder,
      isActive: body.isActive !== false,
    })
    .returning({ id: ticketTiers.id });

  return Response.json({ ok: true, id: created.id });
}
