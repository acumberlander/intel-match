import { Router } from "express";
import { getAllVehicles } from "../controllers/vehicleController";

const router = Router();

router.get("/", getAllVehicles);

export default router;
