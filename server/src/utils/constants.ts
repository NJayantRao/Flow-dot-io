import { ENV } from "../lib/env.js";

const baseOptions = {
  httpOnly: true,
  sameSite:
    ENV.NODE_ENV === "PRODUCTION" ? ("none" as const) : ("lax" as const),
  secure: ENV.NODE_ENV === "PRODUCTION",
};

const accessTokenOptions = {
  ...baseOptions,
  maxAge: 15 * 60 * 1000,
};

const refreshTokenOptions = {
  ...baseOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const reputationActions = {
  QUESTION_UPVOTED: 5,
  ANSWER_UPVOTED: 10,
  ANSWER_ACCEPTED: 15,
  ANSWER_DOWNVOTED: 2,
  QUESTION_DOWNVOTED: 1,
};

export { accessTokenOptions, refreshTokenOptions, reputationActions };
