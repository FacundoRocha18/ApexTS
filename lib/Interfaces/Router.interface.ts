import { HttpMethods } from "../Http/HttpMethods";
import { HttpRequest } from "../Types/Request";
import { HttpResponse } from "../Types/Response";
import { RouteHandler } from "../Types/Router";

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
