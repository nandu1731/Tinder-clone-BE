import express from "express";
import connectDB from "./config/database.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";

const app = express();
const port = 3000;
dotenv.config();


// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser()); // middleware to parse cookies


// Routes
app.use("/", authRouter);
app.use("/profile", profileRouter);



// Starting server on successfull db connection
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err?.message);
  });
