import { eq } from 'drizzle-orm';
import { requireAdminApi } from '@/lib/adminAuth';
import { getDb } from '@/db';
import { contactSubmissions } from '@/db/schema';
import { sendAdminReply } from '@/lib/mail';

function isNonEmptyString(v: unknown): v is string {
  return typeof v === 'string' && v.trim().length > 0;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;
  const { id } = await params;

  let body: { reply?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isNonEmptyString(body.reply)) {
    return Response.json({ ok: false, error: 'Reply message is required.' }, { status: 400 });
  }
  const replyText = body.reply.trim();

  const [submission] = await getDb()
    .select()
    .from(contactSubmissions)
    .where(eq(contactSubmissions.id, id))
    .limit(1);

  if (!submission) {
    return Response.json({ ok: false, error: 'Message not found.' }, { status: 404 });
  }

  try {
    await sendAdminReply({
      to: submission.email,
      toName: submission.name,
      originalSubject: submission.subject,
      originalMessage: submission.message,
      replyText,
      lang: submission.lang === 'es' ? 'es' : 'en',
    });
  } catch (err) {
    console.error('Failed to send admin reply:', err);
    const message = err instanceof Error ? err.message : 'Could not send the reply.';
    return Response.json({ ok: false, error: message }, { status: 502 });
  }

  const repliedAt = new Date();
  await getDb()
    .update(contactSubmissions)
    .set({ adminReply: replyText, repliedAt })
    .where(eq(contactSubmissions.id, id));

  return Response.json({ ok: true, repliedAt: repliedAt.toISOString() });
}
