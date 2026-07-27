/**
 * Not Found (404) Handler Middleware
 */
export const notFound = (req, res, next) => {
  const error = new Error(`Resource Not Found — ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * Global Error Handler Middleware
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const isProduction = process.env.NODE_ENV === "production";

  // Log error in development
  if (!isProduction) {
    console.error("🔥 Global Error Handler:", err.stack || err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
};
