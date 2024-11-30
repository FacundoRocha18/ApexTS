import { ErrorMiddleware, Middleware } from "./middleware.types";
import { HttpRequest } from "../http/request";
import { HttpResponse } from "../http/response";

export interface IMiddlewareManager {
  use(middleware: Middleware | ErrorMiddleware): void;
  executeMiddlewares(req: HttpRequest, res: HttpResponse, next?: () => void): void;
}
