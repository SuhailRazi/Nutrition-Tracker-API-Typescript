import { Request, Response } from "express";
import foodModel from "../models/foods.model";
import { foodQuery } from "../types/Food.types";

export async function getAllFood(
  req: Request<{}, {}, {}, foodQuery>,
  res: Response
) {
  try {
    const { name } = req.query;

    let searchQuery: any = {};

    if (name) {
      searchQuery.name = { $regex: new RegExp(name, "i") };
    }

    const foods = await foodModel.find(searchQuery);

    if (foods.length == 0) {
      res.status(200).json({ message: "No foods present" });
    } else if (foodModel.length > 0) {
      res.status(200).json(foods);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
