import cors from "cors"; // Import the CORS middleware
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(cors()); // Use CORS middleware to allow requests from the frontend
app.use(express.json());
app.use("/api/auth", authRoutes); // All the routes defined in auth.js will be prefixed with /api/auth

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});