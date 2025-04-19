import { Request, Response } from "express";
import { searchByEmbedding } from "../services/aiServices";

export const searchEntities = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query } = req.body;

  if (!query || query.trim().length < 3) {
    res
      .status(400)
      .json({ message: "Query is required and must be meaningful" });
    return;
  }

  try {
    const results = await searchByEmbedding(query);
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
