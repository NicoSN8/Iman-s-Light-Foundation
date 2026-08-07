import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with Iman's Light Foundation to request a workshop, volunteer, partner with us, or reach out for support.",
};

export default function ContactPage() {
  return <ContactContent />;
}
