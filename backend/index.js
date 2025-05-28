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



app.get('/:code', handleGetRequest);

app.post('/:code', handlePostRequest);



// Fallback for React SPA - this should catch all non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server successfully started on port 3000");
});

