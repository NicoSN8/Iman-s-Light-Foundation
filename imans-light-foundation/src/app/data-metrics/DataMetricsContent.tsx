'use client';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/LanguageContext';
import { Database, ShieldCheck, Activity, Users, AlertTriangle } from 'lucide-react';

const t = {
  en: {
    breadcrumb: 'Home',
    heroLabel: 'Evidence-Based Action',
    heroTitle: 'The Data Behind the Mission',
    heroSub: "We don't guess. Everything we do is based on real data and methods that have actually been studied, not just what sounds good.",
    dataLabel: 'The Hard Truth',
    dataTitle: 'A Crisis Measured in Human Lives',
    dataText: 'Every 5 minutes, someone in the US dies from a preventable overdose. Fentanyl is now the leading cause of death for adults 18 to 45, ahead of accidents, suicide, and illness. We use real-time data from the DEA, CDC, and the Opiate Response Network (ORN) to figure out exactly where our workshops and Narcan distribution will do the most good.',
    partnerships: [
      {
        title: 'Opiate Response Network (ORN) Sponsorship',
        desc: "We're a front-line sponsor of the ORN in Miramar, Florida. That means we can see local overdose spikes as they happen and get educational resources where they're needed, before a problem reaches the school system."
      },
      {
        title: 'Substance Abuse Reduction Alliance (S.A.R.A.)',
        desc: 'As board members, we look at statewide trafficking patterns and where young people are most at risk. That data shapes our workshop schedule, so we can reach vulnerable students early.'
      },
    ],
    methodLabel: 'Tactical Approach',
    methodTitle: 'Psychological & Biological Defense',
    methodSub: "These aren't generic lectures. Each one is based on research and reviewed strategies, built to actually stick with kids as they grow up:",
    methods: [
      { icon: <ShieldCheck size={32} />, title: 'Trauma-Informed Education', desc: "We use NIDA (National Institute on Drug Abuse) protocols to explain how addiction hijacks the brain, without the outdated scare tactics that don't actually work." },
      { icon: <Users size={32} />, title: 'Nonviolent Communication (NVC)', desc: 'Developed by Dr. Marshall Rosenberg, we train families in NVC to resolve conflict. Data shows that high-conflict homes drastically increase a child\'s likelihood to self-medicate.' },
      { icon: <Database size={32} />, title: 'The Kingian Philosophy', desc: 'Inspired by Dr. Martin Luther King Jr., we focus extra attention on the communities that drug operations target the most.' },
      { icon: <AlertTriangle size={32} />, title: 'Counterfeit Pill Identification', desc: 'Using DEA forensic data, we teach students how to spot counterfeit pills, made to look like Adderall or Percocet, that actually contain lethal synthetic opioids.' },
    ],
    surveyLabel: 'Outreach Impact Report',
    surveyTitle: 'Youth Workshop Survey Feedback',
    surveySub: 'Following our recent youth workshop on Fentanyl and vaping dangers, we collected anonymous surveys from 30 students (ages 14-18) to measure clarity, relevance, and overall presentation impact.',
    statQuality: 'Presentation Quality',
    statQualitySub: 'Average Rating (Scale 1-10)',
    statEngagement: 'Presenter Engagement',
    statEngagementSub: 'Rated 4 or 5 out of 5',
    statMindShift: 'Awareness Impact',
    statMindShiftSub: 'Changed Risk Awareness',
    statRelevance: 'Content Relevance',
    statRelevanceSub: 'Agree/Strongly Agree',
    chart1Title: 'Overall Presentation Quality & Presenter Engagement',
    chart2Title: 'Lecture Content Breakdown',
    chart3Title: 'Demographics & Awareness Impact',
  },
  es: {
    breadcrumb: 'Inicio',
    heroLabel: 'Acción Basada en Evidencia',
    heroTitle: 'Los Datos Detrás de la Misión',
    heroSub: 'No adivinamos. Todo lo que hacemos se basa en datos reales y en métodos que realmente han sido estudiados, no en lo que suena bien.',
    dataLabel: 'La Dura Verdad',
    dataTitle: 'Una Crisis Medida en Vidas Humanas',
    dataText: 'Cada 5 minutos, alguien en Estados Unidos muere por una sobredosis prevenible. El fentanilo es ahora la principal causa de muerte para adultos de 18 a 45 años, por encima de accidentes, suicidios y enfermedades. Usamos datos en tiempo real de la DEA, los CDC y la Red de Respuesta de Opiáceos (ORN) para saber exactamente dónde nuestros talleres y la distribución de Narcan harán más bien.',
    partnerships: [
      {
        title: 'Patrocinio de la Red de Respuesta a Opiáceos (ORN)',
        desc: 'Somos patrocinadores de primera línea de la ORN en Miramar, Florida. Eso significa que podemos ver los picos locales de sobredosis en tiempo real y llevar recursos educativos a donde se necesitan, antes de que el problema llegue al sistema escolar.'
      },
      {
        title: 'Alianza para la Reducción del Abuso de Sustancias',
        desc: 'Como miembros de la junta, analizamos los patrones de tráfico a nivel estatal y dónde los jóvenes están en mayor riesgo. Esos datos definen nuestro calendario de talleres, para llegar temprano a los estudiantes más vulnerables.'
      },
    ],
    methodLabel: 'Enfoque Táctico',
    methodTitle: 'Defensa Psicológica y Biológica',
    methodSub: 'Estos no son charlas genéricas. Cada uno se basa en investigación y estrategias revisadas, diseñadas para quedarse con los chicos a medida que crecen:',
    methods: [
      { icon: <ShieldCheck size={32} />, title: 'Educación Informada por el Trauma', desc: 'Usamos protocolos del Instituto Nacional sobre el Abuso de Drogas (NIDA) para explicar cómo la adicción altera el cerebro, sin las tácticas de miedo anticuadas que no funcionan.' },
      { icon: <Users size={32} />, title: 'Comunicación No Violenta (CNV)', desc: 'Capacitamos a las familias para resolver conflictos. Los datos muestran que los hogares de alto conflicto aumentan drásticamente la probabilidad de que un niño se automedique.' },
      { icon: <Database size={32} />, title: 'Filosofía Kingiana', desc: 'Inspirados en el Dr. Martin Luther King Jr., ponemos atención adicional en las comunidades que más son blanco de las operaciones de narcotráfico.' },
      { icon: <AlertTriangle size={32} />, title: 'Identificación de Píldoras Falsas', desc: 'Con datos forenses de la DEA, enseñamos a los estudiantes a identificar píldoras falsificadas, hechas para parecer Adderall o Percocet, que en realidad contienen opioides sintéticos letales.' },
    ],
    surveyLabel: 'Reporte de Impacto',
    surveyTitle: 'Resultados de Encuestas de Talleres',
    surveySub: 'Tras nuestro reciente taller sobre peligros del Fentanilo y vapeo, recopilamos encuestas anónimas de 30 estudiantes (14-18 años) para medir la claridad, relevancia e impacto.',
    statQuality: 'Calidad de Presentación',
    statQualitySub: 'Calificación Promedio (Escala 1-10)',
    statEngagement: 'Compromiso del Presentador',
    statEngagementSub: 'Calificado 4 o 5 de 5',
    statMindShift: 'Cambio de Conciencia',
    statMindShiftSub: 'Cambió su Visión de Riesgos',
    statRelevance: 'Relevancia del Tema',
    statRelevanceSub: 'De Acuerdo/Totalmente de Acuerdo',
    chart1Title: 'Calidad General y Compromiso del Presentador',
    chart2Title: 'Análisis del Contenido de la Conferencia',
    chart3Title: 'Demografía e Impacto en la Conciencia',
  },
};

