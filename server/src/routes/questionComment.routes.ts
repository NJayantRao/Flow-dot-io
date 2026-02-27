import express from "express";
import { authMiddleware } from "../middlewares/jwt.js";
import {
  createQuestionComments,
  deleteQuestionComments,
  getQuestionComments,
  updateQuestionComments,
} from "../controllers/comment.controller.js";

const router = express.Router({ mergeParams: true });

//question comments
router.post("/", authMiddleware, createQuestionComments);
router.get("/", getQuestionComments);
router.put("/:commentId", authMiddleware, updateQuestionComments);
router.delete("/:commentId", authMiddleware, deleteQuestionComments);

export { router as commentRouter };
