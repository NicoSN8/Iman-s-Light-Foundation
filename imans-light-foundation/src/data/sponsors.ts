export interface SponsorLogo {
  src: string;
  alt: string;
  /** True if the logo's artwork is white/light and needs a dark badge instead of the default white one. */
  dark?: boolean;
}

/**
 * Every logo below was visually verified against its actual image content —
 * several were previously mislabeled (e.g. a file used under the name "FGA"
 * was actually Nicklaus Children's Hospital's logo). Do not reintroduce a
 * name/logo pairing without opening the image and confirming the two match.
 *
 * The 2026-08-08 batch (Global Innovative Foundation through MONAT below) was
 * sourced by cross-checking the 2024 event flyer against each organization's
 * own official website, confirmed by Nicolas. "FGA" (the third original
 * featured sponsor) could not be identified/verified by anyone and has been
 * removed rather than left as an unverified guess — re-add only once
 * confirmed what it actually stands for.
 */

export const FEATURED_SPONSORS: SponsorLogo[] = [
  { src: '/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png', alt: "Nicklaus Children's Hospital" },
  { src: '/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png', alt: "Survivors' Pathway" },
];

export const COMMUNITY_SPONSORS: SponsorLogo[] = [
  { src: '/sponsors/2026/behavior-support-center-of-florida.png', alt: 'Behavior Support Center of Florida', dark: true },
  { src: '/media/56e6ee_ebe0f16f3a7f45d2a15a997eab2927f3~mv2.png', alt: 'Infinity Life Wellness Center' },
  { src: '/media/56e6ee_90b6e59a5df142298b790e6f643fa66a~mv2.png', alt: 'Miami Magazine' },
  { src: '/media/56e6ee_28bd559fd2fb4f969d85fe406d67ad5d~mv2.png', alt: 'Drug Enforcement Administration' },
  { src: '/sponsors/2026/phoenix-title-escrow.png', alt: 'Phoenix Title & Escrow LLC' },
  { src: '/media/56e6ee_243f0558f3794b77a33603bbcf0b1de4~mv2.png', alt: 'Monarch Air Group' },
  { src: '/media/56e6ee_a9dda332ae464d16adc838ae65a885dd~mv2.png', alt: 'Betzabe Pujaico Fashion Designer' },
  { src: '/media/56e6ee_1941e013eda54ccf829e7227e5bde355~mv2.png', alt: 'Improving Lives Community Mental Health Center' },
  { src: '/media/56e6ee_0b1d1f617c3b42acbf68755c62e11afe~mv2.png', alt: 'Outreach Behavior Support' },
  { src: '/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png', alt: 'Juan Carlos Piñera' },
  { src: '/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png', alt: 'Secure Your Drink' },
  { src: '/sponsors/2026/global-innovative-foundation.png', alt: 'Global Innovative Foundation, Inc.' },
  { src: '/sponsors/2026/wings-to-freedom-foundation.png', alt: 'Wings To Freedom Foundation' },
  { src: '/sponsors/2026/foundation-of-the-americas.png', alt: 'Foundation of the Americas' },
  { src: '/sponsors/2026/doral-voice.png', alt: 'Doral Voice' },
  { src: '/sponsors/2026/freestyle-fm.png', alt: 'Freestyle.FM' },
  { src: '/sponsors/2026/monat.svg', alt: 'MONAT' },
];
