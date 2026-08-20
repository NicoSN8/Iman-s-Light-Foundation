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
      descEn: 'Follow us on social media and share what we post. Awareness is the first step in prevention: the more people see it, the more families we reach.',
      descEs: 'Síguenos en redes sociales y comparte lo que publicamos. La concientización es el primer paso en la prevención: entre más gente lo vea, a más familias llegamos.',
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

  // Real quotes from actual letters of support the Foundation has received --
  // never invent testimonials or attribute quotes to generic/unnamed people.
  const testimonials = [
    {
      quoteEn: "Through the Iman's Light Foundation, you offer students critical knowledge they often have not encountered before, particularly regarding the dangers of substance abuse, marijuana use, vaping, and fentanyl. Your approach creates a safe, welcoming environment where students feel comfortable asking questions without fear of judgment.",
      quoteEs: "A través de la Fundación Iman's Light, ofrecen a los estudiantes conocimientos críticos que a menudo no habían encontrado antes, particularmente sobre los peligros del abuso de sustancias, el uso de marihuana, el vapeo y el fentanilo. Su enfoque crea un ambiente seguro y acogedor donde los estudiantes se sienten cómodos haciendo preguntas.",
      nameEn: 'Eduardo Sabillon, Counselor, Kinloch Park Middle School',
      nameEs: 'Eduardo Sabillon, Consejero, Kinloch Park Middle School',
    },
    {
      quoteEn: "Her ability to combine professional expertise with personal experience sets her apart as a true leader in prevention and community outreach. The workshops she has conducted in partnership with us have not only increased awareness but also fostered safe spaces for dialogue.",
      quoteEs: "Su capacidad para combinar la experiencia profesional con la experiencia personal la distingue como una verdadera líder en prevención y alcance comunitario. Los talleres que ha realizado en asociación con nosotros no solo han aumentado la conciencia sino que también han fomentado espacios seguros para el diálogo.",
      nameEn: 'Natalia Angarita, Director of Special Affairs, Drug-Free World Foundation South Florida',
      nameEs: 'Natalia Angarita, Directora de Asuntos Especiales, Drug-Free World Foundation South Florida',
    },
    {
      quoteEn: "Iman's Light Foundation has demonstrated a strong commitment to educating our youth and community members on the dangers of lethal synthetic drugs, vaping, and overall substance misuse. Their workshops are informative, engaging, and rooted in compassion and evidence-based practices.",
      quoteEs: "La Fundación Iman's Light ha demostrado un fuerte compromiso con la educación de nuestros jóvenes y miembros de la comunidad sobre los peligros de las drogas sintéticas letales, el vapeo y el mal uso de sustancias. Sus talleres son informativos, atractivos y basados en la compasión y prácticas basadas en evidencia.",
      nameEn: 'Romnie Vertus, Program Coordinator, S.A.R.A. / Prosperity Social & Community Development Group',
      nameEs: 'Romnie Vertus, Coordinador de Programas, S.A.R.A. / Prosperity Social & Community Development Group',
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
