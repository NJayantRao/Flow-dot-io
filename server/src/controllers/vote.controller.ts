import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import { reputationActions } from "../utils/constants.js";

/**
 * @route POST /questions/:questionId/upvote
 * @desc upvote question controller
 * @access private
 */
const upvoteQuestion = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }
  //Avoid self vote
  if (id === question.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot upvote your own question"));
  }
  let result;
  try {
    result = await prisma.$transaction(async (tx: any) => {
      const vote = await tx.vote.create({
        data: { votedById: id, questionId, voteStatus: "UPVOTED" },
      });

      //update in user
      const updatedUser = await tx.user.update({
        where: { id: question.authorId },
        data: { reputation: { increment: reputationActions.QUESTION_UPVOTED } },
        select: {
          id: true,
          avatarUrl: true,
          reputation: true,
          username: true,
        },
      });

      const updatedQuestion = await tx.question.update({
        where: { id: questionId },
        data: { voteCount: { increment: 1 } },
      });

      console.log(updatedUser);
      console.log(updatedQuestion);

      return { vote, updatedUser, updatedQuestion };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json(new ApiError(400, "You have already upvoted this question"));
      }
    }
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while upvoting the question"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Question upvoted successfully", result));
});

/**
 * @route POST /questions/:questionId/downvote
 * @desc downvote question controller
 * @access private
 */
const downvoteQuestion = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }
  //Avoid self vote
  if (id === question.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot downvote your own question"));
  }
  let result;
  try {
    result = await prisma.$transaction(async (tx: any) => {
      const vote = await tx.vote.create({
        data: { votedById: id, questionId, voteStatus: "DOWNVOTED" },
      });

      //update in user
      const updatedUser = await tx.user.update({
        where: { id: question.authorId },
        data: {
          reputation: { decrement: reputationActions.QUESTION_DOWNVOTED },
        },
        select: {
          id: true,
          avatarUrl: true,
          reputation: true,
          username: true,
        },
      });

      const updatedQuestion = await tx.question.update({
        where: { id: questionId },
        data: { voteCount: { decrement: 1 } },
      });

      return { vote, updatedUser, updatedQuestion };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json(new ApiError(400, "You have already downvoted this question"));
      }
    }
    return res
      .status(500)
      .json(
        new ApiError(500, "An error occurred while downvoting the question")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Question downvoted successfully", result));
});

/**
 * @route POST /answers/:answerId/upvote
 * @desc upvote answer controller
 * @access private
 */
const upvoteAnswer = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  const { answerId } = req.params;

  const answer = await prisma.answer.findUnique({
    where: { id: answerId },
  });
  if (!answer) {
    return res.status(404).json(new ApiError(404, "Answer not found"));
  }
  //Avoid self vote
  if (id === answer.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot upvote your own answer"));
  }

  let result;
  try {
    result = await prisma.$transaction(async (tx: any) => {
      const vote = await tx.vote.create({
        data: { votedById: id, answerId, voteStatus: "UPVOTED" },
      });

      //update in user
      const updatedUser = await tx.user.update({
        where: { id: answer.authorId },
        data: { reputation: { increment: reputationActions.ANSWER_UPVOTED } },
        select: {
          id: true,
          avatarUrl: true,
          reputation: true,
          username: true,
        },
      });

      const updatedAnswer = await tx.answer.update({
        where: { id: answerId },
        data: { voteCount: { increment: 1 } },
      });
      return { vote, updatedUser, updatedAnswer };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json(new ApiError(400, "You have already upvoted this answer"));
      }
    }
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while upvoting the answer"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Answer upvoted successfully", result));
});

/**
 * @route POST /answers/:answerId/downvote
 * @desc downvote answer controller
 * @access private
 */
const downvoteAnswer = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  const { answerId } = req.params;

  const answer = await prisma.answer.findUnique({
    where: { id: answerId },
  });
  if (!answer) {
    return res.status(404).json(new ApiError(404, "Answer not found"));
  }
  //Avoid self vote
  if (id === answer.authorId) {
    return res
      .status(400)
      .json(new ApiError(400, "You cannot downvote your own answer"));
  }
  let result;
  try {
    result = await prisma.$transaction(async (tx: any) => {
      const vote = await tx.vote.create({
        data: { votedById: id, answerId, voteStatus: "DOWNVOTED" },
      });

      //update in user
      const updatedUser = await tx.user.update({
        where: { id: answer.authorId },
        data: { reputation: { decrement: reputationActions.ANSWER_DOWNVOTED } },
        select: {
          id: true,
          avatarUrl: true,
          reputation: true,
          username: true,
        },
      });

      const updatedAnswer = await tx.answer.update({
        where: { id: answerId },
        data: { voteCount: { decrement: 1 } },
      });

      return { vote, updatedUser, updatedAnswer };
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json(new ApiError(400, "You have already downvoted this answer"));
      }
    }
    return res
      .status(500)
      .json(new ApiError(500, "An error occurred while downvoting the answer"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Answer downvoted successfully", result));
});

export { upvoteQuestion, downvoteQuestion, upvoteAnswer, downvoteAnswer };

// TODO: FUNCTIONALITY TO AUTO TOGGLE VOTE (IF UPVOTED THEN DOWNVOTE AND VICE VERSA) AND ALSO TO CHANGE VOTE STATUS (IF UPVOTED THEN CHANGE TO DOWNVOTE AND VICE VERSA)
