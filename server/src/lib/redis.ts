import {createClient} from "redis";
import {ENV} from "./env.js";

const connectRedis = async () => {
  try {
    if (!ENV.REDIS_URL) {
      throw new Error("REDIS_URL is not defined in environment variables");
    }
    const client = createClient({url: ENV.REDIS_URL});

    if (!client) {
      throw new Error("Failed to create Redis client");
    }

    client.on("connect", () => {
      console.log("Redis connected successfully...");
    });

    client.on("error", (err) => {
      console.log("Redis connection error: ", err);
    });
    await client.connect();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectRedis;
