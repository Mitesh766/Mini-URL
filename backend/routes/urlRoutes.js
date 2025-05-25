import express from "express";
import { shortenUrl, getUrl } from "../controllers/urlController.js";
import { authenticateUser } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/:url", getUrl);
router.post("/shortenUrl", authenticateUser, shortenUrl);

export default router;
