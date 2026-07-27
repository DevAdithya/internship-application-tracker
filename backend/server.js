import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import helmet from "./middleware/helmet.js";
import cookieParser from "./middleware/cookieParser.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import sampleDataRoutes from "./routes/sampleDataRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { apiLimiter } from "./middleware/rateLimiter.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// HTTP Security Headers
app.use(helmet());

// Cookie Parser Middleware for secure HTTP-Only refresh cookies
app.use(cookieParser());

// CORS Configuration with Credentials Support
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5001",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("CORS policy blocked this origin"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parsing Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Apply General Rate Limiter to all API routes
app.use("/api/", apiLimiter);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/sample", sampleDataRoutes);

// Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    message: "InternTrack Enterprise Backend Service Active",
  });
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

// Start HTTP server immediately; attempt DB connection in background
app.listen(PORT, () => {
  console.log(`🚀 Enterprise Backend Server running on http://localhost:${PORT}`);
});

const connectDB = async () => {
  const primaryUri = process.env.MONGO_URI;
  const fallbackUri = "mongodb://127.0.0.1:27017/interntrack";

  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(primaryUri, { serverSelectionTimeoutMS: 8000 });
    console.log("✅ MongoDB connected (Atlas)");
  } catch (err) {
    console.warn("⚠️ Atlas connection failed:", err.message);
    try {
      console.log("Trying local MongoDB fallback...");
      await mongoose.connect(fallbackUri, { serverSelectionTimeoutMS: 4000 });
      console.log("✅ MongoDB connected (Local)");
    } catch (fallbackErr) {
      console.error("❌ All DB connections failed. API routes requiring DB will error.");
    }
  }
};

connectDB();