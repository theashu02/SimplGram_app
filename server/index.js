import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("MongoDB connected successfully");

    // Print the MongoDB server address
    const db = mongoose.connection;
    console.log("MongoDB Server Address:", db.host, db.port);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
