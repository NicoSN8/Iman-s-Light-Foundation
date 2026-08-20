'use client';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera } from 'lucide-react';
import { LanguageContext } from '@/context/LanguageContext';
import styles from './gallery.module.css';
import galleryItems from '@/data/gallery.json';

const CATEGORY_LABELS: Record<string, { en: string; es: string }> = {
  Advocacy: { en: 'Advocacy', es: 'Incidencia' },
  Event: { en: 'Event', es: 'Evento' },
  Outreach: { en: 'Outreach', es: 'Alcance Comunitario' },
  Support: { en: 'Support', es: 'Apoyo' },
  Workshop: { en: 'Workshop', es: 'Taller' },
};

export default function GalleryPage() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Galería' : 'Gallery'}</span>
          </div>
          <span className="section-label">{isEs ? 'Nuestra Comunidad' : 'Our Community'}</span>
          <h1>{isEs ? 'Galería de Fotos' : 'Photo Gallery'}</h1>
          <p>{isEs ? 'Fotos de nuestros talleres, eventos y trabajo comunitario.' : 'Photos from our workshops, events, and outreach across the community.'}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.galleryNote}>
            <p style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Camera className="gold-icon" style={{ flexShrink: 0, marginTop: '2px' }} size={20} />
              <span>
                {isEs
                  ? 'Fotos y videos reales de nuestros eventos, talleres y programas. ¿Tienes fotos de un evento de Iman\'s Light? Contáctanos para agregarlas a la galería.'
                  : 'Real photos and video from our events, workshops, and programs. Have photos from an Iman\'s Light event? Contact us to add them to the gallery.'}
              </span>
            </p>
          </div>
          <div style={{ marginBottom: '48px' }}>
            <h2 className="section-title" style={{ marginBottom: '20px' }}>
              {isEs ? 'Video: Music & Lights for Life 2025' : 'Video: Music & Lights for Life 2025'}
            </h2>
            <video
              controls
              preload="metadata"
              style={{ width: '100%', borderRadius: 'var(--radius-md)', display: 'block' }}
              src="https://ic5hghfat7q3aql8.public.blob.vercel-storage.com/events/music-and-lights-for-life-2025-highlight-IomXpqtKIaZUkq878IUpPG2MrxqyE5.mp4"
            />
          </div>
          <div className={styles.gallery}>
            {galleryItems.map((item, i) => {
              const categoryLabel = CATEGORY_LABELS[item.category]?.[lang] ?? item.category;
              return (
                <div key={i} className={styles.galleryItem}>
                  <div className={styles.galleryImg}>
                    <Image
                      src={item.src}
                      alt={isEs ? `Foto de Iman's Light Foundation: ${categoryLabel}` : `Iman's Light Foundation photo: ${categoryLabel}`}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className={styles.galleryOverlay}>
                      <span className="tag">{categoryLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container text-center">
          <h2 className="section-title">{isEs ? '¿Tienes fotos de nuestros eventos?' : 'Have photos from our events?'}</h2>
          <div className="gold-divider center" />
          <p className="section-subtitle">{isEs ? 'Comparte tus fotos con nosotros y las agregaremos a nuestra galería.' : 'Share your photos with us and we\'ll add them to our gallery.'}</p>
          <Link href="/contact" className="btn btn-dark">{isEs ? 'Enviar Fotos' : 'Submit Photos'} →</Link>
        </div>
      </section>
    </>
  );
}
