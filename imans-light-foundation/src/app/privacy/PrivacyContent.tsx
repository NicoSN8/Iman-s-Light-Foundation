'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';

const LAST_UPDATED = { en: 'August 8, 2026', es: '8 de agosto de 2026' };

export default function PrivacyContent() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Política de Privacidad' : 'Privacy Policy'}</span>
          </div>
          <span className="section-label">{isEs ? 'Legal' : 'Legal'}</span>
          <h1>{isEs ? 'Política de Privacidad' : 'Privacy Policy'}</h1>
          <p>{isEs ? `Última actualización: ${LAST_UPDATED.es}` : `Last updated: ${LAST_UPDATED.en}`}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {isEs ? (
              <>
                <p style={{ marginBottom: '24px' }}>
                  Iman&apos;s Light Foundation (&quot;nosotros&quot;, &quot;nuestro&quot;) opera este sitio web. Esta política describe qué información
                  se recopila cuando visitas nuestro sitio y cómo se utiliza. Somos una organización sin fines de lucro 501(c)(3)
                  registrada (EIN 93-4410846) y no vendemos ni alquilamos información personal a nadie.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Información que recopilamos</h2>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Formulario de contacto:</strong> cuando envías nuestro formulario de contacto, tu nombre, correo
                  electrónico, teléfono (si lo proporcionas), asunto y mensaje se envían a través de nuestro sitio web y se
                  guardan en nuestra base de datos para que nuestro equipo pueda leer tu mensaje y responderte. También
                  recibimos una notificación por correo electrónico cuando llega un mensaje nuevo.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Boletín de noticias:</strong> este formulario abre tu propia aplicación de correo electrónico con un
                  mensaje prellenado dirigido a nosotros. Lo que escribas se envía directamente desde tu cuenta de correo.
                  Nuestro sitio web no recibe, transmite ni almacena esa información en ningún servidor nuestro.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Preferencia de idioma:</strong> guardamos tu elección de idioma (inglés o español) en el almacenamiento
                  local de tu navegador para que el sitio recuerde tu preferencia. Esta información permanece en tu dispositivo y
                  nunca se envía a nosotros.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Fuentes de Google:</strong> este sitio carga tipografías desde Google Fonts. Al visitar el sitio, tu
                  navegador realiza una solicitud a los servidores de Google para obtener esas fuentes.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>No usamos cookies de seguimiento ni análisis de terceros</strong> (como Google Analytics) en este momento.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Donaciones</h2>
                <p style={{ marginBottom: '16px' }}>
                  El botón &quot;Donar&quot; te dirige a un procesador de pagos externo para completar tu donación. Nosotros no
                  recibimos ni almacenamos tu información de tarjeta de crédito o cuenta bancaria. Esa información es manejada
                  directamente por el procesador de pagos conforme a su propia política de privacidad.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Menores de edad</h2>
                <p style={{ marginBottom: '16px' }}>
                  Nuestro sitio web no está dirigido a niños menores de 13 años y no recopilamos intencionalmente información
                  personal de menores a través de este sitio.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Tus derechos</h2>
                <p style={{ marginBottom: '16px' }}>
                  Los mensajes enviados por nuestro formulario de contacto se guardan en nuestra base de datos para que nuestro
                  equipo pueda responderte. Puedes pedirnos que accedamos, corrijamos o eliminemos esa información en cualquier
                  momento escribiéndonos a la dirección abajo. Si nos contactaste directamente por correo electrónico o teléfono,
                  también puedes pedirnos que eliminemos esa correspondencia de la misma forma.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Cambios a esta política</h2>
                <p style={{ marginBottom: '16px' }}>
                  Podemos actualizar esta política a medida que el sitio evolucione (por ejemplo, si en el futuro procesamos
                  donaciones o venta de boletos directamente en el sitio). Publicaremos cualquier cambio en esta página con una
                  nueva fecha de &quot;última actualización&quot;.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Contáctanos</h2>
                <p>
                  Si tienes preguntas sobre esta política de privacidad, contáctanos en{' '}
                  <a href="mailto:imanslightfoundation@gmail.com">imanslightfoundation@gmail.com</a> o al{' '}
                  <a href="tel:+17868533347">+1 (786) 853-3347</a>.
                </p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '24px' }}>
                  Iman&apos;s Light Foundation (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) operates this website. This policy
                  describes what information is collected when you visit our site and how it is used. We are a registered
                  501(c)(3) nonprofit organization (EIN 93-4410846) and we do not sell or rent personal information to anyone.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Information We Collect</h2>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Contact form:</strong> when you submit our contact form, your name, email, phone number (if you
                  provide one), subject, and message are sent through our website and saved in our database so our staff can
                  read and respond to you. We also get an email notification when a new message comes in.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Newsletter signup:</strong> this form opens your own email application with a pre-filled message
                  addressed to us. What you write is sent directly from your own email account. Our website does not receive,
                  transmit, or store that information on any server we control.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Language preference:</strong> we save your choice of language (English or Spanish) in your browser&apos;s
                  local storage so the site remembers your preference. This stays on your device and is never sent to us.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>Google Fonts:</strong> this site loads typefaces from Google Fonts. When you visit the site, your
                  browser makes a request to Google&apos;s servers to fetch those fonts.
                </p>
                <p style={{ marginBottom: '16px' }}>
                  <strong>We do not use tracking cookies or third-party analytics</strong> (such as Google Analytics) at this time.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Donations</h2>
                <p style={{ marginBottom: '16px' }}>
                  The &quot;Donate&quot; button directs you to an outside payment processor to complete your donation. We do not
                  receive or store your credit card or bank account information. That information is handled directly by the
                  payment processor under its own privacy policy.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Children&apos;s Privacy</h2>
                <p style={{ marginBottom: '16px' }}>
                  Our website is not directed at children under 13, and we do not knowingly collect personal information from
                  children through this site.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Your Rights</h2>
                <p style={{ marginBottom: '16px' }}>
                  Contact form submissions are stored in our database so our staff can respond to you. You can ask us to access,
                  correct, or delete that information at any time by writing to the address below. If you contacted us directly
                  by email or phone instead, you can ask us to delete that correspondence the same way.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Changes to This Policy</h2>
                <p style={{ marginBottom: '16px' }}>
                  We may update this policy as the site evolves (for example, if we begin processing donations or ticket sales
                  directly on the site). We will post any changes on this page with a new &quot;last updated&quot; date.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Contact Us</h2>
                <p>
                  If you have questions about this privacy policy, contact us at{' '}
                  <a href="mailto:imanslightfoundation@gmail.com">imanslightfoundation@gmail.com</a> or at{' '}
                  <a href="tel:+17868533347">+1 (786) 853-3347</a>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
