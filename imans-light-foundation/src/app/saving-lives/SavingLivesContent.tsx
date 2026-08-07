'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { HeartPulse, ShieldAlert, Activity, Users } from 'lucide-react';

const t = {
  en: {
    breadcrumb: 'Home',
    heroLabel: 'Initiatives',
    heroTitle: 'Saving Lives on the Frontline',
    heroSub: 'Your support does more than fund a program it arms a mother, a teacher, or a friend with the exact tools and knowledge required to reverse a fatal overdose and restore a future.',
    initiativesTitle: 'How Your Support Intervenes',
    sections: [
      {
        icon: <HeartPulse size={36} color="var(--gold)" />,
        title: 'Naloxone Distribution Program',
        desc: 'We proudly distribute free Naloxone/Narcan kits through our partnership with the Florida Department of Children and Families. Each kit includes a display, keychain, gloves, and plastic mouth protection to ensure safe and effective overdose response.',
      },
      {
        icon: <ShieldAlert size={36} color="var(--gold)" />,
        title: 'Exposing Counterfeit Threats',
        desc: 'Fentanyl hides in plain sight. In coalition with the DEA’s "One Pill Can Kill" initiative, we go into schools and community centers to shatter the illusion of safe recreational drug use, exposing the brutal reality that a single counterfeit prescription pill can carry a lethal dose of synthetic opioids.',
      },
      {
        icon: <Activity size={36} color="var(--gold)" />,
        title: 'Community-Wide Resiliency',
        desc: 'As active participants in ISAVEFL, we are expanding the grid of readily available opioid reversal medications. Our goal is to ensure that no neighborhood, campus, or public space is left defenseless during the critical three-minute window of an overdose event.',
      },
      {
        icon: <Users size={36} color="var(--gold)" />,
        title: 'Supporting the Grieving',
        desc: 'Beyond immediate prevention, we provide a sanctuary for families devastated by loss. We facilitate healing circles and strategic support systems that transform unimaginable grief into powerful, community-protecting advocacy.',
      },
    ],
    affectedLabel: 'The Reality We Face',
    affectedTitle: 'Fentanyl Does Not Discriminate',
    affectedText1: 'The crisis we face today ignores zip codes, report cards, and family backgrounds. It reaches into classrooms and quiet neighborhoods alike, targeting youth who believe they are making a harmless decision.',
    affectedText2: 'Our programs exist to step into that void. When traditional education systems or private insurances cannot cover the specialized, urgent training required to identify a synthetic opioid threat, Iman’s Light Foundation provides it at zero cost.',
    affectedText3: 'In 2023 alone, our nation lost over 122,000 souls many of them young adults with their entire lives ahead of them. We are fighting to ensure that your child, your neighbor, and your community are equipped to survive and thrive.',
  },
  es: {
    breadcrumb: 'Inicio',
    heroLabel: 'Iniciativas',
    heroTitle: 'Salvando Vidas en la Primera Línea',
    heroSub: 'Su apoyo hace más que financiar un programa: equipa a una madre, a un maestro o a un amigo con las herramientas y el conocimiento exactos para revertir una sobredosis letal y restaurar un futuro.',
    initiativesTitle: 'Cómo Interviene su Apoyo',
    sections: [
      {
        icon: <HeartPulse size={36} color="var(--gold)" />,
        title: 'Programa de Distribución de Naloxona',
        desc: 'Distribuimos orgullosamente kits gratuitos de Naloxona/Narcan a través de nuestra asociación con el Departamento de Niños y Familias de Florida. Cada kit incluye un estuche, llavero, guantes y protección bucal de plástico para garantizar una respuesta segura y efectiva.',
      },
      {
        icon: <ShieldAlert size={36} color="var(--gold)" />,
        title: 'Exponiendo Amenazas Falsificadas',
        desc: 'El fentanilo se esconde a simple vista. En coalición con la iniciativa "One Pill Can Kill" de la DEA, visitamos escuelas y centros para destruir la ilusión de que existen drogas recreativas seguras, exponiendo la brutal realidad de que una sola píldora falsificada puede contener una dosis letal.',
      },
      {
        icon: <Activity size={36} color="var(--gold)" />,
        title: 'Resiliencia Comunitaria',
        desc: 'Como participantes activos de ISAVEFL, estamos expandiendo la red de medicamentos disponibles para revertir opioides. Nuestro objetivo es asegurar que ningún vecindario o campus quede indefenso durante los tres minutos críticos de una sobredosis.',
      },
      {
        icon: <Users size={36} color="var(--gold)" />,
        title: 'Acompañando en el Duelo',
        desc: 'Más allá de la prevención, brindamos un santuario para las familias devastadas por la pérdida. Facilitamos círculos de sanación y sistemas de apoyo que transforman un dolor inimaginable en una poderosa labor de abogacía que protege a la comunidad.',
      },
    ],
    affectedLabel: 'Nuestra Realidad',
    affectedTitle: 'El Fentanilo No Discrimina',
    affectedText1: 'La crisis que enfrentamos hoy ignora códigos postales, calificaciones escolares y antecedentes familiares. Llega a las aulas y a los vecindarios tranquilos por igual, atacando a jóvenes que creen estar tomando una decisión inofensiva.',
    affectedText2: 'Nuestros programas existen para llenar ese vacío. Cuando los sistemas de educación tradicionales no pueden cubrir el entrenamiento urgente y especializado requerido para identificar una amenaza de opioides sintéticos, la Fundación La Luz de Iman lo provee sin costo alguno.',
    affectedText3: 'Solo en 2023, nuestra nación perdió a más de 122,000 almas, muchas de ellas adultos jóvenes con toda su vida por delante. Luchamos para asegurar que su hijo, su vecino y su comunidad estén equipados para sobrevivir y prosperar.',
  },
};

export default function SavingLivesPage() {
  const { lang } = useContext(LanguageContext);
  const txt = t[lang];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{txt.breadcrumb}</Link>
            <span>›</span>
            <Link href="/programs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {lang === 'en' ? 'Programs' : 'Programas'}
            </Link>
          </div>
          <span className="section-label">{txt.heroLabel}</span>
          <h1>{txt.heroTitle}</h1>
          <p>{txt.heroSub}</p>
        </div>
      </div>

      <section className="section transparent-bg">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 className="section-title">{txt.initiativesTitle}</h2>
            <div className="gold-divider center" />
          </div>
          <div className="grid-2">
            {txt.sections.map((sec, i) => (
              <div key={i} className="card card-dark" style={{ padding: '40px' }}>
                <div style={{ marginBottom: '24px' }}>{sec.icon}</div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: 'var(--white)' }}>{sec.title}</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.8' }}>{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-label">{txt.affectedLabel}</span>
              <h2 className="section-title" style={{ color: '#fff' }}>{txt.affectedTitle}</h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.8' }}>{txt.affectedText1}</p>
              <p style={{ marginBottom: '24px', color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.8' }}>{txt.affectedText2}</p>
              <p style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1.1rem', lineHeight: '1.8' }}>{txt.affectedText3}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                background: 'rgba(20, 28, 46, 0.8)',
                backdropFilter: 'blur(12px)',
                padding: '48px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Activity size={80} color="var(--gold)" style={{ marginBottom: '24px' }} />
                <h3 style={{ color: '#fff', marginBottom: '16px', fontSize: '3rem', fontFamily: 'Playfair Display' }}>122,000+</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  {lang === 'en' ? 'Tragic losses in 2023 to preventable synthetic opioid overdoses nationwide.' : 'Pérdidas trágicas en 2023 por sobredosis de opioides sintéticos prevenibles en todo el país.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
