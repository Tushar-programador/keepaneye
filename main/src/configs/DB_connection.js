import mongoose from "mongoose";
import { mongoURI } from "../configs/env.js";

// Connect to MongoDB
const DB_CONNECT = async () => {
  try {
    await  mongoose.connect(mongoURI);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
};
export default DB_CONNECT;
