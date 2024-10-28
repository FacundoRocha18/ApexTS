import { TMiddlewareFunction } from "./middleware.types";
import { IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";

export interface IMiddlewareManager {
  use(middleware: TMiddlewareFunction): void;
  executeMiddlewares(
    req: IHttpRequest,
    res: IHttpResponse,
    next?: () => void,
  ): void;
}
