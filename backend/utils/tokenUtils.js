import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "interntrack_access_secret_key_2026";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "interntrack_refresh_secret_key_2026";
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

/**
 * Generate short-lived JWT Access Token
 */
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES }
  );
};

/**
 * Generate long-lived JWT Refresh Token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
};

/**
 * Verify JWT Access Token
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET);
};

/**
 * Verify JWT Refresh Token
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};

/**
 * Send Refresh Token in secure HTTP-Only cookie
 */
export const sendRefreshTokenCookie = (res, refreshToken) => {
  const isProduction = process.env.NODE_ENV === "production";
  
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevents XSS access to token
    secure: isProduction, // HTTPS only in production
    sameSite: isProduction ? "strict" : "lax", // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/api/auth/refresh", // Restrict cookie path for safety
  });
};

/**
 * Clear Refresh Token HTTP-Only cookie
 */
export const clearRefreshTokenCookie = (res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("refreshToken", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "strict" : "lax",
    expires: new Date(0),
    path: "/api/auth/refresh",
  });
};
