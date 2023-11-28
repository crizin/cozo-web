export interface Response<T> {
  readonly error: boolean;
  readonly errorMessage?: string;
  readonly result: T;
}

export interface Page<T, P> {
  readonly item: T;
  readonly prevCursor: P | null;
  readonly nextCursor: P | null;
}

export interface Site {
  readonly key: string;
  readonly name: string;
  readonly mainUrlPc: string;
  readonly mainUrlMobile: string;
}

export interface Board {
  readonly id: number;
  readonly site: Site;
  readonly name: string;
  readonly mainUrlPc: string;
  readonly mainUrlMobile: string;
}

export interface Article {
  readonly id: number;
  readonly originId: string;
  readonly board: Board;
  readonly title: string;
  readonly pcUrl: string;
  readonly mobileUrl: string;
  readonly containsImage: boolean;
  readonly containsVideo: boolean;
  readonly defaultLink: Link;
  readonly createdAt: string;
  readonly humanReadableTime: string;
}

export interface Link {
  readonly id: number;
  readonly host: string;
  readonly url: string;
  readonly title: string;
  readonly description: string;
  readonly faviconUrl: string;
  readonly thumbnailUrl: string;
  readonly articles?: Article[];
}

export interface TagTrend {
  readonly id: number;
  readonly ranking: number;
  readonly tag: string;
  readonly articles: Article[];
}

export interface SearchResult {
  readonly keyword: string;
  readonly totalHits: number;
  readonly articles: Article[];
  readonly titles: { [key: number]: string };
  readonly contents: { [key: number]: string };
  readonly boardCounts: { [key: number]: number };
}
