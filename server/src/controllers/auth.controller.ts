import { ENV } from "../lib/env.js";
import { prisma } from "../lib/prisma.js";
import { client } from "../lib/redis.js";
import {
  generateAccessToken,
  generateRefreshToken,
  type IPayload,
} from "../middlewares/jwt.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import crypto from "crypto";
import {
  sendRegistrationEmail,
  sendResetPasswordMail,
} from "../utils/sendMail.js";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { accessTokenOptions, refreshTokenOptions } from "../utils/constants.js";

/**
 * @route POST /auth/register
 * @desc Register user controller
 * @access public
 */
const register = AsyncHandler(async (req: any, res: any) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    return res.status(400).json(new ApiError(400, "Username already exists"));
  }

  //hash password
  const hashedPassword = await hashPassword(password);
  const avatarUrl = `https://api.dicebear.com/9.x/bottts/svg?seed=${username}`;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      avatarUrl,
    },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  //access & refresh token
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  await client.set(`refresh-token:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60,
  });

  //generate verify email
  const verificationToken = crypto.randomBytes(32).toString("hex");
  await client.set(`verify-token:${user.id}`, verificationToken, {
    EX: 10 * 60,
  });
  const verificationLink = `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email?id=${user.id}&verifyToken=${verificationToken}`;
  sendRegistrationEmail(user.email, user.username, verificationLink);

  return res.status(201).json(
    new ApiResponse(201, "User created successfully...", {
      accessToken,
      refreshToken,
      user,
    })
  );
});

/**
 * @route POST /auth/login
 * @desc Login user controller
 * @access public
 */
const login = AsyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const isMatched = await comparePassword(password, user.password);
  if (!isMatched) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  //check if email is verified
  if (!user.isVerified) {
    return res
      .status(401)
      .json(new ApiError(401, "Please verify your email to login"));
  }

  //access & refresh token
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  res.cookie("accessToken", accessToken, accessTokenOptions);
  res.cookie("refreshToken", refreshToken, refreshTokenOptions);

  await client.set(`refresh-token:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60,
  });

  return res.status(200).json(
    new ApiResponse(200, "User logged in successfully...", {
      accessToken,
      refreshToken,
    })
  );
});

/**
 * @route POST /auth/logout
 * @desc logout user controller
 * @access private
 */
const logout = AsyncHandler(async (req: any, res: any) => {
  const { id } = req.user;
  const refreshToken = req?.cookies?.refreshToken;
  const storedRefreshToken = await client.get(`refresh-token:${id}`);
  if (!refreshToken || refreshToken !== storedRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  //black list refresh token
  await client.set(`blackList-token:${refreshToken}`, "BLOCKED", {
    EX: 7 * 24 * 60 * 60,
  });

  await client.del(`refresh-token:${id}`);

  res.clearCookie("accessToken", accessTokenOptions);
  res.clearCookie("refreshToken", refreshTokenOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

/**
 * @route GET /auth/verify-email
 * @desc Verify email controller
 * @access public
 */
const verifyEmail = AsyncHandler(async (req: any, res: any) => {
  const { id, verifyToken } = req.query;

  const storedVerifyToken = await client.get(`verify-token:${id}`);

  if (verifyToken !== storedVerifyToken) {
    return res.status(400).json(new ApiError(400, "Email verification failed"));
  }

  const user = await prisma.user.update({
    where: { id },
    data: { isVerified: true },
  });

  await client.del(`verify-token:${user.id}`);

  res.status(200).json(new ApiResponse(200, "Email verified successfully"));
});

/**
 * @route POST /auth/forgot-password
 * @desc forgot password controller
 * @access public
 */
const forgotPassword = AsyncHandler(async (req: any, res: any) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const otp = crypto.randomInt(100000, 999999);
  await client.set(`verify-otp:${user.email}`, otp, { EX: 10 * 60 });
  await sendResetPasswordMail(user.email, user.username, otp);

  return res
    .status(200)
    .json(new ApiResponse(200, "OTP sent to email successfully"));
});

/**
 * @route POST /auth/reset-password
 * @desc reset password controller
 * @access public
 */
const resetPassword = AsyncHandler(async (req: any, res: any) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const storedOtp = await client.get(`verify-otp:${email}`);

  if (!storedOtp || otp.toString() !== storedOtp) {
    return res.status(400).json(new ApiError(400, "Invalid  OTP"));
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: {
      email,
    },
    data: { password: hashedPassword },
  });

  await client.del(`verify-otp:${email}`);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});

/**
 * @route POST /auth/refresh-token
 * @desc Refresh access token controller
 * @access public
 */
const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const authorization = req?.headers?.authorization;
    const refreshToken =
      req?.cookies?.refreshToken || authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json(new ApiError(401, "Unauthorized request"));
    }
    const blacklisted = await client.get(`blackList-token:${refreshToken}`);
    if (blacklisted === "BLOCKED") {
      throw new ApiError(401, "Unauthorized request");
    }
    const decoded = jwt.verify(
      refreshToken,
      ENV.REFRESH_TOKEN_SECRET
    ) as IPayload;

    const { id, email, role } = decoded;

    const storedRefreshToken = await client.get(`refresh-token:${id}`);

    if (!storedRefreshToken || storedRefreshToken !== refreshToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Session expired. Please login again."));
    }
    const payload = {
      id,
      email,
      role,
    };
    const accessToken = generateAccessToken(payload);

    res.cookie("accessToken", accessToken, accessTokenOptions);

    return res.status(200).json(
      new ApiResponse(200, "Access token refreshed successfully", {
        accessToken,
      })
    );
  } catch (error: any) {
    console.error(error);

    return res
      .status(401)
      .json(new ApiError(401, "Session expired, Please login again"));
  }
};

export {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
};
