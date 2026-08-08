import { cookies } from 'next/headers';
import { verifyPassword, createSessionToken, sessionCookieOptions, SESSION_COOKIE } from '@/lib/adminAuth';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
  // Fixed delay on every attempt, success or failure — a small deterrent
  // against naive automated password guessing without needing a stateful
  // rate limiter.
  await delay(400);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const password = typeof body === 'object' && body !== null ? (body as Record<string, unknown>).password : undefined;
  if (typeof password !== 'string' || !verifyPassword(password)) {
    return Response.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  return Response.json({ ok: true });
}
