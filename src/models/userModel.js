import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name must be at least 3 characters"],
      maxLength: [20, "First name is too long"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      validate(value) {
        if (validator.isEmail(value)) return true;
        return false;
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validator(value) {
        if (validator.isStrongPassword(value)) return true;
        return false;
      },
    },
    gender: {
      type: String,
      // validate(value) {
      //   if (["male", "female", "other"].includes(value)) return true;
      //   return false;
      // },
      lowercase: true,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not supported",
      },
    },
    habits: {
      type: [String],
      required: [true, "Habits are required"],

      validate: {
        validator: function (v) {
          return v.length > 0 && v.length <= 3;
        },
      },
    },
    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
      max: [100, "Age is too high"],
      required: function () {
        return this.gender === "female" ? [true, "Age is required"] : false;
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
