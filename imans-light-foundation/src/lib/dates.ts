/**
 * Postgres `date` columns come back as plain "YYYY-MM-DD" strings. Handing
 * that directly to `new Date(...)` parses it as UTC midnight, which then
 * rolls back to the previous calendar day once `toLocaleDateString` converts
 * to a timezone behind UTC (e.g. US Eastern) -- every event date site-wide
 * was displaying one day early because of this. Parsing the components
 * directly builds a local-time Date for that exact calendar day instead.
 */
export function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}
