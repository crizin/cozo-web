import ArticleList from '@/component/article/article-list';
import Paging from '@/component/article/paging';
import { getBoard, getBoardArticles, getBoards } from '@/lib/client';
import Utils from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params }: Readonly<{ params: { id: string } }>): Promise<Metadata> {
  const board = await getBoard(parseInt(params.id));
  return {
    title: `cozo | ${board.name} » ${board.site.name}`,
  };
}

export default async function BoardPage({
  params,
  searchParams,
}: Readonly<{ params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } }>) {
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
