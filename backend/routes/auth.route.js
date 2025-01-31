import express from "express";
import {
    register,
    login,
    logout,
    forgotPassword,
    verifyEmail,
    resetPassword,
    checkAuth
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword)
export default router;