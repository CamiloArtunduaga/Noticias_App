

export interface RespuestaTopHeadlines {
  status: string;
  totalResults: number;
  articles: Articulos[];
}

export interface Articulos {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}