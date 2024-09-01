import { Request } from "express";
import mongoose from "mongoose";
import { CustomRequest } from "../middleware/verifyToken";

export interface TrackingRequest extends CustomRequest {
  body: {
    foodId: mongoose.Types.ObjectId;
    quantity: number;
  };
  query: {
    createdAt?: string;
  };
}
