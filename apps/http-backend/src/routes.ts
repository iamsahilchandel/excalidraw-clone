import express, { Request, Response, Router } from "express";
import { middleware } from "./middleware";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
import { UserSchema } from "@repo/common/types";

const router: Router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  const userId = 1;

  const token = jwt.sign({ userId }, JWT_SECRET!);

  res.json({ token });
});

router.post("/register", (req: Request, res: Response) => {
  const { success, data, error } = UserSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error.message });
  }

  const { name, email, password } = data;

  res.json({ message: "User registered successfully" });
});

router.post("/room", middleware, (req: Request, res: Response) => {
  res.json({ roomId: "1234" });
});

export default router;
