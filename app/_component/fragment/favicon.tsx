'use client';

import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import { useState } from 'react';
import styles from './favicon.module.scss';

interface Props {
  className?: string;
  size: number;
  faviconUrl: string | null;
}

export default function Favicon({ className, size, faviconUrl }: Props) {
  const [loadingFailed, setLoadingFailed] = useState(false);

  return faviconUrl === null || loadingFailed ? (
    <FontAwesomeIcon icon={faPaperclip} className={`${styles.favicon} ${className}`} width={size} height={size} />
  ) : (
    <Image
      src={faviconUrl}
      className={`${styles.favicon} ${className}`}
      alt=""
      width={size}
      height={size}
      quality={100}
      onError={() => setLoadingFailed(true)}
    />
  );
}
