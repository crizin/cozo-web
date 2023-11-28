import SiteLogo from '@/app/_component/fragment/site-logo';
import SearchArticleList from '@/app/_component/search/article-list';
import { getBoardMap, getSearchResults } from '@/app/_lib/client';
import Utils from '@/app/_lib/utils';
import { faChevronLeft, faChevronRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata: Metadata = {
  title: 'cozo | 검색',
};

export default async function SearchPage({ searchParams }: Readonly<{ searchParams: { [key: string]: string | string[] | undefined } }>) {
  const boards = await getBoardMap();
  const response = await getSearchResults((searchParams.keyword as string) || '', Utils.parseNumber(searchParams.page, 1));
  const result = response.result.item;

  return (
    <>
      <h4 className={styles.title}>
        {result.keyword === '' ? (
          <>
            <FontAwesomeIcon icon={faSearch} /> 검색어를 입력해주세요
          </>
        ) : (
          <Link href={`/search?keyword=${result.keyword}`}>
            <FontAwesomeIcon icon={faSearch} /> &quot;{result.keyword}&quot;에 대한{' '}
            {result.totalHits === 0 ? (
              <span>검색 결과가 없습니다</span>
            ) : (
              <span>{result.totalHits >= 10000 ? '10,000+' : Utils.formatDecimal(result.totalHits) + '개의 검색 결과'}</span>
            )}
          </Link>
        )}
      </h4>
      {result.totalHits > 0 && (
        <ul className={styles.summary}>
          {Object.entries(result.boardCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([boardId, count]) => (
              <li key={boardId}>
                <Link href={`/search/board/${boardId}?keyword=${encodeURIComponent(result.keyword)}`}>
                  <SiteLogo board={boards[parseInt(boardId)]} size={18} />
                  {boards[parseInt(boardId)].site.name} &raquo; {boards[parseInt(boardId)].name} ({Utils.formatDecimal(count)})
                </Link>
              </li>
            ))}
        </ul>
      )}
      <hr className={styles.splitter} />
      <SearchArticleList articles={result.articles} titles={result.titles} contents={result.contents} logoSize={18} />
      <nav className={`${styles.paging} paging`}>
        {response.result.prevCursor !== null && (
          <Link href={`/search?keyword=${encodeURIComponent(result.keyword)}&page=${response.result.prevCursor}`} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        )}
        {response.result.nextCursor !== null && (
          <Link href={`/search?keyword=${encodeURIComponent(result.keyword)}&page=${response.result.nextCursor}`} rel="next">
            다음 페이지 <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </nav>
    </>
  );
}
