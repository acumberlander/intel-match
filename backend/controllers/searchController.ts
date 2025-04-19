import { Request, Response } from "express";
import { searchByEmbedding } from "../services/aiServices";

export const searchEntities = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { query, sensitivity } = req.body;

  if (!query || query.trim().length < 3) {
    res
      .status(400)
      .json({ message: "Query is required and must be meaningful" });
    return;
  }

  const minSimilarity = Math.max(
    0.0,
    Math.min(1.0, Number(sensitivity) || 0.7)
  );

  try {
    const results = await searchByEmbedding(query, minSimilarity);
    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
