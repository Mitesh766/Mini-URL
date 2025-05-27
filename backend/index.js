import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import urlRouter from "./routes/urlRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import {
  redirectHandler,
  verifyPassword,
} from "./controllers/redirectController.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

connectDB();
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

app.get("/:code", redirectHandler);

// Handle both GET (normal redirect) and POST (password verification) for short URLs
app.get("/:code", redirectHandler);
app.post("/:code", redirectHandler);

// Optional: Dedicated password verification endpoint
app.post("/api/verify/:code", verifyPassword);

// Fallback for React SPA
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server successfully started on port 3000");
});
