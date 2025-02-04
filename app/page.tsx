import ArticleList from '@/component/article/article-list';
import Paging from '@/component/article/paging';
import { getArticles } from '@/lib/client';
import Utils from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'cozo'
};

export default async function IndexPage({ searchParams }: Readonly<{ searchParams: Promise<{ [_: string]: string | string[] | undefined }> }>) {
  const { o } = await searchParams;
  const articles = await getArticles(Utils.parseNumber(o));

  return (
    <>
      <ArticleList articles={articles.result} />
      <Paging articles={articles.result} />
    </>
  );
}
