import dotenv from "dotenv";

dotenv.config({quiet: true});

const ENV = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT!,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  REDIS_URL: process.env.REDIS_URL!,
};

export {ENV};
