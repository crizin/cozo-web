import { Article, Board, Page } from '@/app/_lib/model';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import styles from './paging.module.scss';

export default function Paging({ board, articles }: { board?: Board; articles: Page<Article[], number> }) {
  return (
    articles.item.length > 0 && (
      <nav className={`${styles.paging} paging`}>
        {articles.prevCursor !== null &&
          (board ? (
            <Link href={`/board/${board.id}?o=${articles.prevCursor}`} rel="prev">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          ) : (
            <Link href={`/?o=${articles.prevCursor}`} rel="prev">
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          ))}
        {articles.nextCursor !== null &&
          (board ? (
            <Link href={`/board/${board.id}?o=${articles.nextCursor}`} rel="next">
              다음 페이지 <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          ) : (
            <Link href={`/?o=${articles.nextCursor}`} rel="next">
              다음 페이지 <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          ))}
      </nav>
    )
  );
}
