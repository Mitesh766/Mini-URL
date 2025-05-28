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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

connectDB();
app.use(express.static(path.join(__dirname, "dist")));
router.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);




// Handle GET requests (initial visits)
app.get('/:code', handleGetRequest);

// Handle POST requests (password submissions)
app.post('/:code', handlePostRequest);

// Handle short URL redirects - but exclude common React routes and API routes
// app.get("/:code", (req, res, next) => {
//   const { code } = req.params;
  
//   // List of routes that should NOT be treated as short codes
//   const excludedRoutes = [
//     'dashboard',
//     'login', 
//     'generate',
//     'manage',
//     'contact',
//     'privacy',
//     'pricing',
//     'features',
//     'report',
//   ];
  
//   // Check if the code looks like a file extension (has a dot)
//   if (code.includes('.')) {
//     return next();
//   }
  
//   // Check if it's an excluded route
//   if (excludedRoutes.includes(code.toLowerCase())) {
//     return next();
//   }
  
//   // If it's a potential short code, try the redirect handler
//   redirectHandler(req, res, next);
// });

// app.post("/:code", (req, res, next) => {
//   const { code } = req.params;
  

//   const excludedRoutes = [
//     'dashboard',
//     'login', 
//     'generate',
//     'manage',
//     'contact',
//     'privacy',
//     'pricing',
//     'features',
//     'report',
//   ];
  
//   if (excludedRoutes.includes(code.toLowerCase())) {
//     return next();
//   }
  
//   redirectHandler(req, res, next);
// });

// Fallback for React SPA - this should catch all non-API routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Server successfully started on port 3000");
});

