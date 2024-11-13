import { ErrorMiddleware, Middleware } from "../middleware/middleware.types";
import { TRequestHandler } from "../types";
import { IRouter } from "../router";
import { HttpMethods } from "../http";

/**
 * Public API for the Swift framework.
 */
export interface ISwiftApplication {
  router: IRouter;

  useMiddleware(middleware: Middleware | ErrorMiddleware): void;
  useModule(module: any): void;
  useRoute(method: HttpMethods, path: string, handler: TRequestHandler): void;
  get(path: string, handler: TRequestHandler): void;
  post(path: string, handler: TRequestHandler): void;
  put(path: string, handler: TRequestHandler): void;
  del(path: string, handler: TRequestHandler): void;
  patch(path: string, handler: TRequestHandler): void;
  listen(port: number, node_env: string): void;
}
