'use client';

import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/LanguageContext';
import { Lightbulb, Heart, Scale, Leaf, Users, Star, Globe2, Quote, Award } from 'lucide-react';
import styles from './about.module.css';

const t = {
  en: {
    breadcrumb: 'Home',
    heroLabel: 'Our Story',
    heroTitle: "Iman's Light: A Mother's Love",
    heroSub: 'Born from a deep longing to honor a beautiful life, we are here to walk alongside families, offering comfort, education, and unwavering support in the face of the fentanyl crisis.',
    storyLabel: "How We Started",
    storyTitle: 'A Life Full of Light',
    storyText1: "Iman’s Light Foundation began at a kitchen table, rooted in the deep love of a family determined to keep their daughter's beautiful spirit alive. Iman was a bright, caring light in our community, and losing her to fentanyl was a heartbreak no family should ever have to endure.",
    storyText2: "But from that heartbreak grew a mission of pure love and connection. We realized that if we could openly share our story and honest facts, we could protect other children. We want to live in a world where kids are safe to learn and grow, surrounded by a community that looks out for them with compassion and truth.",
    storyText3: "Through Iman’s light, we have built a warm, welcoming community of support. We believe that love and education are our greatest tools, and by standing together—listening, learning, and supporting one another—we can guide our youth toward safe, healthy futures.",
    missionLabel: 'Our Purpose',
    missionTitle: 'The Mission',
    missionText: "Our mission is simple and deeply personal: to protect our communities with heartfelt education and genuine support. We provide clear, honest information about synthetic opioids, advocate gently but firmly for safety, and offer a comforting sanctuary for families who need mental health resources or a shoulder to lean on.",
    visionTitle: 'Our Hope for the Future',
    visionText: "We envision a community wrapped in understanding and care. A place where mental wellness is prioritized, where families feel openly supported rather than isolated, and where every child is safe, guided by the loving legacy of those we hold dear in our hearts.",
    valuesLabel: 'What Guides Us',
    valuesTitle: 'Our Heartfelt Values',
    values: [
      { icon: <Lightbulb size={32} />, title: 'Honest Conversations', text: 'We believe in talking openly and warmly with parents and youth, providing real facts without judgment.' },
      { icon: <Heart size={32} />, title: 'Deep Compassion', text: 'We welcome everyone with open arms, offering a safe space and loving support when they need it most.' },
      { icon: <Scale size={32} />, title: 'Community Care', text: 'We gently advocate for systems that prioritize the safety and well-being of our children above all else.' },
      { icon: <Leaf size={32} />, title: 'Healing Together', text: 'Grief is hard to carry alone. We provide counseling and resources to help families heal side by side.' },
      { icon: <Users size={32} />, title: 'Hand in Hand', text: 'We work closely with schools, parents, and local health workers because together we are stronger.' },
      { icon: <Star size={32} />, title: 'Iman’s Spirit', text: "Every comforting word and every family we support is a pure reflection of Iman’s kindness and warmth." },
    ],
    teamLabel: 'Our Leadership',
    teamTitle: 'The Board & Advisors',
    teamSub: 'A community of dedicated leaders, educators, and volunteers bringing light where it is needed most.',
    team: [
      { name: 'Mari C. Rodriguez', role: 'Founder & President', image: 'https://static.wixstatic.com/media/56e6ee_c8a42446ccc74e71817a9116052f4ce2~mv2.jpg/v1/crop/x_0,y_404,w_1500,h_1381/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/20240111_190833.jpg', bio: 'Driven by profound personal loss, Mari transformed her family’s tragedy into an uncompromising foundation that reaches tens of thousands. Her work honors her daughter while fighting to ensure no other mother has to endure the devastation of the fentanyl crisis.' },
      { name: 'Brianna A. Rodriquez', role: 'Vice President', image: 'https://static.wixstatic.com/media/56e6ee_af44b0afacc84026a7d798066e207ef3~mv2.png/v1/fill/w_413,h_371,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2971_PNG.png', bio: 'Iman\'s loving sister. Brianna carries forward Iman’s spirit by directly impacting youth outreach, standing as a pillar of strength, resilience, and compassion for her community.' },
      { name: 'Maria E. Liriano', role: 'Treasurer', image: 'https://static.wixstatic.com/media/56e6ee_3ddb5580bfcd4f2f85790a4e10b0ef56~mv2.jpg/v1/crop/x_967,y_0,w_5165,h_4755/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7355_JPG.jpg', bio: 'A successful entrepreneur for over 30 years with a background in Real Estate and Escrow. Maria manages our foundation’s finances to ensure every single dollar is effectively utilized to support our educational and therapeutic initiatives.' },
      { name: 'Mercy M. Preciado', role: 'Outreach Community Chair', image: 'https://static.wixstatic.com/media/56e6ee_aa30d37cd6ce4cddb9cee9bfd4c40832~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-08-10%20at%2012_24_28.jpeg', bio: 'A Spiritual Counselor with a Master’s in Psychology. Mercy connects individuals and families with life-changing mental health services, blending professional expertise with deep spiritual guidance.' },
      { name: 'Dunia Cuneo', role: 'Volunteer Director', image: 'https://static.wixstatic.com/media/56e6ee_fe5c234f71af45758073f116758dc4b1~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-08-10%20at%2014_41_59.jpeg', bio: 'A dedicated educator and HR professional with over 25 years of experience. Dunia leverages her MBA and acumen to foster inclusive cultures, mentoring emerging leaders to drive systemic change through community advocacy.' },
      { name: 'Brittany DeMeo', role: 'Recording Secretary', image: 'https://static.wixstatic.com/media/56e6ee_3c8481b926504a1dae34abe7d0fd3dde~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/E43C39AD-DCE7-4504-BC2D-FDD3D4B5451F.jpeg', bio: 'Joining the foundation after witnessing the devastating regional impacts of fentanyl, Brittany ensures that our operational structure remains efficient, organized, and perfectly clear so our resources hit the frontlines immediately.' },
      { name: 'Libby L. Calero', role: 'PR & Sponsor Development', image: 'https://static.wixstatic.com/media/56e6ee_37bc5c9d971949858e3cd5393e414ae6~mv2.jpg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG-20250918-WA0055(1).jpg', bio: 'With over 25 years in hospitality and PR (working alongside DJ Irie and Jamie Foxx), Libby uses her vast network to bring massive visibility and crucial sponsorships to the foundation’s life-saving mission.' },
      { name: 'Victor H. Jinete', role: 'Audio Visual Director', image: 'https://static.wixstatic.com/media/56e6ee_1857a150774e4beb9114d4788de004a5~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-09-21%20at%2019_01_37.jpeg', bio: 'Known as "Vic The Kid", this rising Latin music artist uses his massive platform to produce engaging content for the foundation, demonstrating to youth that success and joy do not require lethal substances.' },
      { name: 'Naylin Rizo, LMHC', role: 'Psychology Advisor', image: 'https://static.wixstatic.com/media/56e6ee_35c37897108948f48e30e3d1ff4434c9~mv2.jpg/v1/fill/w_344,h_344,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_0477.jpg', bio: 'A Licensed Mental Health Counselor with 14+ years guiding teens and adults through trauma and addiction. She ensures our mental wellness programs are clinically sound and maximally effective.' },
      { name: 'Natalie Cruz, MSW', role: 'Social Work Advisor', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="413" height="371" viewBox="0 0 413 371"><rect fill="%23141C2E" width="413" height="371"/><circle cx="206" cy="140" r="60" fill="none" stroke="%23C9A84C" stroke-width="2"/><text x="206" y="155" text-anchor="middle" fill="%23C9A84C" font-family="serif" font-size="48" font-weight="bold">NC</text><rect x="146" y="220" width="120" height="4" rx="2" fill="%23C9A84C" opacity="0.6"/></svg>'), bio: 'A dedicated social worker for over 25 years with a strong foundation in supporting individuals across the lifespan. Natalie holds a Bachelor\'s degree in Psychology from St. Thomas University and a Master of Social Work from Florida International University. She currently serves as a Manager of a Hospital Case Management department, leading care coordination efforts and ensuring patients receive comprehensive post-acute care.' },
      { name: 'Nicolas S. Nobrega', role: 'IT Intern', image: 'https://static.wixstatic.com/media/56e6ee_e765024d488a45ffad6cb38cac0d5d78~mv2.jpeg/v1/fill/w_344,h_344,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-08-19%20at%2013_41_58.jpeg', bio: 'A passionate Cybersecurity student at FIU, Nicolas handles the foundation’s digital infrastructure, ensuring our lifesaving resources and data remain accessible, secure, and easily reachable.' },
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
      { year: '2024', title: 'La Antorcha de Oro – Woman Who Transcends', org: 'Christian Latin Business Chamber of Commerce' },
      { year: '2023 & 2024', title: 'Mayor Daniela Levine Cava Certificate of Appreciation', org: '4th & 5th Annual Power & Influence Awards' },
      { year: '2023', title: 'National Caribbean American Awards', org: 'Community Service Recognition' },
      { year: '2022', title: 'Certificate for Exceptional Community Service during COVID-19', org: 'City of Miramar, Commissioner Maxwell Chambers' },
      { year: '2021', title: 'Trail Blazer Awards – Woman Inspiring Woman', org: 'Community Leadership' },
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
    ctaText: "We can't do this alone. Your kindness and support help us reach more families, provide counseling, and bring educational workshops into our schools.",
    ctaDonate: 'Make a Heartfelt Gift',
    ctaContact: 'Get in Touch',
  },
  es: {
    breadcrumb: 'Inicio',
    heroLabel: 'Nuestra Historia',
    heroTitle: "La Luz de Iman: El Amor de una Madre",
    heroSub: 'Nacida del profundo anhelo de honrar una vida hermosa, estamos aquí para caminar junto a las familias, ofreciendo consuelo, educación y apoyo incondicional.',
    storyLabel: "Cómo Empezamos",
    storyTitle: 'Una Vida Llena de Luz',
    storyText1: "La Fundación Iman's Light comenzó en la mesa de una familia decidida a mantener vivo el hermoso espíritu de su hija. Iman era una luz brillante en nuestra comunidad, y perderla por el fentanilo fue un dolor que ninguna familia debería soportar.",
    storyText2: "Pero de ese dolor creció una misión de puro amor. Nos dimos cuenta de que podíamos proteger a otros niños si compartíamos nuestra historia abiertamente. Queremos un mundo donde los niños estén seguros, rodeados de una comunidad compasiva.",
    storyText3: "A través de la luz de Iman, hemos construido una comunidad cálida de apoyo. Creemos que apoyándonos unos a otros podemos guiar a nuestros jóvenes hacia un futuro saludable.",
    missionLabel: 'Nuestro Propósito',
    missionTitle: 'La Misión',
    missionText: "Nuestra misión es proteger a nuestras comunidades con educación amorosa y apoyo genuino. Brindamos información clara sobre los opioides y ofrecemos un refugio reconfortante para las familias que necesitan apoyo emocional.",
    visionTitle: 'Nuestra Esperanza para el Futuro',
    visionText: "Imaginamos una comunidad envuelta en comprensión y cuidado. Un lugar donde se priorice el bienestar mental, donde las familias se sientan apoyadas en lugar de aisladas, y donde cada niño esté a salvo.",
    valuesLabel: 'Lo Que Nos Guía',
    valuesTitle: 'Nuestros Valores',
    values: [
      { icon: <Lightbulb size={32} />, title: 'Conversaciones Honestas', text: 'Hablar abiertamente con padres y jóvenes, brindando información real sin juzgar.' },
      { icon: <Heart size={32} />, title: 'Compasión Profunda', text: 'Recibimos a todos con los brazos abiertos, ofreciendo un espacio seguro.' },
      { icon: <Scale size={32} />, title: 'Cuidado Comunitario', text: 'Abogamos por sistemas que prioricen la seguridad de nuestros niños.' },
      { icon: <Leaf size={32} />, title: 'Sanando Juntos', text: 'El duelo es difícil de llevar solo. Brindamos recursos para sanar juntos.' },
      { icon: <Users size={32} />, title: 'Mano a Mano', text: 'Trabajamos con escuelas y padres porque juntos somos más fuertes.' },
      { icon: <Star size={32} />, title: 'El Espíritu de Iman', text: 'Cada palabra de consuelo es un reflejo puro de la bondad de Iman.' },
    ],
    teamLabel: 'Nuestro Liderazgo',
    teamTitle: 'La Junta y Asesores',
    teamSub: 'Una comunidad de líderes dedicados, educadores y voluntarios que llevan luz a donde más se necesita.',
    team: [
      { name: 'Mari C. Rodriguez', role: 'Fundadora y Presidenta', image: 'https://static.wixstatic.com/media/56e6ee_c8a42446ccc74e71817a9116052f4ce2~mv2.jpg/v1/crop/x_0,y_404,w_1500,h_1381/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/20240111_190833.jpg', bio: 'Impulsada por una profunda pérdida personal, Mari transformó la tragedia de su familia en una base intransigente que llega a decenas de miles.' },
      { name: 'Brianna A. Rodriquez', role: 'Vicepresidenta', image: 'https://static.wixstatic.com/media/56e6ee_af44b0afacc84026a7d798066e207ef3~mv2.png/v1/fill/w_413,h_371,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_2971_PNG.png', bio: 'La amorosa hermana de Iman. Brianna lleva adelante el espíritu de Iman impactando directamente a los jóvenes como un pilar de fortaleza.' },
      { name: 'Maria E. Liriano', role: 'Tesorera', image: 'https://static.wixstatic.com/media/56e6ee_3ddb5580bfcd4f2f85790a4e10b0ef56~mv2.jpg/v1/crop/x_967,y_0,w_5165,h_4755/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7355_JPG.jpg', bio: 'Con experiencia en Bienes Raíces y Fideicomiso. Maria administra las finanzas para garantizar que cada dólar se utilice para apoyar nuestras iniciativas.' },
      { name: 'Mercy M. Preciado', role: 'Presidenta Comunitaria', image: 'https://static.wixstatic.com/media/56e6ee_aa30d37cd6ce4cddb9cee9bfd4c40832~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-08-10%20at%2012_24_28.jpeg', bio: 'Mercy conecta a las familias con servicios de salud mental que cambian sus vidas, combinando la experiencia profesional con la guía espiritual.' },
      { name: 'Dunia Cuneo', role: 'Directora de Voluntarios', image: 'https://static.wixstatic.com/media/56e6ee_fe5c234f71af45758073f116758dc4b1~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-08-10%20at%2014_41_59.jpeg', bio: 'Dunia aprovecha su MBA y perspicacia de Recursos Humanos para cambiar sistemas educativos en apoyo hacia la comunidad.' },
      { name: 'Brittany DeMeo', role: 'Secretaria', image: 'https://static.wixstatic.com/media/56e6ee_3c8481b926504a1dae34abe7d0fd3dde~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/E43C39AD-DCE7-4504-BC2D-FDD3D4B5451F.jpeg', bio: 'Garantiza que nuestra estructura operativa se mantenga eficiente, organizada y perfectamente clara en nuestras misiones diarias.' },
      { name: 'Libby L. Calero', role: 'Relaciones Públicas', image: 'https://static.wixstatic.com/media/56e6ee_37bc5c9d971949858e3cd5393e414ae6~mv2.jpg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG-20250918-WA0055(1).jpg', bio: 'Utiliza su vasta red (DJ Irie, Jamie Foxx) para dar visibilidad masiva y patrocinios cruciales a la misión de la fundación.' },
      { name: 'Victor H. Jinete', role: 'Director Audiovisual', image: 'https://static.wixstatic.com/media/56e6ee_1857a150774e4beb9114d4788de004a5~mv2.jpeg/v1/fill/w_413,h_371,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-09-21%20at%2019_01_37.jpeg', bio: 'El artista de música latina ("Vic The Kid") utiliza su plataforma para demostrar a los jóvenes que el éxito no requieren sustancias letales.' },
      { name: 'Naylin Rizo, LMHC', role: 'Asesora Psicológica', image: 'https://static.wixstatic.com/media/56e6ee_35c37897108948f48e30e3d1ff4434c9~mv2.jpg/v1/fill/w_344,h_344,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_0477.jpg', bio: 'Asesora especializada en traumas y adicciones, garantiza que nuestros programas enfocados en el bienestar mental sean sumamente efectivos.' },
      { name: 'Natalie Cruz, MSW', role: 'Asesora de Trabajo Social', image: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="413" height="371" viewBox="0 0 413 371"><rect fill="%23141C2E" width="413" height="371"/><circle cx="206" cy="140" r="60" fill="none" stroke="%23C9A84C" stroke-width="2"/><text x="206" y="155" text-anchor="middle" fill="%23C9A84C" font-family="serif" font-size="48" font-weight="bold">NC</text><rect x="146" y="220" width="120" height="4" rx="2" fill="%23C9A84C" opacity="0.6"/></svg>'), bio: 'Trabajadora social dedicada por más de 25 años con una sólida base en el apoyo a individuos a lo largo de toda la vida. Natalie posee una Licenciatura en Psicología de St. Thomas University y una Maestría en Trabajo Social de Florida International University. Actualmente se desempeña como Gerente de un departamento de Gestión de Casos Hospitalarios, liderando esfuerzos de coordinación de atención.' },
      { name: 'Nicolas S. Nobrega', role: 'Pasante de TI', image: 'https://static.wixstatic.com/media/56e6ee_e765024d488a45ffad6cb38cac0d5d78~mv2.jpeg/v1/fill/w_344,h_344,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/WhatsApp%20Image%202025-08-19%20at%2013_41_58.jpeg', bio: 'Nico maneja nuestra infraestructura cibernética para que los recursos siempre estén totalmente seguros y accesibles para todos.' },
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
      { year: '2024', title: 'La Antorcha de Oro – Mujer Que Trasciende', org: 'Cámara de Comercio de Negocios Latinos Cristianos' },
      { year: '2023 & 2024', title: 'Certificado de Apreciación de la Alcaldesa Daniela Levine Cava', org: '4to y 5to Premios Anuales de Poder e Influencia' },
      { year: '2023', title: 'Premios Nacionales del Caribe Americano', org: 'Reconocimiento al Servicio Comunitario' },
      { year: '2022', title: 'Certificado por Servicio Comunitario Excepcional durante COVID-19', org: 'Ciudad de Miramar, Comisionado Maxwell Chambers' },
      { year: '2021', title: 'Trail Blazer Awards – Mujer que Inspira a Otra Mujer', org: 'Liderazgo Comunitario' },
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
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div style={{ paddingRight: '20px' }}>
              <span className="section-label">{txt.storyLabel}</span>
              <h2 className="section-title" style={{ color: 'var(--white)' }}>{txt.storyTitle}</h2>
              <div className="gold-divider" />
              <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>{txt.storyText1}</p>
              <p style={{ marginBottom: '24px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', lineHeight: '1.8' }}>{txt.storyText2}</p>
              <p style={{ fontSize: '1.1rem', color: 'var(--gold)', fontWeight: 500, lineHeight: '1.8' }}>{txt.storyText3}</p>
            </div>
            <div className={styles.storyVisual}>
              <Image
                src="https://static.wixstatic.com/media/56e6ee_ece131f2ea484a41881b640ba6c9430a~mv2.jpg"
                alt="Iman's Light Foundation Legacy"
                width={600}
                height={600}
                className={styles.storyImg}
                style={{ borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="mission">
        <div className="container">
          <div className="grid-2" style={{ gap: '40px' }}>
            <div className="card" style={{ background: 'rgba(20, 28, 46, 0.7)', backdropFilter: 'blur(12px)', padding: '48px', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
              <Star size={48} color="var(--gold)" style={{ marginBottom: '24px' }} />
              <h2 style={{ color: 'var(--white)', marginBottom: '16px', fontFamily: 'Playfair Display' }}>{txt.missionTitle}</h2>
              <div className="gold-divider" />
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: '1.8' }}>{txt.missionText}</p>
            </div>
            <div className="card" style={{ background: 'rgba(20, 28, 46, 0.7)', backdropFilter: 'blur(12px)', padding: '48px', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
              <Globe2 size={48} color="var(--gold-light)" style={{ marginBottom: '24px' }} />
              <h2 style={{ color: 'var(--white)', marginBottom: '16px', fontFamily: 'Playfair Display' }}>{txt.visionTitle}</h2>
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
                  "{test.quote}"
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '48px', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <div className={styles.sponsorLogosGrid}>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png/v1/fill/w_568,h_191,q_90,enc_avif,quality_auto/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png" alt="FGA" width={284} height={95} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png/v1/fill/w_201,h_194,q_90,enc_avif,quality_auto/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png" alt="The Bridge" width={100} height={97} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_b29a7ddaabd3481bb888135a8da07410~mv2.png/v1/fill/w_357,h_194,q_90,enc_avif,quality_auto/56e6ee_b29a7ddaabd3481bb888135a8da07410~mv2.png" alt="Survivors Pathway" width={178} height={97} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="/sponsors/sponsor_logo_1.png" alt="Monarch Air Group" width={110} height={97} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="/sponsors/sponsor_logo_2.png" alt="Sponsor Partner" width={110} height={97} style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', width: '100%' }}>
              <div className={styles.sponsorLogosGrid}>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png/v1/fill/w_233,h_183,q_90,enc_avif,quality_auto/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png" alt="Nicklaus Childrens" width={116} height={91} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png/v1/fill/w_371,h_268,q_90,enc_avif,quality_auto/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png" alt="One More Child" width={135} height={97} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_0b1d1f617c3b42acbf68755c62e11afe~mv2.png/v1/fill/w_224,h_225,q_90,enc_avif,quality_auto/56e6ee_0b1d1f617c3b42acbf68755c62e11afe~mv2.png" alt="Village South" width={97} height={97} style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>
            
            {/* Extended text partners from Wix data */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
              {['Secure Your Drink', 'Outreach Behavior Support', 'Infinity Life Wellness Center', 'Behavior Support Center of Florida', 'Improving Lives Community', 'Luxe Properties', 'DAER Nightclub', 'Juan Carlos Pinera', 'Master Bodyworker', 'ScribeAmerica'].map((p, i) => (
                <div key={i} className={styles.partnerLogo} style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '16px 24px', borderRadius: '8px', color: 'var(--white)', fontWeight: 600 }}>{p}</div>
              ))}
            </div>

            {/* Event Flyers Showcase */}
            <div style={{ width: '100%', marginTop: '32px' }}>
              <h4 className={styles.subsectionHeading}>
                {lang === 'en' ? 'Event Flyers & Sponsor Showcase' : 'Folletos de Eventos y Patrocinadores'}
              </h4>
              <div className={styles.subsectionDivider} />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', maxWidth: '800px', margin: '24px auto 0' }}>
                {['/sponsors/sponsor_1.jpg', '/sponsors/sponsor_2.jpg', '/sponsors/sponsor_3.jpg'].map((src, i) => (
                  <div key={i} className={styles.flyerCard} style={{ 
                    position: 'relative', 
                    borderRadius: '12px', 
                    overflow: 'hidden', 
                    border: '1px solid rgba(201, 168, 76, 0.25)', 
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                    aspectRatio: src.endsWith('3.jpg') ? '892/1024' : '2/3',
                    transition: 'all 0.3s ease'
                  }}>
                    <Image src={src} alt={`Event Flyer ${i+1}`} fill style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>

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
