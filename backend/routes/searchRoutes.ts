import { Router } from "express";
import { searchEntities } from "../controllers/searchController";

const router = Router();

router.post("/", searchEntities);

export default router;
