import { Request, Response } from "express";
import { vehicleData } from "../models/vehicleModel";

export const getAllVehicles = (req: Request, res: Response) => {
  res.json(vehicleData);
};
