import express from "express";
import {
    getUserProfile,
    updateUserProfile,
    deleteUser,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

router.get("/me", authenticateUser, getUserProfile);
router.put("/me", authenticateUser, updateUserProfile);
router.delete("/me", authenticateUser, deleteUser);

export default router;
