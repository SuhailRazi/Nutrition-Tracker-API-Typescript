import express from "express";
import { login, logout, register } from "../controller/auth.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
