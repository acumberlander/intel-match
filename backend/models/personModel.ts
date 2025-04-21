import mongoose, { Schema } from "mongoose";

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  description: { type: String, required: true },
  embedding: { type: [Number], required: true },
  crimeHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "Crime",
    },
  ],
});

export const PersonModel = mongoose.model("Person", personSchema);
