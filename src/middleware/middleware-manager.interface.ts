import type { ErrorMiddleware, Middleware } from "@middleware";
import type { HttpRequest, HttpResponse } from "@http";

export interface IMiddlewareManager {
  use(middleware: Middleware | ErrorMiddleware): void;
  executeMiddlewares(req: HttpRequest, res: HttpResponse, next?: () => void): void;
}
