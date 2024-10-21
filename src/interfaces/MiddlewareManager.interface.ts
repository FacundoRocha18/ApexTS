import { Middleware, Request, Response } from "../Types/main";

export interface IMiddlewareManager {
  use(middleware: Middleware): void;
  executeMiddlewares(req: Request, res: Response, next?: () => void): void;
}
