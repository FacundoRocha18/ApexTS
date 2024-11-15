import { HttpRequest, HttpResponse, Controller } from "../types";
import { HttpMethods } from "../http";

export interface IRouter {
  use(method: HttpMethods, path: string, controller: Controller): void;
  get(path: string, handler: Controller): void;
  post(path: string, handler: Controller): void;
  put(path: string, handler: Controller): void;
  del(path: string, handler: Controller): void;
  patch(path: string, handler: Controller): void;

  resolveRoute(req: HttpRequest, res: HttpResponse, path: string, method: string): void;

  processRoute(req: HttpRequest, res: HttpResponse, url: string, method: string): void;
}
