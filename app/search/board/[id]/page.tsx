import SiteLogo from '@/app/_component/fragment/site-logo';
import SearchArticleList from '@/app/_component/search/article-list';
import { BadRequestError, getBoardMap, getSearchResultsByBoard } from '@/app/_lib/client';
import Utils from '@/app/_lib/utils';
import { faChevronLeft, faChevronRight, faReply, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.scss';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const boards = await getBoardMap();
  const board = boards[parseInt(params.id)];

  if (!board) {
    throw new BadRequestError();
  }

  return {
    title: `cozo | 검색 | ${board.name} » ${board.site.name}`,
  };
}

export default async function SearchBoardPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const boards = await getBoardMap();
  const board = boards[params.id];
  const response = await getSearchResultsByBoard(board.id, searchParams.keyword as string, Utils.parseNumber(searchParams.page, 1));
  const result = response.result.item;

  return (
    <>
      <Link href={`/search?keyword=${encodeURIComponent(result.keyword)}`} className={styles['search-all']}>
        (<FontAwesomeIcon icon={faReply} /> 전체 검색 결과)
      </Link>
      <h4 className={styles.title}>
        <Link href={`/search/board/${board.id}?keyword=${result.keyword}`}>
          <FontAwesomeIcon icon={faSearch} /> &quot;{result.keyword}&quot;에 대한{' '}
          {result.totalHits === 0 ? (
            <span>검색 결과가 없습니다</span>
          ) : (
            <span>{result.totalHits >= 10000 ? '10,000+' : Utils.formatDecimal(result.totalHits) + '개의 검색 결과'}</span>
          )}
        </Link>
      </h4>
      <h1 className={styles['board-title']}>
        <SiteLogo board={board} size={24} className={styles.logo} />
        <span className="site">{board.site.name}</span> &raquo; <span>{board.name}</span>
      </h1>
      <SearchArticleList articles={result.articles} titles={result.titles} contents={result.contents} />
      <nav className={`${styles.paging} paging`}>
        {response.result.prevCursor !== null && (
          <Link href={`/search/board/${board.id}?keyword=${encodeURIComponent(result.keyword)}&page=${response.result.prevCursor}`} rel="prev">
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>
        )}
        {response.result.nextCursor !== null && (
          <Link href={`/search/board/${board.id}?keyword=${encodeURIComponent(result.keyword)}&page=${response.result.nextCursor}`} rel="next">
            다음 페이지 <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        )}
      </nav>
    </>
  );
}
