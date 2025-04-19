import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

export const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
