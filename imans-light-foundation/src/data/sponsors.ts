export interface SponsorLogo {
  src: string;
  alt: string;
}

/**
 * Every logo below was visually verified against its actual image content —
 * several were previously mislabeled (e.g. a file used under the name "FGA"
 * was actually Nicklaus Children's Hospital's logo). Do not reintroduce a
 * name/logo pairing without opening the image and confirming the two match.
 */

export const FEATURED_SPONSORS: SponsorLogo[] = [
  { src: '/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png', alt: "Nicklaus Children's Hospital" },
  { src: '/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png', alt: "Survivors' Pathway" },
  { src: '/media/56e6ee_0f2c809c926641329fd63076093e1de7~mv2.png', alt: 'FGA' },
];

export const COMMUNITY_SPONSORS: SponsorLogo[] = [
  { src: '/sponsors/extracted/sp3_logo_2.png', alt: 'Behavior Support Center of Florida' },
  { src: '/media/56e6ee_ebe0f16f3a7f45d2a15a997eab2927f3~mv2.png', alt: 'Infinity Life Wellness Center' },
  { src: '/media/56e6ee_90b6e59a5df142298b790e6f643fa66a~mv2.png', alt: 'Miami Magazine' },
  { src: '/media/56e6ee_28bd559fd2fb4f969d85fe406d67ad5d~mv2.png', alt: 'Drug Enforcement Administration' },
  { src: '/media/56e6ee_f96e2e03e38f4cafa7f45f9969059dd6~mv2.png', alt: 'Phoenix' },
  { src: '/media/56e6ee_243f0558f3794b77a33603bbcf0b1de4~mv2.png', alt: 'Monarch Air Group' },
  { src: '/media/56e6ee_a9dda332ae464d16adc838ae65a885dd~mv2.png', alt: 'Betzabe Pujaico Fashion Designer' },
  { src: '/media/56e6ee_1941e013eda54ccf829e7227e5bde355~mv2.png', alt: 'Improving Lives Community Mental Health Center' },
  { src: '/media/56e6ee_0b1d1f617c3b42acbf68755c62e11afe~mv2.png', alt: 'Outreach Behavior Support' },
  { src: '/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png', alt: 'Juan Carlos Piñera' },
  { src: '/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png', alt: 'Secure Your Drink' },
];
