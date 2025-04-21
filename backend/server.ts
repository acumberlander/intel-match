import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import personRoutes from "./routes/personRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import searchRoutes from "./routes/searchRoutes";
import crimeRoutes from "./routes/crimeRoutes";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI as string;

app.use(cors());
app.use(express.json());

// Routes
app.use("/people", personRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/search", searchRoutes);
app.use("/crimes", crimeRoutes);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
