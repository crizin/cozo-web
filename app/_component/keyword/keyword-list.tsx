'use client';

import ArticleLink from '@/app/_component/fragment/article-link';
import { GlobalVariableContext } from '@/app/_component/global-variable-context';
import { TagTrend } from '@/app/_lib/model';
import 'moment/locale/ko';
import Link from 'next/link';
import { useContext } from 'react';
import styles from './keyword-list.module.scss';

export default function KeywordList({ keywords }: Readonly<{ keywords: TagTrend[] }>) {
  const { state } = useContext(GlobalVariableContext);

  return (
    <ol className={styles.keywords}>
      {keywords.map((keyword) => (
        <li key={keyword.id}>
          <Link href={`/search?keyword=${encodeURIComponent(keyword.tag)}`} id={`keyword-${keyword.id}`} className={styles.keyword}>
            #{keyword.tag}
          </Link>
          <ul>
            {keyword.articles.map((article) => (
              <li key={article.id}>
                <ArticleLink
                  className={styles.article}
                  article={article}
                  mobile={state.useMobileUrl}
                  target={state.useNewWindow ? '_blank' : '_self'}
                  logoSize={16}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
