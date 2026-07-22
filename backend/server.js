import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import applicationRoutes from "./routes/applicationRoutes.js";
import sampleDataRoutes from "./routes/sampleDataRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationRoutes);
app.use("/api/sample", sampleDataRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "online", message: "InternTrack Backend Service Active" });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Backend server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

startServer();