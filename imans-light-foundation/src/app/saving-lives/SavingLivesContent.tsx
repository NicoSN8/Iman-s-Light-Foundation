'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/LanguageContext';
import { HeartPulse, ShieldAlert, Activity, Users } from 'lucide-react';

const t = {
  en: {
    breadcrumb: 'Home',
    heroLabel: 'Initiatives',
    heroTitle: 'Saving Lives on the Frontline',
    heroSub: 'Your support does more than fund a program. It gives a parent, a teacher, or a friend the tools to reverse a fatal overdose in the moment it matters most.',
    initiativesTitle: 'How Your Support Intervenes',
    sections: [
      {
        icon: <HeartPulse size={36} color="var(--gold)" />,
        title: 'Naloxone Distribution Program',
        desc: 'We distribute free Naloxone/Narcan kits through our partnership with the Florida Department of Children and Families. Each kit includes a display, keychain, gloves, and plastic mouth protection for a safe, effective overdose response.',
      },
      {
        icon: <ShieldAlert size={36} color="var(--gold)" />,
        title: 'Exposing Counterfeit Threats',
        desc: 'Fentanyl hides in plain sight. Working with the DEA\'s "One Pill Can Kill" campaign, we go into schools and community centers to explain a hard truth: a single counterfeit pill can carry a lethal dose of synthetic opioids. There\'s no such thing as safe recreational drug use anymore.',
      },
      {
        icon: <Activity size={36} color="var(--gold)" />,
        title: 'Community-Wide Resiliency',
        desc: "As part of ISAVEFL, we're working to put opioid reversal medication within reach in more places. An overdose can turn fatal in about three minutes. Our goal is for that window to never find someone without help nearby.",
      },
      {
        icon: <Users size={36} color="var(--gold)" />,
        title: 'Supporting the Grieving',
        desc: "Beyond prevention, we're here for families who've lost someone. We run healing circles and support systems, and for some families, that grief turns into advocacy that protects other families down the road.",
      },
    ],
    affectedLabel: 'The Reality We Face',
    affectedTitle: 'Fentanyl Does Not Discriminate',
    affectedText1: "This crisis doesn't care about zip code, grades, or family background. It reaches into classrooms and quiet neighborhoods alike, and it targets kids who think they're making a harmless choice.",
    affectedText2: "Our programs fill that gap. When schools and insurance can't cover the specialized training people need to recognize a synthetic opioid threat, we provide it for free.",
    affectedText3: "In 2023 alone, the US lost more than 122,000 people to overdose, many of them young adults. We're fighting so that your child, your neighbor, and your community have what they need to make it through this.",
  },
  es: {
    breadcrumb: 'Inicio',
    heroLabel: 'Iniciativas',
    heroTitle: 'Salvando Vidas en la Primera Línea',
    heroSub: 'Su apoyo hace más que financiar un programa. Le da a un padre, madre, maestro o amigo las herramientas para revertir una sobredosis letal en el momento en que más importa.',
    initiativesTitle: 'Cómo Interviene su Apoyo',
    sections: [
      {
        icon: <HeartPulse size={36} color="var(--gold)" />,
        title: 'Programa de Distribución de Naloxona',
        desc: 'Distribuimos kits gratuitos de Naloxona/Narcan a través de nuestra asociación con el Departamento de Niños y Familias de Florida. Cada kit incluye un estuche, llavero, guantes y protección bucal de plástico para una respuesta segura y efectiva.',
      },
      {
        icon: <ShieldAlert size={36} color="var(--gold)" />,
        title: 'Exponiendo Amenazas Falsificadas',
        desc: 'El fentanilo se esconde a simple vista. Junto con la campaña "One Pill Can Kill" de la DEA, visitamos escuelas y centros comunitarios para explicar una verdad difícil: una sola píldora falsificada puede contener una dosis letal de opioides sintéticos. Ya no existe eso de consumir drogas recreativas de forma segura.',
      },
      {
        icon: <Activity size={36} color="var(--gold)" />,
        title: 'Resiliencia Comunitaria',
        desc: 'Como parte de ISAVEFL, trabajamos para que haya medicamentos de reversión de opioides al alcance en más lugares. Una sobredosis puede volverse fatal en unos tres minutos. Nuestro objetivo es que en ese tiempo siempre haya ayuda cerca.',
      },
      {
        icon: <Users size={36} color="var(--gold)" />,
        title: 'Acompañando en el Duelo',
        desc: 'Más allá de la prevención, estamos aquí para las familias que han perdido a alguien. Tenemos círculos de sanación y sistemas de apoyo, y para algunas familias, ese dolor se convierte en una labor de defensa que protege a otras familias más adelante.',
      },
    ],
    affectedLabel: 'Nuestra Realidad',
    affectedTitle: 'El Fentanilo No Discrimina',
    affectedText1: 'Esta crisis no distingue por código postal, calificaciones o antecedentes familiares. Llega a las aulas y a los vecindarios tranquilos por igual, y afecta a jóvenes que creen estar tomando una decisión inofensiva.',
    affectedText2: 'Nuestros programas llenan ese vacío. Cuando las escuelas y los seguros no pueden cubrir el entrenamiento especializado que la gente necesita para reconocer una amenaza de opioides sintéticos, nosotros lo ofrecemos de forma gratuita.',
    affectedText3: 'Solo en 2023, Estados Unidos perdió a más de 122,000 personas por sobredosis, muchas de ellas adultos jóvenes. Luchamos para que su hijo, su vecino y su comunidad tengan lo que necesitan para superar esto.',
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
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <h2 className="section-title">{txt.initiativesTitle}</h2>
            <div className="gold-divider center" />
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', height: '320px', margin: '0 auto 48px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <Image
              src="/media/56e6ee_03ab8a5dab7447aab4707f294780cd1a~mv2.jpeg"
              alt={lang === 'en' ? 'A real Iman\'s Light Foundation Naloxone response kit - mask, gloves, and keychain case' : 'Un kit real de respuesta con Naloxona de Iman\'s Light Foundation'}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,20,0.85), transparent 50%)' }} />
            <p style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', color: '#fff', fontSize: '0.95rem', fontWeight: 600 }}>
              {lang === 'en' ? 'A real Naloxone response kit distributed at our events - mask, gloves, and keychain case included.' : 'Un kit real de respuesta con Naloxona distribuido en nuestros eventos: máscara, guantes y estuche llavero incluidos.'}
            </p>
          </div>

          <div className="grid-2">
            {txt.sections.map((sec, i) => (
              <div key={i} className="card card-dark" style={{ padding: '40px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', color: 'var(--navy)', marginBottom: '20px',
                  boxShadow: '0 0 0 6px rgba(201, 168, 76, 0.1), 0 8px 20px rgba(201, 168, 76, 0.3)',
                }}>
                  {sec.icon}
                </div>
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
                width: '100%',
                maxWidth: '420px',
                background: 'rgba(20, 28, 46, 0.8)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}>
                <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                  <Image
                    src="/media/56e6ee_8a923dccde8c4c3eb527f92dc22b82e9~mv2.jpg"
                    alt={lang === 'en' ? 'An Iman\'s Light Foundation awareness walk honoring lives lost to fentanyl' : 'Una caminata de concientización de Iman\'s Light Foundation en honor a las vidas perdidas por el fentanilo'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '32px' }}>
                  <Activity size={40} color="var(--gold)" style={{ marginBottom: '16px' }} />
                  <h3 style={{ color: '#fff', marginBottom: '12px', fontSize: '2.6rem', fontFamily: 'Playfair Display' }}>122,000+</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', lineHeight: '1.6' }}>
                    {lang === 'en' ? 'Tragic losses in 2023 to preventable synthetic opioid overdoses nationwide.' : 'Pérdidas trágicas en 2023 por sobredosis de opioides sintéticos prevenibles en todo el país.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
