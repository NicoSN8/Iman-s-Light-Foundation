import type { Metadata } from 'next';
import DonateContent from './DonateContent';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    "Support Iman's Light Foundation's fentanyl awareness education, mental health workshops, and family support programs with a tax-deductible donation.",
};

export default function DonatePage() {
  return <DonateContent />;
}
