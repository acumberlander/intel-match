import mongoose, { Schema, Types } from "mongoose";

const crimeSchema = new Schema({
  _id: { type: Types.ObjectId, required: true },
  person: { type: Schema.Types.ObjectId, ref: "Person", required: true },
  vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" }, // optional
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
  notes: { type: String },
});

export const CrimeModel = mongoose.model("Crime", crimeSchema);
