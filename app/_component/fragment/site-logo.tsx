import { Board } from '@/app/_lib/model';
import Image from 'next/image';
import styles from './site-logo.module.scss';

interface Props {
  board: Board;
  size: number;
  className?: string;
}

export default function SiteLogo({ board, size, className }: Props) {
  return (
    <Image
      src={require(`@/public/icon/${board.site.key.toLowerCase()}.svg`)}
      className={`${styles.logo} ${className}`}
      width={size}
      height={size}
      title={board.site.name}
      alt={`${board.site.name} 로고`}
    />
  );
}
