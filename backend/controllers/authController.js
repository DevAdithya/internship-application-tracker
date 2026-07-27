import User from "../models/User.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  sendRefreshTokenCookie,
  clearRefreshTokenCookie,
} from "../utils/tokenUtils.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
      });
    }

    // Create user (password is automatically hashed via schema pre-save hook)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone: phone || "",
      role: role === "admin" ? "admin" : "client",
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to user document for session revocation capability
    user.refreshTokens.push({ token: refreshToken });
    await user.save();

    // Set Refresh Token in secure HTTP-Only cookie
    sendRefreshTokenCookie(res, refreshToken);

    res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get tokens
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Explicitly select password field since it is omitted by default in schema
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email address or password.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "This account has been deactivated. Please contact support.",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user._id);

    // Update lastLogin and store refresh token
    user.lastLogin = new Date();
    user.refreshTokens.push({ token: refreshToken });

    // Limit active refresh tokens to max 5 devices
    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens.slice(-5);
    }

    await user.save();

    // Set Refresh Token in secure HTTP-Only cookie
    sendRefreshTokenCookie(res, refreshToken);

    res.json({
      success: true,
      message: "Logged in successfully.",
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Refresh Access Token using HTTP-Only Refresh Token cookie
 * @route   POST /api/auth/refresh
 * @access  Public (requires valid Refresh Token in cookie or body)
 */
export const refreshToken = async (req, res, next) => {
  try {
    // Read refresh token from HTTP-Only cookie or body fallback
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing. Please log in again.",
      });
    }

    // Verify token payload
    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch (err) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token. Please log in again.",
      });
    }

    // Find user and check if token exists in DB
    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: "User account no longer active or exists.",
      });
    }

    const tokenIndex = user.refreshTokens.findIndex((t) => t.token === token);
    if (tokenIndex === -1) {
      // Possible token reuse attack — clear all tokens for safety
      user.refreshTokens = [];
      await user.save();
      clearRefreshTokenCookie(res);
      return res.status(401).json({
        success: false,
        message: "Security warning: Refresh token revoked. Please log in again.",
      });
    }

    // Issue new Access Token and rotate Refresh Token
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user._id);

    // Replace old refresh token with new one
    user.refreshTokens[tokenIndex] = { token: newRefreshToken, createdAt: new Date() };
    await user.save();

    // Set new Refresh Token in HTTP-Only cookie
    sendRefreshTokenCookie(res, newRefreshToken);

    res.json({
      success: true,
      message: "Access token refreshed successfully.",
      accessToken: newAccessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user & invalidate refresh token
 * @route   POST /api/auth/logout
 * @access  Public / Private
 */
export const logout = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;

    if (token) {
      try {
        const decoded = verifyRefreshToken(token);
        const user = await User.findById(decoded.id);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter((t) => t.token !== token);
          await user.save();
        }
      } catch (err) {
        // Token already expired/invalid, clear cookie anyway
      }
    }

    clearRefreshTokenCookie(res);

    res.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private (Protected)
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile
 * @access  Private (Protected)
 */
export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User profile not found.",
      });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
    user.phone = req.body.phone !== undefined ? req.body.phone : user.phone;
    user.avatar = req.body.avatar || user.avatar;
    user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
    user.resumeLink = req.body.resumeLink !== undefined ? req.body.resumeLink : user.resumeLink;
    user.preferredLocation = req.body.preferredLocation !== undefined ? req.body.preferredLocation : user.preferredLocation;

    if (req.body.password) {
      user.password = req.body.password; // Schemas pre-save hook will hash password
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Grant Admin access to a user
 * @route   POST /api/auth/make-admin
 * @access  Private (Admin Only)
 */
export const makeAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "User email address is required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account with this email not found.",
      });
    }

    user.role = "admin";
    await user.save();

    res.json({
      success: true,
      message: `User ${user.email} has been granted Admin privileges.`,
      user,
    });
  } catch (error) {
    next(error);
  }
};
