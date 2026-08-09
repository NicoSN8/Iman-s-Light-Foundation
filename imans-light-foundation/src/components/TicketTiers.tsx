import Link from 'next/link';
import styles from './TicketTiers.module.css';

export interface TicketTierData {
  id: string;
  nameEn: string;
  nameEs: string;
  descriptionEn: string;
  descriptionEs: string;
  priceCents: number;
  seatsIncluded: number;
  capacity: number | null;
}

export default function TicketTiers({ tiers, lang }: { tiers: TicketTierData[]; lang: 'en' | 'es' }) {
  const isEs = lang === 'es';
  if (tiers.length === 0) return null;

  return (
    <div className={styles.grid}>
      {tiers.map((t) => {
        const name = isEs ? t.nameEs : t.nameEn;
        const desc = isEs ? t.descriptionEs : t.descriptionEn;
        const price = (t.priceCents / 100).toLocaleString(isEs ? 'es-US' : 'en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

        return (
          <div key={t.id} className={styles.card}>
            <div className={styles.seats}>
              {t.seatsIncluded} {isEs ? (t.seatsIncluded === 1 ? 'asiento' : 'asientos') : (t.seatsIncluded === 1 ? 'seat' : 'seats')}
            </div>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.price}>${price}</div>
            {desc && <p className={styles.desc}>{desc}</p>}
            {t.capacity != null && (
              <p className={styles.limited}>{isEs ? `Solo ${t.capacity} disponibles` : `Only ${t.capacity} available`}</p>
            )}
            <Link href={`/contact?tier=${encodeURIComponent(name)}`} className="btn btn-outline" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
              {isEs ? 'Reservar Su Mesa' : 'Reserve Your Table'} →
            </Link>
          </div>
        );
      })}
    </div>
  );
}