export default function DataMetricsPage() {
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
          <p style={{ maxWidth: '800px', fontSize: '1.2rem', lineHeight: '1.6' }}>{txt.heroSub}</p>
        </div>
      </div>

      <section className="section transparent-bg">
        <div className="container">
          <div className="grid-2">
            <div>
              <span className="section-label">{txt.dataLabel}</span>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.dataTitle}</h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '32px', color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {txt.dataText}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {txt.partnerships.map((p, i) => (
                  <div key={i} style={{ paddingLeft: '24px', borderLeft: '4px solid var(--gold)', background: 'rgba(20, 28, 46, 0.4)', padding: '20px', borderRadius: '0 12px 12px 0' }}>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--white)', fontFamily: 'Playfair Display' }}>{p.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(20, 28, 46, 0.6)', backdropFilter: 'blur(16px)', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                  <Activity size={24} color="var(--gold)" />
                  <span style={{ color: 'var(--gold)', fontWeight: 'bold', fontSize: '1.05rem', letterSpacing: '0.02em' }}>
                    {lang === 'en' ? 'Evidence in Action' : 'Evidencia en Acción'}
                  </span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {[
                    { num: '9.3 / 10', label: txt.statQuality },
                    { num: '97%', label: txt.statEngagement },
                    { num: '67%', label: txt.statMindShift },
                    { num: '100%', label: txt.statRelevance },
                  ].map((stat, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--white)', fontFamily: 'Playfair Display' }}>{stat.num}</div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: '1.4' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
                <a href="#survey-results" style={{ display: 'inline-block', marginTop: '24px', fontSize: '0.85rem', color: 'var(--gold-light)', textDecoration: 'underline' }}>
                  {lang === 'en' ? 'See the full survey results ↓' : 'Ver los resultados completos ↓'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">{txt.methodLabel}</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.methodTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>{txt.methodSub}</p>
          </div>
          <div className="grid-4" style={{ gap: '24px' }}>
            {txt.methods.map((m, i) => (
              <div key={i} className="card text-center" style={{ padding: '40px 24px', background: 'rgba(20, 28, 46, 0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', color: 'var(--gold)' }}>
                  {m.icon}
                </div>
                <h4 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--white)', fontFamily: 'Playfair Display' }}>{m.title}</h4>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SURVEY RESULTS DASHBOARD SECTION ===== */}
      <section className="section" id="survey-results" style={{ background: '#f8fafc', borderTop: '1px solid rgba(201, 168, 76, 0.15)', borderBottom: '1px solid rgba(201, 168, 76, 0.15)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label" style={{ color: 'var(--gold-dark)' }}>{txt.surveyLabel}</span>
            <h2 className="section-title" style={{ color: 'var(--navy)' }}>{txt.surveyTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle" style={{ color: 'rgba(20, 28, 46, 0.75)', maxWidth: '720px', margin: '0 auto' }}>
              {txt.surveySub}
            </p>
          </div>

          {/* Survey Metrics Key Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '48px' }}>
            {[
              { num: '9.3 / 10', label: txt.statQuality, sub: txt.statQualitySub },
              { num: '97%', label: txt.statEngagement, sub: txt.statEngagementSub },
              { num: '67%', label: txt.statMindShift, sub: txt.statMindShiftSub },
              { num: '100%', label: txt.statRelevance, sub: txt.statRelevanceSub }
            ].map((stat, i) => (
              <div key={i} className="card text-center" style={{ padding: '24px', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid rgba(201, 168, 76, 0.25)', borderRadius: '12px' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 'bold', color: 'var(--gold)', marginBottom: '8px', fontFamily: 'Playfair Display' }}>{stat.num}</div>
                <div style={{ fontWeight: 600, color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '4px' }}>{stat.label}</div>
                <div style={{ color: 'rgba(20, 28, 46, 0.65)', fontSize: '0.82rem', lineHeight: '1.4' }}>{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Graph Images Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', alignItems: 'start', marginBottom: '40px' }}>
            <div className="card" style={{ padding: '24px', background: '#ffffff', border: '1px solid rgba(201, 168, 76, 0.15)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Playfair Display', fontSize: '1.25rem', textAlign: 'center' }}>
                {txt.chart1Title}
              </h4>
              <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="/metrics/survey_ratings.png" alt="Overall Presentation Quality" width={3565} height={1457} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            <div className="card" style={{ padding: '24px', background: '#ffffff', border: '1px solid rgba(201, 168, 76, 0.15)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Playfair Display', fontSize: '1.25rem', textAlign: 'center' }}>
                {txt.chart2Title}
              </h4>
              <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                <Image src="/metrics/lecture_aspects.png" alt="Lecture Content Breakdown" width={2968} height={1436} style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Chart */}
          <div className="card" style={{ padding: '24px', background: '#ffffff', border: '1px solid rgba(201, 168, 76, 0.15)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', maxWidth: '800px', margin: '0 auto 40px' }}>
            <h4 style={{ color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Playfair Display', fontSize: '1.25rem', textAlign: 'center' }}>
              {txt.chart3Title}
            </h4>
            <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
              <Image src="/metrics/survey_demographics.png" alt="Demographics and Impact" width={3405} height={1468} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>


        </div>
      </section>
    </>
  );
}
