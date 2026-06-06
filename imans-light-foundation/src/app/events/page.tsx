'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import styles from './events.module.css';
import eventsData from '@/data/events.json';

export default function EventsPage() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

  // Filter out the featured 2025 event from the main grid to avoid duplication
  const gridEvents = eventsData.filter(evt => evt.date !== '2025-10-18');

  return (
    <div>
      <section className="page-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Eventos' : 'Events'}</span>
          </div>
          <h1>{isEs ? 'Nuestra Prueba de Impacto' : 'Our Proof of Impact'}</h1>
          <p>
            {isEs
              ? 'Rastreando cada presentación, cada asociación y cada vida tocada.'
              : 'Tracking every presentation, every partnership, and every life touched.'}
          </p>
        </div>
      </section>

      {/* ===== FEATURED EVENTS ===== */}
      <section className="section transparent-bg" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className={styles.featuredSectionTitle}>
            <span className="section-label">{isEs ? 'Destacados' : 'Highlights'}</span>
            <h2>{isEs ? 'Eventos Destacados' : 'Featured Events'}</h2>
            <div className="gold-divider" style={{ width: '60px', margin: '0' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '32px' }}>
            {/* 2026 Gala Card */}
            <div className={styles.featuredCard} style={{ border: '2px solid rgba(201, 168, 76, 0.6)' }}>
              <div className={styles.featuredBadge}>{isEs ? 'PRÓXIMO' : 'UPCOMING'}</div>
              <div className={styles.featuredContent}>
                <span className={styles.featuredDate}>{isEs ? 'Octubre 2026' : 'October 2026'}</span>
                <h3 className={styles.featuredTitle}>{isEs ? 'Tercera Gala Anual' : '3rd Annual Gala'}</h3>
                <div className={styles.featuredLocation}>📍 The Signature Grand, Davie FL</div>
                <p className={styles.featuredDesc}>
                  {isEs 
                    ? 'Nuestro principal evento anual de recaudación de fondos y concientización. Únase a nosotros para una noche de reflexión, educación, solidaridad comunitaria y apoyo mientras recaudamos fondos cruciales para llevar programas de prevención a las escuelas del sur de Florida.'
                    : 'Our premier annual fundraising and awareness event. Join us for a night of reflection, education, community solidarity, and support as we raise crucial funds to bring prevention programs to schools across South Florida.'
                  }
                </p>
                <div style={{ marginTop: '24px' }}>
                  <Link href="/contact" className="btn btn-primary">
                    {isEs ? 'Patrocinar / Asistir' : 'Sponsor / Attend'}
                  </Link>
                </div>
              </div>
            </div>

            {/* 2025 Music & Lights Card */}
            <div className={styles.featuredCard} style={{ background: 'rgba(20, 28, 46, 0.45)', border: '1px solid rgba(201, 168, 76, 0.3)' }}>
              <div className={styles.pastBadge}>{isEs ? 'DESTACADO ANTERIOR' : 'PAST HIGHLIGHT'}</div>
              <div className={styles.featuredContent}>
                <span className={styles.featuredDate}>{isEs ? '18 de Octubre, 2025' : 'October 18, 2025'}</span>
                <h3 className={styles.featuredTitle} style={{ fontSize: '1.8rem' }}>
                  {isEs ? 'Música y Luces por la Vida - Baile y Exhibición 2025' : 'Music & Lights for Life Dance & Exhibition 2025'}
                </h3>
                <div className={styles.featuredLocation}>📍 Miramar City Center Hall, 2400 Civic Center Pl, Miramar FL 33025</div>
                <p className={styles.featuredDesc} style={{ fontSize: '0.98rem' }}>
                  {isEs 
                    ? 'Celebración de la Vida — nuestro evento más grande hasta ahora. Con presentaciones especiales por Mari Trini, Floyd, Aria Canales, Chirirun, Jackie Rain, Zeleste, Ebi Rich, David Fernandez, Vic The Kid, Coral Cove Choir y más. MC Tayhana Garcia. Invitados especiales Representante Estatal Marie Woodson y Comisionado Maxwell Chambers. Más de 24 patrocinadores, memorial de linternas, comida y refrescos incluidos.'
                    : 'Celebration of Life — our biggest event ever. Featuring special performances by Mari Trini, Floyd, Aria Canales, Chirirun, Jackie Rain, Zeleste, Ebi Rich, David Fernandez, Vic The Kid, Coral Cove Choir, and more. MC Tayhana Garcia. Special guests State Representative Marie Woodson and Commissioner Maxwell Chambers. 24+ sponsors, lantern memorial, food and refreshments included.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALL PAST EVENTS GRID ===== */}
      <section className="section section-dark transparent-bg">
        <div className="container">
          <div className={styles.featuredSectionTitle} style={{ marginBottom: '40px' }}>
            <span className="section-label">{isEs ? 'Cronología de Impacto' : 'Impact Timeline'}</span>
            <h2>{isEs ? 'Historial de Eventos' : 'Past Events'}</h2>
            <div className="gold-divider" style={{ width: '60px', margin: '0' }} />
          </div>

          <div className={styles.eventsGrid}>
            {gridEvents.map((evt, idx) => (
              <div key={idx} className={styles.eventCard}>
                {evt.image ? (
                  <div className={styles.eventImage}>
                    <img src={evt.image} alt={evt.titleEn} />
                  </div>
                ) : (
                  <div className={styles.eventImagePlaceholder}>
                    <span>{new Date(evt.date).getFullYear()}</span>
                  </div>
                )}
                <div className={styles.eventContent}>
                  <div className={styles.eventDate}>
                    {new Date(evt.date).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <h3>{isEs ? evt.titleEs : evt.titleEn}</h3>
                  <div className={styles.eventLocation}>
                    📍 {evt.location}
                  </div>
                  <p>{isEs ? evt.descriptionEs : evt.descriptionEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
