export type Person = {
  id: string;
  name: string;
  age: number;
  description: string;
  embedding: number[];
  similarity?: number;
};