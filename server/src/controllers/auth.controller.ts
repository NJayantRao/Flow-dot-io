import {ENV} from "../lib/env.js";
import {prisma} from "../lib/prisma.js";
import {client} from "../lib/redis.js";
import {generateAccessToken, generateRefreshToken} from "../middlewares/jwt.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";
import {comparePassword, hashPassword} from "../utils/bcrypt.js";
import crypto from "crypto";
import {
  sendRegistrationEmail,
  sendResetPasswordMail,
} from "../utils/userMail.js";

/**
 * @route POST /auth/register
 * @desc Register user controller
 * @access public
 */
export const registerUser = AsyncHandler(async (req: any, res: any) => {
  const {username, email, password} = req.body;

  if (!username || !email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const existingUser = await prisma.user.findUnique({
    where: {email},
  });

  if (existingUser) {
    return res.status(400).json(new ApiError(400, "User already exists"));
  }

  const existingUsername = await prisma.user.findUnique({
    where: {username},
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
  });

  //access & refresh token
  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: ENV.NODE_ENV === "PRODUCTION",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  await client.set(`refresh-token:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60,
  });

  //generate verify email
  const verificationToken = crypto.randomBytes(32).toString("hex");
  await client.set(`verify-token:${user.id}`, verificationToken, {EX: 10 * 60});
  const verificationLink = `${req.protocol}://${req.get("host")}/api/v1/auth/verify-email?id=${user.id}&verifyToken=${verificationToken}`;
  await sendRegistrationEmail(user.email, user.username, verificationLink);

  return res.status(201).json(
    new ApiResponse(201, "User created successfully...", {
      accessToken,
      refreshToken,
    })
  );
});

/**
 * @route POST /auth/login
 * @desc Login user controller
 * @access public
 */
export const loginUser = AsyncHandler(async (req: any, res: any) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const user = await prisma.user.findUnique({where: {email}});

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  const isMatched = await comparePassword(password, user.password);
  if (!isMatched) {
    return res.status(401).json(new ApiError(401, "Invalid credentials"));
  }

  //access & refresh token
  const payload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: ENV.NODE_ENV === "PRODUCTION",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  await client.set(`refresh-token:${user.id}`, refreshToken, {
    EX: 7 * 24 * 60 * 60,
  });

  return res.status(200).json(
    new ApiResponse(200, "User logged in successfully...", {
      accessToken,
      refreshToken,
      user,
    })
  );
});

/**
 * @route GET /auth/verify-email
 * @desc Verify email controller
 * @access public
 */
export const verifyEmail = AsyncHandler(async (req: any, res: any) => {
  const {id, verifyToken} = req.query;

  // console.log(id,verify);

  const storedVerifyToken = await client.get(`verify-token:${id}`);

  if (verifyToken !== storedVerifyToken) {
    return res.status(400).json(new ApiError(400, "Email verification failed"));
  }

  const user = await prisma.user.update({
    where: {id},
    data: {isVerified: true},
  });

  await client.del(`verify-token:${user.id}`);

  res.status(200).json(new ApiResponse(200, "Email verified successfully"));
});

/**
 * @route POST /auth/logout
 * @desc logout user controller
 * @access private
 */
export const logoutUser = AsyncHandler(async (req: any, res: any) => {
  const userId = req.user.id;
  const options = {
    httpOnly: true,
    sameSite: "lax",
    secure: ENV.NODE_ENV === "PRODUCTION",
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);

  await client.del(`refresh-token:${userId}`);

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

/**
 * @route POST /auth/refresh-token
 * @desc Refresh access token controller
 * @access public
 */
export const refreshAccessToken = AsyncHandler(async (req: any, res: any) => {
  /*
1. get refresh token from cookies
2. check for token expiry
3. verify the refresh token matching with token in Redis
4. call generateToken() for access token
5. send token in cookies
  */
});

/**
 * @route POST /auth/forgot-password
 * @desc forgot password controller
 * @access public
 */
/*
1. get email from req.body
2. find user from db
3. generate 6-digit otp
4. store the otp & email in redis for 10 min
5. send otp in email
6. send response
  */
export const forgotPassword = AsyncHandler(async (req: any, res: any) => {
  const {email} = req.body;
  const user = await prisma.user.findUnique({where: {email}});

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  await client.set(`verify-otp:${user.email}`, otp, {EX: 10 * 60});
  await sendResetPasswordMail(user.email, user.username, otp);

  return res
    .status(200)
    .json(new ApiResponse(200, "OTP sent to email successfully", otp));
});

/**
 * @route POST /auth/reset-password
 * @desc reset password controller
 * @access public
 */
/*
1. get data from req.body
2. get otp from redis 
3. verify otp
4. update password in db
5. delete otp
6. send response
 */
export const resetPassword = AsyncHandler(async (req: any, res: any) => {
  const {email, otp, newPassword} = req.body;

  if (!email || !otp || !newPassword) {
    return res.status(400).json(new ApiError(400, "All fields are required"));
  }

  const storedOtp = await client.get(`verify-otp:${email}`);

  if (!storedOtp || otp.toString() !== storedOtp) {
    return res.status(400).json(new ApiError(400, "Invalid  OTP"));
  }

  const hashedPassword = await hashPassword(newPassword);

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {password: hashedPassword},
  });

  await client.del(`verify-otp:${email}`);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password reset successfully"));
});
