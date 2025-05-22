import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"


const app= express()
app.use(express.json())
connectDB();



app.use("/api/user",userRouter)

app.listen(3000,()=>{
    console.log("Server successfully started on port 3000")
})