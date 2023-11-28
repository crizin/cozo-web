'use client';

import LinkItem from '@/app/_component/article/link-item';
import ArticleLink from '@/app/_component/fragment/article-link';
import SiteLogo from '@/app/_component/fragment/site-logo';
import { GlobalVariableContext } from '@/app/_component/global-variable-context';
import { Article, Board, Page } from '@/app/_lib/model';
import { useContext } from 'react';
import styles from './article-list.module.scss';

interface Props {
  readonly board?: Board;
  readonly articles: Page<Article[], number>;
}

export default function ArticleList({ board, articles }: Props) {
  const { state } = useContext(GlobalVariableContext);

  return (
    <>
      {board && (
        <h1 className={styles['board-title']}>
          <SiteLogo board={board} size={24} className={styles.logo} />
          <a className="site" href={state.useMobileUrl ? board.site.mainUrlMobile : board.site.mainUrlPc} target={state.useNewWindow ? '_blank' : '_self'}>
            {board.site.name}
          </a>{' '}
          &raquo;{' '}
          <a href={state.useMobileUrl ? board.mainUrlMobile : board.mainUrlPc} target={state.useNewWindow ? '_blank' : '_self'}>
            {board.name}
          </a>
        </h1>
      )}
      <ul>
        {articles.item.map((article) => (
          <li key={article.id}>
            <ArticleLink article={article} mobile={state.useMobileUrl} target={state.useNewWindow ? '_blank' : '_self'} logoSize={board ? undefined : 18} />
            {article.defaultLink && <LinkItem link={article.defaultLink} />}
          </li>
        ))}
      </ul>
    </>
  );
}
