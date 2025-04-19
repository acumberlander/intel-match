import express from "express";
import cors from "cors";
import personRoutes from "./routes/personRoutes";
import vehicleRoutes from "./routes/vehicleRoutes";
import searchRoutes from "./routes/searchRoutes";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/people", personRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/search", searchRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
