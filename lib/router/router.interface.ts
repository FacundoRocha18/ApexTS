import { IHttpRequest, IHttpResponse, RequestHandler } from "../types";
import { HttpMethods } from "../http";

export interface IRouter {
  use(method: HttpMethods, path: string, handler: RequestHandler): void;
  get(path: string, handler: RequestHandler): void;
  post(path: string, handler: RequestHandler): void;
  put(path: string, handler: RequestHandler): void;
  del(path: string, handler: RequestHandler): void;
  patch(path: string, handler: RequestHandler): void;

  resolveRoute(req: IHttpRequest, res: IHttpResponse, path: string, method: string): void;

  processRoute(req: IHttpRequest, res: IHttpResponse, url: string, method: string): void;
}
