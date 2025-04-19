import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  description: { type: String, required: true },
  embedding: { type: [Number], required: true },
  similarity: { type: Number, required: false },
});

export const PersonModel = mongoose.model("Person", personSchema);