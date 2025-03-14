import { Request, Response } from "express";
import { prisma } from "@repo/db";
import { SigninSchema, UserSchema } from "@repo/common/types";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config";

export const login = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = SigninSchema.safeParse(req.body.data);

    if (!success) {
      res.status(403).json({ message: "invaild inputs", error: error.message });
      return;
    }

    const { email, password } = data;

    const user = await prisma.user.findOne({ email });

    if (!user) {
      console.info("[404] Email not found during login");
      res.status(404).json({ message: "either wrong email or password!" });
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user.id, email: email }, JWT_SECRET!);

    res.json({ token });
  } catch (error) {
    console.log("[ERROR] While Login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = UserSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({ message: "invaild inputs", error: error.message });
      return;
    }

    const { avatar, firstname, lastname, email, password, confirmPassword } =
      data;

    if (password !== confirmPassword) {
      res
        .status(403)
        .json({ message: "password and confirm password didn't match" });
      return;
    }

    const exiting_user = await prisma.user.findOne({ email });

    if (exiting_user) {
      res.status(403).json({ message: "You already have an account!" });
      return;
    }

    const hashed_password = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        avatar,
        firstname,
        lastname,
        email,
        password: hashed_password,
      },
    });

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.log("[ERROR] while login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
