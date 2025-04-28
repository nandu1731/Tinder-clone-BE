import mongoose from "mongoose";

async function connectDB() {
  const res = await mongoose.connect(
    "mongodb+srv://harinandinib:v4CjyweBMozbAtXR@cluster0.r1sog8d.mongodb.net/DEV_TINDER"
  );
  return res;
}

export default connectDB;
