import { Request } from "express";

export interface FoodRequest extends Request {
  body: {
    name: string;
    calories: string;
    protein: string;
    fat: string;
    fiber: string;
    carbohydrate: string;
    createdById?: string;
  };
}

export interface foodQuery {
  name?: string;
}
