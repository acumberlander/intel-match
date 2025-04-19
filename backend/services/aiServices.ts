import { OpenAI } from "openai";
import { PersonModel } from "../models/personModel";
import { VehicleModel } from "../models/vehicleModel";
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
export const searchByEmbedding = async (query: string, minSimilarity = 0.7) => {
  const queryEmbedding = await generateEmbedding(query);

  const people = await PersonModel.find({});
  const vehicles = await VehicleModel.find({});

  const topPeople = people
    .map((person) => ({
      ...person.toObject(),
      similarity: cosineSimilarity(queryEmbedding, person.embedding),
    }))
    .filter((p) => p.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity);

  const topVehicles = vehicles
    .map((vehicle) => ({
      ...vehicle.toObject(),
      similarity: cosineSimilarity(queryEmbedding, vehicle.embedding),
    }))
    .filter((v) => v.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity);

  return { topPeople, topVehicles };
};