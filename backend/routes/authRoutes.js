import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  updateProfile,
  makeAdmin,
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import {
  registerValidationRules,
  loginValidationRules,
  profileValidationRules,
  validate,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user account
// @access  Public (Rate limited)
router.post("/register", authLimiter, registerValidationRules, validate, register);

// @route   POST /api/auth/login
// @desc    Authenticate user & return access token + HTTP-only refresh token cookie
// @access  Public (Rate limited)
router.post("/login", authLimiter, loginValidationRules, validate, login);

// @route   POST /api/auth/refresh
// @desc    Refresh access token using HTTP-only refresh cookie
// @access  Public (Rate limited)
router.post("/refresh", authLimiter, refreshToken);

// @route   POST /api/auth/logout
// @desc    Logout user & clear refresh token
// @access  Public / Private
router.post("/logout", logout);

// @route   GET /api/auth/me
// @desc    Get current authenticated user
// @access  Private
router.get("/me", protect, getMe);

// @route   PUT /api/auth/profile
// @desc    Update profile details
// @access  Private
router.put("/profile", protect, profileValidationRules, validate, updateProfile);
router.post("/profile", protect, profileValidationRules, validate, updateProfile); // Legacy POST alias

// @route   POST /api/auth/make-admin
// @desc    Grant admin access to a user
// @access  Private (Admin Only)
router.post("/make-admin", protect, adminOnly, makeAdmin);

export default router;
