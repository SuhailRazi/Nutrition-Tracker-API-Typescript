import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { LoginRequest, RegisterRequest } from "../types/User.types";

export const register = async (req: RegisterRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser._id });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser)
      return res.status(400).json({ message: "User does not exists" });

    const passwordValidity: boolean = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordValidity)
      return res.status(400).json({ message: "Password is wrong" });

    const tokenAge = 1000 * 60 * 60 * 7;

    const token = jwt.sign({ _id: existingUser._id }, "nutrition", {
      expiresIn: tokenAge,
    });
    res.status(200).json({ message: "Login success", token: token });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed", error });
  }
};
