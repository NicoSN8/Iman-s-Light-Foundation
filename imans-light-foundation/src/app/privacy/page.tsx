import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    "Learn what information Iman's Light Foundation collects through its website and how it is used.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
