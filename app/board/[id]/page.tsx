import ArticleList from '@/component/article/article-list';
import Paging from '@/component/article/paging';
import { getBoard, getBoardArticles, getBoards } from '@/lib/client';
import Utils from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: Readonly<{ params: Promise<{ id: string }> }>): Promise<Metadata> {
  const { id } = await params;
  const board = await getBoard(parseInt(id));
  return {
    title: `cozo | ${board.name} » ${board.site.name}`
  };
}

export default async function BoardPage({ params, searchParams }: Readonly<{
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}>) {
  const { id } = await params;
  const { o } = await searchParams;
  const boards = await getBoards();
  const board = boards.result.filter((board) => board.id.toString() === id).pop();
  const articles = await getBoardArticles(parseInt(id), Utils.parseNumber(o));

  return (
    <>
      <ArticleList board={board} articles={articles.result} />
      <Paging board={board} articles={articles.result} />
    </>
  );
}
