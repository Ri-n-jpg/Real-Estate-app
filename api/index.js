// index.js
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";

// 1️⃣ Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2️⃣ Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Mongo URI:", process.env.MONGO);
console.log("PORT:", process.env.PORT);

const app = express();
app.use(express.json());

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err,req,res,next)=>{
  const statusCode=err.statusCode||500;
  const message=err.message|| 'Internal Server Error';
  return res.status(statusCode).json({
success:false,
statusCode,
message
})});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("not connected"));