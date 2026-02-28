import { prisma } from "../lib/prisma.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";

/**
 * -@route POST /question/:questionId/comments
 * -@desc create comment for question controller
 * -@access  private
 */
export const createQuestionComments = AsyncHandler(
  async (req: any, res: any) => {
    const userId = req.user.id;
    const { questionId } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: userId,
        questionId,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, "Comment created successfully", comment));
  }
);

/**
 * -@route GET /question/:questionId/comments
 * -@desc get comments for question controller
 * -@access public
 */
export const getQuestionComments = AsyncHandler(async (req: any, res: any) => {
  const { questionId } = req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const comments = await prisma.comment.findMany({
    where: {
      questionId,
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Comments fetched successfully", comments));
});

/**
 * -@route PUT /question/:questionId/comments/:commentId
 * -@desc update comment for question controller
 * -@access private
 */
export const updateQuestionComments = AsyncHandler(
  async (req: any, res: any) => {
    const data = req.body;
    const userId = req.user.id;
    const { questionId, commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment)
      return res.status(404).json(new ApiError(404, "Comment not found"));

    if (comment.questionId !== questionId) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid question reference"));
    }

    if (userId !== comment.authorId) {
      return res
        .status(403)
        .json(
          new ApiError(403, "You are not authorized to update this comment")
        );
    }

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: data,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Comment updated successfully", updatedComment)
      );
  }
);

/**
 * -@route DELETE /question/:questionId/comments/:commentId
 * -@desc delete comment for question controller
 * -@access private
 */
export const deleteQuestionComments = AsyncHandler(
  async (req: any, res: any) => {
    const userId = req.user.id;
    const { questionId, commentId } = req.params;

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment)
      return res.status(404).json(new ApiError(404, "Comment not found"));

    if (comment.questionId !== questionId) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid question reference"));
    }

    if (userId !== comment.authorId) {
      return res
        .status(403)
        .json(
          new ApiError(403, "You are not authorized to delete this Comment")
        );
    }

    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Comment deleted successfully", deletedComment)
      );
  }
);

/**
 * -@route POST /question/:questionId/answers/:answerId/comments
 * -@desc create comment for answer controller
 * -@access private
 */
export const createAnswerComments = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { questionId, answerId } = req.params;
  const { content } = req.body;

  const comment = await prisma.comment.create({
    data: {
      content,
      authorId: userId,
      answerId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Answer comment created successfully", comment));
});

/**
 * -@route GET /question/:questionId/answers/:answerId/comments
 * -@desc get comments for answer controller
 * -@access public
 */
export const getAnswerComments = AsyncHandler(async (req: any, res: any) => {
  const { questionId, answerId } = req.params;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const comments = await prisma.comment.findMany({
    where: { answerId },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Answer comments fetched", comments));
});

/**
 * -@route PUT /question/:questionId/answers/:answerId/comments/:commentId
 * -@desc  update comment for answer controller
 * -@access private
 */
export const updateAnswerComments = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { commentId, answerId } = req.params;
  const data = req.body;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment)
    return res.status(404).json(new ApiError(404, "Comment not found"));

  if (comment.answerId !== answerId)
    return res.status(400).json(new ApiError(400, "Invalid answer reference"));

  if (comment.authorId !== userId)
    return res
      .status(403)
      .json(new ApiError(403, "Not authorized to update this comment"));

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", updatedComment));
});

/**
 * -@route DELETE /question/:questionId/answers/:answerId/comments/:commentId
 * -@desc delete comment for answer controller
 * -@access private
 */
export const deleteAnswerComments = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const { commentId, answerId } = req.params;

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment)
    return res.status(404).json(new ApiError(404, "Comment not found"));

  if (comment.answerId !== answerId)
    return res.status(400).json(new ApiError(400, "Invalid answer reference"));

  if (comment.authorId !== userId)
    return res
      .status(403)
      .json(new ApiError(403, "Not authorized to delete this comment"));

  const deletedComment = await prisma.comment.delete({
    where: { id: commentId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment deleted successfully", deletedComment));
});
