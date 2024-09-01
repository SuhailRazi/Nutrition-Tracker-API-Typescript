import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId?: string;
}

const SECRET_KEY = "nutrition";

export async function verifyToken(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // Check if the authorization header is present
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token not found" });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      if (decoded && typeof decoded !== "string") {
        req.userId = decoded._id as string;
      }

      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}
