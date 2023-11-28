'use client';

import SiteLogo from '@/app/_component/fragment/site-logo';
import { GlobalVariableContext } from '@/app/_component/global-variable-context';
import { Article } from '@/app/_lib/model';
import Utils from '@/app/_lib/utils';
import React, { useContext } from 'react';
import styles from './article-list.module.scss';

interface Props {
  readonly articles: Article[];
  readonly titles: Record<string, string>;
  readonly contents: Record<string, string>;
  readonly logoSize?: number;
}

export default function SearchArticleList({ articles, titles, contents, logoSize }: Props) {
  const { state } = useContext(GlobalVariableContext);

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          <a
            href={state.useMobileUrl ? article.mobileUrl : article.pcUrl}
            rel="nofollow"
            target={state.useNewWindow ? '_blank' : '_self'}
            className={styles.article}
          >
            {logoSize && <SiteLogo board={article.board} size={logoSize} className={styles.logo} />}
            <span
              className={`${styles.title} ellipsis`}
              dangerouslySetInnerHTML={highlight(titles[article.id], '<span class="no-title">제목이 없는 게시글</span>')}
            />
            <span className={styles.elapsed} title={Utils.parseDate(article.createdAt)}>
              {article.humanReadableTime}
            </span>
          </a>
          <a
            href={state.useMobileUrl ? article.mobileUrl : article.pcUrl}
            rel="nofollow"
            target={state.useNewWindow ? '_blank' : '_self'}
            className={styles.content}
            dangerouslySetInnerHTML={highlight(contents[article.id])}
          />
        </li>
      ))}
    </ul>
  );
}

function highlight(string: string, defaultValue = '') {
  if (string.length === 0) {
    return { __html: defaultValue };
  }

  return {
    __html: string
      .replaceAll(/&/g, '&amp;')
      .replaceAll(/</g, '&lt;')
      .replaceAll(/>/g, '&gt;')
      .replaceAll(/@@HL@@(.*?)@@\/HL@@/g, '<strong>$1</strong>'),
  };
}
