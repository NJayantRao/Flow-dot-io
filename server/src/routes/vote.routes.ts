import express from "express";
import { authMiddleware } from "../middlewares/jwt.js";
import {
  downvoteAnswer,
  downvoteQuestion,
  upvoteAnswer,
  upvoteQuestion,
} from "../controllers/vote.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/questions/:questionId/upvote", authMiddleware, upvoteQuestion);
router.post(
  "/questions/:questionId/downvote",
  authMiddleware,
  downvoteQuestion
);
router.post("/answers/:answerId/upvote", authMiddleware, upvoteAnswer);
router.post("/answers/:answerId/downvote", authMiddleware, downvoteAnswer);

export { router as voteRouter };
