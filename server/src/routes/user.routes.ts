import express from "express";
import {
  changePassword,
  deleteUser,
  forgotPassword,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateUserProfile,
  verifyEmail,
} from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/jwt.js";

const router = express.Router();
const userRouter = router;

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-email", verifyEmail);
router.post("/refresh-token", refreshAccessToken);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", authMiddleware, logoutUser);

router.get("/profile", authMiddleware, getUserProfile);
router.patch("/profile", authMiddleware, updateUserProfile);
router.put("/password", authMiddleware, changePassword);
router.delete("/", authMiddleware, deleteUser);

export {userRouter};
