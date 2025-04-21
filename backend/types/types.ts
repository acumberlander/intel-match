import { Types } from "mongoose";

export type DescriptionType = "person" | "vehicle" | "both";

export type MatchedVehicle = {
  _id: string;
  make: string;
  model: string;
  color: string;
  similarity: number;
  isStolen: boolean;
};

export type MatchedPerson = {
  _id: string;
  name: string;
  age?: number | null;
  description: string;
  crimeHistory: Types.ObjectId[];
  similarity: number;
  vehicleBoost: number;
  finalScore: number;
  matchedVehicles: MatchedVehicle[];
};

export type MatchedVehicleOnly = {
  _id: string;
  make: string;
  model: string;
  color: string;
  similarity: number;
  isStolen: boolean;
};
