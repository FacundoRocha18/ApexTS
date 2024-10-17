import { IMiddlewares } from "../Interfaces/Middlewares.interface";
import { Injectable } from "../Decorators/Injectable";
import { Request, Response } from "../types";

@Injectable()
export class Middlewares implements IMiddlewares {

	constructor() {
		console.log('Middlewares created: ', this);
	}

  public logger(req: Request, res: Response, next: () => void): void {
    console.log(`${req.method} ${req.url}`);

    next();
  };

  public auth(req: Request, res: Response, next: () => void): void {
    const authHeader = req.headers["authorization"];

    if (authHeader !== "Bearer valid-token") {
      res.statusCode = 401;
      res.end("Unauthorized");
      return null;
    }

    next();
  };
}
