import { Request, Response } from "express";
import { PersonModel } from "../models/personModel";

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const people = await PersonModel.find({});
    res.json(people);
  } catch (error) {
    console.error("Error fetching people:", error);
    res.status(500).json({ message: "Failed to retrieve people" });
  }
};
