import express from "express";
import { authMiddleware } from "../middlewares/jwt.js";
import {
  createAnswerComments,
  deleteAnswerComments,
  getAnswerComments,
  updateAnswerComments,
} from "../controllers/comment.controller.js";
const router = express.Router({ mergeParams: true });

//answer comments
router.post("/", authMiddleware, createAnswerComments);
router.get("/", getAnswerComments);
router.put("/:commentId", authMiddleware, updateAnswerComments);
router.delete("/:commentId", authMiddleware, deleteAnswerComments);

export { router as answerCommentsRouter };
