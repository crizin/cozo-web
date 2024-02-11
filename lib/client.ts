import { Article, Board, Link, Page, Response, SearchResult, TagTrend } from '@/lib/model';

export async function getBoards(): Promise<Response<Board[]>> {
  return fetch(`${process.env.API_ENDPOINT}/boards`, { next: { revalidate: 3600 } }).then((response) => validateResponse(response));
}

export async function getBoard(id: number) {
  return getBoards().then((response) => {
    const board = response.result.filter((board) => board.id === id).pop();
    if (board) {
      return board;
    }
    throw new BadRequestError();
  });
}

export async function getBoardMap(): Promise<Record<string, Board>> {
  const map: Record<string, Board> = {};
  const boards = await getBoards();
  boards.result.forEach((board) => {
    map[board.id] = board;
  });
  return map;
}

export async function getArticles(cursor = 0): Promise<Response<Page<Article[], number>>> {
  return fetch(`${process.env.API_ENDPOINT}/articles?cursor=${cursor}`, { cache: 'no-store' }).then((response) => validateResponse(response));
}

export async function getBoardArticles(boardId: number, cursor = 0): Promise<Response<Page<Article[], number>>> {
  return fetch(`${process.env.API_ENDPOINT}/boards/${boardId}/articles?cursor=${cursor}`, { cache: 'no-store' }).then((response) => validateResponse(response));
}

export async function getLinks(page = 1): Promise<Response<Page<Link[], number>>> {
  return fetch(`${process.env.API_ENDPOINT}/links?page=${page}`, { cache: 'no-store' }).then((response) => validateResponse(response));
}

export async function getKeywordLastDate(): Promise<Response<string>> {
  return fetch(`${process.env.API_ENDPOINT}/keywords/last-date`, { cache: 'no-store' }).then((response) => validateResponse(response));
}

export async function getKeywords(date: string): Promise<Response<Page<TagTrend[], string>>> {
  return fetch(`${process.env.API_ENDPOINT}/keywords/${date}`, { cache: 'no-store' }).then((response) => validateResponse(response));
}

export async function getSearchResults(keyword: string, page = 1): Promise<Response<Page<SearchResult, number>>> {
  return fetch(`${process.env.API_ENDPOINT}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`, { cache: 'no-store' }).then((response) =>
    validateResponse(response),
  );
}

export async function getSearchResultsByBoard(boardId: number, keyword: string, page = 1): Promise<Response<Page<SearchResult, number>>> {
  return fetch(`${process.env.API_ENDPOINT}/search/board/${boardId}?keyword=${encodeURIComponent(keyword)}&page=${page}`, { cache: 'no-store' }).then(
    (response) => validateResponse(response),
  );
}

function validateResponse(response: globalThis.Response) {
  if (response.status === 400) {
    throw new BadRequestError();
  }
  return response.json();
}

export class BadRequestError extends Error {
  constructor() {
    super('BadRequest');
  }
}
