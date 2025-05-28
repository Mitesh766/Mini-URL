import express from "express";
import { login, register, verifyLogin,logout } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verifyLogin", authenticateUser, verifyLogin);
router.post("/logout", logout);

export default router;
