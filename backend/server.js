import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import applicationRoutes from "./routes/applicationRoutes.js";
import sampleDataRoutes from "./routes/sampleDataRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/sample", sampleDataRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    message: "InternTrack Backend Service Active",
  });
});

// Start HTTP server immediately; attempt DB connection in background
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = "mongodb://127.0.0.1:27017/interntrack";

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 8000 });
    console.log("✅ MongoDB connected (Atlas)");
  } catch (err) {
    console.warn("⚠️  Atlas connection failed:", err.message);
    try {
      console.log("Trying local MongoDB fallback...");
      await mongoose.connect(fallbackUri, { serverSelectionTimeoutMS: 4000 });
      console.log("✅ MongoDB connected (Local)");
    } catch (fallbackErr) {
      console.error("❌ All DB connections failed. API routes that require DB will error.");
    }
  }
};

connectDB();