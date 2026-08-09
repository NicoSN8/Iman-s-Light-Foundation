'use client';
import { useContext, useState, ReactNode } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { Leaf, Mail, RefreshCcw, Building2, GraduationCap, Heart, ShieldAlert } from 'lucide-react';
import styles from './donate.module.css';
import { FEATURED_SPONSORS, COMMUNITY_SPONSORS, TEXT_ONLY_SPONSORS } from '@/data/sponsors';
import SponsorGrid from '@/components/SponsorGrid';
import TextSponsorPills from '@/components/TextSponsorPills';

interface Tier {
  id: string;
  name: string;
  amount: string;
  icon: ReactNode;
  featured?: boolean;
  descEn: string;
  descEs: string;
}

const tiers: { en: Tier[]; es: Tier[] } = {
  en: [
      {
        id: 'workshop',
        name: 'Fund a Workshop',
        amount: '$300',
        icon: <GraduationCap size={32} color="var(--gold)" />,
        descEn: 'Bring one full drug-prevention workshop to the school or college of your choice — a real conversation that could save a life.',
        descEs: 'Lleva un taller completo de prevención de drogas a la escuela o universidad de tu elección — una conversación real que podría salvar una vida.'
      },
      {
        id: 'program',
        name: 'Fund a Program',
        amount: '$1,000',
        icon: <Heart size={32} color="var(--gold-light)" />,
        featured: true,
        descEn: 'Fund a complete prevention program at the school or college of your choice — an ongoing series that goes far beyond a single visit.',
        descEs: 'Financia un programa completo de prevención en la escuela o universidad de tu elección — una serie continua que va mucho más allá de una sola visita.'
      },
      {
        id: 'champion',
        name: 'Champion Sponsor',
        amount: '$2,500',
        icon: <ShieldAlert size={32} color="var(--gold)" />,
        descEn: 'Extend our reach further — help bring workshops and programs to more classrooms and more students across South Florida this year.',
        descEs: 'Amplía nuestro alcance — ayuda a llevar talleres y programas a más aulas y más estudiantes en el sur de la Florida este año.'
      },
      {
        id: 'founding',
        name: 'Founding Partner',
        amount: '$5,000',
        icon: <Building2 size={32} color="var(--gold)" />,
        descEn: "Stand behind this year's entire mission — funding the workshops, programs, and family support that carry us through to the next Gala.",
        descEs: 'Respalda toda la misión de este año — financiando los talleres, programas y apoyo familiar que nos llevan hasta la próxima Gala.'
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
        name: 'Financia un Taller',
        amount: '$300',
        icon: <GraduationCap size={32} color="var(--gold)" />,
        descEn: 'Bring one full drug-prevention workshop to the school or college of your choice — a real conversation that could save a life.',
        descEs: 'Lleva un taller completo de prevención de drogas a la escuela o universidad de tu elección — una conversación real que podría salvar una vida.'
      },
      {
        id: 'program',
        name: 'Financia un Programa',
        amount: '$1,000',
        icon: <Heart size={32} color="var(--gold-light)" />,
        featured: true,
        descEn: 'Fund a complete prevention program at the school or college of your choice — an ongoing series that goes far beyond a single visit.',
        descEs: 'Financia un programa completo de prevención en la escuela o universidad de tu elección — una serie continua que va mucho más allá de una sola visita.'
      },
      {
        id: 'champion',
        name: 'Patrocinador Campeón',
        amount: '$2,500',
        icon: <ShieldAlert size={32} color="var(--gold)" />,
        descEn: 'Extend our reach further — help bring workshops and programs to more classrooms and more students across South Florida this year.',
        descEs: 'Amplía nuestro alcance — ayuda a llevar talleres y programas a más aulas y más estudiantes en el sur de la Florida este año.'
      },
      {
        id: 'founding',
        name: 'Socio Fundador',
        amount: '$5,000',
        icon: <Building2 size={32} color="var(--gold)" />,
        descEn: "Stand behind this year's entire mission — funding the workshops, programs, and family support that carry us through to the next Gala.",
        descEs: 'Respalda toda la misión de este año — financiando los talleres, programas y apoyo familiar que nos llevan hasta la próxima Gala.'
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
  const [institution, setInstitution] = useState('');

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Donar' : 'Donate'}</span>
          </div>
          <span className="section-label">{isEs ? 'Impulsa Nuestra Misión' : 'Fuel Our Mission'}</span>
          <h1>{isEs ? 'Tu Regalo Salva Vidas' : 'Your Gift Saves Lives'}</h1>
          <p>
            {isEs
              ? 'Cada dólar que das financia un taller impartido, una familia asesorada, una vida salvada. Aquí es donde tu generosidad se convierte en impacto real y medible en el sur de la Florida.'
              : 'Every dollar you give funds a workshop taught, a family counseled, a life saved. This is where your generosity becomes real, measurable impact across South Florida.'}
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label">{isEs ? 'Opciones de Financiamiento' : 'Funding Packages'}</span>
            <h2 className="section-title">{isEs ? 'Nuestros Paquetes de Impacto' : 'How You Can Support'}</h2>
            <div className="gold-divider center" />
            <p className="section-subtitle">{isEs ? 'Elige un nivel que resuene con tu deseo de generar un cambio duradero en el sur de Florida.' : 'Choose a level that matches your commitment to saving young lives and supporting families.'}</p>
          </div>

          <div className={`form-group ${styles.institutionField}`}>
            <label htmlFor="donate-institution">
              {isEs
                ? '¿Quieres que tu donación apoye una escuela o universidad específica en Miami-Dade o Broward?'
                : 'Want your gift to support a specific school or college in Miami-Dade or Broward?'}
            </label>
            <input
              id="donate-institution"
              type="text"
              placeholder={isEs ? 'Nombre de la escuela o universidad (opcional)' : 'School or college name (optional)'}
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
            />
            <p className={styles.institutionHint}>
              {isEs
                ? 'Déjalo en blanco para apoyar donde más se necesite.'
                : 'Leave it blank to support wherever the need is greatest.'}
            </p>
          </div>

          <div className={styles.tiersGrid}>
            {tierList.map((tier, i) => {
              const designated = institution.trim();
              const amountLabel = tier.amount !== 'Custom' && tier.amount !== 'Personalizado' ? tier.amount : '';
              const giveLabel = designated
                ? `${isEs ? 'Donar' : 'Give'} ${amountLabel} ${isEs ? 'para' : 'for'} ${designated}`
                : `${isEs ? 'Donar' : 'Give'} ${amountLabel}`;

              return (
                <div key={i} className={`${styles.tierCard} ${tier.featured ? styles.tierFeatured : ''}`}>
                  <div className={styles.tierIcon}>{tier.icon}</div>
                  <div className={styles.tierAmount}>{tier.amount}</div>
                  <div className={styles.tierLabel}>{tier.name}</div>
                  <p className={styles.tierDesc}>{isEs ? tier.descEs : tier.descEn}</p>
                  {designated ? (
                    <Link
                      href={`/contact?donationTier=${encodeURIComponent(tier.name)}&institution=${encodeURIComponent(designated)}`}
                      className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'}`}
                      style={{ marginTop: 'auto', fontSize: '0.875rem', padding: '12px 22px', textAlign: 'center' }}
                    >
                      {giveLabel} →
                    </Link>
                  ) : (
                    <a
                      href="https://www.imanslightfoundation.org/donations"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'}`}
                      style={{ marginTop: 'auto', fontSize: '0.875rem', padding: '12px 22px', textAlign: 'center' }}
                    >
                      {giveLabel} →
                    </a>
                  )}
                </div>
              );
            })}
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
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '48px', alignItems: 'center' }}>
            <SponsorGrid items={FEATURED_SPONSORS} />

            {/* Community Sponsors */}
            <div style={{ width: '100%' }}>
              <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>
                {isEs ? 'PATROCINADORES DE APOYO Y EVENTOS' : 'SUPPORTING & EVENT SPONSOR LOGOS'}
              </h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', marginBottom: '24px', maxWidth: '600px', margin: '0 auto' }}>
                {isEs
                  ? 'Agradecemos profundamente a todos nuestros colaboradores que apoyan directamente a nuestra comunidad con su marca y compromiso.'
                  : 'We are deeply grateful to all our partners who directly support our community with their brand and commitment.'}
              </p>

              <SponsorGrid items={COMMUNITY_SPONSORS} />

              <h4 style={{ color: 'var(--gold)', marginBottom: '16px', fontSize: '1.1rem', fontFamily: 'Playfair Display', marginTop: '32px' }}>
                {isEs ? 'OTROS COLABORADORES Y AMIGOS' : 'OTHER SPONSORS & ADVOCATES'}
              </h4>
              <TextSponsorPills items={TEXT_ONLY_SPONSORS} />
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
