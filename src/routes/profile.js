import express from "express";
import { userAuth } from "../utils/userAuth.js";
import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err?.message, status: false });
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const updatedData = req.body;
    const allowedFields = ["firstName", "lastName", "age", "gender", "habits"];
    const isAllowed = Object.keys(updatedData).every((key) =>
      allowedFields.includes(key)
    );
    if (!isAllowed) {
      return res.status(400).json({ status: false, message: "Unable to edit" });
    }
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({
      status: true,
      data: user,
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err?.message, status: false });
  }
});

profileRouter.patch("/forgot-password", userAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { newPassword } = req.body;
    const isStrongPassword = validator.isStrongPassword(newPassword);

    if (!isStrongPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Password is not strong enough" });
    }
    const newHashPassword = await bcrypt.hash(newPassword, 12);
    const user = await User.findByIdAndUpdate(
      userId,
      { password: newHashPassword },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }
    res.status(200).json({ status: true, data: user });
  } catch (err) {
    res.status(500).json({ message: err?.message, status: false });
  }
});

export default profileRouter;
