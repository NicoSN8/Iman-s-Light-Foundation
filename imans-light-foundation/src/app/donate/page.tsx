'use client';
import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LanguageContext } from '@/context/LanguageContext';
import { Leaf, Star, Sparkles, Gem, Trophy, Mail, RefreshCcw, Building2, GraduationCap, Heart, ShieldAlert, Scale } from 'lucide-react';
import styles from './donate.module.css';

const tiers = {
  en: [
      {
        id: 'workshop',
        name: 'The Workshop Package',
        amount: '$5,000',
        icon: <GraduationCap size={32} color="var(--gold-light)" />,
        featured: true,
        descEn: 'Directly fund four interactive "Truth About Drugs" presentations for an entire school. Includes projector equipment, printed materials, and expert speakers.',
        descEs: 'Financia directamente cuatro presentaciones interactivas completas para toda una escuela. Equipos, materiales e instructores expertos.'
      },
      {
        id: 'family',
        name: 'The Family Support Package',
        amount: '$2,500',
        icon: <Heart size={32} color="var(--gold)" />,
        descEn: 'Provide a grieving family or at-risk youth with 6 months of dedicated mental health counseling from our licensed psychological advisors.',
        descEs: 'Proporciona a una familia en duelo o a un joven en riesgo 6 meses de asesoramiento de salud mental dedicado con nuestros psicólogos.'
      },
      {
        id: 'lifesaver',
        name: 'The Lifesaver Package',
        amount: '$1,000',
        icon: <ShieldAlert size={32} color="var(--gold)" />,
        descEn: 'Fund 100 boxes of Narcan (Naloxone) spray and resources for our direct community outreach team to distribute to high-risk youth and families.',
        descEs: 'Financia 100 cajas de aerosol Narcan y folletos educativos para distribuir a jóvenes y familias de alto riesgo.'
      },
      {
        id: 'supporter',
        name: 'The Prevention Supporter',
        amount: '$500',
        icon: <Scale size={32} color="var(--gold)" />,
        descEn: 'Help print 1,000 copies of our educational drug prevention toolkits distributed to middle school and high school classrooms.',
        descEs: 'Ayuda a imprimir 1,000 copias de nuestros manuales de prevención distribuidos en aulas de secundaria.'
      },
      {
        id: 'custom',
        name: 'A Custom Contribution',
        amount: 'Custom',
        icon: <Leaf size={32} color="var(--gold)" />,
        descEn: 'Every single dollar helps. Make a custom donation that goes directly to supporting our local prevention and counseling efforts.',
        descEs: 'Cada dólar ayuda. Haz una contribución personalizada que irá directamente a apoyar nuestros esfuerzos locales.'
      }
    ],
  es: [
      {
        id: 'workshop',
        name: 'Paquete de Taller Completo',
        amount: '$5,000',
        icon: <GraduationCap size={32} color="var(--gold-light)" />,
        featured: true,
        descEn: 'Directly fund four interactive "Truth About Drugs" presentations for an entire school. Includes projector equipment, printed materials, and expert speakers.',
        descEs: 'Financia directamente cuatro presentaciones interactivas completas para toda una escuela. Equipos, materiales e instructores expertos.'
      },
      {
        id: 'family',
        name: 'Paquete de Apoyo Familiar',
        amount: '$2,500',
        icon: <Heart size={32} color="var(--gold)" />,
        descEn: 'Provide a grieving family or at-risk youth with 6 months of dedicated mental health counseling from our licensed psychological advisors.',
        descEs: 'Proporciona a una familia en duelo o a un joven en riesgo 6 meses de asesoramiento de salud mental dedicado con nuestros psicólogos.'
      },
      {
        id: 'lifesaver',
        name: 'Paquete Salvador de Vidas',
        amount: '$1,000',
        icon: <ShieldAlert size={32} color="var(--gold)" />,
        descEn: 'Fund 100 boxes of Narcan (Naloxone) spray and resources for our direct community outreach team to distribute to high-risk youth and families.',
        descEs: 'Financia 100 cajas de aerosol Narcan y folletos educativos para distribuir a jóvenes y familias de alto riesgo.'
      },
      {
        id: 'supporter',
        name: 'Colaborador de Prevención',
        amount: '$500',
        icon: <Scale size={32} color="var(--gold)" />,
        descEn: 'Help print 1,000 copies of our educational drug prevention toolkits distributed to middle school and high school classrooms.',
        descEs: 'Ayuda a imprimir 1,000 copias de nuestros manuales de prevención distribuidos en aulas de secundaria.'
      },
      {
        id: 'custom',
        name: 'Contribución Personalizada',
        amount: 'Personalizado',
        icon: <Leaf size={32} color="var(--gold)" />,
        descEn: 'Every single dollar helps. Make a custom donation that goes directly to supporting our local prevention and counseling efforts.',
        descEs: 'Cada dólar ayuda. Haz una contribución personalizada que irá directamente a apoyar nuestros esfuerzos locales.'
      }
    ]
};

