/**
 * Phone numbers coming from Zeffy are stored as raw digits with the US
 * country code baked in (e.g. "13052820302"), but nobody searching types
 * a leading "1" or matches on punctuation -- someone typing "305-282-0302"
 * or "3052820302" should still find it. Strips everything but digits from
 * both sides, then also tries the stored number with a leading "1"
 * dropped, so a search works with or without the country code.
 */
export function phoneIncludes(storedPhone: string | null | undefined, query: string): boolean {
  const digitsOnly = (s: string) => s.replace(/\D/g, '');
  const stored = digitsOnly(storedPhone ?? '');
  const q = digitsOnly(query);
  if (!q || !stored) return false;
  if (stored.includes(q)) return true;
  if (stored.startsWith('1') && stored.slice(1).includes(q)) return true;
  return false;
}
