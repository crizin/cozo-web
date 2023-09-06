import ArticleList from '@/app/_component/article/article-list';
import Paging from '@/app/_component/article/paging';
import { getBoard, getBoardArticles, getBoards } from '@/app/_lib/client';
import Utils from '@/app/_lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const board = await getBoard(parseInt(params.id));
  return {
    title: `cozo | ${board.name} » ${board.site.name}`,
  };
}

export default async function BoardPage({ params, searchParams }: { params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const boards = await getBoards();
  const board = boards.result.filter((board) => board.id.toString() === params.id).pop();
  const articles = await getBoardArticles(parseInt(params.id), Utils.parseNumber(searchParams.o));

  return (
    <>
      <ArticleList board={board} articles={articles.result} />
      <Paging board={board} articles={articles.result} />
    </>
  );
}
