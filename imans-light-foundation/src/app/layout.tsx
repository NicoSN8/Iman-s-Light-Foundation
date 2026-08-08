import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import SiteChrome from '@/components/SiteChrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.imanslightfoundation.org'),
  title: {
    default: "Iman's Light Foundation | Preventing Tragedies, Illuminating Futures",
    template: "%s | Iman's Light Foundation",
  },
  description:
    "Iman's Light Foundation educates communities on the perils of Fentanyl and deadly drugs, advocates for legislative change, and provides mental health resources and support for victims and grieving families.",
  keywords: [
    "Iman's Light Foundation",
    "fentanyl awareness",
    "drug education",
    "mental health",
    "nonprofit",
    "community",
    "Miami",
    "addiction prevention",
  ],
  openGraph: {
    type: 'website',
    url: 'https://www.imanslightfoundation.org',
    siteName: "Iman's Light Foundation",
    title: "Iman's Light Foundation | Preventing Tragedies, Illuminating Futures",
    description:
      "Educating communities on fentanyl dangers and providing mental health support for victims and families.",
    images: [{ url: '/logo.jpg', width: 400, height: 400, alt: "Iman's Light Foundation" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Iman's Light Foundation",
    description: 'Preventing Tragedies, Illuminating Futures.',
  },
  icons: { icon: '/logo.jpg', apple: '/logo.jpg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
