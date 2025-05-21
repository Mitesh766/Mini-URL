import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected Successfully");
  } catch (error) {
    console.error("Error connecting the database", error);
    process.exit(1);
  }
}

export default connectDB;
