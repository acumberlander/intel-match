import { Request, Response } from "express";
import { VehicleModel } from "../models/vehicleModel";

export const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const vehicles = await VehicleModel.find({});
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ message: "Failed to retrieve vehicles" });
  }
};
