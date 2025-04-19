import { OpenAI } from "openai";
import { personData } from "../models/personModel";
import { vehicleData } from "../models/vehicleModel";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generates an embedding for the description text using OpenAI.
 * @param text
 * @returns
 */
export const generateEmbedding = async (text: string): Promise<number[]> => {
  if (!text || text.trim().length === 0) {
    throw new Error("Invalid input: text cannot be empty");
  }
  try {
    const response = await openai.embeddings.create({
      input: text,
      model: "text-embedding-ada-002",
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error("Failed to generate embedding");
  }
};


/**
 * Computes cosine similarity between two vectors
 */
const cosineSimilarity = (a: number[], b: number[]): number => {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
};

/**
 * Compare query vector against pre-embedded person & vehicle descriptions
 */
export const searchByEmbedding = async (query: string) => {
  const queryEmbedding = await generateEmbedding(query);

  const topPeople = personData
    .map((person) => ({
      ...person,
      similarity: cosineSimilarity(queryEmbedding, person.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  const topVehicles = vehicleData
    .map((vehicle) => ({
      ...vehicle,
      similarity: cosineSimilarity(queryEmbedding, vehicle.embedding),
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  return { topPeople, topVehicles };
};