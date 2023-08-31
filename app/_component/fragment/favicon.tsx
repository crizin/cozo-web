'use client';

import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import styles from './favicon.module.scss';

interface Props {
  className?: string;
  size: number;
  linkUrl: string;
}

export default function Favicon({ className, size, linkUrl }: Props) {
  const [imgSrc, setImgSrc] = useState<string>();
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    try {
      setImgSrc(`${new URL(linkUrl).origin}/favicon.ico`);
    } catch (e) {}
  }, [linkUrl]);

  return loadingFailed ? (
    <FontAwesomeIcon icon={faPaperclip} className={`${styles.favicon} ${className}`} width={size} height={size} />
  ) : (
    imgSrc && (
      <Image src={imgSrc} className={`${styles.favicon} ${className}`} alt="" width={size} height={size} quality={100} onError={() => setLoadingFailed(true)} />
    )
  );
}
