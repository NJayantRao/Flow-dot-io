import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes.js";
import { userRouter } from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { questionRouter } from "./routes/question.routes.js";
import { answerRouter } from "./routes/answer.routes.js";
import { commentRouter } from "./routes/questionComment.routes.js";
import { answerCommentsRouter } from "./routes/answerComments.routes.js";
import { voteRouter } from "./routes/vote.routes.js";
import { miscRouter } from "./routes/miscellaneous.routes.js";
import { ENV } from "./lib/env.js";

const app = express();

app.use(
  cors({
    origin: [ENV.LOCAL_URL, ENV.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "multipart/form-data", "Authorization"],
  })
);

app.options(/.*/, cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Flow Server up n running...");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/questions/:questionId/answers", answerRouter);
app.use("/api/v1/questions/:questionId/comments", commentRouter);
app.use(
  "/api/v1/questions/:questionId/answers/:answerId/comments",
  answerCommentsRouter
);
app.use("/api/v1/votes", voteRouter);
app.use("/api/v1", miscRouter);
export default app;
