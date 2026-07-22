import express from "express";
import Application from "../models/Application.js";
import { optionalProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all applications (Client gets their own, Admin gets all)
router.get("/", optionalProtect, async (req, res) => {
  try {
    const { status, search, sortBy, viewAll } = req.query;
    let query = {};

    // Data isolation: If user is logged in as a client and not asking for public job directory, filter by userId
    if (req.user && req.user.role !== "admin" && viewAll !== "true") {
      query.$or = [{ userId: req.user._id }, { userId: { $exists: false } }];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      const searchRegex = new RegExp(search, "i");
      const searchConditions = [
        { company: searchRegex },
        { position: searchRegex },
        { location: searchRegex },
        { notes: searchRegex },
        { tags: searchRegex },
      ];

      if (query.$or) {
        query.$and = [{ $or: query.$or }, { $or: searchConditions }];
        delete query.$or;
      } else {
        query.$or = searchConditions;
      }
    }

    let sortOption = { createdAt: -1 };
    if (sortBy === "appliedDate") sortOption = { appliedDate: -1 };
    if (sortBy === "company") sortOption = { company: 1 };
    if (sortBy === "status") sortOption = { status: 1 };

    const applications = await Application.find(query).sort(sortOption);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single application by ID
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create an application
router.post("/", optionalProtect, async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.user) {
      payload.userId = req.user._id;
    }
    const application = await Application.create(payload);
    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Batch create applications (used for CSV import / seeding)
router.post("/batch", optionalProtect, async (req, res) => {
  try {
    const applications = req.body;
    if (!Array.isArray(applications)) {
      return res.status(400).json({ message: "Request body must be an array" });
    }
    const prepared = applications.map((app) => ({
      ...app,
      userId: req.user ? req.user._id : app.userId,
    }));
    const created = await Application.insertMany(prepared);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an application
router.put("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an application
router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete all applications (bulk reset)
router.delete("/", async (req, res) => {
  try {
    await Application.deleteMany({});
    res.json({ message: "All applications cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;