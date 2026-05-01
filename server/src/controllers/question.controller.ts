import { uploadFileToCloudinary } from "../lib/cloudinary.js";
import { prisma } from "../lib/prisma.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";

/**
 * -@route POST /questions
 * -@desc create question controller
 * -@access private
 */
export const createQuestion = AsyncHandler(async (req: any, res: any) => {
  const { title, content } = req.body;
  const id = req.user.id;
  let attachment = null;

  if (!title || !content) {
    return res
      .status(400)
      .json(new ApiError(400, "Title and content are required"));
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true },
  });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  if (req?.file) {
    const cloudinaryResult: any = await uploadFileToCloudinary(
      req?.file.buffer,
      "Flow_Questions"
    );
    attachment = cloudinaryResult.secure_url;
  }
  const authorId = user.id;

  //create question
  const question = await prisma.question.create({
    data: {
      title,
      content,
      attachmentId: attachment,
      authorId,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Question created successfully", question));
});

/**
 * -@route GET /questions
 * -@desc get questions controller
 * -@access public
 */
export const getQuestions = AsyncHandler(async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const totalQuestions = await prisma.question.count();

  const questions = await prisma.question.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(200).json(
    new ApiResponse(200, "Questions retrieved successfully", {
      questions,
      totalQuestions,
    })
  );
});

/**
 * -@route GET /questions/:questionId
 * -@desc get question by id controller
 * -@access public
 */
export const getQuestionById = AsyncHandler(async (req: any, res: any) => {
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: {
      id: questionId,
    },
    select: {
      id: true,
      title: true,
      content: true,
      attachmentId: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Question fetched successfully", question));
});

/**
 * -@route PUT /questions/:questionId
 * -@desc update question by id controller
 * -@access private
 */
export const updateQuestionById = AsyncHandler(async (req: any, res: any) => {
  const data = req.body;
  const { questionId } = req.params;
  const userId = req.user.id;
  let attachment = null;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }

  if (userId !== question.authorId) {
    return res
      .status(403)
      .json(
        new ApiError(403, "You are not authorized to update this question")
      );
  }
  if (req?.file) {
    const cloudinaryResult: any = await uploadFileToCloudinary(
      req?.file.buffer,
      "Flow_Questions"
    );
    attachment = cloudinaryResult.secure_url;
    data.attachmentId = attachment;
  }
  const updatedQuestion = await prisma.question.update({
    where: { id: questionId },
    data: data,
  });
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Question updated successfully", updatedQuestion)
    );
});

/**
 * -@route DELETE /questions/:questionId
 * -@desc delete question by id controller
 * -@access private
 */
export const deleteQuestionById = AsyncHandler(async (req: any, res: any) => {
  const { questionId } = req.params;

  const question = await prisma.question.findUnique({
    where: { id: questionId },
  });

  if (!question) {
    return res.status(404).json(new ApiError(404, "Question not found"));
  }

  if (req?.user?.id !== question.authorId) {
    return res
      .status(403)
      .json(
        new ApiError(403, "You are not authorized to delete this question")
      );
  }

  const deletedQuestion = await prisma.question.delete({
    where: { id: questionId },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Question deleted successfully", deletedQuestion)
    );
});
