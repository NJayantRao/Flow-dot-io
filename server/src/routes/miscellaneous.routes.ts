import express from "express";
import { getLeaderboard } from "../controllers/miscellaneous.controller.js";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);

export { router as miscRouter };
