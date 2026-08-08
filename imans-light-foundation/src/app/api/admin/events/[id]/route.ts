import { eq } from 'drizzle-orm';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { events } from '@/db/schema';

interface EventInput {
  titleEn?: unknown;
  titleEs?: unknown;
  descriptionEn?: unknown;
  descriptionEs?: unknown;
  location?: unknown;
  image?: unknown;
  eventDate?: unknown;
  dateLabel?: unknown;
  isFeatured?: unknown;
  isPublished?: unknown;
}

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  let body: EventInput;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isNonEmptyString(body.titleEn) || !isNonEmptyString(body.titleEs)) {
    return Response.json({ ok: false, error: 'Title (English and Spanish) is required.' }, { status: 400 });
  }

  const [updated] = await getDb()
    .update(events)
    .set({
      titleEn: body.titleEn,
      titleEs: body.titleEs,
      descriptionEn: typeof body.descriptionEn === 'string' ? body.descriptionEn : '',
      descriptionEs: typeof body.descriptionEs === 'string' ? body.descriptionEs : '',
      location: typeof body.location === 'string' ? body.location : '',
      image: typeof body.image === 'string' && body.image.trim() ? body.image : null,
      eventDate: typeof body.eventDate === 'string' && body.eventDate.trim() ? body.eventDate : null,
      dateLabel: typeof body.dateLabel === 'string' && body.dateLabel.trim() ? body.dateLabel : null,
      isFeatured: body.isFeatured === true,
      isPublished: body.isPublished !== false,
      updatedAt: new Date(),
    })
    .where(eq(events.id, id))
    .returning({ id: events.id });

  if (!updated) return Response.json({ ok: false, error: 'Event not found.' }, { status: 404 });
  return Response.json({ ok: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  await getDb().delete(events).where(eq(events.id, id));
  return Response.json({ ok: true });
}
