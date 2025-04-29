import express from "express";
import connectDB from "./config/database.js";
import User from "./models/userModel.js";

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.post("/signup", async (req, res) => {
  const newUser = req.body;
  try {
    const user = new User(newUser);
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// GET all users

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
});

// GET user by email

// app.get("/feed", async (req, res) => {
//   try {
//     const { email } = req.query;
//     const user = await User.find({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error fetching user", error: err.message });
//   }
// });

// Delete user by id

app.delete("/feed", async (req, res) => {
  try {
    const { id } = req.query;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
});

// Update user by id
app.patch("/feed", async (req, res) => {
  try {
    const { id } = req.query;
    const updatedUser = req.body;
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      runValidators: true,
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

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
