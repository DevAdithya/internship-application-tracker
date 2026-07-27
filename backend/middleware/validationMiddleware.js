import { body, validationResult } from "express-validator";

/**
 * Middleware to handle express-validator errors
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
    }));
    return res.status(400).json({
      success: false,
      message: extractedErrors[0]?.message || "Validation error",
      errors: extractedErrors,
    });
  }
  next();
};

/**
 * Registration Validation Rules
 */
export const registerValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(["client", "admin"])
    .withMessage("Role must be either client or admin"),
];

/**
 * Login Validation Rules
 */
export const loginValidationRules = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

/**
 * Profile Update Validation Rules
 */
export const profileValidationRules = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 50 }),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("phone").optional().trim(),
  body("bio").optional().trim(),
  body("resumeLink").optional().trim().isURL({ require_protocol: false }).withMessage("Invalid URL link"),
];
