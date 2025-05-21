import express from "express";
import { addUrl, getUrl } from "../controllers/urlController";

const router = express.Router();

router.get("/:url",getUrl)
router.post("/",addUrl)

export default router;
