import { Request, Response } from "express";
import { CrimeModel } from "../models/crimeModel";

export const getCrimeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const crime = await CrimeModel.findById(id);
    res.json(crime);
  } catch (error) {
    console.error("Error fetching crime:", error);
    res.status(500).json({ message: "Failed to retrieve crime" });
  }
};