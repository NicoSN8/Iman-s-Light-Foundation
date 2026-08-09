import { eq } from 'drizzle-orm';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { ticketTiers } from '@/db/schema';

interface TierInput {
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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  let body: TierInput;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (
    !isNonEmptyString(body.nameEn) ||
    !isNonEmptyString(body.nameEs) ||
    !isNonNegativeInt(body.priceCents) ||
    !isNonNegativeInt(body.seatsIncluded) ||
    body.seatsIncluded < 1
  ) {
    return Response.json({ ok: false, error: 'Names (EN/ES), price, and seats are required.' }, { status: 400 });
  }

  const capacity = isNonNegativeInt(body.capacity) ? body.capacity : null;
  const sortOrder = isNonNegativeInt(body.sortOrder) ? body.sortOrder : 0;

  const [updated] = await getDb()
    .update(ticketTiers)
    .set({
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
    .where(eq(ticketTiers.id, id))
    .returning({ id: ticketTiers.id });

  if (!updated) return Response.json({ ok: false, error: 'Tier not found.' }, { status: 404 });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  await getDb().delete(ticketTiers).where(eq(ticketTiers.id, id));
  return Response.json({ ok: true });
}
