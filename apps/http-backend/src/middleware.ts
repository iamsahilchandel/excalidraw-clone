import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    console.info("Unauthorized Request: User token not found.");
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  const decoded = jwt.verify(token, JWT_SECRET!);

  if (decoded) {
    // @ts-ignore - TODO: add types for decoded.userId
    req.body.userId = decoded.userId;
  } else {
    console.info("Unauthorized Request: Invalid token.");
    res.status(403).json({ message: "Unauthorized" });
    return;
  }

  next();
}
