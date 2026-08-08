import type { SponsorLogo as SponsorLogoData } from '@/data/sponsors';
import SponsorLogo from './SponsorLogo';
import styles from './SponsorGrid.module.css';

export default function SponsorGrid({ items }: { items: SponsorLogoData[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item, i) => (
        <div key={i} className={styles.item}>
          <SponsorLogo {...item} />
        </div>
      ))}
    </div>
  );
}
