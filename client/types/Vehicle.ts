export type Vehicle = {
  _id: string;
  make: string;
  model: string;
  color: string;
  similarity: number;
  isStolen?: boolean;
};

export type MatchedVehicle = {
  _id: string;
  make: string;
  model: string;
  color: string;
  similarity: number;
  isStolen?: boolean;
};
