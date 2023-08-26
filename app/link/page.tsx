import LinkList from '@/app/_component/link/link-list';
import { getLinks } from '@/app/_lib/client';
import Utils from '@/app/_lib/utils';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'cozo | 링크',
};

export default async function LinkPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const links = await getLinks(Utils.parseNumber(searchParams.page, 1));

  return (
    <>
      <LinkList links={links.result} />
      <nav className={`paging ${styles.paging}`}>
        {links.result.prevCursor !== null && (
          <Link href={`/link?page=${links.result.prevCursor}`} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        )}
        {links.result.nextCursor !== null && (
          <Link href={`/link?page=${links.result.nextCursor}`} rel="next">
            다음 페이지 <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </nav>
    </>
  );
}
