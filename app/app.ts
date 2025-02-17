import { config } from "dotenv";
config();
import express from "express";
import { registerRoutes } from "./modules/routes/routes.register";
import { setupSwagger } from "./utility/swagger";

export const app = express();

export const startServer = async () => {
  try {
    registerRoutes(app);
    setupSwagger(app);

    const { PORT } = process.env;
    const server = app.listen(PORT || 3000, () =>
      console.log(`SERVER RUNNING ON PORT: ${PORT}`)
    );
    return server;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
