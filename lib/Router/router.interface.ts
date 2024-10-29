import { IHttpRequest, IHttpResponse } from "../interfaces";
import { TRouteHandler } from "../router";
import { HttpMethods } from "../http";

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
