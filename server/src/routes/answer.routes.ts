import express from "express";
import {
  createAnswer,
  deleteAnswerById,
  getAnswers,
  markAnswerAsAccepted,
  updateAnswerById,
} from "../controllers/answer.controller.js";
import { authMiddleware } from "../middlewares/jwt.js";

const router = express.Router({ mergeParams: true });

router.post("/", authMiddleware, createAnswer);
router.get("/", getAnswers);
router.put("/:answerId", authMiddleware, updateAnswerById);
router.patch("/:answerId/accepted", authMiddleware, markAnswerAsAccepted);
router.delete("/:answerId", authMiddleware, deleteAnswerById);

export { router as answerRouter };
