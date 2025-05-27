import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import urlRouter from "./routes/urlRoutes.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors"

const app = express();


const corsOptions = {
  origin: "https://mini-url-1.onrender.com", 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(helmet());
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/url", urlRouter);

app.listen(3000, () => {
  console.log("Server successfully started on port 3000");
});
