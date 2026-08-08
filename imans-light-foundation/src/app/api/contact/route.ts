import { getDb } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { sendContactNotification } from '@/lib/mail';

const MAX_LENGTHS = { name: 200, email: 320, phone: 40, subject: 200, message: 5000 };

function isNonEmptyString(v: unknown, maxLength: number): v is string {
  return typeof v === 'string' && v.trim().length > 0 && v.length <= maxLength;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot: a hidden field real visitors never fill in. Bots that
  // autofill every field trip it; pretend success without writing anything.
  if (typeof data.website === 'string' && data.website.trim() !== '') {
    return Response.json({ ok: true });
  }

  if (
    !isNonEmptyString(data.name, MAX_LENGTHS.name) ||
    !isNonEmptyString(data.email, MAX_LENGTHS.email) ||
    !isNonEmptyString(data.subject, MAX_LENGTHS.subject) ||
    !isNonEmptyString(data.message, MAX_LENGTHS.message)
  ) {
    return Response.json({ ok: false, error: 'Missing or invalid required fields.' }, { status: 400 });
  }

  if (data.phone !== undefined && data.phone !== null && !isNonEmptyString(data.phone, MAX_LENGTHS.phone)) {
    return Response.json({ ok: false, error: 'Invalid phone number.' }, { status: 400 });
  }

  const lang = data.lang === 'es' ? 'es' : 'en';

  const name = data.name.trim();
  const email = data.email.trim();
  const phone = typeof data.phone === 'string' ? data.phone.trim() : null;
  const subject = data.subject.trim();
  const message = data.message.trim();

  try {
    await getDb().insert(contactSubmissions).values({ name, email, phone, subject, message, lang });
  } catch (err) {
    console.error('Failed to store contact submission:', err);
    return Response.json({ ok: false, error: 'Could not save your message.' }, { status: 500 });
  }

  // Best-effort — the row above is already saved, so a mail failure here
  // must not turn into an error response for the visitor.
  await sendContactNotification({ name, email, phone, subject, message, lang });

  return Response.json({ ok: true });
}
