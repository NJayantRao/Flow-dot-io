import app from "./app.js";
import {ENV} from "./lib/env.js";
import connectRedis from "./lib/redis.js";

const port = ENV.PORT || 3002;

const startServer = async () => {
  try {
    await connectRedis();
    app.listen(port, () => {
      console.log(`✅✅ Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
  }
};

startServer();
