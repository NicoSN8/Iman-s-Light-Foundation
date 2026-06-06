'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';
import styles from './Footer.module.css';

const t = {
  en: {
    tagline: 'Preventing Tragedies, Illuminating Futures.',
    mission: 'Iman\'s Light Foundation educates communities on the perils of Fentanyl, advocates for legislative change, and provides mental health resources to those affected by addiction.',
    quickLinks: 'Quick Links',
    programs: 'Programs',
    connect: 'Connect',
    home: 'Home',
    about: 'About Us',
    events: 'Events',
    gallery: 'Gallery',
    donate: 'Donate',
    contact: 'Contact',
    drugEd: 'Drug Education',
    mentalHealth: 'Mental Health',
    savingLives: 'Saving Lives',
    resources: 'Community Resources',
    getInvolved: 'Get Involved',
    phone: 'Phone',
    email: 'Email',
    ein: 'EIN',
    rights: '© 2026 Iman\'s Light Foundation. All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    charity: 'Registered 501(c)(3) Nonprofit',
  },
  es: {
    tagline: 'Previniendo Tragedias, Iluminando Futuros.',
    mission: 'La Fundación Iman\'s Light educa comunidades sobre los peligros del Fentanilo, aboga por cambios legislativos y proporciona recursos de salud mental a los afectados por la adicción.',
    quickLinks: 'Enlaces Rápidos',
    programs: 'Programas',
    connect: 'Conecta',
    home: 'Inicio',
    about: 'Acerca de',
    events: 'Eventos',
    gallery: 'Galería',
    donate: 'Donar',
    contact: 'Contacto',
    drugEd: 'Educación sobre Drogas',
    mentalHealth: 'Salud Mental',
    savingLives: 'Salvando Vidas',
    resources: 'Recursos Comunitarios',
    getInvolved: 'Participa',
    phone: 'Teléfono',
    email: 'Correo',
    ein: 'EIN',
    rights: '© 2026 Federación / Fundación Iman\'s Light. Todos los derechos reservados.',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Uso',
    charity: 'Organización sin fines de lucro 501(c)(3)',
  }
};

export default function Footer() {
  const { lang } = useContext(LanguageContext);
  const txt = t[lang];

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand Column */}
            <div className={styles.brand}>
              <Link href="/" className={styles.logo}>
                <Image src="/logo.jpg" alt="Iman's Light Foundation" width={64} height={64} className={styles.logoImg} />
                <div>
                  <div className={styles.logoMain}>Iman's Light</div>
                  <div className={styles.logoSub}>Foundation</div>
                </div>
              </Link>
              <p className={styles.tagline}>&ldquo;{txt.tagline}&rdquo;</p>
              <p className={styles.missionText}>{txt.mission}</p>
              <div className={styles.socials}>
                <a href="https://www.instagram.com/imanslightfoundation" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://www.facebook.com/imanslightfoundation" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialBtn}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
              <div style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px' }}>
                <p style={{ color: 'var(--gold)', fontFamily: 'Playfair Display', fontStyle: 'italic', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                  &ldquo;Haec Facimus Ut Alii Vivant&rdquo;
                </p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', margin: '2px 0 0' }}>
                  {lang === 'en' ? '(We do this so that others may live)' : '(Hacemos esto para que otros vivan)'}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{txt.quickLinks}</h4>
              <ul className={styles.linkList}>
                <li><Link href="/">{txt.home}</Link></li>
                <li><Link href="/about">{txt.about}</Link></li>
                <li><Link href="/events">{txt.events}</Link></li>
                <li><Link href="/gallery">{txt.gallery}</Link></li>
                <li><Link href="/get-involved">{txt.getInvolved}</Link></li>
                <li><Link href="/contact">{txt.contact}</Link></li>
              </ul>
            </div>

            {/* Programs */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{txt.programs}</h4>
              <ul className={styles.linkList}>
                <li><Link href="/programs#education">{txt.drugEd}</Link></li>
                <li><Link href="/programs#mental-health">{txt.mentalHealth}</Link></li>
                <li><Link href="/programs#saving-lives">{txt.savingLives}</Link></li>
                <li><Link href="/programs#resources">{txt.resources}</Link></li>
                <li><Link href="/donate">{txt.donate}</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.col}>
              <h4 className={styles.colTitle}>{txt.connect}</h4>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>{txt.phone}</span>
                  <a href="tel:+17868533347">+1 (786) 853-3347</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>{txt.email}</span>
                  <a href="mailto:imanslightfoundation@gmail.com" style={{ display: 'block', marginBottom: '4px' }}>imanslightfoundation@gmail.com</a>
                  <a href="mailto:MRrodriguez@Imanslightfoundation.org" style={{ display: 'block' }}>MRrodriguez@Imanslightfoundation.org</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactLabel}>{txt.ein}</span>
                  <span>93-4410846</span>
                </div>
              </div>
              <Link href="/donate" className="btn btn-primary" style={{ marginTop: '24px', fontSize: '0.875rem', padding: '12px 24px' }}>
                {txt.donate} →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>{txt.rights}</p>
            <div className={styles.bottomLinks}>
              <span className={styles.charityBadge}>{txt.charity}</span>
              <Link href="/privacy">{txt.privacy}</Link>
              <Link href="/terms">{txt.terms}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
