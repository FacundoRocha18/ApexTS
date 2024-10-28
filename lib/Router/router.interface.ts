import { HttpMethods } from "../http/http-methods";
import { HttpRequest } from "../types/request";
import { HttpResponse } from "../types/response";
import { RouteHandler } from "../types/router";

export interface IRouter {
  use(method: HttpMethods, path: string, handler: RouteHandler): void;
  get(path: string, handler: RouteHandler): void;
  post(path: string, handler: RouteHandler): void;
  put(path: string, handler: RouteHandler): void;
  del(path: string, handler: RouteHandler): void;
  patch(path: string, handler: RouteHandler): void;

  resolveRoute(
    req: HttpRequest,
    res: HttpResponse,
    path: string,
    method: string,
  ): void;
}
