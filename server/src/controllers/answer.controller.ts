import { prisma } from "../lib/prisma.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";

/**
 * -@route POST /question/:questionId/answers
 * -@desc create answer a question controller
 * -@access private
 */
export const createAnswer = AsyncHandler(async (req: any, res: any) => {
  const { content } = req.body;
  const userId = req.user.id;
  const { questionId } = req.params;

  const answer = await prisma.answer.create({
    data: {
      content,
      authorId: userId,
      questionId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Answer created successfully", answer));
});

/**
 * -@route GET /question/:questionId/answers
 * -@desc get all answers for a question controller
 * -@access public
 */
export const getAnswers = AsyncHandler(async (req: any, res: any) => {
  const { questionId } = req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const answers = await prisma.answer.findMany({
    where: {
      questionId,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });
  return res.status(200).json(
    new ApiResponse(200, "Answers retrieved successfully", {
      answers,
    })
  );
});
/**
 * -@route PUT /question/:questionId/answers/:answerId
 * -@desc update answer for a question controller
 * -@access private
 */
export const updateAnswerById = AsyncHandler(async (req: any, res: any) => {
  const data = req.body;
  const userId = req.user.id;
  const { questionId, answerId } = req.params;

  const answer = await prisma.answer.findUnique({ where: { id: answerId } });
  if (!answer)
    return res.status(404).json(new ApiError(404, "Answer not found"));

  if (userId !== answer.authorId) {
    return res
      .status(403)
      .json(new ApiError(403, "You are not authorized to update this answer"));
  }

  const updatedAnswer = await prisma.answer.update({
    where: { id: answerId },
    data: data,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, "Answer updated successfully", updatedAnswer));
});

/**
 * -@route DELETE /question/:questionId/answers/:answerId
 * -@desc delete answer of a question controller
 * -@access private
 */
export const deleteAnswerById = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { questionId, answerId } = req.params;

  const answer = await prisma.answer.findUnique({ where: { id: answerId } });
  if (!answer)
    return res.status(404).json(new ApiError(404, "Answer not found"));

  if (userId !== answer.authorId) {
    return res
      .status(403)
      .json(new ApiError(403, "You are not authorized to delete this answer"));
  }

  const deletedAnswer = await prisma.answer.delete({ where: { id: answerId } });

  return res
    .status(200)
    .json(new ApiResponse(200, "Answer deleted successfully", deletedAnswer));
});

/**
 * -@route PATCH /question/:questionId/answers/:answerId
 * -@desc mark answer as accepted for a question controller
 * -@access private
 */
export const markAnswerAsAccepted = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { questionId, answerId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });
  if (!question)
    return res.status(404).json(new ApiError(404, "Question not found"));

  const answer = await prisma.answer.findUnique({ where: { id: answerId } });
  if (!answer)
    return res.status(404).json(new ApiError(404, "Answer not found"));

  if (userId !== question.authorId) {
    return res
      .status(403)
      .json(
        new ApiError(
          403,
          "You are not authorized to update status of this question"
        )
      );
  }

  const updated = await prisma.answer.update({
    where: { id: answerId },
    data: { isAccepted: true },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Answer marked as accepted successfully", updated)
    );
});
