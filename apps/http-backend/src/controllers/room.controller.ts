import { CreateRoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = CreateRoomSchema.safeParse(req.body);

    if (!success) {
      res
        .status(403)
        .json({ message: "Invaild input", error: JSON.parse(error.message) });
      return;
    }

    const slug = data.name.trim().replace(/\s+/g, "-");

    const room = await prisma.room.create({
      data: {
        slug,
        // @ts-ignore TODO: add types here
        adminId: req.userId,
      },
    });

    res.json({ room });
  } catch (error) {
    console.log("[ERROR] while creating chat", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.body.roomId;

    const room = await prisma.room.delete({
      where: { id: roomId },
    });

    res.json({ room });
  } catch (error) {
    console.log("[ERROR] while fetching room chats", error);
    res.json(500).json({ message: "Internal Server Error" });
  }
};

export const all = async (req: Request, res: Response) => {
  try {
    const rooms = await prisma.room.findMany({

      // @ts-ignore TODO: add types
      where: { adminId: req.userId },
    });

    res.json({ rooms });
  } catch (error) {
    console.log("[ERROR] while fetching room chats", error);
    res.json(500).json({ message: "Internal Server Error" });
  }
};
