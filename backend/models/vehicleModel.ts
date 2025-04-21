import mongoose, { Schema } from "mongoose";

const vehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  embedding: { type: [Number], required: true },
  registeredTo: {
    type: Schema.Types.ObjectId,
    ref: "Person",
    required: false,
  },
  isStolen: {
    type: Boolean,
    default: false,
  },
});

export const VehicleModel = mongoose.model("Vehicle", vehicleSchema);
