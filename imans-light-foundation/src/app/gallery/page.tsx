import type { Metadata } from 'next';
import GalleryContent from './GalleryContent';

export const metadata: Metadata = {
  title: 'Photo Gallery',
  description:
    "Browse photos from Iman's Light Foundation's workshops, community events, and advocacy efforts across South Florida.",
};

export default function GalleryPage() {
  return <GalleryContent />;
}
