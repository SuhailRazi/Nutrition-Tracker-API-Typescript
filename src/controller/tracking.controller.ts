import { Response } from "express";
import { TrackingRequest } from "../types/Tracking.types";
import trackingModel, { Tracking } from "../models/tracking.model";
import foodModel from "../models/foods.model";
import { endOfDay, startOfDay } from "date-fns";

export const trackFood = async (req: TrackingRequest, res: Response) => {
  try {
    let trackData = req.body;
    let data = await trackingModel.create({ ...trackData, userId: req.userId });
    res.status(201).json({ data, message: "Tracking created" });
  } catch (error) {
    console.log(error);
  }
};

export const myFoods = async (req: TrackingRequest, res: Response) => {
  try {
    const query: any = { userId: req.userId };

    if (req.query.createdAt) {
      const date = new Date(req.query.createdAt);
      query.createdAt = {
        $gte: startOfDay(date),
        $lte: endOfDay(date),
      };
    }

    let data: Tracking[] = await trackingModel
      .find(query)
      .populate("foodId")
      .populate({
        path: "userId",
        select: "-password",
      });

    // const foodDetailPromise = data.map((item) =>
    //   foodModel.findById(item.foodId).lean()
    // );

    // const foodDetails = await Promise.all(foodDetailPromise);

    // const result = data.map((item, index) => ({
    //   ...item.toObject(),
    //   food: foodDetails[index],
    // }));

    res.status(201).json({ data });
  } catch (error) {
    console.log(error);
  }
};
