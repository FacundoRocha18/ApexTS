import { MiddlewareFunction } from "../Types/middlewares";
import { RouteHandler } from "../Types/router";
import { IRouter } from "./router.interface";

export interface IFramework {
  router: IRouter;

  use(middleware: MiddlewareFunction): void;
  get(path: string, handler: RouteHandler): void;
  post(path: string, handler: RouteHandler): void;
  put(path: string, handler: RouteHandler): void;
  del(path: string, handler: RouteHandler): void;
  patch(path: string, handler: RouteHandler): void;
  listen(port: number, node_env: string): void;
}
