import express from "express";
import { validateUser } from "../utils/validateNewUser.js";
import User from "../models/userModel.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const newUser = req.body;
  try {
    validateUser(newUser); // validating all fields
    const user = new User(newUser);
    await user.generateHashPwd(); // storing pwd in hash format
    await user.save();
    res
      .status(201)
      .json({ status: true, message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: err?.message, status: false });
  }
});

authRouter.post("/login", async (req, res) => {
  const loginCreds = req.body;
  try {
    // validateLogin(loginCreds);
    const user = await User.findOne({ email: loginCreds?.email });
    if (!user?._id) {
      res.status(400).json({ message: "User does not exist", status: false });
    }
    const isMatch = await user.comparePwd(loginCreds.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials", status: false });
    }
    const token = await user.createToken();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    res.status(200).json({ status: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: err?.message, status: false });
  }
});

authRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({ status: true, message: "Logged out successfully" });
});

export default authRouter;
