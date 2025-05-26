import express from "express";
import { shortenUrl, getAllUrls } from "../controllers/urlController.js";
import { authenticateUser } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/",authenticateUser, getAllUrls);
router.post("/shortenUrl", authenticateUser, shortenUrl);

export default router;
