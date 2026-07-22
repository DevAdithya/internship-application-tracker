import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "intern_track_secret_key_2026";

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password." });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone: phone || "",
      role: role === "admin" ? "admin" : "client",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar,
      bio: user.bio,
      resumeLink: user.resumeLink,
      preferredLocation: user.preferredLocation,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        avatar: user.avatar,
        bio: user.bio,
        resumeLink: user.resumeLink,
        preferredLocation: user.preferredLocation,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get user profile
// @route   GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update user profile (Photo, Email, Phone, Bio, Resume)
// @route   PUT /api/auth/profile
router.post("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.avatar = req.body.avatar || user.avatar;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.resumeLink = req.body.resumeLink !== undefined ? req.body.resumeLink : user.resumeLink;
    user.preferredLocation = req.body.preferredLocation !== undefined ? req.body.preferredLocation : user.preferredLocation;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
      resumeLink: updatedUser.resumeLink,
      preferredLocation: updatedUser.preferredLocation,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Also support PUT /api/auth/profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.avatar = req.body.avatar || user.avatar;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.resumeLink = req.body.resumeLink !== undefined ? req.body.resumeLink : user.resumeLink;
    user.preferredLocation = req.body.preferredLocation !== undefined ? req.body.preferredLocation : user.preferredLocation;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      phone: updatedUser.phone,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
      resumeLink: updatedUser.resumeLink,
      preferredLocation: updatedUser.preferredLocation,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Grant admin access to a specific email
// @route   POST /api/auth/make-admin
router.post("/make-admin", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User email not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({ message: `User ${user.email} has been granted Admin access!`, role: user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
