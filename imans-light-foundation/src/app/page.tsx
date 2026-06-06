'use client';

import { useContext, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { BookOpen, Brain, Scale, GraduationCap, HeartPulse, ShieldPlus, Users } from 'lucide-react';
import styles from './page.module.css';

const t = {
  en: {
    heroLabel: 'Be The Light In Darkness',
    heroTitle: 'Preventing Tragedies,\nIlluminating Futures',
    heroSubtitle:
      "Iman's Light Foundation educates communities on the perils of Fentanyl, advocates for legislative change, and provides mental health support to those affected by addiction.",
    heroCta1: 'Our Mission',
    heroCta2: 'Donate',
    impactLabel: 'Our Impact',
    impactTitle: 'Every Life Matters',
    impactSub: 'Through education, advocacy, and community programs, we are changing lives across South Florida.',
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
    missionSub: 'We fight on three fronts to protect our communities from the devastation of Fentanyl and lethal drugs.',
    pillar1Title: 'Education & Prevention',
    pillar1Text: 'Delivering life-saving workshops to children, youth, and adults on the perils of Fentanyl, drug lacing, and grooming tactics.',
    pillar2Title: 'Mental Health & Wellness',
    pillar2Text: 'Providing workshops with strategies to address anxiety, depression, anger, and stress, key root causes of substance use.',
    pillar3Title: 'Legislative Advocacy',
    pillar3Text: 'Advocating for severe consequences for drug dealers and traffickers, and robust protections for children and communities.',
    storyLabel: "Iman's Story",
    storyTitle: 'Finding Light in the Darkest Moments',
    storyText1: "We are in the middle of a chemical warfare in the realm of drug addiction, where no infant, child, youth or adult should lose their life to Fentanyl, or any other drug.",
    storyText2: "Iman's Light Foundation was born from tragedy, and transformed into a beacon of hope, education, and change for communities across Florida and beyond.",
    storyBtn: "Read Iman's Full Story",
    programsLabel: 'Programs',
    programsTitle: 'Our Core Programs',
    programsSub: 'Comprehensive, community-centered programs designed to prevent addiction and heal those affected.',
    prog1: 'Drug Education Workshops',
    prog1Text: 'School and community workshops covering Fentanyl dangers, drug lacing, and resistance strategies.',
    prog2: 'Mental Health Wellness',
    prog2Text: 'Life-changing workshops addressing anxiety, depression, stress, and emotional self-regulation.',
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
      'La Fundación Iman\'s Light educa comunidades sobre los peligros del Fentanilo, aboga por cambios legislativos y proporciona apoyo de salud mental a los afectados por la adicción.',
    heroCta1: 'Nuestra Misión',
    heroCta2: 'Donar Ahora',
    impactLabel: 'Nuestro Impacto',
    impactTitle: 'Cada Vida Importa',
    impactSub: 'A través de la educación, la abogacía y los programas comunitarios, estamos cambiando vidas en el sur de Florida.',
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
    missionSub: 'Luchamos en tres frentes para proteger a nuestras comunidades de la devastación del Fentanilo y las drogas letales.',
    pillar1Title: 'Educación y Prevención',
    pillar1Text: 'Talleres que salvan vidas sobre los peligros del Fentanilo, el corte de drogas y las tácticas de manipulación.',
    pillar2Title: 'Salud Mental y Bienestar',
    pillar2Text: 'Talleres con estrategias para abordar la ansiedad, la depresión, la ira y el estrés, causas raíz del consumo de sustancias.',
    pillar3Title: 'Abogacía Legislativa',
    pillar3Text: 'Abogando por consecuencias severas para traficantes de drogas y protecciones robustas para niños y comunidades.',
    storyLabel: 'La Historia de Iman',
    storyTitle: 'Encontrando Luz en los Momentos Más Oscuros',
    storyText1: 'Estamos en medio de una guerra química en el ámbito de la adicción a las drogas, donde ningún infante, niño, joven o adulto debería perder la vida por el Fentanilo.',
    storyText2: 'La Fundación Iman\'s Light nació de la tragedia, y se transformó en un faro de esperanza, educación y cambio para comunidades de toda Florida.',
    storyBtn: 'Leer la Historia Completa de Iman',
    programsLabel: 'Programas',
    programsTitle: 'Nuestros Programas Principales',
    programsSub: 'Programas integrales en la comunidad para prevenir la adicción y sanar a los afectados.',
    prog1: 'Talleres de Educación sobre Drogas',
    prog1Text: 'Talleres en escuelas y comunidades sobre los peligros del Fentanilo, el corte de drogas y estrategias de resistencia.',
    prog2: 'Bienestar de Salud Mental',
    prog2Text: 'Talleres que cambian vidas abordando la ansiedad, depresión, estrés y autoregulación emocional.',
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

export default function HomePage() {
  const { lang } = useContext(LanguageContext);
  const txt = t[lang];
  const fadeRefs = useRef<(HTMLElement | null)[]>([]);

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
                src="https://video.wixstatic.com/video/56e6ee_aeaf7c872eb5487cbda598589baea0e7/720p/mp4/file.mp4" 
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

      {/* ===== GALA EVENT ===== */}
      <section className="section transparent-bg">
        <div className="container">
          <div ref={addRef} className="fade-up text-center">
            <span className="section-label">{txt.eventsLabel}</span>
            <h2 className="section-title">{txt.eventsTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle">{txt.eventsSub}</p>
          </div>
          
          {/* Primary Highlight Card: 2026 Gala */}
          <div ref={addRef} className="fade-up" style={{ marginTop: '40px', background: 'var(--navy)', borderRadius: '16px', border: '2px solid rgba(201,168,76,0.6)', padding: '48px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'var(--gradient-gold)' }} />
            <span className="tag" style={{ marginBottom: '16px', display: 'inline-block' }}>{lang === 'es' ? 'Próximo Evento' : 'Upcoming Highlight'}</span>
            <h3 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '16px' }}>{lang === 'es' ? 'Tercera Gala Anual' : '3rd Annual Gala'}</h3>
            <p style={{ color: 'var(--white)', fontSize: '1.4rem', marginBottom: '8px' }}>{lang === 'es' ? 'Octubre 2026' : 'October 2026'}</p>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '32px' }}>@ The Signature Grand</p>
            <Link href="/events" className="btn btn-primary">{txt.viewAllEvents} →</Link>
          </div>

          {/* Secondary Past Highlight Card: 2025 Event */}
          <div ref={addRef} className="fade-up" style={{ background: 'rgba(20, 28, 46, 0.4)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(201,168,76,0.3)', padding: '36px', textAlign: 'center', maxWidth: '800px', margin: '30px auto 0', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <span className="tag" style={{ marginBottom: '16px', display: 'inline-block' }}>{lang === 'es' ? 'Destacado del Pasado' : 'Past Highlight'}</span>
            <h4 style={{ color: 'var(--white)', fontFamily: 'Playfair Display', fontSize: '1.6rem', marginBottom: '10px' }}>
              {lang === 'es' ? 'Música y Luces por la Vida 2025' : 'Music & Lights for Life 2025'}
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '640px', margin: '0 auto' }}>
              {lang === 'es' 
                ? 'Nuestro evento más grande hasta ahora — Música y Luces por la Vida 2025 en el Miramar City Center Hall reunió a la comunidad con presentaciones, 24+ patrocinadores y un poderoso mensaje de prevención.' 
                : 'Our biggest event yet — Music and Lights for Life 2025 at Miramar City Center Hall brought together the community with performances, 24+ sponsors, and powerful prevention messaging.'}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="section section-cream">
        <div className="container text-center">
          <span className="section-label">{lang === 'es' ? 'Nuestros Socios' : 'Our Partners'}</span>
          <h2 className="section-title">{lang === 'es' ? 'Patrocinadores Actuales' : 'Current Sponsors'}</h2>
          <div className="gold-divider center" />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '48px', alignItems: 'center' }}>
            {/* Platinum & Gold Combined for Home */}
            <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="https://static.wixstatic.com/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png/v1/fill/w_568,h_191,q_90,enc_avif,quality_auto/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png" alt="FGA" width={200} height={67} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="https://static.wixstatic.com/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png/v1/fill/w_201,h_194,q_90,enc_avif,quality_auto/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png" alt="The Bridge" width={80} height={77} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="https://static.wixstatic.com/media/56e6ee_b29a7ddaabd3481bb888135a8da07410~mv2.png/v1/fill/w_357,h_194,q_90,enc_avif,quality_auto/56e6ee_b29a7ddaabd3481bb888135a8da07410~mv2.png" alt="Survivors Pathway" width={140} height={76} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="https://static.wixstatic.com/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png/v1/fill/w_233,h_183,q_90,enc_avif,quality_auto/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png" alt="Nicklaus Childrens" width={100} height={78} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="https://static.wixstatic.com/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png/v1/fill/w_371,h_268,q_90,enc_avif,quality_auto/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png" alt="One More Child" width={110} height={79} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="/sponsors/sponsor_logo_1.png" alt="Monarch Air Group" width={100} height={78} style={{ objectFit: 'contain' }} />
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', padding: '24px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <Image src="/sponsors/sponsor_logo_2.png" alt="King Realty / Century 21" width={100} height={78} style={{ objectFit: 'contain' }} />
              </div>
            </div>

            {/* Community & Event Sponsor Logos */}
            <div className={styles.communitySponsorLogosGrid} style={{ marginTop: '24px' }}>
              {[
                { src: '/sponsors/extracted/sp3_logo_0.png', alt: 'Event Sponsor' },
                { src: '/sponsors/extracted/sp3_logo_1.png', alt: 'Event Sponsor' },
                { src: '/sponsors/extracted/sp3_logo_2.png', alt: 'Event Sponsor' },
                { src: '/sponsors/extracted/sp3_logo_3.png', alt: 'Event Sponsor' },
                { src: '/sponsors/extracted/sp3_logo_4.png', alt: 'Event Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_ebe0f16f3a7f45d2a15a997eab2927f3~mv2.png', alt: 'Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_90b6e59a5df142298b790e6f643fa66a~mv2.png', alt: 'Sponsor' },
                { src: '/sponsors/prosperity_logo.png', alt: 'Prosperity Social Community Development Group' },
                { src: 'https://static.wixstatic.com/media/56e6ee_0f2c809c926641329fd63076093e1de7~mv2.png', alt: 'Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_28bd559fd2fb4f969d85fe406d67ad5d~mv2.png', alt: 'Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_f96e2e03e38f4cafa7f45f9969059dd6~mv2.png', alt: 'Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_243f0558f3794b77a33603bbcf0b1de4~mv2.png', alt: 'Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_a9dda332ae464d16adc838ae65a885dd~mv2.png', alt: 'Sponsor' },
                { src: 'https://static.wixstatic.com/media/56e6ee_1941e013eda54ccf829e7227e5bde355~mv2.png', alt: 'Sponsor' },
              ].map((s, i) => (
                <div key={i} className={styles.communitySponsorLogoBadge}>
                  <Image src={s.src} alt={s.alt} width={120} height={60} style={{ objectFit: 'contain' }} />
                </div>
              ))}
            </div>

            {/* Text Sponsors */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', maxWidth: '900px', marginTop: '16px' }}>
              {[
                'Monarch Air Group', 'South Florida Wellness Network', 'Phoenix Title & Closing', 
                'Expressions Noblemen & Consulting', 'Rewind 103.5', 'S.A.R.A. Coalition', 
                'Fentanyl Awareness Coalition', 'King Realty / Century 21', 'Gables Cigars Shop', 'RMT Media'
              ].map((p, i) => (
                <div key={i} style={{ border: '1px solid rgba(201, 168, 76, 0.3)', padding: '10px 20px', borderRadius: '30px', color: 'var(--navy-900)', fontWeight: 600, fontSize: '0.88rem', background: 'rgba(201, 168, 76, 0.05)' }}>{p}</div>
              ))}
            </div>

            <Link href="/about#partnerships" className="btn btn-outline" style={{ marginTop: '24px' }}>{lang === 'es' ? 'Ver Todos los Socios' : 'View All Partners'} →</Link>
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
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
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