export default function DonatePage() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';
  const tierList = tiers[lang];

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Donar' : 'Donate'}</span>
          </div>
          <span className="section-label">{isEs ? 'Apóyanos' : 'Support Our Mission'}</span>
          <h1>{isEs ? 'Invierte en el Mañana' : 'Invest in Tomorrow'}</h1>
          <p>{isEs ? 'Tu generosidad financia directamente la educación sobre drogas en las escuelas locales y el asesoramiento terapéutico para familias necesitadas.' : 'Your generosity directly funds life-saving drug education in local classrooms and therapy sessions for grieving or at-risk families.'}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <span className="section-label">{isEs ? 'Opciones de Financiamiento' : 'Funding Packages'}</span>
            <h2 className="section-title">{isEs ? 'Nuestros Paquetes de Impacto' : 'How You Can Support'}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle">{isEs ? 'Elige un nivel que resuene con tu deseo de generar un cambio duradero en el sur de Florida.' : 'Choose a sponsorship level that matches your commitment to saving young lives and supporting families.'}</p>
          </div>
          <div className={styles.tiersGrid}>
            {tierList.map((tier, i) => (
              <div key={i} className={`card ${styles.tierCard} ${(tier as any).featured ? styles.tierFeatured : ''}`}>
                <div className={styles.tierIcon}>{tier.icon}</div>
                <div className={styles.tierAmount}>{tier.amount}</div>
                <div className={styles.tierLabel}>{tier.name}</div>
                <p className={styles.tierDesc}>{isEs ? tier.descEs : tier.descEn}</p>
                <a
                  href="https://www.imanslightfoundation.org/donations"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${(tier as any).featured ? 'btn-primary' : 'btn-outline'}`}
                  style={{ marginTop: 'auto', fontSize: '0.875rem', padding: '12px 22px', textAlign: 'center' }}
                >
                  {isEs ? 'Donar' : 'Give'} {tier.amount !== 'Custom' && tier.amount !== 'Personalizado' ? tier.amount : ''} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Sponsors */}
      <section className="section transparent-bg">
        <div className="container text-center">
          <span className="section-label">{isEs ? 'Nuestros Socios' : 'Our Partners'}</span>
          <h2 className="section-title">{isEs ? 'Patrocinadores Actuales' : 'Current Sponsors'}</h2>
          <div className="gold-divider center" />
          <p className="section-subtitle">{isEs ? 'Agradecemos profundamente a las organizaciones que hacen posible nuestra misión.' : 'We are deeply grateful to the organizations that make our mission possible.'}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '48px', alignItems: 'center' }}>
            {/* Platinum */}
            <div style={{ width: '100%' }}>
              <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>PLATINUM</h4>
              <div className={styles.sponsorLogosGrid}>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png/v1/fill/w_568,h_191,q_90,enc_avif,quality_auto/56e6ee_b2c36136ad654d72a7f4de09ea17cf05~mv2.png" alt="FGA" width={284} height={95} style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>

            {/* Gold */}
            <div style={{ width: '100%' }}>
              <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>GOLD</h4>
              <div className={styles.sponsorLogosGrid}>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png/v1/fill/w_201,h_194,q_90,enc_avif,quality_auto/56e6ee_b9e7061a12d24743b5b3fc07a74f92ed~mv2.png" alt="The Bridge" width={100} height={97} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_b29a7ddaabd3481bb888135a8da07410~mv2.png/v1/fill/w_357,h_194,q_90,enc_avif,quality_auto/56e6ee_b29a7ddaabd3481bb888135a8da07410~mv2.png" alt="Survivors Pathway" width={178} height={97} style={{ objectFit: 'contain' }} />
                </div>
                <div className={styles.sponsorBadge}>
                  <Image src="https://static.wixstatic.com/media/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png/v1/fill/w_233,h_183,q_90,enc_avif,quality_auto/56e6ee_f010f8e8cccb405a8fc28f3fb2481f7e~mv2.png" alt="Nicklaus Childrens" width={116} height={91} style={{ objectFit: 'contain' }} />
                </div>
              </div>
            </div>

            {/* Silver & Educational */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', justifyContent: 'center', width: '100%' }}>
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>SILVER</h4>
                <div className={styles.sponsorLogosGrid}>
                  <div className={styles.sponsorBadge}>
                    <Image src="https://static.wixstatic.com/media/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png/v1/fill/w_371,h_268,q_90,enc_avif,quality_auto/56e6ee_55f0bbe459fb41e9907cd3c547b6afb5~mv2.png" alt="One More Child" width={135} height={97} style={{ objectFit: 'contain' }} />
                  </div>
                </div>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>EDUCATIONAL SILVER</h4>
                <div className={styles.sponsorLogosGrid}>
                  <div className={styles.sponsorBadge}>
                    <Image src="https://static.wixstatic.com/media/56e6ee_0b1d1f617c3b42acbf68755c62e11afe~mv2.png/v1/fill/w_224,h_225,q_90,enc_avif,quality_auto/56e6ee_0b1d1f617c3b42acbf68755c62e11afe~mv2.png" alt="Village South" width={97} height={97} style={{ objectFit: 'contain' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Community Sponsors */}
            <div style={{ width: '100%', marginTop: '16px' }}>
              <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>
                {isEs ? 'PATROCINADORES DE APOYO Y EVENTOS' : 'SUPPORTING & EVENT SPONSOR LOGOS'}
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '600px', margin: '0 auto' }}>
                {isEs 
                  ? 'Agradecemos profundamente a todos nuestros colaboradores que apoyan directamente a nuestra comunidad con su marca y compromiso.' 
                  : 'We are deeply grateful to all our partners who directly support our community with their brand and commitment.'}
              </p>
              
              <div className={styles.communitySponsorLogosGrid}>
                {[
                  { src: '/sponsors/extracted/sp3_logo_0.png', alt: 'Event Sponsor' },
                  { src: '/sponsors/extracted/sp3_logo_1.png', alt: 'Event Sponsor' },
                  { src: '/sponsors/extracted/sp3_logo_2.png', alt: 'Event Sponsor' },
                  { src: '/sponsors/extracted/sp3_logo_3.png', alt: 'Event Sponsor' },
                  { src: '/sponsors/extracted/sp3_logo_4.png', alt: 'Event Sponsor' },
                  { src: 'https://static.wixstatic.com/media/56e6ee_ebe0f16f3a7f45d2a15a997eab2927f3~mv2.png', alt: 'Sponsor' },
                  { src: 'https://static.wixstatic.com/media/56e6ee_90b6e59a5df142298b790e6f643fa66a~mv2.png', alt: 'Sponsor' },
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

              <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.1rem', fontFamily: 'Playfair Display', marginTop: '32px' }}>
                {isEs ? 'OTROS COLABORADORES Y AMIGOS' : 'OTHER SPONSORS & ADVOCATES'}
              </h4>
              <div className={styles.communitySponsorGrid}>
                {[
                  'Monarch Air Group',
                  'South Florida Wellness Network',
                  'Phoenix Title & Closing',
                  'Expressions Noblemen & Consulting',
                  'Rewind 103.5',
                  'S.A.R.A. Coalition',
                  'Fentanyl Awareness Coalition',
                  'Gables Cigars Shop',
                  'RMT Media',
                  'Secure Your Drink',
                  'Outreach Behavior Support',
                  'Infinity Life Wellness Center',
                  'Improving Lives Community',
                  'Luxe Properties',
                  'DAER Nightclub',
                  'Master Bodyworker',
                  'ScribeAmerica',
                  'blackandwhite',
                  'Prosperity Social & Community Development Group'
                ].map((s, i) => (
                  <div key={i} className={styles.communitySponsorBadge}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Donate CTA */}
      <section className="section section-dark">
        <div className="container text-center">
          <div className={styles.donateBox}>
            <span className="section-label">{isEs ? 'Donar Ahora' : 'Donate Now'}</span>
            <h2 style={{ color: '#fff', marginBottom: '16px' }}>{isEs ? 'Haz tu Donación Segura' : 'Make Your Secure Donation'}</h2>
            <div className="gold-divider center" />
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 32px' }}>
              {isEs
                ? 'Iman\'s Light Foundation es una organización sin fines de lucro 501(c)(3) registrada. Tu donación es deducible de impuestos.'
                : "Iman's Light Foundation is a registered 501(c)(3) nonprofit. Your donation is tax-deductible. EIN: 93-4410846."}
            </p>
            <div className={styles.donateActions}>
              <a
                href="https://www.imanslightfoundation.org/donations"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: '1rem', padding: '16px 40px' }}
              >
                {isEs ? 'Donar de Forma Segura' : 'Donate Securely'} →
              </a>
            </div>
            <div className={styles.trustBadges}>
              <div className={styles.badge}>🔒 {isEs ? 'Pago Seguro' : 'Secure Payment'}</div>
              <div className={styles.badge}>✅ 501(c)(3) {isEs ? 'Registrada' : 'Registered'}</div>
              <div className={styles.badge}>📋 EIN: 93-4410846</div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="section section-cream">
        <div className="container">
          <div className="text-center">
            <span className="section-label">{isEs ? 'Otras Formas de Dar' : 'Other Ways to Give'}</span>
            <h2 className="section-title">{isEs ? 'Más Opciones de Donación' : 'More Ways to Support'}</h2>
            <div className="gold-divider center" />
          </div>
          <div className="grid-3" style={{ marginTop: '48px' }}>
            {[
              {
                icon: <Mail size={40} color="var(--gold)" />,
                titleEn: 'Mail a Check',
                titleEs: 'Enviar un Cheque',
                descEn: 'Make checks payable to "Iman\'s Light Foundation" and contact us for mailing instructions.',
                descEs: 'Haz los cheques a nombre de "Iman\'s Light Foundation" y contáctanos para instrucciones de envío.',
              },
              {
                icon: <RefreshCcw size={40} color="var(--gold)" />,
                titleEn: 'Recurring Giving',
                titleEs: 'Donaciones Recurrentes',
                descEn: 'Set up monthly donations to provide sustained support for our programs year-round.',
                descEs: 'Configura donaciones mensuales para proporcionar apoyo sostenido a nuestros programas.',
              },
              {
                icon: <Building2 size={40} color="var(--gold)" />,
                titleEn: 'Corporate Sponsorship',
                titleEs: 'Patrocinio Corporativo',
                descEn: 'Partner with us as a corporate sponsor. Contact us for sponsorship packages and benefits.',
                descEs: 'Asóciate con nosotros como patrocinador corporativo. Contáctanos para paquetes y beneficios.',
              },
            ].map((way, i) => (
              <div key={i} className="card" style={{ padding: '36px 28px' }}>
                <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>{way.icon}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{isEs ? way.titleEs : way.titleEn}</h3>
                <div className="gold-divider" />
                <p style={{ fontSize: '0.9rem' }}>{isEs ? way.descEs : way.descEn}</p>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '48px' }}>
            <Link href="/contact" className="btn btn-dark">{isEs ? 'Contáctanos para Más Opciones' : 'Contact Us for More Options'} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
