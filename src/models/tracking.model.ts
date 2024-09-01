import mongoose, { Document, Model, Schema } from "mongoose";

export interface Tracking extends Document {
  userId: mongoose.Types.ObjectId;
  foodId: mongoose.Types.ObjectId;
  quantity: number;
  eatenDate: Date;
}

const trackingSchema: Schema<Tracking> = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    foodId: {
      type: Schema.Types.ObjectId,
      ref: "Foods",
      required: true,
    },
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const trackingModel: Model<Tracking> = mongoose.model<Tracking>(
  "Tracking",
  trackingSchema
);

export default trackingModel;
