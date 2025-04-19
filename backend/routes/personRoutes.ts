import { Router } from "express";
import { getAllPeople } from "../controllers/personController";

const router = Router();

router.get("/", getAllPeople);

export default router;
