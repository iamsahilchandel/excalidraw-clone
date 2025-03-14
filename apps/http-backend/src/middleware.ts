import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId: string;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    console.info("Unauthorized Request: User token not found.");
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET!);

  if (decoded && typeof decoded === "object" && "userId" in decoded) {
    // @ts-ignore 
    req.userId = decoded.userId;
  } else {
    console.info("Unauthorized Request: Invalid token.");
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  next();
}
