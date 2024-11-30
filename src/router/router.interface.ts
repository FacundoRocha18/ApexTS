import { HttpRequest, Controller } from "../types/request";
import { HttpResponse } from "../types/response";
import { HttpMethods } from "../http/http-methods";

export interface IRouter {
  use(httpMethod: HttpMethods, url: string, controller: Controller): void;
  get(url: string, controller: Controller): void;
  post(url: string, controller: Controller): void;
  put(url: string, controller: Controller): void;
  del(url: string, controller: Controller): void;
  patch(url: string, controller: Controller): void;
  options(url: string, controller: Controller): void;

  resolveRoute(req: HttpRequest, res: HttpResponse, url: string, httpMethod: string): void;
  processRoute(req: HttpRequest, res: HttpResponse, url: string, httpMethod: string): void;
}
