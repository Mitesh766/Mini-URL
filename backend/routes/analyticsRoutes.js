import express from "express";

import { authenticateUser } from "../middlewares/authMiddleware.js";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/:shortUrlId", authenticateUser, getAnalytics);


export default router;
