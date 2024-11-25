import { ErrorMiddleware, Middleware } from ".";
import { HttpRequest, HttpResponse } from "../types";

export interface IMiddlewareManager {
  use(middleware: Middleware | ErrorMiddleware): void;
  executeMiddlewares(req: HttpRequest, res: HttpResponse, next?: () => void): void;
}
