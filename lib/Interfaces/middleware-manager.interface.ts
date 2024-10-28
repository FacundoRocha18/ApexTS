import { MiddlewareFunction } from "../Types/middlewares";
import { HttpRequest } from "../Types/request";
import { HttpResponse } from "../Types/response";

export interface IMiddlewareManager {
  use(middleware: MiddlewareFunction): void;
  executeMiddlewares(
    req: HttpRequest,
    res: HttpResponse,
    next?: () => void,
  ): void;
}
