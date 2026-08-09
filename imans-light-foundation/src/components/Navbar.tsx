'use client';

import { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LanguageContext } from '@/context/LanguageContext';
import { Phone, Mail } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  {
    href: '/about',
    labelEn: 'About Us',
    labelEs: 'Acerca de Nosotros',
    dropdown: [
      { href: '/about', labelEn: 'Our Story', labelEs: 'Nuestra Historia' },
      { href: '/about#mission', labelEn: 'Mission & Vision', labelEs: 'Misión y Visión' },
      { href: '/about#team', labelEn: 'Our Team', labelEs: 'Nuestro Equipo' },
      { href: '/about#partnerships', labelEn: 'Partners & Sponsors', labelEs: 'Socios y Patrocinadores' },
    ],
  },
  {
    href: '/programs',
    labelEn: 'What We Do',
    labelEs: 'Lo Que Hacemos',
    dropdown: [
      { href: '/programs', labelEn: 'Drug Education', labelEs: 'Educación sobre Drogas' },
      { href: '/saving-lives', labelEn: 'Saving Lives', labelEs: 'Salvando Vidas' },
      { href: '/data-metrics', labelEn: 'Data & Metrics', labelEs: 'Datos y Métricas' },
    ],
  },
  {
    href: '/events',
    labelEn: 'Media & Events',
    labelEs: 'Medios y Eventos',
    dropdown: [
      { href: '/events', labelEn: 'Events Calendar', labelEs: 'Calendario de Eventos' },
      { href: '/gallery', labelEn: 'Photo Gallery', labelEs: 'Galería de Fotos' },
    ],
  },
  {
    href: '/donate',
    labelEn: 'Support & Giving',
    labelEs: 'Apoyo y Donaciones',
    dropdown: [
      { href: '/donate', labelEn: 'Donate Now', labelEs: 'Donar Ahora' },
      { href: '/get-involved', labelEn: 'Volunteer', labelEs: 'Ser Voluntario' },
      { href: '/contact', labelEn: 'Contact Us', labelEs: 'Contáctanos' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang } = useContext(LanguageContext);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const wasMobileOpen = useRef(false);
  const pathname = usePathname();

  // Link doesn't navigate (and does nothing visible) when its href matches
  // the page you're already on — scroll to top instead so clicking the
  // current tab always does something.
  const scrollToTopIfSamePage = (href: string) => (e: React.MouseEvent) => {
    if (href === pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      wasMobileOpen.current = true;
      mobileMenuRef.current?.querySelector<HTMLElement>('a, button')?.focus();
    } else if (wasMobileOpen.current) {
      wasMobileOpen.current = false;
      hamburgerRef.current?.focus();
    }
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* Top Utility Bar */}
      <div className={`${styles.topBar} ${scrolled ? styles.topBarHidden : ''}`}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarLeft}>
            <a href="tel:988" className={styles.crisisText}>
              <Phone size={12} /> Need Help? Call 988 Suicide & Crisis Lifeline
            </a>
          </div>
          <div className={styles.topBarRight} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="https://www.instagram.com/imanslightfoundation" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/imanslightfoundation" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'var(--white)', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseOver={(e) => e.currentTarget.style.opacity = '1'} onMouseOut={(e) => e.currentTarget.style.opacity = '0.8'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
            <Link href="/contact" className={styles.topLink}>
              <Mail size={12} /> {lang === 'en' ? 'Contact Us' : 'Contáctanos'}
            </Link>
            <div className={styles.topLangWrapper}>
              <button
                className={lang === 'en' ? styles.activeLangSmall : ''}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <span className={styles.langDivider}>|</span>
              <button
                className={lang === 'es' ? styles.activeLangSmall : ''}
                onClick={() => setLang('es')}
              >
                ES
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link
            href="/"
            className={styles.logo}
            onClick={(e) => { setMobileOpen(false); scrollToTopIfSamePage('/')(e); }}
          >
            <Image src="/logo.jpg" alt="Iman's Light Foundation" width={56} height={56} className={styles.logoImg} />
            <span className={styles.logoText}>
              <span className={styles.logoMain}>Iman&apos;s Light</span>
              <span className={styles.logoSub}>Foundation</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.desktopLinks}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink} onClick={scrollToTopIfSamePage('/')}>
                {lang === 'en' ? 'Home' : 'Inicio'}
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/gala" className={styles.galaLink} onClick={scrollToTopIfSamePage('/gala')}>
                ✦ {lang === 'en' ? '3rd Annual Gala' : '3ra Gala Anual'}
              </Link>
            </li>
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={styles.navItem}
              >
                <Link href={link.href} className={styles.navLink} onClick={scrollToTopIfSamePage(link.href)}>
                  {lang === 'en' ? link.labelEn : link.labelEs}
                  {link.dropdown && <span className={styles.chevron}>▾</span>}
                </Link>
                {link.dropdown && (
                  <div className={styles.dropdown}>
                    {link.dropdown.map((item) => (
                      <Link key={item.href} href={item.href} className={styles.dropdownItem}>
                        {lang === 'en' ? item.labelEn : item.labelEs}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right side Donate CTA */}
          <div className={styles.controls}>
            <div className={styles.navLangWrapper} aria-label="Language">
              <button
                className={lang === 'en' ? styles.navLangActive : ''}
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
              >
                EN
              </button>
              <span className={styles.navLangDivider}>|</span>
              <button
                className={lang === 'es' ? styles.navLangActive : ''}
                onClick={() => setLang('es')}
                aria-pressed={lang === 'es'}
              >
                ES
              </button>
            </div>
            <Link href="/donate" className={`btn btn-primary ${styles.donateBtn}`} onClick={scrollToTopIfSamePage('/donate')}>
              {lang === 'en' ? 'Donate' : 'Donar Ahora'}
            </Link>

            {/* Mobile Hamburger */}
            <button
              ref={hamburgerRef}
              className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div ref={mobileMenuRef} className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
          <div className={styles.mobileInner}>
            <Link
              href="/"
              className={styles.mobileLink}
              onClick={(e) => { setMobileOpen(false); scrollToTopIfSamePage('/')(e); }}
            >
              {lang === 'en' ? 'Home' : 'Inicio'}
            </Link>
            <Link
              href="/gala"
              className={styles.mobileGalaLink}
              onClick={(e) => { setMobileOpen(false); scrollToTopIfSamePage('/gala')(e); }}
            >
              {lang === 'en' ? '3rd Annual Gala' : '3ra Gala Anual'}
              <span className={styles.mobileGalaBadge}>{lang === 'en' ? 'BIG NIGHT' : 'GRAN NOCHE'}</span>
            </Link>
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={(e) => { setMobileOpen(false); scrollToTopIfSamePage(link.href)(e); }}
                >
                  {lang === 'en' ? link.labelEn : link.labelEs}
                </Link>
                {link.dropdown && (
                  <div className={styles.mobileDropdown}>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.mobileSubLink}
                        onClick={() => setMobileOpen(false)}
                      >
                        {lang === 'en' ? item.labelEn : item.labelEs}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className={styles.mobileLang}>
              <button className={lang === 'en' ? styles.activeLang : ''} onClick={() => setLang('en')}>English</button>
              <button className={lang === 'es' ? styles.activeLang : ''} onClick={() => setLang('es')}>Español</button>
            </div>
            <Link
              href="/donate"
              className="btn btn-primary"
              onClick={(e) => { setMobileOpen(false); scrollToTopIfSamePage('/donate')(e); }}
            >
              {lang === 'en' ? 'Donate' : 'Donar Ahora'}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
