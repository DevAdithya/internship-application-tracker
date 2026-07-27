import User from "../models/User.js";
import { verifyAccessToken } from "../utils/tokenUtils.js";

/**
 * Protect Middleware: Verifies JWT Access Token in Authorization header
 */
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Authentication failed. No token provided.",
        });
      }

      // Verify Access Token
      const decoded = verifyAccessToken(token);

      // Fetch user from DB (excluding password)
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User account associated with this token no longer exists.",
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: "This account has been deactivated.",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          code: "TOKEN_EXPIRED",
          message: "Access token has expired. Please refresh your token.",
        });
      }
      return res.status(401).json({
        success: false,
        message: "Not authorized. Invalid access token.",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Authorization token missing.",
    });
  }
};

/**
 * Optional Protect Middleware: Soft authentication (adds req.user if valid, doesn't block if missing)
 */
export const optionalProtect = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = verifyAccessToken(token);
        const user = await User.findById(decoded.id);
        if (user && user.isActive) {
          req.user = user;
        }
      }
    } catch (error) {
      // Ignore invalid/expired token for optional protect
    }
  }
  next();
};

/**
 * Role-Based Access Control (RBAC) Middleware
 * Usage: authorize("admin") or authorize("admin", "client")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required before checking permissions.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${req.user.role}' is not authorized to perform this action.`,
      });
    }

    next();
  };
};

/**
 * Admin Only Alias
 */
export const adminOnly = authorize("admin");
