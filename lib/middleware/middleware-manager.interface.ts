import { ErrorMiddleware, Middleware } from ".";
import { IHttpRequest, IHttpResponse } from "../types";

export interface IMiddlewareManager {
  use(middleware: Middleware | ErrorMiddleware): void;
  executeMiddlewares(req: IHttpRequest, res: IHttpResponse, next?: () => void): void;
}
