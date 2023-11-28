import ArticleList from '@/app/_component/article/article-list';
import Paging from '@/app/_component/article/paging';
import { getArticles } from '@/app/_lib/client';
import Utils from '@/app/_lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cozo',
};

export default async function IndexPage({ searchParams }: Readonly<{ searchParams: { [key: string]: string | string[] | undefined } }>) {
  const articles = await getArticles(Utils.parseNumber(searchParams.o));

  return (
    <>
      <ArticleList articles={articles.result} />
      <Paging articles={articles.result} />
    </>
  );
}
