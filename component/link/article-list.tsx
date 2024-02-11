'use client';

import ArticleLink from '@/component/fragment/article-link';
import { GlobalVariableContext } from '@/component/global-variable-context';
import { Article } from '@/lib/model';
import { useContext } from 'react';
import styles from './article-list.module.scss';

export default function ArticleList({ articles }: Readonly<{ articles: Article[] }>) {
  const { state } = useContext(GlobalVariableContext);

  return (
    <ul className={styles.articles}>
      {articles.map((article) => (
        <li key={article.id}>
          <ArticleLink
            article={article}
            mobile={state.useMobileUrl}
            target={state.useNewWindow ? '_blank' : '_self'}
            logoSize={14}
            className={styles.article}
          />
        </li>
      ))}
    </ul>
  );
}
