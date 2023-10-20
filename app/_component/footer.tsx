import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src="/icon.svg" width={16} height={16} alt="Copyright" /> {moment().year()}. crizin / <Link href="/about">about</Link>
    </footer>
  );
}
