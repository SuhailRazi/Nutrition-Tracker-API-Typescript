import express from "express";
import { getAllFood } from "../controller/food.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/foods", verifyToken, getAllFood);

export default router;
