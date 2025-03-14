import express, { Request, Response, Router } from "express";
import { middleware } from "./middleware";
import * as auth from "./controllers/auth.controller";
import * as room from "./controllers/room.controller";
import * as chat from "./controllers/chat.controller";

const router: Router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);

router.post("/room", middleware, room.create);
router.get("/rooms", middleware, room.all);
router.delete("/room", middleware, room.deleteRoom);

router.post("/chat", middleware, chat.create);
router.get("/chats", middleware, chat.all);

export default router;
