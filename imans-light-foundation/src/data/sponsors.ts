export interface SponsorLogo {
  src: string;
  alt: string;
  /**
   * Badge treatment the logo needs to stay legible against the site's dark
   * navy background. Determined by measuring each logo's actual pixel
   * content (alpha-weighted luminosity), not guessed:
   * - 'none' (default): logo's own colors read fine directly on the dark
   *   page, no card needed.
   * - 'light': logo is dark-colored (e.g. black/navy wordmark) and would
   *   vanish on the dark page — needs a light surface behind it.
   * - 'dark': logo is white/light-colored and would vanish on a light
   *   surface — needs a dark surface behind it (inverse of 'light').
   */
  card?: 'none' | 'light' | 'dark';
}

/**
 * Every logo below was visually verified against its actual image content —
 * several were previously mislabeled (e.g. a file previously used under the
 * name "FGA" was actually Nicklaus Children's Hospital's logo — a different
 * FGA logo, sourced fresh below, replaces it). Do not reintroduce a
 * name/logo pairing without opening the image and confirming the two match.
 *
 * The 2026-08-08 batch (Global Innovative Foundation through FGA below) was
 * sourced by cross-checking the 2024 event flyer against each organization's
 * own official website, confirmed by Nicolas. FGA is the Foundation for
 * Government Accountability (thefga.org, Naples FL) per Nicolas — logo
 * sourced from Wikimedia Commons' "FGA-Logo_WEB.jpg" (their own official web
 * asset), since thefga.org lazy-loads its logo via JS and couldn't be
 * fetched directly.
 *
 * 2026-08-08: removed the flat white/black rectangle every logo used to sit
 * in per Nicolas's request that logos read directly against the page
 * instead of sitting in a sticker-like box. Several logos (fga, infinity
 * life, improving lives, outreach) had their baked-in white background
 * digitally removed (sharp, threshold + edge feathering, then visually
 * re-verified against the dark page) so they could go background-less too.
 * A few logos are genuinely dark-colored artwork (black/navy wordmarks) and
 * would be unreadable directly on the dark page no matter what — those keep
 * a light `card` rather than being forced transparent, since "delete the
 * background" can't come at the cost of a sponsor's logo being invisible.
 *
 * Same date, follow-up: Nicolas said some logos were still hard to read —
 * partly a genuinely low-res source file, partly the fixed-size badge
 * squishing wide logos down to a few pixels tall. Foundation of the
 * Americas was the one real "bad source" case (125x43px) — found and
 * swapped in their own site's much larger white version (586x640,
 * "foundation-of-the-americas-logo4.png"), which also happens to need no
 * card at all now since it's white. The squishing was a badge-sizing bug,
 * fixed in the CSS, not a per-logo data problem.
 */

export const FEATURED_SPONSORS: SponsorLogo[] = [
  { src: '/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png', alt: "Nicklaus Children's Hospital" },
  { src: '/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png', alt: "Survivors' Pathway" },
  { src: '/sponsors/2026/fga.png', alt: 'Foundation for Government Accountability (FGA)' },
];

export const COMMUNITY_SPONSORS: SponsorLogo[] = [
  { src: '/sponsors/2026/behavior-support-center-of-florida.png', alt: 'Behavior Support Center of Florida', card: 'dark' },
  { src: '/sponsors/2026/infinity-life-wellness.png', alt: 'Infinity Life Wellness Center' },
  { src: '/media/56e6ee_90b6e59a5df142298b790e6f643fa66a~mv2.png', alt: 'Miami Magazine', card: 'light' },
  { src: '/media/56e6ee_28bd559fd2fb4f969d85fe406d67ad5d~mv2.png', alt: 'Drug Enforcement Administration' },
  { src: '/sponsors/2026/phoenix-title-escrow.png', alt: 'Phoenix Title & Escrow LLC' },
  { src: '/media/56e6ee_243f0558f3794b77a33603bbcf0b1de4~mv2.png', alt: 'Monarch Air Group' },
  { src: '/media/56e6ee_a9dda332ae464d16adc838ae65a885dd~mv2.png', alt: 'Betzabe Pujaico Fashion Designer' },
  { src: '/sponsors/2026/improving-lives.png', alt: 'Improving Lives Community Mental Health Center' },
  { src: '/sponsors/2026/outreach-behavior-support.png', alt: 'Outreach Behavior Support' },
  { src: '/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png', alt: 'Juan Carlos Piñera', card: 'light' },
  { src: '/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png', alt: 'Secure Your Drink', card: 'light' },
  { src: '/sponsors/2026/global-innovative-foundation.png', alt: 'Global Innovative Foundation, Inc.' },
  { src: '/sponsors/2026/wings-to-freedom-foundation.png', alt: 'Wings To Freedom Foundation' },
  { src: '/sponsors/2026/foundation-of-the-americas.png', alt: 'Foundation of the Americas' },
  { src: '/sponsors/2026/doral-voice.png', alt: 'Doral Voice' },
  { src: '/sponsors/2026/freestyle-fm.png', alt: 'Freestyle.FM' },
  { src: '/sponsors/2026/monat.svg', alt: 'MONAT', card: 'light' },
];
