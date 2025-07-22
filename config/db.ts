import mongoose from "mongoose";

const mongoUrl: string = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ft";

export const dbConnection = async () => {
  try {
    await mongoose.connect(mongoUrl);
  } catch {
    console.log("failed to connect to db");
  }
};
