import { prisma } from "../lib/prisma.js";
import ApiResponse from "../utils/api-response.js";
import AsyncHandler from "../utils/async-handler.js";

/**
 * -@route GET /leaderboard
 * -@desc leaderboard controller
 * -@access public
 */
/**
 * 1. get top 10 users from users db
 * 2. using desc order on the reputation field
 * 3 send response
 */

export const getLeaderboard = AsyncHandler(async (req: any, res: any) => {
  const limit = 10;
  const elites = await prisma.user.findMany({
    orderBy: { reputation: "desc" },
    take: limit,
    select: {
      id: true,
      username: true,
      reputation: true,
    },
  });

  return res.status(200).json(new ApiResponse(200, "Meet our Elites", elites));
});
