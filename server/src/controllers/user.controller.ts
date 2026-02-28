import { prisma } from "../lib/prisma.js";
import { client } from "../lib/redis.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import { baseOptions, refreshTokenOptions } from "../utils/constants.js";

/**
 * @route GET /user/profile
 * @desc get user profile controller
 * @access private
 */
export const getUserProfile = AsyncHandler(async (req: any, res: any) => {
  const id = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      email: true,
      avatarUrl: true,
      role: true,
      isVerified: true,
      reputation: true,
    },
  });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched successfully...", user));
});

/**
 * @route PATCH /user/profile
 * @desc update user profile controller
 * @access private
 */
export const updateUserProfile = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
    },
  });

  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  const { username } = req.body;

  const users = await prisma.user.findFirst({
    where: { username },
    select: {
      username: true,
    },
  });
  if (users) {
    return res.status(400).json(new ApiError(400, "Username already exists"));
  }

  await prisma.user.update({ where: { id: userId }, data: { username } });

  return res
    .status(200)
    .json(new ApiResponse(200, "User profile updated successfully..."));
});

/**
 * @route DELETE /user/
 * @desc delete user profile controller
 * @access private
 */
export const deleteUser = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;

  await prisma.user.delete({ where: { id: userId } });
  await client.del(`refresh-token:${userId}`);
  res.clearCookie("accessToken", baseOptions);
  res.clearCookie("refreshToken", refreshTokenOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "User deleted successfully..."));
});
