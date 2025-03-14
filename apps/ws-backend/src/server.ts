import { WebSocket, WebSocketServer } from "ws";
import { JWT_SECRET, PORT } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "@repo/db";

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws, req) => {
  const url = req.url;
  if (!url) return ws.close();

  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token");
  if (!token) return ws.close();

  const userId = verifyUser(token);

  if (!userId) {
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async (message) => {
    let parsedData;

    if (typeof message !== "string") {
      parsedData = JSON.parse(message.toString());
    } else {
      parsedData = JSON.parse(message);
    }

    if (parsedData.type === "join_room") {
      const user = users.find((u) => u.ws === ws);
      if (!user) return;
      user.rooms.push(parsedData.roomId);
    }

    if (parsedData.type === "leave_room") {
      const user = users.find((u) => u.ws === ws);
      if (!user) return;
      user.rooms.filter((rid) => rid === parsedData.roomId);
    }

    if (parsedData.type === "chat") {
      const message = parsedData.message;
      const roomId = parsedData.roomId;

      // TODO: Implement Queues & Workers Here
      await prisma.chat.create({
        data: {
          roomId,
          userId,
          message,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
            })
          );
        }
      });
    }
  });
});

function verifyUser(token: string): string | null {
  const decode = jwt.verify(token, JWT_SECRET!);
  if (!decode || !(decode as JwtPayload).userId) return null;

  return (decode as JwtPayload).userId;
}
