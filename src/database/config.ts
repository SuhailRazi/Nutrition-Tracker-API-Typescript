import mongoose, { mongo } from "mongoose";

const uri = "mongodb://localhost:27017/nutrition-tracker";

export const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
