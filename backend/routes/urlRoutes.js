import express from "express";
import {
  shortenUrl,
  getAllUrls,
  updatePassword,
  deleteUrl,
  changeActivationStatus,
  updateUrlAndExpiry,
} from "../controllers/urlController.js";
import { authenticateUser } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/", authenticateUser, getAllUrls);
router.post("/shortenUrl", authenticateUser, shortenUrl);

router.put("/updatePassword/:urlId", authenticateUser, updatePassword);
router.delete("/delete/:urlId", authenticateUser, deleteUrl);
router.put("/changeActivationStatus/:urlId", authenticateUser, changeActivationStatus);
router.put("/updateUrlAndExpiry/:urlId",authenticateUser,updateUrlAndExpiry)

export default router;
