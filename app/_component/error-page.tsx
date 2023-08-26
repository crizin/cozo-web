'use client';

import { faHome, faRepeat, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './error-page.module.scss';

export default function ErrorPage({ title, icon, children, reset }: { title: string; icon: IconDefinition; children: React.ReactNode; reset?: () => void }) {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <h2>
        <span>{title}</span>
        <FontAwesomeIcon icon={icon} size="5x" spin={true} className={styles.icon} />
      </h2>
      <p>{children}</p>
      <div>
        <button type="button" className="button" onClick={() => router.push('/')}>
          <FontAwesomeIcon icon={faHome} /> 홈으로
        </button>
        {reset && (
          <button type="button" className="button" onClick={reset}>
            <FontAwesomeIcon icon={faRepeat} /> 다시 시도
          </button>
        )}
      </div>
    </div>
  );
}
