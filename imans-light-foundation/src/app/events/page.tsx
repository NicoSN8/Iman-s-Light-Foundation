import type { Metadata } from 'next';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
  title: 'Events',
  description:
    "See upcoming and past Iman's Light Foundation events, including the Annual Gala and Music & Lights for Life community fundraisers.",
};

export default function EventsPage() {
  return <EventsContent />;
}
