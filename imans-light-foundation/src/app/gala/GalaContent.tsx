'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CalendarDays } from 'lucide-react';
import { LanguageContext } from '@/context/LanguageContext';
import TicketTiers, { type TicketTierData } from '@/components/TicketTiers';
import styles from './gala.module.css';

interface EventRow {
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  location: string;
  image: string | null;
  eventDate: string | null;
  dateLabel: string | null;
}

export default function GalaContent({ event, tiers }: { event: EventRow; tiers: TicketTierData[] }) {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

  const dateText =
    event.dateLabel ||
    (event.eventDate
      ? new Date(event.eventDate).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : '');

  return (
    <div>
      <section className={styles.hero}>
        <Image
          src="/media/56e6ee_8dc0ab6d11544b2899b97b42d912eb28~mv2.jpeg"
          alt={isEs ? "Gala de la Fundación Iman's Light" : "Iman's Light Foundation Gala"}
          fill
          priority
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={styles.heroLabel}>{isEs ? 'Nuestra Noche Más Importante' : 'Our Most Important Night'}</span>
          <h1 className={styles.heroTitle}>{isEs ? '3ra Gala Anual' : '3rd Annual Gala'}</h1>
          <p className={styles.heroSubtitle}>{isEs ? 'Música y Luces por la Vida' : 'Music and Lights for Life'}</p>
          <div className={styles.heroMeta}>
            {dateText && (
              <span className={styles.heroMetaItem}><CalendarDays size={18} /> {dateText}</span>
            )}
            {event.location && (
              <span className={styles.heroMetaItem}><MapPin size={18} /> {event.location}</span>
            )}
          </div>
          <p className={styles.heroTagline}>
            {isEs
              ? 'Una noche. Una comunidad reunida. Los fondos que hacen posible cada taller, cada sesión de consejería y cada vida que ayudamos a salvar durante todo el año.'
              : "One night. One community, together. The funds that make every workshop, every counseling session, and every life we help save all year possible."}
          </p>
          <Link href="#tickets" className="btn btn-primary">
            {isEs ? 'Reserva Tu Mesa' : 'Reserve Your Table'} →
          </Link>
        </div>
      </section>

      {tiers.length > 0 && (
        <section id="tickets" className="section section-dark transparent-bg">
          <div className="container">
            <div className="text-center">
              <span className="section-label">{isEs ? 'Boletos' : 'Tickets'}</span>
              <h2 className="section-title">{isEs ? 'Reserva Tu Mesa' : 'Reserve Your Table'}</h2>
              <div className="gold-divider center" />
              <p className={styles.ticketsIntro}>
                {isEs
                  ? 'Boletos en venta pronto por Zeffy. Mientras tanto, contáctanos para reservar tu mesa.'
                  : 'Online tickets go live soon via Zeffy. In the meantime, contact us to reserve your table.'}
              </p>
            </div>
            <TicketTiers tiers={tiers} lang={lang} />
          </div>
        </section>
      )}

      <section className={`section ${styles.whySection}`}>
        <div className="container">
          <div className="text-center">
            <span className="section-label">{isEs ? 'Por Qué Importa' : 'Why This Night Matters'}</span>
            <h2 className="section-title">{isEs ? 'Todo Comienza Aquí' : 'It All Starts Here'}</h2>
            <div className="gold-divider center" />
          </div>

          <div className={styles.whyGrid}>
            <div className={styles.whyText}>
              <p>
                {isEs
                  ? 'Esta es la noche que hace posible todo lo demás. Los talleres que llevamos a las aulas, la consejería que ofrecemos a familias en duelo, el Narcan que ponemos en manos de quienes lo necesitan: todo se financia gracias a la comunidad que se presenta esta noche.'
                  : "This is the night that makes everything else possible. The workshops we bring into classrooms, the counseling we offer grieving families, the naloxone we put into the hands of people who need it: all of it runs on what this community raises in one evening."}
              </p>
              <p>
                {isEs
                  ? 'No es solo una fiesta. Es la razón por la que podemos seguir presentándonos, año tras año, para los estudiantes y familias del sur de la Florida. Cada mesa reservada, cada patrocinio, cada boleto comprado se traduce directamente en talleres impartidos y vidas tocadas el próximo año.'
                  : "This isn't a party. It's the reason we can keep showing up, year after year, for South Florida's students and families. Every table reserved, every sponsorship, every ticket sold turns directly into workshops taught and lives touched next year."}
              </p>
              <p>
                {isEs
                  ? 'Únete a nosotros para una noche de música, homenaje y esperanza, y ayúdanos a llevar esta misión hacia otro año.'
                  : 'Join us for an evening of music, remembrance, and hope, and help carry this mission into another year.'}
              </p>
            </div>

            <div className={styles.lookBackCard}>
              <div className={styles.lookBackImageWrap}>
                <Image
                  src="/media/56e6ee_c06acaeb840e48098e7a8113301f3404~mv2.jpg"
                  alt={isEs ? 'Música y Luces por la Vida 2025' : 'Music and Lights for Life 2025'}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.lookBackContent}>
                <span className={styles.lookBackLabel}>{isEs ? 'Mirando Atrás' : 'Look Back at Last Year'}</span>
                <p className={styles.lookBackText}>
                  {isEs
                    ? 'Música y Luces por la Vida 2025 reunió a más de 24 patrocinadores y llenó el Miramar City Center Hall para una noche de presentaciones y un poderoso mensaje de prevención. Este año, vamos aún más grande.'
                    : '2025\'s Music and Lights for Life brought together 24+ sponsors and a packed Miramar City Center Hall for a night of performances and powerful prevention messaging. This year, we\'re going even bigger.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section transparent-bg ${styles.finalCta}`}>
        <div className="container">
          <h2>{isEs ? '¿Preguntas Sobre la Gala?' : 'Questions About the Gala?'}</h2>
          <p>
            {isEs
              ? 'Ya sea sobre mesas, patrocinios o cómo involucrarte, estamos aquí para ayudarte a ser parte de esta noche.'
              : "Whether it's about tables, sponsorships, or how to get involved, we're here to help you be part of this night."}
          </p>
          <Link href="/contact" className="btn btn-outline">
            {isEs ? 'Contáctanos' : 'Contact Us'} →
          </Link>
        </div>
      </section>
    </div>
  );
}
