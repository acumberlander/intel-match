import { Request, Response } from "express";
import { personData } from "../models/personModel";

export const getAllPeople = (req: Request, res: Response) => {
  res.json(personData);
};
