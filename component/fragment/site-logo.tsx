import { Board } from '@/lib/model';
import Image from 'next/image';
import styles from './site-logo.module.scss';

interface Props {
  readonly board: Board;
  readonly size: number;
  readonly className?: string;
}

export default function SiteLogo({ board, size, className }: Props) {
  return (
    <Image
      src={`/icon/${board.site.key.toLowerCase()}.svg`}
      className={`${styles.logo} ${className}`}
      width={size}
      height={size}
      title={board.site.name}
      alt={`${board.site.name} 로고`}
    />
  );
}
