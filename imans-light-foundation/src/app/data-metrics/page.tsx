'use client';
import { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { BarChart3, Database, FileSearch, ShieldCheck, Activity, Users, AlertTriangle } from 'lucide-react';

const t = {
  en: {
    breadcrumb: 'Home',
    heroLabel: 'Evidence-Based Action',
    heroTitle: 'The Data Behind the Mission',
    heroSub: 'We do not operate on assumptions. Our foundation is built on uncompromising data, forensic metrics, and proven psychological methodologies to dismantle the fentanyl crisis.',
    dataLabel: 'The Hard Truth',
    dataTitle: 'A Crisis Measured in Human Lives',
    dataText: 'Every 5 minutes, an American dies from a preventable drug overdose. Fentanyl is the leading cause of death for adults aged 18-45, completely bypassing accidents, suicides, and illnesses. We operate within this unforgiving reality. By leveraging real-time data from the DEA, CDC, and the Opiate Response Network (ORN), we pinpoint exactly where our education and Narcan distribution will have the most aggressive life-saving impact.',
    partnerships: [
      { 
        title: 'Opiate Response Network (ORN) Sponsorship', 
        desc: 'We are a front-line sponsor of the ORN in Miramar, Florida. This allows us to track local overdose spikes instantly and deploy educational resources precisely where they are needed, before a synthetic opioid wave hits the school system.' 
      },
      { 
        title: 'Substance Abuse Reduction Alliance (S.A.R.A.)', 
        desc: 'As active board members, we analyze state-wide trafficking routes and youth susceptibility metrics. This data dictates our workshop schedules, ensuring we intercept vulnerable students before dealers do.' 
      },
    ],
    methodLabel: 'Tactical Approach',
    methodTitle: 'Psychological & Biological Defense',
    methodSub: 'Our interventions are not generic lectures. They are heavily researched, peer-reviewed strategies designed to build absolute generational resilience:',
    methods: [
      { icon: <ShieldCheck size={32} />, title: 'Trauma-Informed Education', desc: 'We utilize NIDA (National Institute on Drug Abuse) protocols to explain the biological hijacking of addiction without using archaic, ineffective scare tactics.' },
      { icon: <Users size={32} />, title: 'Nonviolent Communication (NVC)', desc: 'Developed by Dr. Marshall Rosenberg, we train families in NVC to resolve conflict. Data shows that high-conflict homes drastically increase a child\'s likelihood to self-medicate.' },
      { icon: <Database size={32} />, title: 'The Kingian Philosophy', desc: 'Inspired by Dr. Martin Luther King Jr., we use social justice metrics to empower underserved demographics who are disproportionately targeted by illicit drug operations.' },
      { icon: <AlertTriangle size={32} />, title: 'Counterfeit Pill Identification', desc: 'Using DEA forensics, we actively teach students how to identify cartel-pressed lethal synthetics that disguise themselves as Adderall or Percocet.' },
    ],
    surveyLabel: 'Outreach Impact Report',
    surveyTitle: 'Youth Workshop Survey Feedback',
    surveySub: 'Following our recent youth workshop on Fentanyl and vaping dangers, we collected anonymous surveys from 30 students (ages 14-18) to measure clarity, relevance, and overall presentation impact.',
    downloadBtn: 'Download Full PDF Report',
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
    heroSub: 'No operamos con suposiciones. Nuestra fundación se basa en datos irrefutables, métricas forenses y metodologías psicológicas comprobadas para desmantelar la crisis del fentanilo.',
    dataLabel: 'La Dura Verdad',
    dataTitle: 'Una Crisis Medida en Vidas Humanas',
    dataText: 'Cada 5 minutos, un estadounidense muere por una sobredosis prevenible. El fentanilo es la principal causa de muerte para adultos de 18 a 45 años. Operamos dentro de esta implacable realidad. Al aprovechar datos en tiempo real de la DEA, los CDC y la Red de Respuesta de Opiáceos (ORN), identificamos exactamente dónde nuestra educación tendrá el mayor impacto para salvar vidas.',
    partnerships: [
      { 
        title: 'Patrocinio de la Red de Respuesta a Opiáceos (ORN)', 
        desc: 'Somos patrocinadores de primera línea de la ORN en Miramar, Florida. Esto nos permite rastrear picos locales de sobredosis instantáneamente y desplegar recursos educativos precisamente donde se necesitan.' 
      },
      { 
        title: 'Alianza para la Reducción del Abuso de Sustancias', 
        desc: 'Como miembros activos, analizamos las rutas de tráfico a nivel estatal y las métricas de susceptibilidad juvenil. Estos datos dictan nuestros talleres escolares.' 
      },
    ],
    methodLabel: 'Enfoque Táctico',
    methodTitle: 'Defensa Psicológica y Biológica',
    methodSub: 'Nuestras intervenciones no son conferencias genéricas. Son estrategias altamente investigadas diseñadas para construir una resiliencia generacional absoluta:',
    methods: [
      { icon: <ShieldCheck size={32} />, title: 'Educación Informada por el Trauma', desc: 'Utilizamos protocolos del Instituto Nacional sobre el Abuso de Drogas (NIDA) para explicar el secuestro biológico de la adicción sin tácticas de miedo ineficaces.' },
      { icon: <Users size={32} />, title: 'Comunicación No Violenta (CNV)', desc: 'Capacitamos a las familias para resolver conflictos. Los datos muestran que los hogares de alto conflicto aumentan drásticamente la probabilidad de que un niño se automedique.' },
      { icon: <Database size={32} />, title: 'Filosofía Kingiana', desc: 'Inspirados en el Dr. Martin Luther King Jr., usamos métricas de justicia social para empoderar a poblaciones desatendidas que son blanco de operaciones de drogas ilícitas.' },
      { icon: <AlertTriangle size={32} />, title: 'Identificación de Píldoras Falsas', desc: 'Usando estudios de la DEA, enseñamos a los estudiantes cómo identificar sintéticos letales que se disfrazan como Adderall o Percocet.' },
    ],
    surveyLabel: 'Reporte de Impacto',
    surveyTitle: 'Resultados de Encuestas de Talleres',
    surveySub: 'Tras nuestro reciente taller sobre peligros del Fentanilo y vapeo, recopilamos encuestas anónimas de 30 estudiantes (14-18 años) para medir la claridad, relevancia e impacto.',
    downloadBtn: 'Descargar Reporte Completo (PDF)',
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
              <div style={{ position: 'relative', width: '100%', maxWidth: '440px', aspectRatio: '1/1', background: 'rgba(20, 28, 46, 0.6)', backdropFilter: 'blur(16px)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Activity size={160} color="var(--gold)" strokeWidth={1} />
                <div style={{ position: 'absolute', bottom: '15%', background: 'var(--gold)', color: 'var(--navy)', padding: '8px 24px', borderRadius: '30px', fontweight: 'bold', fontSize: '1.1rem' }}>
                  {lang === 'en' ? 'Evidence in Action' : 'Evidencia en Acción'}
                </div>
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
                <img src="/metrics/survey_ratings.png" alt="Overall Presentation Quality" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>

            <div className="card" style={{ padding: '24px', background: '#ffffff', border: '1px solid rgba(201, 168, 76, 0.15)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <h4 style={{ color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Playfair Display', fontSize: '1.25rem', textAlign: 'center' }}>
                {txt.chart2Title}
              </h4>
              <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                <img src="/metrics/lecture_aspects.png" alt="Lecture Content Breakdown" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>

          {/* Bottom Full-Width Chart */}
          <div className="card" style={{ padding: '24px', background: '#ffffff', border: '1px solid rgba(201, 168, 76, 0.15)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', maxWidth: '800px', margin: '0 auto 40px' }}>
            <h4 style={{ color: 'var(--navy)', marginBottom: '16px', fontFamily: 'Playfair Display', fontSize: '1.25rem', textAlign: 'center' }}>
              {txt.chart3Title}
            </h4>
            <div style={{ position: 'relative', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
              <img src="/metrics/survey_demographics.png" alt="Demographics and Impact" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          </div>

          {/* Download Report Button */}
          <div className="text-center" style={{ marginTop: '40px' }}>
            <a href="/metrics/student_survey_report.pdf" download className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}>
              {txt.downloadBtn} →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
