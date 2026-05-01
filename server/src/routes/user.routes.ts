import express from "express";
import { authMiddleware } from "../middlewares/jwt.js";
import {
  changePasswordValidation,
  usernameUpdateValidation,
} from "../middlewares/validator.js";
import {
  changePassword,
  deleteProfile,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.patch(
  "/change-password",
  authMiddleware,
  changePasswordValidation,
  changePassword
);
router.patch(
  "/profile",
  authMiddleware,
  usernameUpdateValidation,
  updateProfile
);
router.delete("/profile", authMiddleware, deleteProfile);

export { router as userRouter };
