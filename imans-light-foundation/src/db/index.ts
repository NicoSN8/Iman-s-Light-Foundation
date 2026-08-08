import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Neon's HTTP driver has no persistent connection to pool, so creating a
 * fresh client per call is the recommended pattern for serverless — it also
 * keeps DATABASE_URL out of module-load time, so builds and routes that
 * don't touch the database never fail just because it isn't configured yet.
 */
export function getDb() {
  const url = process.env.Imans_Payments_DATABASE_URL;
  if (!url) {
    throw new Error('Imans_Payments_DATABASE_URL is not set. Add it to .env.local (see .env.example).');
  }
  return drizzle(neon(url), { schema });
}
