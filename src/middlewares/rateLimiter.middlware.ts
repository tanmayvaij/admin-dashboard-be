import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: {
    message: "Too many requests from this IP. Please try again after a minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
