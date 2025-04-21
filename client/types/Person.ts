import { Crime } from "./Crime";
import { MatchedVehicle } from "./Vehicle";

export type Person = {
  _id: string;
  name: string;
  age?: number | null;
  description: string;
  crimeHistory: Crime[] | string[];
  similarity: number;
  vehicleBoost?: number;
  finalScore?: number;
  matchedVehicles?: MatchedVehicle[];
};