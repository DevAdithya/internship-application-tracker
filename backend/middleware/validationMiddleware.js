/**
 * Native validation middleware (express-validator alternative)
 */
export const validate = (req, res, next) => {
  next();
};

export const registerValidationRules = (req, res, next) => {
  const { name, email, password } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: "Name is required." });
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address." });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: "Password must be at least 6 characters long." });
  }

  next();
};

export const loginValidationRules = (req, res, next) => {
  const { email, password } = req.body || {};

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address." });
  }

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required." });
  }

  next();
};

export const profileValidationRules = (req, res, next) => {
  const { email } = req.body || {};

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address." });
  }

  next();
};
