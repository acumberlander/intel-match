import { Router } from "express";
import { getCrimeById } from "../controllers/crimeController";

const router = Router();

router.get("/:id", getCrimeById);

export default router;
