import {ENV} from "../lib/env.js";

const options = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: ENV.NODE_ENV === "PRODUCTION",
};

export {options};
