'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/LanguageContext';
import { Lightbulb, Heart, Scale, Leaf, Users, Star, Globe2, Quote, Award } from 'lucide-react';
import styles from './about.module.css';
import { FEATURED_SPONSORS, COMMUNITY_SPONSORS, TEXT_ONLY_SPONSORS } from '@/data/sponsors';
import SponsorGrid from '@/components/SponsorGrid';
import TextSponsorPills from '@/components/TextSponsorPills';

const t = {
  en: {
    breadcrumb: 'Home',
    heroLabel: 'Our Story',
    heroTitle: "Iman's Light: A Mother's Love",
    heroSub: 'We started this foundation after fentanyl took someone we loved. Now we walk alongside other families going through the same thing, with honest information and real support.',
    storyLabel: "How We Started",
    storyTitle: 'A Life Full of Light',
    storyText1: "Iman's Light Foundation began at a kitchen table. Our family started it to keep Iman's spirit alive after we lost her to fentanyl. She was a bright, caring presence in our community, and no family should have to go through what we went through.",
    storyText2: "That heartbreak turned into a mission. We realized that by sharing our story honestly, we could help protect other children from the same thing. We want kids to grow up safe, in a community that actually looks out for them.",
    storyText3: "Since then, we've built a real community of support around Iman's memory. We believe love and education are our best tools. When we stand together and actually listen to each other, we can guide our kids toward safer, healthier lives.",
    missionLabel: 'Our Purpose',
    missionTitle: 'The Mission',
    missionText: "Our mission comes from personal loss: teach people the honest truth about synthetic opioids, push for safety in our schools and neighborhoods, and be there for families who need mental health support or just someone to talk to.",
    visionTitle: 'Our Hope for the Future',
    visionText: "We want a community where mental health is taken seriously, where families feel supported instead of alone, and where every child is safe. That's what we're working toward, in Iman's memory.",
    valuesLabel: 'What Guides Us',
    valuesTitle: 'Our Heartfelt Values',
    values: [
      { icon: <Lightbulb size={32} />, title: 'Honest Conversations', text: 'We talk openly with parents and kids, and we give them real facts without judgment.' },
      { icon: <Heart size={32} />, title: 'Deep Compassion', text: 'Everyone is welcome here. We offer a safe space and real support when people need it most.' },
      { icon: <Scale size={32} />, title: 'Community Care', text: "We push for policies that put our kids' safety first." },
      { icon: <Leaf size={32} />, title: 'Healing Together', text: 'Grief is hard to carry alone. We provide counseling and resources to help families heal side by side.' },
      { icon: <Users size={32} />, title: 'Hand in Hand', text: "We work closely with schools, parents, and local health workers. None of this works if we try to do it alone." },
      { icon: <Star size={32} />, title: 'Iman’s Spirit', text: "Every family we support carries a little of Iman's kindness forward." },
    ],
    teamLabel: 'Our Leadership',
    teamTitle: 'The Board & Advisors',
    teamSub: 'A community of dedicated leaders, educators, and volunteers bringing light where it is needed most.',
    team: [
      { name: 'Mari C. Rodriguez', role: 'Founder & President', image: '/media/56e6ee_c8a42446ccc74e71817a9116052f4ce2~mv2.jpg', bio: 'After losing her daughter Iman to fentanyl, Mari built this foundation, which now reaches tens of thousands of people. Her work honors Iman and tries to make sure other mothers don\'t go through the same loss.' },
      { name: 'Brianna A. Rodriquez', role: 'Vice President', image: '/media/56e6ee_af44b0afacc84026a7d798066e207ef3~mv2.png', bio: "Iman's younger sister. Brianna leads youth outreach and has become a steady, strong presence for the community." },
      { name: 'Maria E. Liriano', role: 'Treasurer', image: '/media/56e6ee_3ddb5580bfcd4f2f85790a4e10b0ef56~mv2.jpg', bio: 'An entrepreneur for over 30 years in real estate and escrow. Maria manages the foundation’s finances and makes sure every dollar goes toward our education and counseling work.' },
      { name: 'Mercy M. Preciado', role: 'Outreach Community Chair', image: '/media/56e6ee_aa30d37cd6ce4cddb9cee9bfd4c40832~mv2.jpeg', bio: 'A spiritual counselor with a master’s degree in psychology. Mercy connects individuals and families with mental health services, combining her clinical training with spiritual guidance.' },
      { name: 'Dunia Cuneo', role: 'Volunteer Director', image: '/media/56e6ee_fe5c234f71af45758073f116758dc4b1~mv2.jpeg', bio: 'An educator and HR professional with over 25 years of experience. Dunia uses that background to mentor our volunteers and support the foundation’s community outreach.' },
      { name: 'Brittany DeMeo', role: 'Recording Secretary', image: '/media/56e6ee_3c8481b926504a1dae34abe7d0fd3dde~mv2.jpeg', bio: 'Brittany joined the foundation after seeing how fentanyl was affecting our region. As recording secretary, she keeps our operations organized so resources get where they’re needed quickly.' },
      { name: 'Libby L. Calero', role: 'PR & Sponsor Development', image: '/media/56e6ee_37bc5c9d971949858e3cd5393e414ae6~mv2.jpg', bio: 'Over 25 years in hospitality and PR, including work with DJ Irie and Jamie Foxx. Libby uses her network to bring visibility and sponsorships to the foundation.' },
      { name: 'Victor H. Jinete', role: 'Audio Visual Director', image: '/media/56e6ee_1857a150774e4beb9114d4788de004a5~mv2.jpeg', bio: 'Known as "Vic The Kid," Victor is a Latin music artist who creates content for the foundation and shows younger fans that you don\'t need drugs to be happy or successful.' },
      { name: 'Naylin Rizo, LMHC', role: 'Psychology Advisor', image: '/media/56e6ee_35c37897108948f48e30e3d1ff4434c9~mv2.jpg', bio: 'A licensed mental health counselor with over 14 years of experience working with teens and adults on trauma and addiction. She makes sure our mental health programs are clinically sound.' },
      { name: 'Natalie Cruz, MSW', role: 'Social Work Advisor', image: '/media/natalie-cruz-health-advisory.jpg', bio: 'A social worker for over 25 years. Natalie has a bachelor’s degree in psychology from St. Thomas University and a master’s in social work from Florida International University. She currently manages a hospital case management department, coordinating care so patients get what they need after they leave the hospital.' },
      { name: 'Nicolas Su Nobrega', role: 'IT & Web Developer', image: '/media/56e6ee_e765024d488a45ffad6cb38cac0d5d78~mv2.jpeg', bio: 'A cybersecurity student at FIU, Nicolas builds and maintains the foundation’s website and keeps our systems and data secure.' },
    ],
    testimonialsLabel: 'Voices of Support',
    testimonialsTitle: 'Letters of Support',
    testimonialsSub: 'Endorsements from our school counselors, mental health partners, and community organizers.',
    testimonials: [
      { quote: 'Through the Iman\'s Light Foundation, you offer students critical knowledge they often have not encountered before—particularly regarding the dangers of substance abuse, marijuana use, vaping, and fentanyl. Your approach creates a safe, welcoming environment where students feel comfortable asking questions without fear of judgment.', author: 'Eduardo Sabillon', role: 'Counselor, Kinloch Park Middle School' },
      { quote: 'Dr. Rodriguez has demonstrated an unwavering commitment to empowering individuals through education and awareness. What distinguishes her approach is her ability to share lived experiences in a way that fosters trust, understanding, and meaningful dialogue.', author: 'Francesco Buberli PhD, MPH, MS', role: 'CEO, Survivors\' Pathway Corporation' },
      { quote: 'Your presentation offered critical, evidence-based information regarding the dangers of counterfeit pills, fentanyl contamination, and emerging synthetic substances. This education directly supports our ability to provide safe, informed, and responsive care to the individuals we serve.', author: 'The Leadership Team', role: 'Behavior Support Center of Florida' },
      { quote: 'Her ability to combine professional expertise with personal experience sets her apart as a true leader in prevention and community outreach. The workshops she has conducted in partnership with us have not only increased awareness but also fostered safe spaces for dialogue.', author: 'Natalia Angarita', role: 'Director of Special Affairs, Drug-Free World Foundation South Florida' },
      { quote: 'Imans Light Foundation has demonstrated a strong commitment to educating our youth and community members on the dangers of lethal synthetic drugs, vaping, and overall substance misuse. Their workshops are informative, engaging, and rooted in compassion and evidence-based practices.', author: 'Romnie Vertus', role: 'Program Coordinator, S.A.R.A. / Prosperity Social & Community Development Group' }
    ],
    awardsLabel: 'Recognition',
    awardsTitle: 'Awards & Community Recognitions',
    awardsSub: 'Honors received by our founder and foundation for outstanding community service and prevention work.',
    awards: [
      { year: '2026', title: "Iman's Light Foundation Award presented to Ana Boue Cao, CEO of Southern Winds Hospital", org: '7th Annual Power & Influence Luncheon' },
      { year: '2025', title: 'Honoree, NOMI Evening of Honor', org: 'City of North Miami, Florida' },
      { year: '2024', title: 'La Antorcha de Oro: Woman Who Transcends', org: 'Christian Latin Business Chamber of Commerce' },
      { year: '2023 & 2024', title: 'Mayor Daniela Levine Cava Certificate of Appreciation', org: '4th & 5th Annual Power & Influence Awards' },
      { year: '2023', title: 'National Caribbean American Awards', org: 'Community Service Recognition' },
      { year: '2022', title: 'Certificate for Exceptional Community Service during COVID-19', org: 'City of Miramar, Commissioner Maxwell Chambers' },
      { year: '2021', title: 'Trail Blazer Awards: Woman Inspiring Woman', org: 'Community Leadership' },
      { year: 'Award', title: 'Comunidad FVE "Premios Gratitud" Award', org: 'Gratitude for Community Support' },
      { year: 'Award', title: 'Mejora & Youth for Human Rights "Goodwill Peace Makers & Keepers of the Flame" Award', org: 'Human Rights Advocacy' },
      { year: 'Award', title: '"Unwavering Commitment to Justice and Education" Award', org: 'Toys for Kids Miami' }
    ],
    affiliationsLabel: 'Affiliations',
    affiliationsTitle: 'Community Affiliations & Professional Involvement',
    organizationsTitle: 'Professional Organizations',
    chambersTitle: 'Chambers of Commerce & Advisory Boards',
    organizations: [
      'PTA & PTSA', 'Global Innovative Foundation', 'Florida Board of Nursing', 'Black Nurses Association',
      'Miami Kingdom Lion Club', 'Wings to Freedom', 'Survivors Pathway', 'Miami Children\'s Hospital / Joe DiMaggio',
      'Miami Mission', 'Global Philanthropy Society', 'Foundation of the Americas', 'Comunidad FBE',
      'The Circle of Brotherhood', 'DEA', 'CDC', 'Southern Winds Hospital', 'Behavior Support of South Florida',
      'Jewish University System'
    ],
    chambers: [
      'The Christian Latin Chamber of Commerce', 'Miami Chamber of Commerce', 'Miami Real Estate Association of Realtors',
      'National Association of Realtors', 'Huntington Board of Directors', 'Asociación Internacional de Clubes de Leones',
      'North Miami Chamber of Commerce'
    ],
    partnersLabel: 'Our Extended Family',
    partnersTitle: 'Friends of the Foundation',
    partnersSub: 'We are so grateful for the local partners who walk alongside us in this journey.',
    partnerCta: 'Walk With Us',
    ctaTitle: 'Join Our Community',
    ctaText: "We can't do this alone. Your support helps us reach more families, run counseling sessions, and bring workshops into local schools.",
    ctaDonate: 'Make a Heartfelt Gift',
    ctaContact: 'Get in Touch',
  },
  es: {
    breadcrumb: 'Inicio',
    heroLabel: 'Nuestra Historia',
    heroTitle: "La Luz de Iman: El Amor de una Madre",
    heroSub: 'Empezamos esta fundación después de que el fentanilo se llevara a alguien que amábamos. Ahora caminamos junto a otras familias que están pasando por lo mismo, con información honesta y apoyo real.',
    storyLabel: "Cómo Empezamos",
    storyTitle: 'Una Vida Llena de Luz',
    storyText1: "La Fundación Iman's Light comenzó en la mesa de nuestra cocina. La empezamos para mantener vivo el espíritu de Iman después de perderla por el fentanilo. Ella era una presencia brillante y cariñosa en nuestra comunidad, y ninguna familia debería pasar por lo que nosotros pasamos.",
    storyText2: "Ese dolor se convirtió en una misión. Nos dimos cuenta de que, contando nuestra historia con honestidad, podíamos ayudar a proteger a otros niños de lo mismo. Queremos que los niños crezcan seguros, en una comunidad que de verdad los cuide.",
    storyText3: "Desde entonces, hemos construido una comunidad real de apoyo alrededor de la memoria de Iman. Creemos que el amor y la educación son nuestras mejores herramientas. Cuando nos apoyamos de verdad unos a otros, podemos guiar a nuestros jóvenes hacia una vida más segura y saludable.",
    missionLabel: 'Nuestro Propósito',
    missionTitle: 'La Misión',
    missionText: "Nuestra misión nace de una pérdida personal: enseñar la verdad sobre los opioides sintéticos, luchar por la seguridad en nuestras escuelas y vecindarios, y estar presentes para las familias que necesitan apoyo emocional o simplemente alguien con quien hablar.",
    visionTitle: 'Nuestra Esperanza para el Futuro',
    visionText: "Queremos una comunidad donde la salud mental se tome en serio, donde las familias se sientan apoyadas en lugar de solas, y donde cada niño esté a salvo. Eso es lo que buscamos, en memoria de Iman.",
    valuesLabel: 'Lo Que Nos Guía',
    valuesTitle: 'Nuestros Valores',
    values: [
      { icon: <Lightbulb size={32} />, title: 'Conversaciones Honestas', text: 'Hablamos abiertamente con padres y jóvenes, y les damos información real sin juzgar.' },
      { icon: <Heart size={32} />, title: 'Compasión Profunda', text: 'Aquí todos son bienvenidos. Ofrecemos un espacio seguro y apoyo real cuando más se necesita.' },
      { icon: <Scale size={32} />, title: 'Cuidado Comunitario', text: 'Luchamos por políticas que pongan primero la seguridad de nuestros niños.' },
      { icon: <Leaf size={32} />, title: 'Sanando Juntos', text: 'El duelo es difícil de llevar solo. Brindamos recursos para sanar juntos.' },
      { icon: <Users size={32} />, title: 'Mano a Mano', text: 'Trabajamos de cerca con escuelas, padres y trabajadores de salud locales. Nada de esto funciona si lo hacemos solos.' },
      { icon: <Star size={32} />, title: 'El Espíritu de Iman', text: 'Cada familia que apoyamos lleva un poco de la bondad de Iman.' },
    ],
    teamLabel: 'Nuestro Liderazgo',
    teamTitle: 'La Junta y Asesores',
    teamSub: 'Una comunidad de líderes dedicados, educadores y voluntarios que llevan luz a donde más se necesita.',
    team: [
      { name: 'Mari C. Rodriguez', role: 'Fundadora y Presidenta', image: '/media/56e6ee_c8a42446ccc74e71817a9116052f4ce2~mv2.jpg', bio: 'Después de perder a su hija Iman por el fentanilo, Mari construyó esta fundación, que hoy llega a decenas de miles de personas. Su trabajo honra a Iman y busca que otras madres no pasen por la misma pérdida.' },
      { name: 'Brianna A. Rodriquez', role: 'Vicepresidenta', image: '/media/56e6ee_af44b0afacc84026a7d798066e207ef3~mv2.png', bio: 'La hermana menor de Iman. Brianna dirige el alcance juvenil y se ha convertido en una presencia firme para la comunidad.' },
      { name: 'Maria E. Liriano', role: 'Tesorera', image: '/media/56e6ee_3ddb5580bfcd4f2f85790a4e10b0ef56~mv2.jpg', bio: 'Con más de 30 años de experiencia en bienes raíces y fideicomiso. Maria administra las finanzas de la fundación y se asegura de que cada dólar se destine a nuestro trabajo de educación y consejería.' },
      { name: 'Mercy M. Preciado', role: 'Presidenta Comunitaria', image: '/media/56e6ee_aa30d37cd6ce4cddb9cee9bfd4c40832~mv2.jpeg', bio: 'Consejera espiritual con una maestría en psicología. Mercy conecta a personas y familias con servicios de salud mental, combinando su formación clínica con guía espiritual.' },
      { name: 'Dunia Cuneo', role: 'Directora de Voluntarios', image: '/media/56e6ee_fe5c234f71af45758073f116758dc4b1~mv2.jpeg', bio: 'Educadora y profesional de Recursos Humanos con más de 25 años de experiencia. Dunia usa ese conocimiento para guiar a nuestros voluntarios y apoyar el alcance comunitario de la fundación.' },
      { name: 'Brittany DeMeo', role: 'Secretaria', image: '/media/56e6ee_3c8481b926504a1dae34abe7d0fd3dde~mv2.jpeg', bio: 'Brittany se unió a la fundación después de ver cómo el fentanilo afectaba a nuestra región. Como secretaria, mantiene nuestras operaciones organizadas para que los recursos lleguen rápido a donde se necesitan.' },
      { name: 'Libby L. Calero', role: 'Relaciones Públicas', image: '/media/56e6ee_37bc5c9d971949858e3cd5393e414ae6~mv2.jpg', bio: 'Más de 25 años en hospitalidad y relaciones públicas, incluyendo trabajo con DJ Irie y Jamie Foxx. Libby usa su red de contactos para traer visibilidad y patrocinios a la fundación.' },
      { name: 'Victor H. Jinete', role: 'Director Audiovisual', image: '/media/56e6ee_1857a150774e4beb9114d4788de004a5~mv2.jpeg', bio: 'Conocido como "Vic The Kid," Victor es un artista de música latina que crea contenido para la fundación y les muestra a sus seguidores más jóvenes que no se necesitan drogas para ser feliz o tener éxito.' },
      { name: 'Naylin Rizo, LMHC', role: 'Asesora Psicológica', image: '/media/56e6ee_35c37897108948f48e30e3d1ff4434c9~mv2.jpg', bio: 'Consejera de salud mental licenciada con más de 14 años de experiencia trabajando con adolescentes y adultos en trauma y adicción. Se asegura de que nuestros programas de bienestar mental sean clínicamente sólidos.' },
      { name: 'Natalie Cruz, MSW', role: 'Asesora de Trabajo Social', image: '/media/natalie-cruz-health-advisory.jpg', bio: 'Trabajadora social por más de 25 años. Natalie tiene una licenciatura en psicología de St. Thomas University y una maestría en trabajo social de Florida International University. Actualmente dirige un departamento de gestión de casos hospitalarios, coordinando la atención para que los pacientes reciban lo que necesitan después de salir del hospital.' },
      { name: 'Nicolas Su Nobrega', role: 'TI y Desarrollador Web', image: '/media/56e6ee_e765024d488a45ffad6cb38cac0d5d78~mv2.jpeg', bio: 'Estudiante de ciberseguridad en FIU, Nicolas construye y mantiene el sitio web de la fundación, y mantiene nuestros sistemas y datos seguros.' },
    ],
    testimonialsLabel: 'Voces de Apoyo',
    testimonialsTitle: 'Cartas de Apoyo',
    testimonialsSub: 'Endosos de nuestros consejeros escolares, socios de salud mental y organizadores comunitarios.',
    testimonials: [
      { quote: "A través de la Fundación Iman's Light, ofrecen a los estudiantes conocimientos críticos que a menudo no habían encontrado antes, particularmente sobre los peligros del abuso de sustancias, el uso de marihuana, el vapeo y el fentanilo. Su enfoque crea un ambiente seguro y acogedor donde los estudiantes se sienten cómodos haciendo preguntas.", author: "Eduardo Sabillon", role: "Consejero, Kinloch Park Middle School" },
      { quote: "La Dra. Rodríguez ha demostrado un compromiso inquebrantable con el empoderamiento de las personas a través de la educación y la concientización. Lo que distingue su enfoque es su capacidad para compartir experiencias vividas de manera que fomenta la confianza y el diálogo significativo.", author: "Francesco Buberli PhD, MPH, MS", role: "CEO, Survivors' Pathway Corporation" },
      { quote: "Su presentación ofreció información crítica y basada en evidencia sobre los peligros de las pastillas falsificadas, la contaminación con fentanilo y las sustancias sintéticas emergentes. Esta educación apoya directamente nuestra capacidad de brindar atención segura e informada.", author: "El Equipo de Liderazgo", role: "Behavior Support Center of Florida" },
      { quote: "Su capacidad para combinar la experiencia profesional con la experiencia personal la distingue como una verdadera líder en prevención y alcance comunitario. Los talleres que ha realizado en asociación con nosotros no solo han aumentado la conciencia sino que también han fomentado espacios seguros para el diálogo.", author: "Natalia Angarita", role: "Directora de Asuntos Especiales, Drug-Free World Foundation South Florida" },
      { quote: "La Fundación Iman's Light ha demostrado un fuerte compromiso con la educación de nuestros jóvenes y miembros de la comunidad sobre los peligros de las drogas sintéticas letales, el vapeo y el mal uso de sustancias. Sus talleres son informativos, atractivos y basados en la compasión y prácticas basadas en evidencia.", author: "Romnie Vertus", role: "Coordinador de Programas, S.A.R.A. / Prosperity Social & Community Development Group" }
    ],
    awardsLabel: 'Reconocimiento',
    awardsTitle: 'Premios y Reconocimientos Comunitarios',
    awardsSub: 'Honores recibidos por nuestra fundadora y la fundación por servicios sobresalientes y prevención.',
    awards: [
      { year: '2026', title: "Premio Iman's Light Foundation entregado a Ana Boue Cao, CEO de Southern Winds Hospital", org: '7mo Almuerzo Anual de Poder e Influencia' },
      { year: '2025', title: 'Homenajeada, NOMI Evening of Honor', org: 'Ciudad de North Miami, Florida' },
      { year: '2024', title: 'La Antorcha de Oro: Mujer Que Trasciende', org: 'Cámara de Comercio de Negocios Latinos Cristianos' },
      { year: '2023 & 2024', title: 'Certificado de Apreciación de la Alcaldesa Daniela Levine Cava', org: '4to y 5to Premios Anuales de Poder e Influencia' },
      { year: '2023', title: 'Premios Nacionales del Caribe Americano', org: 'Reconocimiento al Servicio Comunitario' },
      { year: '2022', title: 'Certificado por Servicio Comunitario Excepcional durante COVID-19', org: 'Ciudad de Miramar, Comisionado Maxwell Chambers' },
      { year: '2021', title: 'Trail Blazer Awards: Mujer que Inspira a Otra Mujer', org: 'Liderazgo Comunitario' },
      { year: 'Premio', title: 'Premio "Premios Gratitud" de Comunidad FVE', org: 'Gratitud por Apoyo Comunitario' },
      { year: 'Premio', title: 'Premio "Goodwill Peace Makers & Keepers of the Flame" de Mejora & Youth for Human Rights', org: 'Defensa de los Derechos Humanos' },
      { year: 'Premio', title: 'Premio "Compromiso Inquebrantable con la Justicia y la Educación"', org: 'Toys for Kids Miami' }
    ],
    affiliationsLabel: 'Afiliaciones',
    affiliationsTitle: 'Afiliaciones Comunitarias e Involucramiento Profesional',
    organizationsTitle: 'Organizaciones Profesionales',
    chambersTitle: 'Cámaras de Comercio y Juntas Asesoras',
    organizations: [
      'PTA y PTSA', 'Global Innovative Foundation', 'Florida Board of Nursing', 'Black Nurses Association',
      'Miami Kingdom Lion Club', 'Wings to Freedom', 'Survivors Pathway', 'Miami Children\'s Hospital / Joe DiMaggio',
      'Miami Mission', 'Global Philanthropy Society', 'Foundation of the Americas', 'Comunidad FBE',
      'The Circle of Brotherhood', 'DEA', 'CDC', 'Southern Winds Hospital', 'Behavior Support of South Florida',
      'Jewish University System'
    ],
    chambers: [
      'Cámara de Comercio Cristiana Latina', 'Cámara de Comercio de Miami', 'Asociación de Agentes Inmobiliarios de Miami',
      'Asociación Nacional de Agentes Inmobiliarios', 'Junta Directiva de Huntington', 'Asociación Internacional de Clubes de Leones',
      'Cámara de Comercio de North Miami'
    ],
    partnersLabel: 'Nuestra Familia Extendida',
    partnersTitle: 'Amigos de la Fundación',
    partnersSub: 'Estamos muy agradecidos por nuestros socios locales.',
    partnerCta: 'Camina Con Nosotros',
    ctaTitle: 'Únete a Nuestra Comunidad',
    ctaText: "Su bondad y apoyo nos ayuda a llegar a más familias.",
    ctaDonate: 'Hacer una Donación',
    ctaContact: 'Contáctanos',
  },
};

