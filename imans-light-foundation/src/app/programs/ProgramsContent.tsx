'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/LanguageContext';
import { 
  GraduationCap, 
  Brain, 
  HeartPulse, 
  Music, 
  Info, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  Eye, 
  Shield, 
  Heart, 
  Users, 
  DollarSign, 
  Handshake, 
  BarChart3, 
  Megaphone, 
  BookOpen 
} from 'lucide-react';

const programs = {
  en: [
    {
      id: 'workshops',
      icon: GraduationCap,
      tag: 'Interactive Workshops',
      title: 'The Truth About Drugs & Awareness',
      subtitle: 'Knowledge is the strongest defense against synthetics.',
      description: 'A $5,000 investment funds four workshops (1 to 2.5 hours each), led by our presenters with hands-on materials. "The Truth About Drugs" covers vaping, marijuana, fentanyl, synthetic drugs, and addiction: what they do to the brain and body, how to recognize an overdose, and how to use Narcan. We run assessments before and after each session to check that students actually retained the material.',
      cta: 'View Lesson Plans',
      image: '/media/56e6ee_073f30a006774b13b0b4760f92bad63e~mv2.jpeg',
      imageAlt: 'Iman\'s Light Foundation Narcan distribution and overdose-response training',
    },
    {
      id: 'mental-health',
      icon: Brain,
      tag: 'Emotional Resilience',
      title: 'Mental Wellness Workshops',
      subtitle: 'Understanding emotions to prevent self-harm.',
      description: 'Addiction often starts with emotional pain. Our Mental Wellness Workshop, "Understanding Emotions and Critical Thinking," teaches emotional intelligence and healthier thought patterns. We cover nonviolent communication and positive self-talk, so young people have real tools for the stress, anger, anxiety, and grief that often lead to self-medication and violence.',
      cta: 'Request a Session',
      image: '/media/56e6ee_3576a17eaea54dc89bcb590ac41a3ec6~mv2.jpeg',
      imageAlt: 'Iman\'s Light Foundation founder presenting at a community wellness event',
    },
    {
      id: 'youth-groups',
      icon: HeartPulse,
      tag: 'Continuous Prevention',
      title: 'ILF Youth Group Networks',
      subtitle: 'Students leading the conversation for their peers.',
      description: 'We want schools and students to keep this conversation going after we leave. That\'s why we set up ILF Youth Groups: ongoing materials and discussion topics students can use with each other. Over time, group members become the person other students turn to.',
      cta: 'Start a Youth Group',
      image: '/media/56e6ee_d289e22e23694b668fdf387aaafa140c~mv2.jpeg',
      imageAlt: 'Iman\'s Light Foundation mentor connecting with a student',
    },
    {
      id: 'music-dance',
      icon: Music,
      tag: 'Community Events',
      title: 'Music and Lights for Life',
      subtitle: 'Celebrating life safely, without substances.',
      description: 'Our annual "Music and Lights for Life Dance and Exhibition" is a safe place to dance, laugh, and have fun without drugs or alcohol. We share real information about drug lacing, mental health, and counterfeit pills. Narcan is available on-site, and sponsors offer CPR lessons. We remember the people we\'ve lost, and we do what we can to protect the people who are still here.',
      cta: 'Attend the Event',
      image: '/media/56e6ee_b5621014b4e14c088141ec0ff07a50fb~mv2.jpeg',
      imageAlt: 'Music and Lights for Life annual dance event',
    },
  ],
  es: [
    {
      id: 'workshops',
      icon: GraduationCap,
      tag: 'Talleres Interactivos',
      title: 'La Verdad Sobre las Drogas',
      subtitle: 'El conocimiento es la defensa más fuerte.',
      description: 'Una inversión de $5,000 financia cuatro talleres interactivos y especializados. Cubrimos las realidades del vapeo, la marihuana, el fentanilo y las adicciones: cómo afectan el cerebro y el cuerpo, y cómo aplicar Narcan. Aplicamos evaluaciones antes y después de cada sesión para confirmar que los estudiantes retuvieron la información.',
      cta: 'Ver Planes de Estudio',
      image: '/media/56e6ee_073f30a006774b13b0b4760f92bad63e~mv2.jpeg',
      imageAlt: 'Distribución de Narcan y entrenamiento de respuesta a sobredosis de Iman\'s Light Foundation',
    },
    {
      id: 'mental-health',
      icon: Brain,
      tag: 'Resiliencia Emocional',
      title: 'Talleres de Bienestar Mental',
      subtitle: 'Comprendiendo las emociones para prevenir autolesiones.',
      description: 'La adicción a menudo comienza con dolor emocional. Nuestro taller, "Comprendiendo las Emociones y el Pensamiento Crítico," enseña inteligencia emocional. Cubrimos comunicación no violenta para manejar el estrés, la ira y el dolor que a menudo llevan a la automedicación.',
      cta: 'Solicitar una Sesión',
      image: '/media/56e6ee_3576a17eaea54dc89bcb590ac41a3ec6~mv2.jpeg',
      imageAlt: 'Fundadora de Iman\'s Light Foundation presentando en un evento comunitario de bienestar',
    },
    {
      id: 'youth-groups',
      icon: HeartPulse,
      tag: 'Prevención Continua',
      title: 'Grupos Juveniles ILF',
      subtitle: 'Estudiantes liderando la conversación entre sus compañeros.',
      description: 'Creamos Grupos Juveniles ILF en las escuelas, con materiales y temas continuos para que los estudiantes sigan la conversación entre ellos mismos. Con el tiempo, se convierten en líderes positivos para sus compañeros.',
      cta: 'Crear un Grupo',
      image: '/media/56e6ee_d289e22e23694b668fdf387aaafa140c~mv2.jpeg',
      imageAlt: 'Mentor de Iman\'s Light Foundation conectando con un estudiante',
    },
    {
      id: 'music-dance',
      icon: Music,
      tag: 'Eventos Comunitarios',
      title: 'Música y Luces por la Vida',
      subtitle: 'Celebrando con seguridad, sin sustancias.',
      description: 'Nuestro baile anual es un espacio seguro para bailar, reír y divertirse sin drogas ni alcohol. Compartimos información real, distribuimos Narcan y recordamos a las vidas que hemos perdido.',
      cta: 'Asistir al Evento',
      image: '/media/56e6ee_b5621014b4e14c088141ec0ff07a50fb~mv2.jpeg',
      imageAlt: 'Evento anual de baile Música y Luces por la Vida',
    },
  ]
};

