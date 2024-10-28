import { MiddlewareFunction } from "../types/middlewares";
import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";

export interface IMiddlewareManager {
  use(middleware: MiddlewareFunction): void;
  executeMiddlewares(
    req: HttpRequest,
    res: HttpResponse,
    next?: () => void,
  ): void;
}
