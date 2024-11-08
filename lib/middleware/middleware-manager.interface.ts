import { Middleware } from ".";
import { IHttpRequest, IHttpResponse } from "../types";

export interface IMiddlewareManager {
  use(middleware: Middleware): void;
  executeMiddlewares(
    req: IHttpRequest,
    res: IHttpResponse,
    next?: () => void,
  ): void;
}
