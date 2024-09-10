import dotenv from "dotenv";
import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import eventRouter from "./routes/eventRoutes";
import ticketRouter from "./routes/ticketRoutes";
import userRouter from "./routes/userRoutes";
import { swaggerDocs } from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.use("/api/auth", userRouter);
    app.use("/api/events", eventRouter);
    app.use("/api/tickets", ticketRouter);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Initialize Swagger docs
swaggerDocs(app);

export default app;
