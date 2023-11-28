'use client';

import SiteLogo from '@/app/_component/fragment/site-logo';
import { Board } from '@/app/_lib/model';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './header.module.scss';

export default function Header({ boards }: Readonly<{ boards: Board[] }>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm();
  const [expandedLayer, setExpandedLayer] = useState<string>();

  const expandLayer = (layer: string) => {
    if (expandedLayer === layer) {
      setExpandedLayer(undefined);
    } else {
      window.scrollTo({ top: 0 });
      setExpandedLayer(layer);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setExpandedLayer(undefined);

    if (new URL(event.currentTarget.href).pathname === pathname && searchParams.size === 0) {
      router.refresh();
    }
  };

  return (
    <>
      <AnimatePresence>
        {expandedLayer === 'board' && (
          <motion.ul className={styles['board-panel']} initial={{ y: -400 }} animate={{ y: 0 }} transition={{ type: 'spring', duration: 0.2 }}>
            {boards.map((board) => (
              <li key={board.id}>
                <Link href={`/board/${board.id}`} onClick={handleClick}>
                  <span>
                    <SiteLogo board={board} size={16} />
                    <strong>{board.site.name}</strong>
                  </span>
                  <span className={styles['board-name']}>{board.name}</span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {expandedLayer === 'search' && (
          <motion.form
            className={styles['search-panel']}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', duration: 0.2 }}
            onSubmit={form.handleSubmit((data) => {
              form.reset();
              setExpandedLayer(undefined);
              router.push(`/search?keyword=${encodeURIComponent(data.keyword)}`);
            })}
          >
            <input type="search" {...form.register('keyword')} placeholder="검색어를 입력해주세요" autoFocus required />
          </motion.form>
        )}
      </AnimatePresence>
      <nav className={styles.navigation}>
        <ul>
          <li className={pathname === '/' ? styles.active : ''}>
            <Link href="/" onClick={handleClick}>
              모든 글
            </Link>
          </li>
          <li className={pathname === '/link' ? styles.active : ''}>
            <Link href="/link" onClick={handleClick}>
              링크
            </Link>
          </li>
          <li className={pathname.startsWith('/keyword') ? styles.active : ''}>
            <Link href="/keyword" onClick={handleClick}>
              키워드
            </Link>
          </li>
          <li className={pathname.startsWith('/board/') ? styles.active : ''}>
            <span onClick={() => expandLayer('board')}>게시판</span>
          </li>
          <li className={styles.search}>
            <span onClick={() => expandLayer('search')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
}
