'use client';

import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { BookOpen, Brain, Scale, GraduationCap, HeartPulse, ShieldPlus, Users, MapPin } from 'lucide-react';
import styles from './page.module.css';
import { FEATURED_SPONSORS, COMMUNITY_SPONSORS, TEXT_ONLY_SPONSORS } from '@/data/sponsors';
import SponsorGrid from '@/components/SponsorGrid';
import TextSponsorPills from '@/components/TextSponsorPills';
import { parseDateOnly } from '@/lib/dates';
import { TICKETS_LIVE } from '@/lib/featureFlags';

const GALA_EVENT_ID = 'b58cabc5-7cdc-4719-80a7-283f2932a07c';

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
}

const todayStr = () => new Date().toISOString().slice(0, 10);

const t = {
  en: {
    heroLabel: 'Be The Light In Darkness',
    heroTitle: 'Preventing Tragedies,\nIlluminating Futures',
    heroSubtitle:
      "We teach communities about the dangers of fentanyl and push for legislative change. We also provide mental health support to people affected by addiction.",
    heroCta1: 'Our Mission',
    heroCta2: 'Donate',
    impactLabel: 'Our Impact',
    impactTitle: 'Every Life Matters',
    impactSub: 'We work through education, advocacy, and community programs to change lives across South Florida.',
    stat1: '500+',
    stat1Label: 'Lives Reached',
    stat2: '30+',
    stat2Label: 'Community Events',
    stat3: '10+',
    stat3Label: 'Partner Organizations',
    stat4: '3',
    stat4Label: 'Active Programs',
    missionLabel: 'What We Stand For',
    missionTitle: "Iman's Light Stands For Change",
    missionSub: 'We work in three ways to protect our communities from fentanyl and other lethal drugs.',
    pillar1Title: 'Education & Prevention',
    pillar1Text: 'Delivering life-saving workshops to children, youth, and adults on the perils of Fentanyl, drug lacing, and grooming tactics.',
    pillar2Title: 'Mental Health & Wellness',
    pillar2Text: 'Providing workshops with strategies to address anxiety, depression, anger, and stress, key root causes of substance use.',
    pillar3Title: 'Legislative Advocacy',
    pillar3Text: 'Pushing for real consequences for drug dealers and traffickers, and stronger protections for children and communities.',
    storyLabel: "Iman's Story",
    storyTitle: 'Finding Light in the Darkest Moments',
    storyText1: "Fentanyl is killing people of every age, and it has to stop. No infant, child, teenager, or adult should lose their life to this drug, or any other.",
    storyText2: "Iman's Light Foundation started after a tragedy. Since then, it has grown into a source of education, support, and change for communities across Florida and beyond.",
    storyBtn: "Read Iman's Full Story",
    programsLabel: 'Programs',
    programsTitle: 'Our Core Programs',
    programsSub: 'Programs built with our community, to prevent addiction and support the people it affects.',
    prog1: 'Drug Education Workshops',
    prog1Text: 'School and community workshops covering Fentanyl dangers, drug lacing, and resistance strategies.',
    prog2: 'Mental Health Wellness',
    prog2Text: 'Workshops that address anxiety, depression, stress, and emotional regulation.',
    prog3: 'Saving Lives Initiative',
    prog3Text: 'Direct outreach, resource connection, and safe disposal of medical waste and drugs.',
    prog4: 'Victim & Family Support',
    prog4Text: 'Connecting grieving families to resources, counseling, and community support networks.',
    learnMore: 'Learn More',
    eventsLabel: 'Events',
    eventsTitle: 'Highlighted Events',
    eventsSub: 'Join us at our community events where education meets action.',
    viewAllEvents: 'View All Events',
    ctaTitle: 'Be Part of the Solution',
    ctaText: 'Your donation funds education workshops, mental health programs, and community outreach that saves lives.',
    ctaDonate: 'Donate Today',
    ctaVolunteer: 'Volunteer With Us',
    newsletterTitle: 'Stay Informed',
    newsletterText: 'Get updates on our programs, events, and advocacy efforts.',
    newsletterPlaceholder: 'Your email address',
    newsletterBtn: 'Subscribe',
  },
  es: {
    heroLabel: 'Sé La Luz En La Oscuridad',
    heroTitle: 'Previniendo Tragedias,\nIluminando Futuros',
    heroSubtitle:
      'Educamos a las comunidades sobre los peligros del fentanilo y luchamos por cambios legislativos. También ofrecemos apoyo de salud mental a las personas afectadas por la adicción.',
    heroCta1: 'Nuestra Misión',
    heroCta2: 'Donar Ahora',
    impactLabel: 'Nuestro Impacto',
    impactTitle: 'Cada Vida Importa',
    impactSub: 'Trabajamos a través de la educación, la abogacía y los programas comunitarios para cambiar vidas en el sur de Florida.',
    stat1: '500+',
    stat1Label: 'Vidas Alcanzadas',
    stat2: '30+',
    stat2Label: 'Eventos Comunitarios',
    stat3: '10+',
    stat3Label: 'Organizaciones Aliadas',
    stat4: '3',
    stat4Label: 'Programas Activos',
    missionLabel: 'Lo Que Defendemos',
    missionTitle: 'Iman\'s Light Lucha Por El Cambio',
    missionSub: 'Trabajamos de tres maneras para proteger a nuestras comunidades del fentanilo y otras drogas letales.',
    pillar1Title: 'Educación y Prevención',
    pillar1Text: 'Talleres que salvan vidas sobre los peligros del Fentanilo, el corte de drogas y las tácticas de manipulación.',
    pillar2Title: 'Salud Mental y Bienestar',
    pillar2Text: 'Talleres con estrategias para abordar la ansiedad, la depresión, la ira y el estrés, causas raíz del consumo de sustancias.',
    pillar3Title: 'Abogacía Legislativa',
    pillar3Text: 'Luchando por consecuencias reales para los traficantes de drogas y protecciones más fuertes para niños y comunidades.',
    storyLabel: 'La Historia de Iman',
    storyTitle: 'Encontrando Luz en los Momentos Más Oscuros',
    storyText1: 'El fentanilo está matando a personas de todas las edades, y tiene que parar. Ningún bebé, niño, joven o adulto debería perder la vida por esta droga, ni por ninguna otra.',
    storyText2: 'La Fundación Iman\'s Light nació de una tragedia. Desde entonces, se ha convertido en una fuente de educación, apoyo y cambio para comunidades de toda Florida.',
    storyBtn: 'Leer la Historia Completa de Iman',
    programsLabel: 'Programas',
    programsTitle: 'Nuestros Programas Principales',
    programsSub: 'Programas creados junto a nuestra comunidad, para prevenir la adicción y apoyar a las personas afectadas.',
    prog1: 'Talleres de Educación sobre Drogas',
    prog1Text: 'Talleres en escuelas y comunidades sobre los peligros del Fentanilo, el corte de drogas y estrategias de resistencia.',
    prog2: 'Bienestar de Salud Mental',
    prog2Text: 'Talleres que abordan la ansiedad, la depresión, el estrés y la regulación emocional.',
    prog3: 'Iniciativa Salvando Vidas',
    prog3Text: 'Alcance directo, conexión de recursos y eliminación segura de residuos médicos y drogas.',
    prog4: 'Apoyo a Víctimas y Familias',
    prog4Text: 'Conectamos familias en duelo con recursos, asesoramiento y redes de apoyo comunitario.',
    learnMore: 'Saber Más',
    eventsLabel: 'Eventos',
    eventsTitle: 'Eventos Destacados',
    eventsSub: 'Únase a nuestros eventos comunitarios donde la educación se convierte en acción.',
    viewAllEvents: 'Ver Todos los Eventos',
    ctaTitle: 'Sé Parte de la Solución',
    ctaText: 'Su donación financia talleres educativos, programas de salud mental y alcance comunitario que salva vidas.',
    ctaDonate: 'Donar Hoy',
    ctaVolunteer: 'Ser Voluntario',
    newsletterTitle: 'Mantente Informado',
    newsletterText: 'Recibe actualizaciones sobre nuestros programas, eventos y esfuerzos de abogacía.',
    newsletterPlaceholder: 'Tu correo electrónico',
    newsletterBtn: 'Suscribirse',
  },
};

