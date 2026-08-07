import type { Metadata } from 'next';
import GetInvolvedContent from './GetInvolvedContent';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    "Discover ways to support Iman's Light Foundation — donate, volunteer, become a partner, or invite us to speak at your organization.",
};

export default function GetInvolvedPage() {
  return <GetInvolvedContent />;
}
