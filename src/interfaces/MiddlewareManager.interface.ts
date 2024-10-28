import { MiddlewareFunction } from "../Types/Middlewares";
import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";

export interface IMiddlewareManager {
  use(middleware: MiddlewareFunction): void;
  executeMiddlewares(
    req: HttpRequest,
    res: HttpResponse,
    next?: () => void,
  ): void;
}
