import { TMiddlewareFunction } from ".";
import { IHttpRequest, IHttpResponse } from "../types";

export interface IMiddlewareManager {
  use(middleware: TMiddlewareFunction): void;
  executeMiddlewares(
    req: IHttpRequest,
    res: IHttpResponse,
    next?: () => void,
  ): void;
}
