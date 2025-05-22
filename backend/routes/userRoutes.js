import express from "express";
import { register } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/register",register)

export default router;