export default function AboutPage() {
  const { lang } = useContext(LanguageContext);
  const txt = t[lang];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{txt.breadcrumb}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{lang === 'en' ? 'Legacy' : 'Legado'}</span>
          </div>
          <span className="section-label">{txt.heroLabel}</span>
          <h1>{txt.heroTitle}</h1>
          <p style={{ maxWidth: '720px', fontSize: '1.2rem', lineHeight: '1.6' }}>{txt.heroSub}</p>
        </div>
      </div>

      <section className="section transparent-bg">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gridTemplateColumns: '1fr 1.15fr' }}>
            <div style={{ paddingRight: '20px' }}>
              <span className="section-label">{txt.storyLabel}</span>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.storyTitle}</h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>{txt.storyText1}</p>
              <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>{txt.storyText2}</p>
              <p style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 500, lineHeight: '1.8' }}>{txt.storyText3}</p>
            </div>
            <div style={{ display: 'flex', gap: '18px', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: '48%', maxWidth: '310px', aspectRatio: '4 / 5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image
                  src="/media/56e6ee_dd6ee2f616104027bdfd2ce80bf6ab2b-primary.jpg"
                  alt="Iman"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 15%' }}
                />
              </div>
              <div style={{ position: 'relative', width: '48%', maxWidth: '310px', aspectRatio: '4 / 5', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image
                  src="/media/56e6ee_8fa3d2dc25d34cbcaaa0219bd31efeaa~mv2.jpg"
                  alt="Iman"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="mission">
        <div className="container">
          <div className="grid-2" style={{ gap: '40px' }}>
            <div className="card" style={{ background: 'rgba(20, 28, 46, 0.7)', backdropFilter: 'blur(12px)', padding: '48px', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
              <Star size={48} color="var(--gold)" style={{ marginBottom: '24px' }} />
              <h3 style={{ color: 'var(--white)', fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'Playfair Display' }}>{txt.missionTitle}</h3>
              <div className="gold-divider" />
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.8' }}>{txt.missionText}</p>
            </div>
            <div className="card" style={{ background: 'rgba(20, 28, 46, 0.7)', backdropFilter: 'blur(12px)', padding: '48px', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
              <Globe2 size={48} color="var(--gold-light)" style={{ marginBottom: '24px' }} />
              <h3 style={{ color: 'var(--white)', fontSize: '1.5rem', marginBottom: '16px', fontFamily: 'Playfair Display' }}>{txt.visionTitle}</h3>
              <div className="gold-divider" />
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.8' }}>{txt.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section transparent-bg" id="values">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{txt.valuesLabel}</span>
            <h2 className="section-title" style={{ color: '#fff' }}>{txt.valuesTitle}</h2>
            <div className="gold-divider center" />
          </div>
          <div className="grid-3" style={{ marginTop: '48px' }}>
            {txt.values.map((v, i) => (
              <div key={i} className="card" style={{ background: 'rgba(20, 28, 46, 0.5)', backdropFilter: 'blur(10px)', padding: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ display: 'block', color: 'var(--gold)', marginBottom: '20px' }}>{v.icon}</span>
                <h4 style={{ color: 'var(--white)', fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'Playfair Display' }}>{v.title}</h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" id="team">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{txt.teamLabel}</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.teamTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>{txt.teamSub}</p>
          </div>
          <div className={styles.teamGrid}>
            {txt.team.map((member, i) => (
              <div key={i} className={styles.teamCard}>
                <div className={styles.teamImageWrapper}>
                  {member.image.startsWith('data:') ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className={styles.teamImage}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill 
                      className={styles.teamImage}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className={styles.teamImageOverlay} />
                </div>
                <div className={styles.teamContent}>
                  <h3 style={{ color: 'var(--white)', fontSize: '1.3rem', marginBottom: '4px', fontFamily: 'Playfair Display' }}>{member.name}</h3>
                  <span className="tag" style={{ marginBottom: '16px', display: 'inline-block', fontSize: '0.85rem' }}>{member.role}</span>
                  <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: '0.95rem' }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section transparent-bg" id="testimonials">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{txt.testimonialsLabel}</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.testimonialsTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>{txt.testimonialsSub}</p>
          </div>
          <div className={styles.testimonialsGrid}>
            {txt.testimonials.map((test, i) => (
              <div key={i} className={styles.testimonialCard}>
                <Quote size={40} color="var(--gold)" style={{ opacity: 0.3, position: 'absolute', top: 20, right: 20 }} />
                <p style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '24px', flexGrow: 1 }}>
                  &quot;{test.quote}&quot;
                </p>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 600, fontFamily: 'Playfair Display, serif', display: 'block' }}>{test.author}</span>
                  {test.role && <span className={styles.testimonialRole}>{test.role}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AWARDS SECTION ===== */}
      <section className="section section-dark" id="awards">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{txt.awardsLabel}</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.awardsTitle}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>{txt.awardsSub}</p>
          </div>
          
          <div className={styles.awardsTimeline}>
            {txt.awards.map((award, i) => (
              <div key={i} className={styles.awardCard}>
                {award.year && <span className={styles.awardYear}>{award.year}</span>}
                <h3 style={{ color: 'var(--white)', fontSize: '1.25rem', marginBottom: '6px', fontFamily: 'Playfair Display, serif', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={18} color="var(--gold)" />
                  {award.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AFFILIATIONS SECTION ===== */}
      <section className="section transparent-bg" id="affiliations">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{txt.affiliationsLabel}</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.affiliationsTitle}</h2>
            <div className="gold-divider center" />
          </div>

          <div style={{ marginTop: '40px' }}>
            <h3 className={styles.subsectionHeading}>{txt.organizationsTitle}</h3>
            <div className={styles.subsectionDivider} />
            <div className={styles.affiliationsGrid}>
              {txt.organizations.map((org, i) => (
                <div key={i} className={styles.affiliationBadge}>
                  {org}
                </div>
              ))}
            </div>

            <h3 className={styles.subsectionHeading}>{txt.chambersTitle}</h3>
            <div className={styles.subsectionDivider} />
            <div className={styles.chambersGrid}>
              {txt.chambers.map((chamber, i) => (
                <div key={i} className={styles.chamberBadge}>
                  {chamber}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-dark" id="partnerships">
        <div className="container text-center">
          <span className="section-label">{txt.partnersLabel}</span>
          <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.partnersTitle}</h2>
          <div className="gold-divider center" />
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }}>{txt.partnersSub}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '48px', alignItems: 'center' }}>
            <SponsorGrid items={FEATURED_SPONSORS} />

            {/* Community & Event Sponsor Logos */}
            <div style={{ width: '100%' }}>
              <h4 className={styles.subsectionHeading}>
                {lang === 'en' ? 'Community & Event Sponsors' : 'Patrocinadores de Eventos y Apoyo'}
              </h4>
              <div className={styles.subsectionDivider} />
              <SponsorGrid items={COMMUNITY_SPONSORS} />
            </div>

            <TextSponsorPills items={TEXT_ONLY_SPONSORS} />
          </div>
          <Link href="/contact" className="btn btn-outline" style={{ marginTop: '40px' }}>
            {txt.partnerCta} →
          </Link>
        </div>
      </section>

      <section className="section transparent-bg">
        <div className="container text-center">
          <h2 style={{ color: '#fff', marginBottom: '24px', fontFamily: 'Playfair Display', fontSize: '2.5rem' }}>{txt.ctaTitle}</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '640px', margin: '0 auto 40px', fontSize: '1.1rem', lineHeight: '1.8' }}>{txt.ctaText}</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/donate" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>{txt.ctaDonate}</Link>
            <Link href="/contact" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>{txt.ctaContact}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
