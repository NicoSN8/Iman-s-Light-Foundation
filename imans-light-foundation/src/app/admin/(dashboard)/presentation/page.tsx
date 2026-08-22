import { Presentation, ExternalLink, Download, Maximize } from 'lucide-react';

/**
 * Staff-only slide deck, used by the CEO to present live from the site.
 *
 * It sits under admin/(dashboard) purely so the layout's single
 * requireAdmin() call protects it -- this page has nothing to do with
 * managing the site, it's a presenting tool. Do not link it from the
 * public nav.
 *
 * The deck renders as a live Google Slides embed rather than a static
 * copy, so whatever the CEO edits in Google is what shows here, with no
 * redeploy needed. The self-hosted PDF below is a deliberate backup for
 * one specific failure case that actually happens: school and municipal
 * networks that block docs.google.com but not the rest of the web. In
 * that situation the embed goes blank while this page still loads, and
 * the PDF is the way to still give the talk.
 */

const SLIDES_ID = '1_s2DJHd77744RFNCwWX8MOiSVVLLbZw2H8xjvomSEIQ';
const EMBED_URL = `https://docs.google.com/presentation/d/${SLIDES_ID}/embed?start=false&loop=false&delayms=3000&rm=minimal`;
const EDIT_URL = `https://docs.google.com/presentation/d/${SLIDES_ID}/edit`;
const PRESENT_URL = `https://docs.google.com/presentation/d/${SLIDES_ID}/present`;
const PDF_BACKUP_URL =
  'https://ic5hghfat7q3aql8.public.blob.vercel-storage.com/presentations/truth-about-drugs-84-slides-f0v4VFOS3JtpG8yIOc5TIpyZ1aNjCb.pdf';

const buttonBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '10px 18px',
  borderRadius: '8px',
  fontSize: '0.9rem',
  fontWeight: 600,
  textDecoration: 'none',
};

export default function AdminPresentationPage() {
  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Presentation size={26} style={{ color: 'var(--gold)' }} />
          Presentation
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)' }}>
          The Truth About Drugs: Cannabis, Vaping, Fentanyl, Addiction · 84 slides
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '10px',
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '10px',
          padding: '14px 18px',
          marginBottom: '24px',
        }}
      >
        <Maximize size={18} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
          To present, click the slides below and use the <strong>fullscreen</strong> button in the
          player&apos;s bottom-right corner. Arrow keys move between slides. This page is
          staff-only and is not linked anywhere on the public site.
        </p>
      </div>

      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          background: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <iframe
          src={EMBED_URL}
          title="Iman's Light Foundation: The Truth About Drugs"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
        <a
          href={PRESENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...buttonBase, background: 'var(--gradient-gold)', color: 'var(--navy)' }}
        >
          <Maximize size={16} /> Open in presenter mode
        </a>
        <a
          href={EDIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonBase,
            background: 'transparent',
            color: 'var(--gold-light)',
            border: '1px solid rgba(201,168,76,0.4)',
          }}
        >
          <ExternalLink size={16} /> Edit in Google Slides
        </a>
        <a
          href={PDF_BACKUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...buttonBase,
            background: 'transparent',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Download size={16} /> Download PDF backup
        </a>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginTop: '16px', lineHeight: 1.6 }}>
        The slides above are live from Google, so any edit made there appears here immediately.
        The PDF is a snapshot saved on {new Date('2026-08-22T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} —
        keep it for venues whose network blocks Google Docs, and re-download it after major edits.
      </p>
    </>
  );
}
