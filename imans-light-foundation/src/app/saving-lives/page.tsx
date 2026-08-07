import type { Metadata } from 'next';
import SavingLivesContent from './SavingLivesContent';

export const metadata: Metadata = {
  title: 'Saving Lives',
  description:
    "Learn how Iman's Light Foundation's Naloxone distribution and overdose-reversal training save lives in South Florida communities.",
};

export default function SavingLivesPage() {
  return <SavingLivesContent />;
}
