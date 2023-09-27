export interface Response<T> {
  error: boolean;
  errorMessage?: string;
  result: T;
}

export interface Page<T, P> {
  item: T;
  prevCursor: P | null;
  nextCursor: P | null;
}

export interface Site {
  key: string;
  name: string;
  mainUrlPc: string;
  mainUrlMobile: string;
}

export interface Board {
  id: number;
  site: Site;
  name: string;
  mainUrlPc: string;
  mainUrlMobile: string;
}

export interface Article {
  id: number;
  originId: string;
  board: Board;
  title: string;
  pcUrl: string;
  mobileUrl: string;
  containsImage: boolean;
  containsVideo: boolean;
  defaultLink: Link;
  createdAt: string;
  humanReadableTime: string;
}

export interface Link {
  id: number;
  host: string;
  url: string;
  title: string;
  description: string;
  faviconUrl: string;
  thumbnailUrl: string;
  articles?: Article[];
}

export interface TagTrend {
  id: number;
  ranking: number;
  tag: string;
  articles: Article[];
}

export interface SearchResult {
  keyword: string;
  totalHits: number;
  articles: Article[];
  titles: { [key: number]: string };
  contents: { [key: number]: string };
  boardCounts: { [key: number]: number };
}