export default function HomeContent({ featuredEvents }: { featuredEvents: EventRow[] }) {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';
  const txt = t[lang];
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

  const today = todayStr();
  const upcoming = featuredEvents
    .filter((e) => !e.eventDate || e.eventDate >= today)
    .sort((a, b) => (a.eventDate ?? '9999-99-99').localeCompare(b.eventDate ?? '9999-99-99'));
  const mostRecentPast = featuredEvents
    .filter((e) => e.eventDate && e.eventDate < today)
    .sort((a, b) => b.eventDate!.localeCompare(a.eventDate!))[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null) => {
    if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/hero_hope_bg.png"
            alt="Iman's Light Foundation Hope Background"
            fill
            priority
            className={styles.heroBgImg}
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.9 }}
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <span className={`section-label ${styles.heroLabel}`}>{txt.heroLabel}</span>
          <h1 className={styles.heroTitle}>
            {txt.heroTitle.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </h1>
          <p className={styles.heroSub}>{txt.heroSubtitle}</p>
          <div className={styles.heroBtns}>
            <Link href="/about" className="btn btn-secondary">{txt.heroCta1}</Link>
            <Link href="/donate" className="btn btn-primary">{txt.heroCta2} →</Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span className={styles.heroScrollText}>
            {lang === 'en' ? 'SCROLL TO DISCOVER TRANSPARENCY & IMPACT REPORTS' : 'DESPLACE HACIA ABAJO PARA INFORMES Y TRANSPARENCIA'}
          </span>
          <div className={styles.scrollDot} />
        </div>
      </section>

      {/* ===== GALA HIGHLIGHT ===== */}
      <section className="section transparent-bg">
        <div className="container">
          <div ref={addRef} className="fade-up text-center">
            <span className="section-label">{txt.eventsLabel}</span>
            <h2 className="section-title">{txt.eventsTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle">{txt.eventsSub}</p>
          </div>

          {/* Upcoming featured events, soonest first */}
          {upcoming.map((evt) => {
            const isGala = evt.id === GALA_EVENT_ID;
            const dateText =
              evt.dateLabel ||
              (evt.eventDate
                ? parseDateOnly(evt.eventDate).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : '');
            return (
              <div
                key={evt.id}
                ref={addRef}
                className="fade-up"
                style={{
                  marginTop: '40px',
                  background: 'var(--navy)',
                  borderRadius: '20px',
                  border: '2px solid rgba(201,168,76,0.6)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--gradient-gold)', zIndex: 1 }} />
                <div className="grid-2" style={{ gap: 0, alignItems: 'stretch' }}>
                  <div style={{ position: 'relative', minHeight: '320px' }}>
                    {evt.image && (
                      <Image
                        src={evt.image}
                        alt={isEs ? evt.titleEs : evt.titleEn}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="tag" style={{ marginBottom: '16px', width: 'fit-content' }}>
                      {isGala
                        ? (isEs ? 'Nuestra Noche Más Importante' : 'Our Most Important Night')
                        : (isEs ? 'Próximo Evento' : 'Upcoming Event')}
                    </span>
                    <h3 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display', fontSize: '2.1rem', marginBottom: '10px' }}>
                      {isEs ? evt.titleEs : evt.titleEn}
                    </h3>
                    {dateText && (
                      <p style={{ color: 'var(--white)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '2px' }}>
                        {dateText}
                      </p>
                    )}
                    {evt.location && (
                      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={16} /> {evt.location}
                      </p>
                    )}
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '20px' }}>
                      {isEs ? evt.descriptionEs : evt.descriptionEn}
                    </p>
                    {isGala && (
                      <p style={{ color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '24px' }}>
                        {TICKETS_LIVE
                          ? (isEs ? 'Tamaños de mesa y precios ya disponibles' : 'Table sizes and pricing available now')
                          : (isEs ? 'Información de boletos próximamente' : 'Ticket info coming soon')}
                      </p>
                    )}
                    <Link href={isGala ? '/gala' : '/events'} className="btn btn-primary" style={{ width: 'fit-content' }}>
                      {isGala
                        ? (isEs ? 'Ver la Gala y Reservar' : 'View the Gala & Reserve')
                        : (isEs ? 'Ver Detalles del Evento' : 'View Event Details')} →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Most recent past featured event */}
          {mostRecentPast && (
            <div
              ref={addRef}
              className="fade-up"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                alignItems: 'center',
                background: 'rgba(20, 28, 46, 0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(201,168,76,0.3)',
                padding: '24px',
                maxWidth: '800px',
                margin: '24px auto 0',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              }}
            >
              {mostRecentPast.image && (
                <div style={{ position: 'relative', width: '140px', height: '180px', flexShrink: 0, borderRadius: '10px', overflow: 'hidden' }}>
                  <Image
                    src={mostRecentPast.image}
                    alt={isEs ? mostRecentPast.titleEs : mostRecentPast.titleEn}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              )}
              <div style={{ flex: 1, minWidth: '220px' }}>
                <span className="tag" style={{ marginBottom: '12px', display: 'inline-block' }}>{isEs ? 'Destacado del Pasado' : 'Past Highlight'}</span>
                <h4 style={{ color: 'var(--white)', fontFamily: 'Playfair Display', fontSize: '1.4rem', marginBottom: '8px' }}>
                  {isEs ? mostRecentPast.titleEs : mostRecentPast.titleEn}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {isEs ? mostRecentPast.descriptionEs : mostRecentPast.descriptionEn}
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== IMPACT STATS ===== */}
      <section className={`section section-dark ${styles.statsSection}`}>
        <div className="container">
          <div
            ref={addRef}
            className={`fade-up ${styles.statsHeader} text-center`}
          >
            <span className="section-label">{txt.impactLabel}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{txt.impactTitle}</h2>
            <p className="section-subtitle" style={{ margin: '0 auto 48px', color: 'rgba(255,255,255,0.6)' }}>{txt.impactSub}</p>
          </div>
          <div className={`grid-4 ${styles.statsGrid}`}>
            {[
              { num: txt.stat1, label: txt.stat1Label },
              { num: txt.stat2, label: txt.stat2Label },
              { num: txt.stat3, label: txt.stat3Label },
              { num: txt.stat4, label: txt.stat4Label },
            ].map((s, i) => (
              <div
                key={i}
                ref={addRef}
                className={`fade-up card card-dark ${styles.statCard}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="stat-number">{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION PILLARS ===== */}
      <section className="section section-cream">
        <div className="container">
          <div ref={addRef} className="fade-up text-center">
            <span className="section-label">{txt.missionLabel}</span>
            <h2 className="section-title">{txt.missionTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle">{txt.missionSub}</p>
          </div>
          <div className="grid-3">
            {[
              { icon: <BookOpen size={32} />, title: txt.pillar1Title, text: txt.pillar1Text },
              { icon: <Brain size={32} />, title: txt.pillar2Title, text: txt.pillar2Text },
              { icon: <Scale size={32} />, title: txt.pillar3Title, text: txt.pillar3Text },
            ].map((p, i) => (
              <div
                key={i}
                ref={addRef}
                className={`fade-up card ${styles.pillarCard}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className={styles.pillarIcon}>{p.icon}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <div className="gold-divider" />
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STORY SECTION ===== */}
      <section className={`section ${styles.storySection}`}>
        <div className="container">
          <div className="grid-2">
            <div ref={addRef} className="fade-up">
              <video 
                src="/media/video/56e6ee_aeaf7c872eb5487cbda598589baea0e7.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.storyImg} 
              />
            </div>
            <div ref={addRef} className="fade-up" style={{ transitionDelay: '0.2s' }}>
              <span className="section-label">{txt.storyLabel}</span>
              <h2 className="section-title">{txt.storyTitle}</h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '20px' }}>{txt.storyText1}</p>
              <p style={{ marginBottom: '32px' }}>{txt.storyText2}</p>
              <Link href="/about" className="btn btn-dark">{txt.storyBtn} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="section section-dark">
        <div className="container">
          <div ref={addRef} className="fade-up text-center">
            <span className="section-label">{txt.programsLabel}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{txt.programsTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle" style={{ margin: '0 auto 48px', color: 'rgba(255,255,255,0.6)' }}>{txt.programsSub}</p>
          </div>
          <div className="grid-4">
            {[
              { icon: <GraduationCap size={32} />, title: txt.prog1, text: txt.prog1Text },
              { icon: <HeartPulse size={32} />, title: txt.prog2, text: txt.prog2Text },
              { icon: <ShieldPlus size={32} />, title: txt.prog3, text: txt.prog3Text },
              { icon: <Users size={32} />, title: txt.prog4, text: txt.prog4Text },
            ].map((p, i) => (
              <div
                key={i}
                ref={addRef}
                className={`fade-up card card-dark ${styles.programCard}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={styles.programIcon}>{p.icon}</div>
                <h4 className={styles.programTitle}>{p.title}</h4>
                <p className={styles.programText}>{p.text}</p>
                <Link href="/programs" className={styles.programLink}>{txt.learnMore} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="section section-cream">
        <div className="container text-center">
          <span className="section-label">{lang === 'es' ? 'Nuestros Socios' : 'Our Partners'}</span>
          <h2 className="section-title">{lang === 'es' ? 'Patrocinadores Actuales' : 'Current Sponsors'}</h2>
          <div className="gold-divider center" />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '48px', alignItems: 'center' }}>
            <SponsorGrid items={FEATURED_SPONSORS} />
            <SponsorGrid items={COMMUNITY_SPONSORS} />
            <TextSponsorPills items={TEXT_ONLY_SPONSORS} />

            <Link href="/contact" className="btn btn-outline" style={{ marginTop: '8px' }}>{lang === 'es' ? 'Camina Con Nosotros' : 'Walk With Us'} →</Link>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaOverlay} />
        <div className={`container ${styles.ctaContent}`}>
          <div ref={addRef} className="fade-up">
            <h2 className={styles.ctaTitle}>{txt.ctaTitle}</h2>
            <p className={styles.ctaText}>{txt.ctaText}</p>
            <div className={styles.ctaBtns}>
              <Link href="/donate" className="btn btn-primary">{txt.ctaDonate}</Link>
              <Link href="/get-involved" className="btn btn-secondary">{txt.ctaVolunteer}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className={`section ${styles.newsletterSection}`}>
        <div className="container">
          <div ref={addRef} className={`fade-up ${styles.newsletterBox}`}>
            <div className={styles.newsletterText}>
              <span className="section-label">{txt.newsletterTitle}</span>
              <h3>{txt.newsletterText}</h3>
            </div>
            <form
              className={styles.newsletterForm}
              onSubmit={(e) => {
                e.preventDefault();
                const email = (new FormData(e.currentTarget).get('email') as string)?.trim() ?? '';
                const subject = lang === 'es' ? 'Suscripción al boletín' : 'Newsletter signup';
                const body = lang === 'es'
                  ? `Por favor agrégame al boletín de noticias.\n\nMi correo: ${email}`
                  : `Please add me to the newsletter.\n\nMy email: ${email}`;
                window.location.href = `mailto:imanslightfoundation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              }}
            >
              <input
                type="email"
                name="email"
                placeholder={txt.newsletterPlaceholder}
                className={styles.newsletterInput}
                aria-label="Email address for newsletter"
                required
              />
              <button type="submit" className="btn btn-primary">{txt.newsletterBtn}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
