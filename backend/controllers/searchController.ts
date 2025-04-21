import { Request, Response } from "express";
import { classifyDescription } from "../services/aiServices";
import {
  searchPeopleOnly,
  searchVehiclesOnly,
  searchPeopleAndVehicles,
} from "../services/aiServices";

export const searchEntities = async (req: Request, res: Response): Promise<void> => {
  const { query, sensitivity = 0.7 } = req.body;

  if (!query || query.trim().length === 0) {
    res.status(400).json({ message: "Query is required" });
  }

  try {
    const type = await classifyDescription(query);

    if (type === "person") {
      const people = await searchPeopleOnly(query, sensitivity);
      res.json({
        type,
        message:
          "Based on your description, these are the people that matched in our database:",
        results: people,
      });
    }

    if (type === "vehicle") {
      const vehicles = await searchVehiclesOnly(query, sensitivity);
      res.json({
        type,
        message:
          "Based on your description, these are the vehicles that matched in our database:",
        results: vehicles,
      });
    }

    if (type === "both") {
      const combined = await searchPeopleAndVehicles(query, sensitivity);
      res.json({
        type,
        message:
          "Based on your description, these are the people and vehicles that matched in our database:",
        results: combined,
      });
    }

  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
