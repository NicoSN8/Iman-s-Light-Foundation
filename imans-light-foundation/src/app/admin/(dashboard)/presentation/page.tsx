import { Presentation, ExternalLink, Download, Maximize } from 'lucide-react';
import SlideDeck from './SlideDeck';

/**
 * Staff-only slide deck, used by the CEO to present live from the site.
 *
 * It sits under admin/(dashboard) purely so the layout's single
 * requireAdmin() call protects it -- this page has nothing to do with
 * managing the site, it's a presenting tool. Do not link it from the
 * public nav.
 *
 * The slides are 84 self-hosted images driven by our own SlideDeck
 * viewer, NOT a Google Slides embed. That was the earlier approach and
 * it was wrong for the job: an embed's present button hands off to
 * Google's own player on Google's domain, so the talk stops being given
 * from this site. Self-hosting also means the deck still works if the
 * venue's network blocks docs.google.com, which school and municipal
 * networks routinely do.
 *
 * The tradeoff to know about: these images are a snapshot. Editing the
 * Google deck no longer changes what shows here -- someone has to
 * re-export and re-upload. That is a deliberate trade of
 * auto-freshness for reliability during a live talk.
 */

const SLIDES_ID = '1_s2DJHd77744RFNCwWX8MOiSVVLLbZw2H8xjvomSEIQ';
const EDIT_URL = `https://docs.google.com/presentation/d/${SLIDES_ID}/edit`;
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
          Press the <strong>fullscreen</strong> button at the bottom-right of the deck to present.
          Use the <strong>arrow keys</strong> or spacebar to move between slides, click the gold bar
          along the bottom to jump anywhere, and press <strong>Esc</strong> to come back out. On a
          phone or tablet, swipe left and right. This page is staff-only and is not linked anywhere
          on the public site.
        </p>
      </div>

      <SlideDeck />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '20px' }}>
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
        These 84 slides are hosted on our own server, so presenting works even if the venue&apos;s
        network blocks Google. Because they are a saved copy rather than a live link, edits made in
        Google Slides will not appear here on their own: after changing the deck, tell Nicolas so
        the slides can be re-exported. Snapshot taken {new Date('2026-08-22T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
      </p>
    </>
  );
}