const lessonPlans = {
  en: [
    {
      icon: <Info size={32} />,
      title: 'What is Marijuana?',
      points: [
        'Key Definitions: THC, Intoxication, Drug',
        'The Plant and its over 400 chemicals',
        'Myths and Facts regarding modern usage',
        'Harmful effects on the developing brain',
        'THC altering mental states & protective mechanisms',
        'Today’s extreme potency of THC vs the 70’s',
        'Health risks of smoking & methods of use',
        'Long-term consequences & addiction rates'
      ]
    },
    {
      icon: <AlertTriangle size={32} />,
      title: 'What is Vaping?',
      points: [
        'How does it work? Is it better than smoking?',
        'Vapes heavily disguised as highlighters, USBs, hoodies',
        'Is vaping actually addictive?',
        'How nicotine is dangerous & can make you sick',
        'Impact on the brain: Understanding mechanisms',
        'The emergence of Fentanyl-laced vapes',
        'What is lacing & signs a vape contains Fentanyl',
        'Narcan effects, applications, and immediate responses'
      ]
    },
    {
      icon: <ShieldAlert size={32} />,
      title: 'What is Fentanyl?',
      points: [
        'What is it? Can you taste or smell it?',
        'Medical/pharmaceutical vs. street/illegal fentanyl',
        'Is it addictive and what are its exact effects?',
        'How much is a lethal overdose? (Visualizing 2mg)',
        'Is medicine bought on the internet safe?',
        'What is a fake pill and how fast can it kill?',
        'Overdose deaths in 2023 and 2024 (Data metrics)',
        'Signs of an overdose & correctly administering Narcan'
      ]
    }
  ],
  es: [
    {
      icon: <Info size={32} />,
      title: '¿Qué es la Marihuana?',
      points: [
        'Definiciones: THC, Intoxicación, Droga',
        'La planta y sus más de 400 químicos',
        'Mitos y realidades del uso moderno',
        'Efectos dañinos en el cerebro en desarrollo',
        'Potencia extrema del THC de hoy vs los años 70',
        'Riesgos de fumar a largo plazo',
        'Tasas de adicción y cómo altera la mente'
      ]
    },
    {
      icon: <AlertTriangle size={32} />,
      title: '¿Qué es el Vapeo?',
      points: [
        '¿Cómo funciona? ¿Está disfrazado como USB?',
        '¿Es el vapeo verdaderamente adictivo?',
        'Peligros de la nicotina para el sistema inmunológico',
        'Impacto severo en el cerebro de los jóvenes',
        'El peligro inminente de vapes mezclados con fentanilo',
        'Signos de un vape contaminado',
        'Aplicación inmediata de Narcan'
      ]
    },
    {
      icon: <ShieldAlert size={32} />,
      title: '¿Qué es el Fentanilo?',
      points: [
        '¿A qué huele y sabe? (A nada)',
        'Fentanilo farmacéutico vs ilegal',
        '¿Cuánta cantidad es letal? (Visualizando 2mg)',
        'Peligro de píldoras falsas compradas en línea',
        'Estadísticas brutales de sobredosis 2023-2024',
        'Identificar una sobredosis y aplicar Narcan rápidamente'
      ]
    }
  ]
};

