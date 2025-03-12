import express, { Express, Request, Response } from "express";
import cors from "cors";
import appRouter from "./routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up & running!");
});

app.use(appRouter);

export default app;
