import { ErrorMiddleware, Middleware } from "../middleware/middleware.types";
import { RequestHandler } from "../types";
import { IRouter } from "../router";
import { HttpMethods } from "../http";

/**
 * Public API for the Swift framework.
 */
export interface ISwiftApplication {
  router: IRouter;

  useMiddleware(middleware: Middleware | ErrorMiddleware): void;
  useModule(module: any): void;
  useRoute(method: HttpMethods, path: string, handler: RequestHandler): void;
  get(path: string, handler: RequestHandler): void;
  post(path: string, handler: RequestHandler): void;
  put(path: string, handler: RequestHandler): void;
  del(path: string, handler: RequestHandler): void;
  patch(path: string, handler: RequestHandler): void;
  listen(port: number, node_env: string): void;
}
