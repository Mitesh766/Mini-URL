import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"


const app= express()

connectDB();




app.listen(3000,()=>{
    console.log("Server successfully started on port 3000")
})