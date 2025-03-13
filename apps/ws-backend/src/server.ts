import { WebSocketServer } from "ws";
import { JWT_SECRET, PORT } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({ port: PORT });

wss.on("connection", (ws, req) => {
  const url = req.url;
  if(!url) return ws.close();

  const params = new URLSearchParams(url.split("?")[1]);
  const token = params.get("token");
  if(!token) return ws.close();

  const decode = jwt.verify(token, JWT_SECRET!);
  if(!decode || !(decode as JwtPayload).userId) return ws.close();
  
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Received message => ${message}`);
  });
});
