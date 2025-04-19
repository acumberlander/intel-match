export type SearchResult = {
  id: string;
  description: string;
  similarity: number;
  name?: string;
  age?: number;
  make?: string;
  model?: string;
  color?: string;
};