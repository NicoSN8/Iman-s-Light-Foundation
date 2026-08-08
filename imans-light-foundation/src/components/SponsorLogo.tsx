import Image from 'next/image';
import type { SponsorLogo as SponsorLogoData } from '@/data/sponsors';
import styles from './SponsorLogo.module.css';

export default function SponsorLogo({ src, alt, url, invert }: SponsorLogoData) {
  const card = (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: 'contain', filter: invert ? 'invert(1)' : undefined }}
          unoptimized={src.endsWith('.svg')}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
        />
      </div>
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label={alt} className={styles.link}>
        {card}
      </a>
    );
  }

  return card;
}
