export type Vehicle = {
  id: string;
  make: string;
  model: string;
  color: string;
  description: string;
  embedding: number[];
  similarity?: number;
};