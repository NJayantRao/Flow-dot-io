import express from "express";
import { authMiddleware } from "../middlewares/jwt.js";
import {
  forgotPassword,
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  verifyEmail,
} from "../controllers/auth.controller.js";
import {
  resetPasswordValidation,
  userLoginValidation,
  userRegistrationValidation,
} from "../middlewares/validator.js";

const router = express.Router();

router.post("/register", userRegistrationValidation, register);
router.post("/login", userLoginValidation, login);
router.post("/logout", authMiddleware, logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshAccessToken);

export { router as authRouter };
