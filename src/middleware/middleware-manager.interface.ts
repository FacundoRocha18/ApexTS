import { ErrorMiddleware, Middleware } from "./middleware.types";
import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export interface IMiddlewareManager {
  use(middleware: Middleware | ErrorMiddleware): void;
  executeMiddlewares(req: HttpRequest, res: HttpResponse, next?: () => void): void;
}
