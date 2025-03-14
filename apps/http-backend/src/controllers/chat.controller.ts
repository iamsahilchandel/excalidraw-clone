import { ChatSchema } from "@repo/common/types";
import { prisma } from "@repo/db";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
      const { success, data, error } = ChatSchema.safeParse(req.body);
  
      if (!success) {
        res
          .status(403)
          .json({ message: "Invaild input", error: JSON.parse(error.message) });
        return;
      }
  
      const chat = await prisma.chat.create({
        data: {
          message: data.message,
          roomId: data.roomId,
          userId: data.userId,
        },
      });
  
      res.json({ chat });
    } catch (error) {
      console.log("[ERROR] while creating chat", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
};

export const all = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.roomId;

    const chats = await prisma.chat.findMany({
      where: { roomId },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });

    res.json({ chats });
  } catch (error) {
    console.log("[ERROR] while fetching room chats", error);
    res.json(500).json({ message: "Internal Server Error" });
  }
};
