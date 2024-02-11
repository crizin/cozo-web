'use client';

import { Page, TagTrend } from '@/lib/model';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import 'moment/locale/ko';
import Link from 'next/link';
import React from 'react';
import styles from './summary.module.scss';

export default function Summary({ dateString, keywords }: Readonly<{ dateString: string; keywords: Page<TagTrend[], string> }>) {
  moment.locale('ko');
  const date = moment(dateString);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const id = e.currentTarget.href.replace(/.*#/, '');
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top - 60 });
      element.classList.add('blink');
      setTimeout(() => {
        element.classList.remove('blink');
      }, 1200);
    }
  };

  return (
    <>
      <h3 className={styles.title}>
        {date.format('Y. M. D.')} {date.format('dddd')}
      </h3>
      <ul className={styles.keywords}>
        {keywords.item.map((keyword) => (
          <React.Fragment key={keyword.id}>
            {' '}
            <li className={styles.keyword}>
              <Link href={`#keyword-${keyword.id}`} onClick={handleScroll}>
                #{keyword.tag}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
      <nav className={`${styles.paging} paging`}>
        {keywords.prevCursor && (
          <Link href={`/keyword/${keywords.prevCursor}`} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} /> {keywords.prevCursor.startsWith(date.format('YYYY-MM-')) ? '' : moment(keywords.prevCursor).format('M월')}{' '}
            {moment(keywords.prevCursor).format('D')}일
          </Link>
        )}
        {keywords.nextCursor && (
          <Link href={`/keyword/${keywords.nextCursor}`} rel="next">
            {keywords.nextCursor.startsWith(date.format('YYYY-MM-')) ? '' : moment(keywords.nextCursor).format('M월')} {moment(keywords.nextCursor).format('D')}
            일 <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </nav>
    </>
  );
}
