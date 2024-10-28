import { HttpMethods } from "../http/http-methods";
import { IHttpRequest } from "../interfaces/request.interface";
import { IHttpResponse } from "../interfaces/response.interface";
import { TRouteHandler } from "./router.types";

export interface IRouter {
  use(method: HttpMethods, path: string, handler: TRouteHandler): void;
  get(path: string, handler: TRouteHandler): void;
  post(path: string, handler: TRouteHandler): void;
  put(path: string, handler: TRouteHandler): void;
  del(path: string, handler: TRouteHandler): void;
  patch(path: string, handler: TRouteHandler): void;

  resolveRoute(
    req: IHttpRequest,
    res: IHttpResponse,
    path: string,
    method: string,
  ): void;
}
