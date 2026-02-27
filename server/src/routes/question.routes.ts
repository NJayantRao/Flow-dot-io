import express from "express";
import {authMiddleware} from "../middlewares/jwt.js";
import {
  createQuestion,
  deleteQuestionById,
  getQuestionById,
  getQuestions,
  updateQuestionById,
} from "../controllers/question.controller.js";
import {upload} from "../lib/multer.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("attachmentId"), createQuestion);
router.get("/", getQuestions);
router.get("/:questionId", getQuestionById);
router.put(
  "/:questionId",
  authMiddleware,
  upload.single("attachmentId"),
  updateQuestionById
);
router.delete("/:questionId", authMiddleware, deleteQuestionById);

export {router as questionRouter};
