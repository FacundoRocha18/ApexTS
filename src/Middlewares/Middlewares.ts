import { Request, Response } from "../types";
import { IMiddlewares } from "./Middlewares.interface";

export class Middlewares implements IMiddlewares {
  public logger = (req: Request, res: Response, next: () => void) => {
    console.log(`${req.method} ${req.url}`);

    next();
  };

  public auth = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers["authorization"];

    if (authHeader !== "Bearer valid-token") {
      res.statusCode = 401;
      res.end("Unauthorized");
      return null;
    }

    next();
  };
}
