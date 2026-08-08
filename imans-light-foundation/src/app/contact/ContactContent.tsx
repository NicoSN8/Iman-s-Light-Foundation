'use client';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';
import { CheckCircle2, Phone, Mail, Clipboard, Siren } from 'lucide-react';
import styles from './contact.module.css';

const SUBJECT_LABELS: Record<string, { en: string; es: string }> = {
  general: { en: 'General Inquiry', es: 'Consulta General' },
  workshop: { en: 'Request a Workshop', es: 'Solicitar un Taller' },
  volunteer: { en: 'Volunteer', es: 'Ser Voluntario' },
  partner: { en: 'Partnerships / Sponsorships', es: 'Alianzas / Patrocinios' },
  media: { en: 'Press / Media', es: 'Prensa / Medios' },
  support: { en: 'I Need Support', es: 'Necesito Apoyo' },
};

export default function ContactPage() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = (data.get('name') as string)?.trim() ?? '';
    const email = (data.get('email') as string)?.trim() ?? '';
    const phone = (data.get('phone') as string)?.trim() ?? '';
    const subjectKey = (data.get('subject') as string) ?? '';
    const message = (data.get('message') as string)?.trim() ?? '';
    const website = (data.get('website') as string) ?? '';

    // Store the message so it shows up in /admin later. Fire-and-forget: a
    // slow or failed save should never block the mailto fallback below,
    // which is still the only thing that notifies anyone today.
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject: subjectKey, message, lang, website }),
    }).catch(() => {});

    const subjectLabel = SUBJECT_LABELS[subjectKey]?.[lang] ?? subjectKey;
    const mailSubject = `${isEs ? 'Contacto desde el sitio web' : 'Website Contact'}: ${subjectLabel}`;
    const bodyLines = [
      `${isEs ? 'Nombre' : 'Name'}: ${name}`,
      `${isEs ? 'Correo' : 'Email'}: ${email}`,
      phone ? `${isEs ? 'Teléfono' : 'Phone'}: ${phone}` : null,
      '',
      message,
    ].filter((line): line is string => line !== null).join('\n');

    window.location.href = `mailto:imanslightfoundation@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(bodyLines)}`;
    setSubmitted(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Contacto' : 'Contact'}</span>
          </div>
          <span className="section-label">{isEs ? 'Contacto' : 'Contact Us'}</span>
          <h1>{isEs ? 'Estamos Aquí Para Ayudar' : "We're Here to Help"}</h1>
          <p>{isEs ? 'Ya sea que tengas una pregunta, quieras invitarnos a hablar, o necesites apoyo, no dudes en comunicarte con nosotros.' : "Whether you have a question, want to invite us to speak, or need support, don't hesitate to reach out."}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ gap: '64px', alignItems: 'flex-start' }}>
            {/* Contact Form */}
            <div>
              <span className="section-label">{isEs ? 'Escríbenos' : 'Send a Message'}</span>
              <h2 className="section-title">{isEs ? 'Ponte en Contacto' : 'Get In Touch'}</h2>
              <div className="gold-divider" />

              {submitted ? (
                <div className={styles.successMsg}>
                  <div className={styles.successIcon}><CheckCircle2 size={48} /></div>
                  <h3>{isEs ? 'Abriendo tu Aplicación de Correo…' : 'Opening Your Email App…'}</h3>
                  <p>
                    {isEs
                      ? 'Tu mensaje ya está listo en tu aplicación de correo — solo presiona enviar. ¿No se abrió nada? Escríbenos directamente a '
                      : "Your message is ready in your email app — just hit send. Didn't anything open? Email us directly at "}
                    <a href="mailto:imanslightfoundation@gmail.com">imanslightfoundation@gmail.com</a>.
                  </p>
                  <button className="btn btn-dark" onClick={() => setSubmitted(false)} style={{ marginTop: '16px' }}>
                    {isEs ? 'Enviar Otro' : 'Send Another'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />
                  <div className={styles.formRow}>
                    <div className="form-group">
                      <label htmlFor="contact-name">{isEs ? 'Nombre Completo' : 'Full Name'} *</label>
                      <input type="text" id="contact-name" name="name" required placeholder={isEs ? 'Tu nombre' : 'Your name'} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contact-email">{isEs ? 'Correo Electrónico' : 'Email Address'} *</label>
                      <input type="email" id="contact-email" name="email" required placeholder={isEs ? 'tu@correo.com' : 'you@email.com'} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-phone">{isEs ? 'Teléfono' : 'Phone Number'}</label>
                    <input type="tel" id="contact-phone" name="phone" placeholder={isEs ? '(786) 000-0000' : '(786) 000-0000'} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">{isEs ? 'Asunto' : 'Subject'} *</label>
                    <select id="contact-subject" name="subject" required defaultValue="">
                      <option value="" disabled>{isEs ? 'Selecciona un asunto' : 'Select a subject'}</option>
                      <option value="general">{isEs ? 'Consulta General' : 'General Inquiry'}</option>
                      <option value="workshop">{isEs ? 'Solicitar un Taller' : 'Request a Workshop'}</option>
                      <option value="volunteer">{isEs ? 'Ser Voluntario' : 'Volunteer'}</option>
                      <option value="partner">{isEs ? 'Alianzas / Patrocinios' : 'Partnerships / Sponsorships'}</option>
                      <option value="media">{isEs ? 'Prensa / Medios' : 'Press / Media'}</option>
                      <option value="support">{isEs ? 'Necesito Apoyo' : 'I Need Support'}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">{isEs ? 'Mensaje' : 'Message'} *</label>
                    <textarea id="contact-message" name="message" required placeholder={isEs ? 'Cuéntanos cómo podemos ayudarte...' : 'Tell us how we can help...'} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px' }}>
                    {isEs ? 'Enviar Mensaje' : 'Send Message'} →
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <span className="section-label">{isEs ? 'Información de Contacto' : 'Contact Information'}</span>
              <h2 className="section-title">{isEs ? 'Contacta Directamente' : 'Reach Us Directly'}</h2>
              <div className="gold-divider" />
              <div className={styles.contactCards}>
                {/* Director Title Card */}
                <div className={styles.contactCard} style={{ background: 'rgba(201, 168, 76, 0.08)', border: '1px solid rgba(201, 168, 76, 0.25)' }}>
                  <div className={styles.contactCardIcon} style={{ color: 'var(--gold)' }}><CheckCircle2 /></div>
                  <div>
                    <div className={styles.contactCardLabel}>{isEs ? 'Dirección Ejecutiva' : 'Executive Leadership'}</div>
                    <div className={styles.contactCardValue} style={{ color: '#fff', fontWeight: 600 }}>
                      {isEs ? 'Dra.h.e. Mari Carmen Rodríguez, Fundadora y Directora Ejecutiva' : 'Dr.h.e. Mari Carmen Rodriguez, Founder and Executive Director'}
                    </div>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactCardIcon}><Phone /></div>
                  <div>
                    <div className={styles.contactCardLabel}>{isEs ? 'Teléfono' : 'Phone'}</div>
                    <a href="tel:+17868533347" className={styles.contactCardValue}>+1 (786) 853-3347</a>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactCardIcon}><Mail /></div>
                  <div>
                    <div className={styles.contactCardLabel}>{isEs ? 'Correo' : 'Email'}</div>
                    <a href="mailto:imanslightfoundation@gmail.com" className={styles.contactCardValue} style={{ display: 'block', marginBottom: '4px' }}>imanslightfoundation@gmail.com</a>
                    <a href="mailto:MRrodriguez@Imanslightfoundation.org" className={styles.contactCardValue} style={{ display: 'block' }}>MRrodriguez@Imanslightfoundation.org</a>
                  </div>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactCardIcon}><Clipboard /></div>
                  <div>
                    <div className={styles.contactCardLabel}>EIN</div>
                    <div className={styles.contactCardValue}>93-4410846</div>
                  </div>
                </div>
              </div>

              <div className={styles.socialSection}>
                <h4 className={styles.socialTitle}>{isEs ? 'Síguenos' : 'Follow Us'}</h4>
                <div className={styles.socialLinks}>
                  <a href="https://www.instagram.com/imanslightfoundation" target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.socialLink}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram
                  </a>
                  <a href="https://www.facebook.com/imanslightfoundation" target="_blank" rel="noopener noreferrer" className={`btn btn-outline ${styles.socialLink}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook
                  </a>
                </div>
              </div>

              <div className={styles.emergencyBox}>
                <div className={styles.emergencyIcon}><Siren size={32} /></div>
                <div>
                  <h4 className={styles.emergencyTitle}>{isEs ? '¿En Crisis?' : 'In Crisis?'}</h4>
                  <p className={styles.emergencyText}>
                    {isEs
                      ? 'Si tú o alguien que conoces está en crisis por sobredosis o salud mental, llama al 988 (Línea de Crisis) o 911 inmediatamente.'
                      : 'If you or someone you know is in a drug or mental health crisis, call 988 (Crisis Lifeline) or 911 immediately.'}
                  </p>
                  <a href="tel:988" className={styles.emergencyLink}><Phone size={16} /> {isEs ? 'Llamar al 988' : 'Call 988'}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
