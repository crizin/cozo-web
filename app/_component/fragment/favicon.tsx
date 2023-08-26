'use client';

import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const host = extractHost(linkUrl);
    if (host) {
      setImgSrc(`${host}/favicon.ico`);
    }
  }, [linkUrl]);

  return loadingFailed ? (
    <FontAwesomeIcon icon={faPaperclip} className={`${styles.favicon} ${className}`} width={size} height={size} />
  ) : (
    imgSrc && <img src={imgSrc} className={`${styles.favicon} ${className}`} alt="" width={size} height={size} onError={() => setLoadingFailed(true)} />
  );
}

function extractHost(url: string) {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.origin;
    return host.startsWith('http://') ? host.replace('http://', 'https://') : host;
  } catch (e) {
    return null;
  }
}
