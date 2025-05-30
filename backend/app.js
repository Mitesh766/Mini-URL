// Updated server.js
import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import urlRouter from "./routes/urlRoutes.js";
import { handleGetRequest, handlePostRequest } from './controllers/redirectController.js';
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import analyticsRoutes from "./routes/analyticsRoutes.js"
import { RESERVED_FRONTEND_ROUTES } from "./utils/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

connectDB();
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store'
  });
  next();
});


app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);
app.use('/api/analytics', analyticsRoutes);



app.get('/:code', (req, res, next) => {
  const { code } = req.params;
  if (RESERVED_FRONTEND_ROUTES.includes(code.toLowerCase())) {
    return res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
  return handleGetRequest(req, res,next);
});


app.post('/:code', (req, res, next) => {
  const { code } = req.params;
  if (RESERVED_FRONTEND_ROUTES.includes(code.toLowerCase())) {
    return res.status(400).json({ message: "Reserved route" });
  }
  return handlePostRequest(req, res,next);
});



// Fallback for React SPA - this should catch all non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT=process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server successfully started on port 3000");
});

