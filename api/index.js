import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message || "Internal Server Error";
  return res.status(status).json({
    success: false,
    statusCode: status,
    message: msg,
  });
});
