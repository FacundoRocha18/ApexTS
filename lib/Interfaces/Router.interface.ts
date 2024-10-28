import { HttpMethods } from "../Http/http-methods";
import { HttpRequest } from "../Types/request";
import { HttpResponse } from "../Types/response";
import { RouteHandler } from "../Types/router";

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
