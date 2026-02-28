import { prisma } from "../lib/prisma.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import { reputationActions } from "../utils/constants.js";

/**
 * -@route POST /questions/:questionId/upvote
 * -@desc upvote question controller
 * -@access private
 */
export const upvoteQuestion = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }
  //Avoid self vote
  if (userId === question.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot upvote your own question"));
  }

  const result = await prisma.$transaction(async (tx: any) => {
    const vote = await tx.vote.create({
      data: { votedById: userId, questionId, voteStatus: "UPVOTED" },
    });

    //update in user
    const updatedUser = await tx.user.update({
      where: { id: question.authorId },
      data: { reputation: { increment: reputationActions.QUESTION_UPVOTED } },
    });

    const updatedQuestion = await tx.question.update({
      where: { id: questionId },
      data: { voteCount: { increment: 1 } },
    });

    //reputation ledger
    const reputationLedger = await tx.reputationLedger.create({
      data: {
        userId: question.authorId,
        action: "QUESTION_UPVOTED",
        points: reputationActions.QUESTION_UPVOTED,
        questionId,
      },
    });

    return { vote, reputationLedger };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Question upvoted successfully", result));
});

/**
 * -@route POST /questions/:questionId/downvote
 * -@desc downvote question controller
 * -@access private
 */
export const downvoteQuestion = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }
  //Avoid self vote
  if (userId === question.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot downvote your own question"));
  }

  const result = await prisma.$transaction(async (tx: any) => {
    const vote = await tx.vote.create({
      data: { votedById: userId, questionId, voteStatus: "DOWNVOTED" },
    });

    //update in user
    const updatedUser = await tx.user.update({
      where: { id: question.authorId },
      data: { reputation: { decrement: reputationActions.QUESTION_DOWNVOTED } },
    });

    const updatedQuestion = await tx.question.update({
      where: { id: questionId },
      data: { voteCount: { decrement: 1 } },
    });

    //reputation ledger
    const reputationLedger = await tx.reputationLedger.create({
      data: {
        userId: question.authorId,
        action: "QUESTION_DOWNVOTED",
        points: reputationActions.QUESTION_DOWNVOTED,
        questionId,
      },
    });

    return { vote, reputationLedger };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Question downvoted successfully", result));
});

/**
 * -@route POST /answers/:answerId/upvote
 * -@desc upvote answer controller
 * -@access private
 */
export const upvoteAnswer = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { answerId } = req.params;

  const answer = await prisma.answer.findUnique({
    where: { id: answerId },
  });
  if (!answer) {
    return res.status(404).json(new ApiError(404, "Answer not found"));
  }
  //Avoid self vote
  if (userId === answer.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot upvote your own answer"));
  }

  const result = await prisma.$transaction(async (tx: any) => {
    const vote = await tx.vote.create({
      data: { votedById: userId, answerId, voteStatus: "UPVOTED" },
    });

    //update in user
    const updatedUser = await tx.user.update({
      where: { id: answer.authorId },
      data: { reputation: { increment: reputationActions.ANSWER_UPVOTED } },
    });

    const updatedAnswer = await tx.answer.update({
      where: { id: answerId },
      data: { voteCount: { increment: 1 } },
    });

    //reputation ledger
    const reputationLedger = await tx.reputationLedger.create({
      data: {
        userId: answer.authorId,
        action: "ANSWER_UPVOTED",
        points: reputationActions.ANSWER_UPVOTED,
        answerId,
      },
    });

    return { vote, reputationLedger };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Answer upvoted successfully", result));
});

/**
 * -@route POST /answers/:answerId/downvote
 * -@desc downvote answer controller
 * -@access private
 */
export const downvoteAnswer = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { answerId } = req.params;

  const answer = await prisma.answer.findUnique({
    where: { id: answerId },
  });
  if (!answer) {
    return res.status(404).json(new ApiError(404, "Answer not found"));
  }
  //Avoid self vote
  if (userId === answer.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot downvote your own answer"));
  }

  const result = await prisma.$transaction(async (tx: any) => {
    const vote = await tx.vote.create({
      data: { votedById: userId, answerId, voteStatus: "DOWNVOTED" },
    });

    //update in user
    const updatedUser = await tx.user.update({
      where: { id: answer.authorId },
      data: { reputation: { decrement: reputationActions.ANSWER_DOWNVOTED } },
    });

    const updatedAnswer = await tx.answer.update({
      where: { id: answerId },
      data: { voteCount: { decrement: 1 } },
    });

    //reputation ledger
    const reputationLedger = await tx.reputationLedger.create({
      data: {
        userId: answer.authorId,
        action: "ANSWER_DOWNVOTED",
        points: reputationActions.ANSWER_DOWNVOTED,
        answerId,
      },
    });

    return { vote, reputationLedger };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Answer downvoted successfully", result));
});

// update logic is to be added
