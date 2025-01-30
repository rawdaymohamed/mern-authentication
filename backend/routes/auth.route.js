import express from "express";
import { register, login, logout, verifyEmail } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
export default router;