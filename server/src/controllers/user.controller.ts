import { prisma } from "../lib/prisma.js";
import { client } from "../lib/redis.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { accessTokenOptions, refreshTokenOptions } from "../utils/constants.js";

/**
 * @route GET /users/profile
 * @desc get user profile controller
 * @access private
 */
const getProfile = AsyncHandler(async (req: any, res: any) => {
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
      createdAt: true,
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
 * @route PATCH /users/profile
 * @desc update user profile controller
 * @access private
 */
const updateProfile = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;

  const existingUser = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
    },
  });

  if (!existingUser) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const { username } = req.body;
  const existingUsername = await prisma.user.findUnique({
    where: { username },
    select: {
      username: true,
    },
  });

  if (existingUsername && existingUsername.username !== existingUser.username) {
    return res.status(400).json(new ApiError(400, "Username already exists"));
  }

  await prisma.user.update({
    where: { id },
    data: {
      username,
      avatarUrl: `https://api.dicebear.com/9.x/bottts/svg?seed=${username}`,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User profile updated successfully..."));
});

/**
 * @route PATCH /users/chage-password
 * @desc change user password controller
 * @access private
 */
const changePassword = AsyncHandler(async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  if (oldPassword === newPassword) {
    return res
      .status(400)
      .json(
        new ApiError(400, "New password must be different from old password")
      );
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  if (!user) {
    return res.status(401).json(new ApiError(401, "Invalid Credentials"));
  }
  if (!user.password) {
    return res
      .status(400)
      .json(
        new ApiError(
          400,
          "User registered via OAuth, password change not allowed"
        )
      );
  }

  const isMatched = await comparePassword(oldPassword, user.password);

  if (!isMatched) {
    return res.status(400).json(new ApiError(400, "Password is incorrect"));
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed successfully"));
});

/**
 * @route DELETE /users/profile
 * @desc delete user profile controller
 * @access private
 */
const deleteProfile = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;

  await prisma.user.delete({ where: { id } });
  await client.del(`refresh-token:${id}`);
  res.clearCookie("accessToken", accessTokenOptions);
  res.clearCookie("refreshToken", refreshTokenOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "User deleted successfully..."));
});

export { getProfile, updateProfile, changePassword, deleteProfile };
