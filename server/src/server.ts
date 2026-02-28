import app from "./app.js";
import { ENV } from "./lib/env.js";

const port = ENV.PORT || 3002;

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`✅✅ Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server: ", error);
    process.exit(1);
  }
};

startServer();