export default function ProgramsPage() {
  const { lang } = useContext(LanguageContext);
  const progs = programs[lang];
  const lessons = lessonPlans[lang];
  const isEs = lang === 'es';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Agenda y Programas' : 'Agenda & Programs'}</span>
          </div>
          <span className="section-label">{isEs ? 'Lo Que Hacemos' : 'What We Do'}</span>
          <h1>{isEs ? 'Agenda y Programas' : 'Agenda & Programs'}</h1>
          <p>{isEs ? 'La prevención y la educación funcionan, pero hay que empezar temprano. Los estudios lo confirman: debemos llegar a los niños antes de lo que la mayoría piensa.' : "Prevention and education work, but only if we start early. Research backs this up: we need to reach kids sooner than most people think."}</p>
        </div>
      </div>

      {progs.map((prog, i) => (
        <section key={prog.id} id={prog.id} className={`section ${i % 2 === 1 ? 'section-cream' : 'transparent-bg'}`}>
          <div className="container">
            <div className="grid-2" style={{ gap: '64px', alignItems: 'center' }}>
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <span style={{ display: 'flex', color: 'var(--gold)' }}><prog.icon size={44} /></span>
                  <span className="tag" style={{ border: '1px solid rgba(201,168,76,0.4)', background: 'transparent' }}>{prog.tag}</span>
                </div>
                <h2 className="section-title" style={{ color: 'var(--white)', marginBottom: '12px' }}>{prog.title}</h2>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '20px', fontFamily: 'Playfair Display, serif', lineHeight: '1.5' }}>
                  &quot;{prog.subtitle}&quot;
                </p>
                <div className="gold-divider" style={{ marginBottom: '28px' }} />
                <p style={{ marginBottom: '36px', color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.9' }}>
                  {prog.description}
                </p>
              </div>
              <div style={{ order: i % 2 === 1 ? 1 : 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1',
                  maxWidth: '460px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <Image src={prog.image} alt={prog.imageAlt} fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ===== STATEMENT OF NEED ===== */}
      <section className="section section-dark" id="statement-of-need">
        <div className="container">
          <div className="grid-2" style={{ gap: '64px', alignItems: 'center' }}>
            <div style={{
              background: 'rgba(201, 168, 76, 0.05)',
              border: '1px solid rgba(201, 168, 76, 0.2)',
              padding: '40px 36px',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>
              <span className="section-label" style={{ color: '#E8C97A' }}>
                {isEs ? 'Por Qué Importa' : 'Why This Matters'}
              </span>
              <h2 className="section-title" style={{ color: '#fff' }}>
                {isEs ? 'La Crisis Que Enfrentamos' : 'The Crisis We Face'}
              </h2>
              <div className="gold-divider" style={{ width: '60px', marginBottom: '24px' }} />
              <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                {isEs 
                  ? 'La sobredosis accidental, la mayoría por opioides sintéticos, ha alcanzado niveles de crisis. El vapeo, el fácil acceso a cannabis con alto contenido de THC, la marihuana sintética y la creciente amenaza de píldoras contaminadas con fentanilo empeoran la situación. La educación y la intervención temprana importan porque pueden detener la adicción antes de que comience. Y también hay que atender la ansiedad, el estrés, la ira, el duelo y la depresión, porque muchas veces son la causa detrás de la automedicación.'
                  : 'Accidental overdose, most of it from synthetic opioids, has reached crisis levels. Vaping, easy access to high-THC cannabis and synthetic marijuana, and the growing threat of fentanyl-laced pills are making it worse. Early education and intervention matter because they can stop addiction before it starts. And we have to deal with anxiety, stress, anger, grief, and depression too. Those are often what lead to self-medication in the first place.'
                }
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{ background: 'rgba(20, 28, 46, 0.6)', borderLeft: '4px solid var(--gold)', padding: '24px 30px', borderRadius: '0 12px 12px 0' }}>
                  <h3 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 700, fontFamily: 'Playfair Display' }}>100K+</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', margin: '4px 0 0' }}>
                    {isEs ? 'Muertes anuales por sobredosis en EE. UU.' : 'Annual overdose deaths in the US'}
                  </p>
                </div>
                <div style={{ background: 'rgba(20, 28, 46, 0.6)', borderLeft: '4px solid var(--gold)', padding: '24px 30px', borderRadius: '0 12px 12px 0' }}>
                  <h3 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 700, fontFamily: 'Playfair Display' }}>70%</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', margin: '4px 0 0' }}>
                    {isEs ? 'Involucran fentanilo o sintéticos letales' : 'Involve synthetic opioids like fentanyl'}
                  </p>
                </div>
                <div style={{ background: 'rgba(20, 28, 46, 0.6)', borderLeft: '4px solid var(--gold)', padding: '24px 30px', borderRadius: '0 12px 12px 0' }}>
                  <h3 style={{ color: '#fff', fontSize: '2rem', margin: 0, fontWeight: 700, fontFamily: 'Playfair Display' }}>4to Grado</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', margin: '4px 0 0' }}>
                    {isEs ? 'La edad recomendada para iniciar la prevención' : 'Recommended age to begin early prevention'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GOALS & OBJECTIVES ===== */}
      <section className="section transparent-bg" id="goals-objectives">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-label">{isEs ? 'Nuestros Objetivos' : 'Our Targets'}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{isEs ? 'Metas y Objetivos' : 'Goals & Objectives'}</h2>
            <div className="gold-divider center" />
          </div>

          <div className="grid-4" style={{ gap: '24px' }}>
            {[
              {
                icon: <Eye size={36} color="var(--gold)" />,
                titleEn: 'Increase Awareness',
                titleEs: 'Aumentar la Concientización',
                descEn: "Enhance participants' understanding of the dangers associated with drug use and the importance of mental wellness.",
                descEs: "Mejorar la comprensión de los participantes sobre los peligros asociados con el uso de drogas y la importancia del bienestar mental."
              },
              {
                icon: <Shield size={36} color="var(--gold)" />,
                titleEn: 'Promote Prevention',
                titleEs: 'Promover la Prevención',
                descEn: 'Equip individuals with critical information, tools and strategies to resist peer pressure and make informed decisions.',
                descEs: 'Equipar a las personas con información crítica, herramientas y estrategias para resistir la presión de grupo y tomar decisiones informadas.'
              },
              {
                icon: <Heart size={36} color="var(--gold)" />,
                titleEn: 'Support Mental Health',
                titleEs: 'Apoyar la Salud Mental',
                descEn: 'Provide coping mechanisms to manage emotions effectively, reducing the likelihood of turning to substances.',
                descEs: 'Proporcionar mecanismos de afrontamiento para manejar las emociones de manera efectiva, reduciendo la probabilidad de recurrir a sustancias.'
              },
              {
                icon: <Users size={36} color="var(--gold)" />,
                titleEn: 'Build Community Support',
                titleEs: 'Fortalecer el Apoyo Comunitario',
                descEn: 'Encourage ongoing dialogue and support networks within the community and schools.',
                descEs: 'Fomentar el diálogo continuo y las redes de apoyo dentro de la comunidad y las escuelas.'
              }
            ].map((goal, idx) => (
              <div key={idx} className="card" style={{ background: 'rgba(20, 28, 46, 0.5)', border: '1px solid rgba(255,255,255,0.05)', padding: '36px 28px', borderRadius: '16px' }}>
                <div style={{ marginBottom: '20px' }}>{goal.icon}</div>
                <h4 style={{ color: '#fff', fontSize: '1.2rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>
                  {isEs ? goal.titleEs : goal.titleEn}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {isEs ? goal.descEs : goal.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-label">{isEs ? 'Detalles del Taller' : 'Workshop Details'}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{isEs ? 'Nuestro Plan de Estudios' : 'Our Lesson Plans'}</h2>
            <div className="gold-divider center" />
            
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '300px', margin: '0 auto 32px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
              <Image src="/media/11062b_59516b702cdd4a77a238c94f7f13e378~mv2.jpg" alt="Interactive Workshops" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,8,20,1), transparent)' }} />
            </div>

            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
              {isEs ? 'Desglosamos los hechos reales sobre estas sustancias para contrarrestar lo que los jóvenes encuentran en internet. Cada presentación está diseñada según el grupo con el que hablamos.' : "We break down the real facts about these substances to cut through what kids find online. Every presentation is built for the group we're talking to."}
            </p>
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            {lessons.map((lesson, idx) => (
              <div key={idx} style={{
                background: 'rgba(20, 28, 46, 0.5)',
                border: '1px solid rgba(201, 168, 76, 0.2)',
                borderRadius: '16px',
                padding: '40px 30px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ color: 'var(--gold)', marginBottom: '24px' }}>
                  {lesson.icon}
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontFamily: 'Playfair Display, serif', marginBottom: '20px' }}>
                  {lesson.title}
                </h3>
                <ul style={{ 
                  listStyle: 'none', 
                  padding: 0, 
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  {lesson.points.map((point, pIdx) => (
                    <li key={pIdx} style={{
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      paddingLeft: '20px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '6px',
                        height: '6px',
                        background: 'var(--gold)',
                        borderRadius: '50%'
                      }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMAN'S LIGHT WINGS ===== */}
      <section className="section transparent-bg" id="wings-program">
        <div className="container">
          <div style={{
            background: 'rgba(20, 28, 46, 0.7)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            border: '2px solid rgba(201, 168, 76, 0.4)',
            padding: '60px 48px',
            boxShadow: '0 24px 72px rgba(0,0,0,0.4), 0 4px 24px rgba(201,168,76,0.1)'
          }}>
            <div className="grid-2" style={{ gap: '48px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <Sparkles size={32} color="var(--gold)" />
                  <span className="tag">{isEs ? 'Liderazgo Juvenil' : 'Youth Leadership'}</span>
                </div>
                <h2 className="section-title" style={{ color: '#fff' }}>
                  {isEs ? 'Alas de la Luz de Iman' : "Iman's Light Wings"}
                </h2>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--gold)', marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>
                  &quot;{isEs ? 'Formando líderes desde el 4to grado en adelante.' : 'Building leaders from the 4th grade and beyond.'}&quot;
                </p>
                <div className="gold-divider" style={{ width: '80px', marginBottom: '28px' }} />
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {isEs 
                    ? 'Alas de la Luz de Iman es nuestro programa de liderazgo juvenil para estudiantes desde el 4to grado. Ayudamos a las escuelas a formar clubes dirigidos por estudiantes donde los chicos siguen hablando de prevención de drogas, se apoyan entre ellos y se mantienen involucrados en su comunidad. La conversación no termina cuando acaba nuestro taller: continúa a través del club, dirigido por los propios estudiantes.'
                    : "Iman's Light Wings is our youth leadership program for students starting in 4th grade. We help schools set up student-led clubs where kids keep talking about drug prevention, mentor each other, and stay involved in their community. The conversation doesn't stop when our workshop ends: it continues through the club, led by the students themselves."
                  }
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '50%',
                  width: '280px',
                  height: '280px',
                  overflow: 'hidden',
                  border: '3px solid rgba(201,168,76,0.4)',
                  boxShadow: '0 0 40px rgba(201,168,76,0.15)'
                }}>
                  <Image
                    src="/media/56e6ee_2fe90c9ddf2c4e36824477286a4a5492~mv2.jpeg"
                    alt={isEs ? 'Jóvenes participantes de Iman\'s Light Foundation' : 'Iman\'s Light Foundation youth participants'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== METHODOLOGY ===== */}
      <section className="section section-dark" id="methodology">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-label">{isEs ? 'Nuestro Enfoque' : 'Our Approach'}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{isEs ? 'Nuestra Metodología' : 'Our Methodology'}</h2>
            <div className="gold-divider center" />
          </div>

          <div className="grid-3" style={{ gap: '40px', position: 'relative' }}>
            {[
              {
                num: '1',
                titleEn: 'Phase 1: Preparation',
                titleEs: 'Fase 1: Preparación',
                pointsEn: [
                  'Fine-tune workshops and educational materials according to participants\' needs',
                  'Assemble pre- and post-assessment forms',
                  'Collaborate with local schools, community centers, and organizations'
                ],
                pointsEs: [
                  'Ajustar los talleres y materiales educativos según las necesidades de los participantes',
                  'Reunir los formularios de evaluación previa y posterior',
                  'Colaborar con escuelas locales, centros comunitarios y organizaciones'
                ]
              },
              {
                num: '2',
                titleEn: 'Phase 2: Execution',
                titleEs: 'Fase 2: Ejecución',
                pointsEn: [
                  'Conduct workshops targeting diverse demographics',
                  'Provide pre- and post-assessments to measure learning',
                  'Distribute and train on Naloxone use and application'
                ],
                pointsEs: [
                  'Llevar a cabo talleres dirigidos a diversos grupos demográficos',
                  'Proporcionar evaluaciones previas y posteriores para medir el aprendizaje',
                  'Distribuir y capacitar en el uso y aplicación de Naloxona'
                ]
              },
              {
                num: '3',
                titleEn: 'Phase 3: Follow-Up',
                titleEs: 'Fase 3: Seguimiento',
                pointsEn: [
                  'Evaluate future workshop needs for each school/center',
                  'Train and support Iman\'s Light Wings clubs and leaders',
                  'Offer additional resources and referrals for further assistance'
                ],
                pointsEs: [
                  'Evaluar las necesidades futuras de talleres para cada escuela/centro',
                  'Capacitar y apoyar a los clubes y líderes de Alas de la Luz de Iman',
                  'Ofrecer recursos adicionales y referencias para obtener más ayuda'
                ]
              }
            ].map((phase, pIdx) => (
              <div key={pIdx} style={{
                background: 'rgba(20, 28, 46, 0.5)',
                borderRadius: '16px',
                padding: '40px 32px',
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-24px',
                  left: '32px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--gradient-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--navy)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  boxShadow: '0 8px 20px rgba(201,168,76,0.3)'
                }}>
                  {phase.num}
                </div>
                <h3 style={{ color: '#fff', fontSize: '1.3rem', fontFamily: 'Playfair Display, serif', marginTop: '12px', marginBottom: '24px' }}>
                  {isEs ? phase.titleEs : phase.titleEn}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(isEs ? phase.pointsEs : phase.pointsEn).map((pt, ptIdx) => (
                    <li key={ptIdx} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: '1.6', paddingLeft: '18px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '8px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)' }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BUDGET TRANSPARENCY ===== */}
      <section className="section transparent-bg" id="budget-transparency">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">{isEs ? 'Finanzas Responsables' : 'Responsible Stewardship'}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{isEs ? 'Transparencia Presupuestaria' : 'Budget Transparency'}</h2>
            <div className="gold-divider center" />
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '720px', margin: '16px auto 0', fontSize: '1.05rem', lineHeight: '1.7' }}>
              {isEs
                ? 'Para garantizar una total integridad y transparencia, aquí está el desglose del presupuesto para llevar a cabo nuestro programa educativo de prevención de 4 talleres en una escuela o centro comunitario (costo total: $5,500).'
                : 'To ensure complete integrity and transparency, here is the budget breakdown for carrying out our 4-workshop educational prevention program in a school or community center (total cost: $5,500).'
              }
            </p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', overflowX: 'auto', borderRadius: '16px', border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 20px 48px rgba(0,0,0,0.4)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(20, 28, 46, 0.85)', color: '#fff', fontSize: '1rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--gradient-gold)', color: 'var(--navy)' }}>
                  <th style={{ padding: '18px 24px', fontWeight: 700 }}>{isEs ? 'Concepto del Presupuesto' : 'Budget Item'}</th>
                  <th style={{ padding: '18px 24px', fontWeight: 700, textAlign: 'right', width: '150px' }}>{isEs ? 'Costo' : 'Cost'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { itemEn: 'Workshop Facilitators (including peer specialists)', itemEs: 'Facilitadores de Talleres (incluyendo especialistas pares)', cost: '$3,600' },
                  { itemEn: 'Educational Materials Development', itemEs: 'Desarrollo de Materiales Educativos', cost: '$450' },
                  { itemEn: 'Community Outreach / Iman\'s Light Wings', itemEs: 'Alcance Comunitario / Alas de la Luz de Iman', cost: '$1,000' },
                  { itemEn: 'Program Evaluation and Reporting', itemEs: 'Evaluación y Reporte del Programa', cost: '$250' },
                  { itemEn: 'Administrative Costs', itemEs: 'Costos Administrativos', cost: '$200' },
                ].map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.9)' }}>{isEs ? row.itemEs : row.itemEn}</td>
                    <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600, color: 'var(--gold-light)' }}>{row.cost}</td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(201, 168, 76, 0.08)', fontWeight: 800 }}>
                  <td style={{ padding: '18px 24px', color: 'var(--gold)' }}>Total</td>
                  <td style={{ padding: '18px 24px', textAlign: 'right', color: 'var(--gold)', fontSize: '1.15rem' }}>$5,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ===== SUSTAINABILITY ===== */}
      <section className="section section-dark" id="sustainability">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-label">{isEs ? 'Nuestra Sostenibilidad' : 'Our Longevity'}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{isEs ? 'Nuestro Plan de Sostenibilidad' : 'Our Sustainability Plan'}</h2>
            <div className="gold-divider center" />
          </div>

          <div className="grid-3" style={{ gap: '30px' }}>
            {[
              {
                icon: <DollarSign size={32} color="var(--gold)" />,
                titleEn: 'Diversified Funding',
                titleEs: 'Financiamiento Diversificado',
                descEn: 'Securing grants, government agencies, corporate sponsorships, and individual donors to maintain long-term financial health.',
                descEs: 'Asegurar subvenciones, agencias gubernamentales, patrocinios corporativos y donantes individuales para mantener la salud financiera a largo plazo.'
              },
              {
                icon: <Handshake size={32} color="var(--gold)" />,
                titleEn: 'Community Partnerships',
                titleEs: 'Alanzas Comunitarias',
                descEn: 'Integrating workshops into existing programs at local schools, community centers, and youth organizations.',
                descEs: 'Integrar talleres en programas existentes en escuelas locales, centros comunitarios y organizaciones juveniles.'
              },
              {
                icon: <Users size={32} color="var(--gold)" />,
                titleEn: 'Volunteer Engagement',
                titleEs: 'Participación de Voluntarios',
                descEn: 'Building a network of trained community volunteers and peer specialists to assist in workshop facilitation.',
                descEs: 'Construir una red de voluntarios comunitarios capacitados y especialistas pares para ayudar en la facilitación de talleres.'
              },
              {
                icon: <BarChart3 size={32} color="var(--gold)" />,
                titleEn: 'Continuous Evaluation',
                titleEs: 'Evaluación Continua',
                descEn: 'Running ongoing pre- and post-assessments to measure learning outcomes and improve workshop content.',
                descEs: 'Realizar evaluaciones previas y posteriores continuas para medir los resultados del aprendizaje y mejorar el contenido del taller.'
              },
              {
                icon: <Megaphone size={32} color="var(--gold)" />,
                titleEn: 'Policy Advocacy',
                titleEs: 'Incidencia Política',
                descEn: 'Collaborating with city leaders and law enforcement to promote policies supporting substance abuse prevention.',
                descEs: 'Colaborar con líderes de la ciudad y fuerzas del orden para promover políticas que apoyen la prevención del abuso de sustancias.'
              },
              {
                icon: <BookOpen size={32} color="var(--gold)" />,
                titleEn: 'Resource Development',
                titleEs: 'Desarrollo de Recursos',
                descEn: 'Creating educational materials, toolkits, and digital assets for replication across other counties.',
                descEs: 'Crear materiales educativos, kits de herramientas y activos digitales para su replicación en otros condados.'
              }
            ].map((pillar, idx) => (
              <div key={idx} className="card" style={{ background: 'rgba(20, 28, 46, 0.5)', border: '1px solid rgba(255,255,255,0.05)', padding: '36px 28px', borderRadius: '16px' }}>
                <div style={{ marginBottom: '20px' }}>{pillar.icon}</div>
                <h4 style={{ color: '#fff', fontSize: '1.15rem', fontFamily: 'Playfair Display, serif', marginBottom: '12px' }}>
                  {isEs ? pillar.titleEs : pillar.titleEn}
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {isEs ? pillar.descEs : pillar.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container text-center">
          <h2 style={{ color: 'var(--white)', marginBottom: '24px', fontFamily: 'Playfair Display, serif' }}>
            {isEs ? 'Patrocine una Escuela Hoy' : 'Sponsor a School Today'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '640px', margin: '0 auto 40px', fontSize: '1.1rem', lineHeight: '1.8' }}>
            {isEs ? 'Nos asociamos con la policía, líderes de la ciudad y la DEA para la eliminación segura de drogas. Ayúdanos a impulsar cambios legislativos y llevar estos talleres a más estudiantes.' : 'We partner with police, city leaders, and the DEA on safe drug disposal. Help us push for legislative change and bring these workshops to more students.'}
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary">{isEs ? 'Póngase en Contacto' : 'Get in Touch'}</Link>
            <Link href="/donate" className="btn btn-outline">{isEs ? 'Financiar un Taller' : 'Fund a Workshop'}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
