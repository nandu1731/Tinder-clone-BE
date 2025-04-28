import express from "express";
import { userAuth } from "./middleware/auth.js";

const app = express();
const port = 3000;

// 🔥 Serve static files first
app.use(express.static("src/public"));

// userAuth is working as middleware
app.use("/", userAuth, (req, res, next) => {
  // throw new Error("Something went wrong!");
  res.send("Hello World!");
});

app.use("/", (err, req, res, next) => {
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
