import express, { Request, Response, Router } from "express";
import { middleware } from "./middleware";
import * as auth from "./controllers/auth.controller";
import * as room from "./controllers/room.controller"

const router: Router = express.Router();

router.post("/login", auth.login);
router.post("/register", auth.register);

router.post("/room", middleware, room.create);

export default router;
