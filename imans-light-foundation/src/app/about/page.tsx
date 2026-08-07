import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Learn about Iman's Light Foundation's mission, founder's story, and the team fighting fentanyl and drug addiction in South Florida.",
};

export default function AboutPage() {
  return <AboutContent />;
}
