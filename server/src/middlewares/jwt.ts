import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.js";
import { ENV } from "../lib/env.js";

//payload interface for jwt token
export interface IPayload {
  id: string;
  email: string;
  role: string;
}

//authentication middleware to verify the jwt token
const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authorization = req.headers.authorization;

    const token = req?.cookies?.accessToken || authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json(new ApiError(401, "Token Missing"));
    }

    const decoded = jwt.verify(token, ENV.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json(new ApiError(401, "Token expired"));
    }
    return res.status(401).json(new ApiError(401, "Invalid Token"));
  }
};

//function to generate access token
const generateAccessToken = (userData: IPayload) => {
  const token = jwt.sign(userData, ENV.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

//function to generate access token
const generateRefreshToken = (userData: IPayload) => {
  const token = jwt.sign(userData, ENV.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

export { generateAccessToken, generateRefreshToken, authMiddleware };
