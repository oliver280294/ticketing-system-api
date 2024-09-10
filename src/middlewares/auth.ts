import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// import { AppDataSource } from "./data-source";
// import { User } from "./entities/User";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch {
    console.log("Unauthorized;;;;");
    return res.status(401).json({ message: "Unauthorized" });
  }
};
