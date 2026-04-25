import swaggerAutogen from "swagger-autogen";
import { ENV } from "./env.js";

const doc = {
  info: {
    title: "Auth System",
    description:
      "A simple authentication system built with Node.js, Express, and Prisma.",
  },
  host: `${ENV.BACKEND_URL}`,
};

const outputFile = "../../swagger-output.json";
const endpointsFiles = ["./src/app.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc);
