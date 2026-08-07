import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: "Terms governing your use of the Iman's Light Foundation website.",
};

export default function TermsPage() {
  return <TermsContent />;
}
