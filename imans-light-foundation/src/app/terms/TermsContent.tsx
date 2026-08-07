'use client';

import { useContext } from 'react';
import Link from 'next/link';
import { LanguageContext } from '@/context/LanguageContext';

const LAST_UPDATED = { en: 'August 7, 2026', es: '7 de agosto de 2026' };

export default function TermsContent() {
  const { lang } = useContext(LanguageContext);
  const isEs = lang === 'es';

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{isEs ? 'Términos de Uso' : 'Terms of Use'}</span>
          </div>
          <span className="section-label">{isEs ? 'Legal' : 'Legal'}</span>
          <h1>{isEs ? 'Términos de Uso' : 'Terms of Use'}</h1>
          <p>{isEs ? `Última actualización: ${LAST_UPDATED.es}` : `Last updated: ${LAST_UPDATED.en}`}</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {isEs ? (
              <>
                <p style={{ marginBottom: '24px' }}>
                  Estos Términos de Uso rigen tu acceso y uso del sitio web de Iman&apos;s Light Foundation (&quot;el sitio&quot;).
                  Al usar el sitio, aceptas estos términos. Si no estás de acuerdo, por favor no uses el sitio.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Sobre nosotros</h2>
                <p style={{ marginBottom: '16px' }}>
                  Iman&apos;s Light Foundation es una organización sin fines de lucro 501(c)(3) registrada (EIN 93-4410846) con
                  sede en el sur de la Florida, dedicada a la educación sobre el fentanilo y las drogas, talleres de salud mental,
                  incidencia legislativa y apoyo a familias afectadas.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Uso del contenido</h2>
                <p style={{ marginBottom: '16px' }}>
                  El contenido de este sitio (textos, imágenes, logotipos) se proporciona con fines informativos sobre nuestra
                  misión y programas. Puedes verlo y compartirlo con fines no comerciales y con la debida atribución. No puedes
                  reproducirlo con fines comerciales sin nuestro permiso por escrito.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>No es asesoramiento médico ni legal</h2>
                <p style={{ marginBottom: '16px' }}>
                  La información educativa sobre el fentanilo, las drogas y la salud mental que se encuentra en este sitio tiene
                  fines informativos y de prevención únicamente. No sustituye el consejo médico, psicológico o legal profesional.
                  Si tú o alguien que conoces está en crisis, llama al 988 (Línea de Crisis) o al 911 de inmediato.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Donaciones</h2>
                <p style={{ marginBottom: '16px' }}>
                  Las donaciones realizadas a través de nuestro sitio se procesan mediante un procesador de pagos externo y están
                  sujetas a los términos de ese procesador. Las donaciones a Iman&apos;s Light Foundation, una organización
                  501(c)(3), pueden ser deducibles de impuestos según lo permita la ley; consulta a tu asesor fiscal.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Enlaces a terceros</h2>
                <p style={{ marginBottom: '16px' }}>
                  Este sitio puede enlazar a sitios web de terceros (por ejemplo, redes sociales o un procesador de pagos). No
                  somos responsables del contenido o las prácticas de privacidad de esos sitios externos.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Sin garantías</h2>
                <p style={{ marginBottom: '16px' }}>
                  Este sitio se proporciona &quot;tal cual&quot;, sin garantías de ningún tipo. Nos esforzamos por mantener la
                  información precisa y actualizada, pero no garantizamos que el sitio esté libre de errores en todo momento.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Cambios a estos términos</h2>
                <p style={{ marginBottom: '16px' }}>
                  Podemos actualizar estos términos ocasionalmente. Publicaremos cualquier cambio en esta página con una nueva
                  fecha de &quot;última actualización&quot;.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Contáctanos</h2>
                <p>
                  Si tienes preguntas sobre estos términos, contáctanos en{' '}
                  <a href="mailto:imanslightfoundation@gmail.com">imanslightfoundation@gmail.com</a> o al{' '}
                  <a href="tel:+17868533347">+1 (786) 853-3347</a>.
                </p>
              </>
            ) : (
              <>
                <p style={{ marginBottom: '24px' }}>
                  These Terms of Use govern your access to and use of the Iman&apos;s Light Foundation website (&quot;the
                  site&quot;). By using the site, you agree to these terms. If you do not agree, please do not use the site.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>About Us</h2>
                <p style={{ marginBottom: '16px' }}>
                  Iman&apos;s Light Foundation is a registered 501(c)(3) nonprofit organization (EIN 93-4410846) based in South
                  Florida, dedicated to fentanyl and drug awareness education, mental health workshops, legislative advocacy, and
                  support for affected families.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Use of Content</h2>
                <p style={{ marginBottom: '16px' }}>
                  Content on this site (text, images, logos) is provided for informational purposes about our mission and
                  programs. You may view and share it for non-commercial purposes with proper attribution. You may not reproduce
                  it for commercial purposes without our written permission.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Not Medical or Legal Advice</h2>
                <p style={{ marginBottom: '16px' }}>
                  The educational information about fentanyl, drugs, and mental health found on this site is for informational
                  and prevention purposes only. It is not a substitute for professional medical, psychological, or legal advice.
                  If you or someone you know is in crisis, call 988 (Crisis Lifeline) or 911 immediately.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Donations</h2>
                <p style={{ marginBottom: '16px' }}>
                  Donations made through our site are processed by an outside payment processor and are subject to that
                  processor&apos;s terms. Donations to Iman&apos;s Light Foundation, a 501(c)(3) organization, may be
                  tax-deductible as allowed by law; please consult your tax advisor.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Third-Party Links</h2>
                <p style={{ marginBottom: '16px' }}>
                  This site may link to third-party websites (for example, social media or a payment processor). We are not
                  responsible for the content or privacy practices of those outside sites.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>No Warranties</h2>
                <p style={{ marginBottom: '16px' }}>
                  This site is provided &quot;as is,&quot; without warranties of any kind. We strive to keep information accurate
                  and up to date, but we do not guarantee the site will be error-free at all times.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Changes to These Terms</h2>
                <p style={{ marginBottom: '16px' }}>
                  We may update these terms from time to time. We will post any changes on this page with a new &quot;last
                  updated&quot; date.
                </p>

                <h2 style={{ marginTop: '40px', marginBottom: '16px' }}>Contact Us</h2>
                <p>
                  If you have questions about these terms, contact us at{' '}
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
