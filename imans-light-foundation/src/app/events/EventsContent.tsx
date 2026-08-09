'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { LanguageContext } from '@/context/LanguageContext';
import type { TicketTierData } from '@/components/TicketTiers';
import styles from './events.module.css';

interface EventRow {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  location: string;
  image: string | null;
  eventDate: string | null;
  dateLabel: string | null;
  isFeatured: boolean;
}

interface EventsContentProps {
  featuredEvents: EventRow[];
  gridEvents: EventRow[];
  ticketTiers: (TicketTierData & { eventId: string })[];
}

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function EventsPage({ featuredEvents, gridEvents, ticketTiers }: EventsContentProps) {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

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

      {featuredEvents.length > 0 && (
        <section className="section transparent-bg" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className={styles.featuredSectionTitle}>
              <span className="section-label">{isEs ? 'Destacados' : 'Highlights'}</span>
              <h2>{isEs ? 'Eventos Destacados' : 'Featured Events'}</h2>
              <div className="gold-divider" style={{ width: '60px', margin: '0' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '32px' }}>
              {featuredEvents.map((evt) => {
                const isUpcoming = !evt.eventDate || evt.eventDate >= todayStr();
                const dateText =
                  evt.dateLabel ||
                  (evt.eventDate
                    ? new Date(evt.eventDate).toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : '');
                const eventTiers = ticketTiers.filter((t) => t.eventId === evt.id);
                const hasTickets = isUpcoming && eventTiers.length > 0;

                return (
                  <div
                    key={evt.id}
                    className={styles.featuredCard}
                    style={
                      isUpcoming
                        ? { border: '2px solid rgba(201, 168, 76, 0.6)' }
                        : { background: 'rgba(20, 28, 46, 0.45)', border: '1px solid rgba(201, 168, 76, 0.3)' }
                    }
                  >
                    <div className={isUpcoming ? styles.featuredBadge : styles.pastBadge}>
                      {isUpcoming ? (isEs ? 'PRÓXIMO' : 'UPCOMING') : (isEs ? 'DESTACADO ANTERIOR' : 'PAST HIGHLIGHT')}
                    </div>
                    <div className={styles.featuredCardInner}>
                      {evt.image && (
                        <div className={styles.featuredImageWrap}>
                          <Image src={evt.image} alt={isEs ? evt.titleEs : evt.titleEn} fill style={{ objectFit: 'cover' }} />
                        </div>
                      )}
                      <div className={styles.featuredContent}>
                        <span className={styles.featuredDate}>{dateText}</span>
                        <h3 className={styles.featuredTitle} style={!isUpcoming ? { fontSize: '1.8rem' } : undefined}>
                          {isEs ? evt.titleEs : evt.titleEn}
                        </h3>
                        {evt.location && (
                          <div className={styles.featuredLocation}>
                            <MapPin size={15} /> {evt.location}
                          </div>
                        )}
                        <p className={styles.featuredDesc} style={!isUpcoming ? { fontSize: '0.98rem' } : undefined}>
                          {isEs ? evt.descriptionEs : evt.descriptionEn}
                        </p>
                        {isUpcoming && (
                          <div style={{ marginTop: '24px' }}>
                            <Link href={hasTickets ? '/gala' : '/contact'} className="btn btn-primary">
                              {hasTickets
                                ? (isEs ? 'Ver Gala y Reservar Boletos' : 'View Gala & Reserve Tickets')
                                : (isEs ? 'Patrocinar / Asistir' : 'Sponsor / Attend')} →
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section section-dark transparent-bg">
        <div className="container">
          <div className={styles.featuredSectionTitle} style={{ marginBottom: '40px' }}>
            <span className="section-label">{isEs ? 'Cronología de Impacto' : 'Impact Timeline'}</span>
            <h2>{isEs ? 'Historial de Eventos' : 'Past Events'}</h2>
            <div className="gold-divider" style={{ width: '60px', margin: '0' }} />
          </div>

          <div className={styles.eventsGrid}>
            {gridEvents.map((evt) => (
              <div key={evt.id} className={styles.eventCard}>
                {evt.image ? (
                  <div className={styles.eventImage}>
                    <Image src={evt.image} alt={evt.titleEn} fill style={{ objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div className={styles.eventImagePlaceholder}>
                    <span>{evt.eventDate ? new Date(evt.eventDate).getFullYear() : ''}</span>
                  </div>
                )}
                <div className={styles.eventContent}>
                  <div className={styles.eventDate}>
                    {evt.dateLabel ||
                      (evt.eventDate &&
                        new Date(evt.eventDate).toLocaleDateString(isEs ? 'es-ES' : 'en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }))}
                  </div>
                  <h3>{isEs ? evt.titleEs : evt.titleEn}</h3>
                  {evt.location && (
                    <div className={styles.eventLocation}>
                      <MapPin size={14} /> {evt.location}
                    </div>
                  )}
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
