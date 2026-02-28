import { ENV } from "../lib/env.js";

const baseOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: ENV.NODE_ENV === "PRODUCTION",
  maxAge: 15 * 60 * 1000,
};

const refreshTokenOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: ENV.NODE_ENV === "PRODUCTION",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const reputationActions = {
  QUESTION_UPVOTED: 5,
  ANSWER_UPVOTED: 10,
  ANSWER_ACCEPTED: 15,
  ANSWER_DOWNVOTED: 2,
  QUESTION_DOWNVOTED: 1,
};
export { baseOptions, refreshTokenOptions, reputationActions };
