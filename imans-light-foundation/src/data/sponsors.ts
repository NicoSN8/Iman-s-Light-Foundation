export interface SponsorLogo {
  src: string;
  alt: string;
  /** Official website. Only render a link when this is set — never guessed. */
  url?: string;
  /**
   * True only for logos whose artwork is itself white/light-colored (Behavior
   * Support Center of Florida and Foundation of the Americas — both confirmed
   * white-on-transparent PNGs earlier this session). Every logo now sits on
   * the same light card, so a white-on-transparent file would otherwise
   * vanish — this flag applies a non-destructive CSS `filter: invert(1)` in
   * SponsorLogo.tsx so it renders in black instead. The image file itself is
   * never edited.
   */
  invert?: boolean;
}

export interface TextSponsor {
  name: string;
  url?: string;
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
 * 2026-08-08, later same day: every logo now renders through one shared
 * component (src/components/SponsorLogo.tsx + SponsorGrid.tsx) instead of
 * three separately hand-copied blocks of markup (homepage, About, Donate)
 * that had already drifted out of sync. Every logo gets the same light,
 * rounded "premium" card — the old per-logo 'card: none/light/dark' system
 * is gone, replaced by a single `invert` flag for the one white-artwork
 * exception (Behavior Support Center of Florida). `url` was added and
 * populated with officially verified websites researched this session —
 * left blank (never guessed) wherever a real site couldn't be confirmed.
 *
 * Known low-resolution source files that will look softer than the rest
 * even at the new larger size — worth asking these sponsors for a better
 * file: Betzabe Pujaico (225x225), Improving Lives (200x200), Outreach
 * Behavior Support (224x225), Survivors' Pathway (210x209), Global
 * Innovative Foundation (227x183).
 */

export const FEATURED_SPONSORS: SponsorLogo[] = [
  { src: '/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png', alt: "Nicklaus Children's Hospital", url: 'https://www.nicklauschildrens.org' },
  { src: '/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png', alt: "Survivors' Pathway", url: 'https://www.survivorspathway.org' },
  { src: '/sponsors/2026/fga.png', alt: 'Foundation for Government Accountability (FGA)', url: 'https://thefga.org' },
];

export const COMMUNITY_SPONSORS: SponsorLogo[] = [
  { src: '/sponsors/2026/behavior-support-center-of-florida.png', alt: 'Behavior Support Center of Florida', url: 'https://bscof.com', invert: true },
  { src: '/sponsors/2026/infinity-life-wellness.png', alt: 'Infinity Life Wellness Center', url: 'https://infinitylifewellness.com' },
  { src: '/media/56e6ee_90b6e59a5df142298b790e6f643fa66a~mv2.png', alt: 'Miami Magazine' },
  { src: '/media/56e6ee_28bd559fd2fb4f969d85fe406d67ad5d~mv2.png', alt: 'Drug Enforcement Administration', url: 'https://www.dea.gov' },
  { src: '/sponsors/2026/phoenix-title-escrow.png', alt: 'Phoenix Title & Escrow LLC', url: 'https://closewithphoenix.com' },
  { src: '/media/56e6ee_243f0558f3794b77a33603bbcf0b1de4~mv2.png', alt: 'Monarch Air Group', url: 'https://monarchairgroup.com' },
  { src: '/media/56e6ee_a9dda332ae464d16adc838ae65a885dd~mv2.png', alt: 'Betzabe Pujaico Fashion Designer', url: 'https://betzabepujaico.com' },
  { src: '/sponsors/2026/improving-lives.png', alt: 'Improving Lives Community Mental Health Center', url: 'https://www.improvinglivesus.org' },
  { src: '/sponsors/2026/outreach-behavior-support.png', alt: 'Outreach Behavior Support' },
  { src: '/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png', alt: 'Juan Carlos Piñera' },
  { src: '/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png', alt: 'Secure Your Drink', url: 'https://secureyourdrink.com' },
  { src: '/sponsors/2026/global-innovative-foundation.png', alt: 'Global Innovative Foundation, Inc.', url: 'https://globalinnovativefoundation.org' },
  { src: '/sponsors/2026/wings-to-freedom-foundation.png', alt: 'Wings To Freedom Foundation', url: 'https://www.wingstofreedomfoundation.org' },
  { src: '/sponsors/2026/foundation-of-the-americas.png', alt: 'Foundation of the Americas', url: 'https://foundationoftheamericas.org', invert: true },
  { src: '/sponsors/2026/doral-voice.png', alt: 'Doral Voice', url: 'https://doralvoice.com' },
  { src: '/sponsors/2026/freestyle-fm.png', alt: 'Freestyle.FM', url: 'https://www.freestyle.fm' },
  { src: '/sponsors/2026/monat.svg', alt: 'MONAT', url: 'https://monatglobal.com' },
];

/**
 * Sponsors we only have a name for (no logo file yet). Previously existed as
 * three separately drifted copies of this same list across the homepage,
 * About, and Donate pages — the Donate copy still had two names that were
 * already corrected everywhere else. This is now the one source of truth.
 */
export const TEXT_ONLY_SPONSORS: TextSponsor[] = [
  { name: 'Powerhouse Workshops & Consulting', url: 'https://www.powerhouseworkshops.com' },
  { name: 'Century 21 King Realty', url: 'https://www.century21kingrealty.com' },
  { name: 'Wepa.fm', url: 'https://wepa.fm' },
  { name: 'Super Q Miami', url: 'https://www.superqmiami.com' },
  { name: 'South Florida Wellness Network', url: 'https://www.sfwn.org' },
  { name: 'ScribeAmerica', url: 'https://www.scribeamerica.com' },
  { name: 'DAER Nightclub', url: 'https://www.hardrocknightlife.com' },
  { name: 'Rewind 103.9' },
  { name: 'Expressions Noblemen & Consulting' },
  { name: 'S.A.R.A. Coalition' },
  { name: 'Fentanyl Awareness Coalition' },
  { name: 'Gables Cigars Shop' },
  { name: 'RMT Media' },
  { name: 'Prosperity Social & Community Development Group' },
  { name: 'Luxe Properties' },
  { name: 'Master Bodyworker' },
  { name: 'blackandwhite' },
];
