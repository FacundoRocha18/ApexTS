import { TMiddlewareFunction } from "../middlewares/middleware.types";
import { TRequestHandler, IRouter } from "../router";

export interface IFramework {
  router: IRouter;

  use(middleware: TMiddlewareFunction): void;
  get(path: string, handler: TRequestHandler): void;
  post(path: string, handler: TRequestHandler): void;
  put(path: string, handler: TRequestHandler): void;
  del(path: string, handler: TRequestHandler): void;
  patch(path: string, handler: TRequestHandler): void;
  listen(port: number, node_env: string): void;
}
