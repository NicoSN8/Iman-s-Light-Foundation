import type { Config } from 'drizzle-kit';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.Imans_Payments_DATABASE_URL_UNPOOLED ?? process.env.Imans_Payments_DATABASE_URL!,
  },
} satisfies Config;
