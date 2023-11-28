import SiteLogo from '@/app/_component/fragment/site-logo';
import { Article } from '@/app/_lib/model';
import Utils from '@/app/_lib/utils';
import React from 'react';
import styles from './article-link.module.scss';

interface Props {
  readonly article: Article;
  readonly mobile: boolean;
  readonly target: string;
  readonly logoSize?: number;
  readonly className?: string;
}

export default function ArticleLink({ article, mobile, target, logoSize, className }: Props) {
  return (
    <a
      href={mobile ? article.mobileUrl : article.pcUrl}
      rel="nofollow"
      target={target}
      className={`${styles.article} ${className}`}
      onClick={() => {
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/logging/${article.id}`, { method: 'POST' }).catch();
      }}
    >
      {logoSize && <SiteLogo board={article.board} size={logoSize} className={styles.logo} />}
      <span className={`${styles.title} ellipsis`}>{article.title ? article.title : <span className={styles['no-title']}>제목이 없는 게시글</span>}</span>
      <span className={styles.elapsed} title={Utils.parseDate(article.createdAt)}>
        {article.humanReadableTime}
      </span>
    </a>
  );
}
