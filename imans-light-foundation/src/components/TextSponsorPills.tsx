import type { TextSponsor } from '@/data/sponsors';
import styles from './TextSponsorPills.module.css';

export default function TextSponsorPills({ items }: { items: TextSponsor[] }) {
  if (items.length === 0) return null;
  return (
    <div className={styles.wrap}>
      {items.map((s, i) =>
        s.url ? (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.pill}>
            {s.name}
          </a>
        ) : (
          <span key={i} className={styles.pill}>
            {s.name}
          </span>
        )
      )}
    </div>
  );
}
