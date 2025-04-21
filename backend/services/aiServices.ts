import { OpenAI } from "openai";
import { PersonModel } from "../models/personModel";
import { VehicleModel } from "../models/vehicleModel";
import { DescriptionType } from "../types/types";
import { cosineSimilarity } from "../utils/utils";
import { MatchedPerson, MatchedVehicleOnly } from "../types/types";
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
 * Searches for people based on the query and sensitivity.
 * @param query 
 * @param sensitivity 
 * @returns 
 */
export const searchPeopleOnly = async (
  query: string,
  sensitivity: number = 0.7
): Promise<MatchedPerson[]> => {
  const embedding = await generateEmbedding(query);
  const people = await PersonModel.find({
    crimeHistory: { $exists: true, $not: { $size: 0 } },
  });

  const results: MatchedPerson[] = people
    .map((person): MatchedPerson => {
      const score = cosineSimilarity(embedding, person.embedding);
      return {
        _id: person._id.toString(),
        name: person.name,
        age: person.age,
        description: person.description,
        crimeHistory: person.crimeHistory,
        similarity: score,
        vehicleBoost: 0,
        finalScore: score,
        matchedVehicles: [],
      };
    })
    .filter((p) => p.similarity >= sensitivity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);

  return results;
};


/**
 * Searches for vehicles based on the query and sensitivity.
 * @param query 
 * @param sensitivity 
 * @returns 
 */
export const searchVehiclesOnly = async (
  query: string,
  sensitivity: number = 0.7
): Promise<MatchedVehicleOnly[]> => {
  const embedding = await generateEmbedding(query);
  const vehicles = await VehicleModel.find({});

  return vehicles
    .map(
      (v): MatchedVehicleOnly => ({
        _id: v._id.toString(),
        make: v.make,
        model: v.model,
        color: v.color,
        similarity: cosineSimilarity(embedding, v.embedding),
        isStolen: v.isStolen,
      })
    )
    .filter((v) => v.similarity >= sensitivity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 5);
};


/**
 * Searches for people and vehicles based on the query and sensitivity.
 * @param query 
 * @param sensitivity 
 * @returns 
 */
export const searchPeopleAndVehicles = async (
  query: string,
  sensitivity: number = 0.7
): Promise<MatchedPerson[]> => {
  const embedding = await generateEmbedding(query);

  const people = await PersonModel.find({
    crimeHistory: { $exists: true, $not: { $size: 0 } },
  });
  const vehicles = await VehicleModel.find({});

  const results: MatchedPerson[] = people
    .map((person): MatchedPerson => {
      const score = cosineSimilarity(embedding, person.embedding);
      return {
        _id: person._id.toString(),
        name: person.name,
        age: person.age,
        description: person.description,
        crimeHistory: person.crimeHistory,
        similarity: score,
        vehicleBoost: 0,
        finalScore: score,
        matchedVehicles: [],
      };
    })
    .filter((p) => p.similarity >= sensitivity);

  for (const person of results) {
    const linkedVehicles = vehicles.filter(
      (v) => v.registeredTo?.toString() === person._id || v.isStolen
    );

    for (const vehicle of linkedVehicles) {
      const sim = cosineSimilarity(embedding, vehicle.embedding);
      if (sim >= sensitivity) {
        person.vehicleBoost = Math.max(person.vehicleBoost, sim * 0.2);
        person.finalScore += sim * 0.2;

        person.matchedVehicles.push({
          _id: vehicle._id.toString(),
          make: vehicle.make,
          model: vehicle.model,
          color: vehicle.color,
          similarity: sim,
          isStolen: vehicle.isStolen,
        });
      }
    }
  }

  return results.sort((a, b) => b.finalScore - a.finalScore).slice(0, 5);
};


export const classifyDescription = async (
  input: string
): Promise<DescriptionType> => {
  const prompt = `
You are a classifier that decides whether a description is about a person, a vehicle, or both.
Respond with only one word: "person", "vehicle", or "both".

Description: "${input}"
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const result = response.choices[0].message.content?.trim().toLowerCase();

  if (result === "person" || result === "vehicle" || result === "both") {
    return result as DescriptionType;
  }

  throw new Error(`Invalid classification result: ${result}`);
};