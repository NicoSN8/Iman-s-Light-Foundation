import type { Metadata } from 'next';
import ProgramsContent from './ProgramsContent';

export const metadata: Metadata = {
  title: 'Our Programs',
  description:
    "Explore Iman's Light Foundation's fentanyl and drug awareness workshops, mental health programs, and legislative advocacy initiatives.",
};

export default function ProgramsPage() {
  return <ProgramsContent />;
}
