import mongoose, { Schema, Document, Model } from "mongoose";

interface Food extends Document {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  fiber: string;
  carbohydrate: string;
  createdById?: string;
}

const foodSchema: Schema<Food> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    calories: {
      type: String,
      required: true,
    },
    protein: {
      type: String,
      required: true,
    },
    fat: {
      type: String,
      required: true,
    },
    fiber: {
      type: String,
      required: true,
    },
    carbohydrate: {
      type: String,
      required: true,
    },
    createdById: {
      type: String,
    },
  },
  { timestamps: true }
);

const foodModel: Model<Food> = mongoose.model<Food>("Foods", foodSchema);

export default foodModel;
