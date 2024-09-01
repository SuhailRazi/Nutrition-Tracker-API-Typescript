import express from "express";
import { myFoods, trackFood } from "../controller/tracking.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/track", verifyToken, trackFood);
router.get("/myFoods", verifyToken, myFoods);

export default router;
