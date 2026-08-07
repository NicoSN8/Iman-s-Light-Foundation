'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { Heart, HandHeart, Users, Megaphone, Mic, Trophy } from 'lucide-react';
import styles from './get-involved.module.css';

export default function GetInvolvedPage() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

  const ways = [
    {
      icon: <Heart size={32} />,
      titleEn: 'Make a Donation',
      titleEs: 'Hacer una Donación',
      descEn: 'Your financial gift, no matter the size, directly funds our educational workshops, mental health programs, and community outreach.',
      descEs: 'Tu donación, sin importar el tamaño, financia directamente nuestros talleres educativos, programas de salud mental y alcance comunitario.',
      ctaEn: 'Donate Now',
      ctaEs: 'Donar Ahora',
      href: '/donate',
      primary: true,
    },
    {
      icon: <HandHeart size={32} />,
      titleEn: 'Volunteer With Us',
      titleEs: 'Ser Voluntario',
      descEn: 'Lend your time and talents to help organize events, assist at workshops, and support our community outreach programs.',
      descEs: 'Presta tu tiempo y talento para ayudar a organizar eventos, asistir en talleres y apoyar nuestros programas de alcance comunitario.',
      ctaEn: 'Apply to Volunteer',
      ctaEs: 'Solicitar ser Voluntario',
      href: '/contact',
      primary: false,
    },
    {
      icon: <Users size={32} />,
      titleEn: 'Become a Partner',
      titleEs: 'Convertirse en Socio',
      descEn: 'Organizations and agencies can partner with us to expand our reach, share resources, and amplify the message of prevention.',
      descEs: 'Organizaciones y agencias pueden asociarse con nosotros para ampliar nuestro alcance, compartir recursos y amplificar el mensaje de prevención.',
      ctaEn: 'Partner With Us',
      ctaEs: 'Asociarse con Nosotros',
      href: '/contact',
      primary: false,
    },
    {
      icon: <Megaphone size={32} />,
      titleEn: 'Spread the Word',
      titleEs: 'Correr la Voz',
      descEn: 'Follow us on social media and share our content. Awareness is the first step in prevention, help us reach more families.',
      descEs: 'Síguenos en redes sociales y comparte nuestro contenido. La concienciación es el primer paso en la prevención.',
      ctaEn: 'Follow on Instagram',
      ctaEs: 'Seguir en Instagram',
      href: 'https://www.instagram.com/imanslightfoundation',
      primary: false,
    },
    {
      icon: <Mic size={32} />,
      titleEn: 'Invite Us to Speak',
      titleEs: 'Invítanos a Hablar',
      descEn: 'We offer free educational presentations for schools, churches, community organizations, and businesses. Schedule a workshop.',
      descEs: 'Ofrecemos presentaciones educativas gratuitas para escuelas, iglesias, organizaciones comunitarias y empresas.',
      ctaEn: 'Request a Workshop',
      ctaEs: 'Solicitar un Taller',
      href: '/contact',
      primary: false,
    },
    {
      icon: <Trophy size={32} />,
      titleEn: 'Become a Sponsor',
      titleEs: 'Convertirse en Patrocinador',
      descEn: 'Corporate sponsorships provide vital funding for our events and programs while giving your organization community visibility.',
      descEs: 'Los patrocinios corporativos proporcionan financiamiento vital para nuestros eventos y programas mientras dan visibilidad comunitaria a tu organización.',
      ctaEn: 'Sponsor an Event',
      ctaEs: 'Patrocinar un Evento',
      href: '/contact',
      primary: false,
    },
  ];

  const testimonials = [
    {
      quoteEn: "Iman's Light Foundation changed how I talk to my kids about drugs. The workshop was eye-opening and gave us real tools to use at home.",
      quoteEs: "La Fundación Iman's Light cambió la forma en que hablo con mis hijos sobre las drogas. El taller fue revelador y nos dio herramientas reales.",
      nameEn: 'Maria G., Miami Parent',
      nameEs: 'Maria G., Madre de Miami',
    },
    {
      quoteEn: "As a school counselor, I recommend these workshops to every administrator. The information is accurate, age-appropriate, and life-saving.",
      quoteEs: "Como consejera escolar, recomiendo estos talleres a todos los administradores. La información es precisa, apropiada para la edad y salva vidas.",
      nameEn: 'J. Rodriguez, School Counselor',
      nameEs: 'J. Rodriguez, Consejera Escolar',
    },
    {
      quoteEn: "After losing my son, this foundation gave me community, purpose, and hope. I don't know where I'd be without Iman's Light.",
      quoteEs: "Después de perder a mi hijo, esta fundación me dio comunidad, propósito y esperanza. No sé dónde estaría sin Iman's Light.",
      nameEn: 'Community Member',
      nameEs: 'Miembro de la Comunidad',
    },
  ];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Participa' : 'Get Involved'}</span>
          </div>
          <span className="section-label">{isEs ? 'Únete a Nosotros' : 'Join Us'}</span>
          <h1>{isEs ? 'Múltiples Formas de Participar' : 'Many Ways to Make a Difference'}</h1>
          <p>{isEs ? 'Cada persona puede contribuir a la misión de Iman\'s Light, ya sea donando, siendo voluntario, o simplemente corriendo la voz.' : "Everyone can contribute to Iman's Light's mission, whether through donating, volunteering, or simply spreading the word."}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.waysGrid}>
            {ways.map((way, i) => (
              <div key={i} className={`card ${styles.wayCard} ${way.primary ? styles.wayCardPrimary : ''}`}>
                <div className={styles.wayIcon}>{way.icon}</div>
                <h3 className={styles.wayTitle}>{isEs ? way.titleEs : way.titleEn}</h3>
                <p className={styles.wayDesc}>{isEs ? way.descEs : way.descEn}</p>
                {way.href.startsWith('http') ? (
                  <a
                    href={way.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${way.primary ? 'btn-primary' : 'btn-outline'}`}
                    style={{ marginTop: 'auto', fontSize: '0.875rem', padding: '12px 24px' }}
                  >
                    {isEs ? way.ctaEs : way.ctaEn} →
                  </a>
                ) : (
                  <Link
                    href={way.href}
                    className={`btn ${way.primary ? 'btn-primary' : 'btn-outline'}`}
                    style={{ marginTop: 'auto', fontSize: '0.875rem', padding: '12px 24px' }}
                  >
                    {isEs ? way.ctaEs : way.ctaEn} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-dark">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{isEs ? 'Testimonios' : 'Testimonials'}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{isEs ? 'Escucha a Nuestra Comunidad' : 'Hear From Our Community'}</h2>
            <div className="gold-divider center" />
          </div>
          <div className="grid-3" style={{ marginTop: '48px' }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`card card-dark ${styles.testimonialCard}`}>
                <div className={styles.quoteIcon}>&ldquo;</div>
                <p className={styles.quoteText}>{isEs ? t.quoteEs : t.quoteEn}</p>
                <div className={styles.quoteName}>{isEs ? t.nameEs : t.nameEn}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
