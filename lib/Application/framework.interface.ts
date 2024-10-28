import { TMiddlewareFunction } from "../middlewares/middleware.types";
import { TRouteHandler } from "../router/router.types";
import { IRouter } from "../router/router.interface";

export interface IFramework {
  router: IRouter;

  use(middleware: TMiddlewareFunction): void;
  get(path: string, handler: TRouteHandler): void;
  post(path: string, handler: TRouteHandler): void;
  put(path: string, handler: TRouteHandler): void;
  del(path: string, handler: TRouteHandler): void;
  patch(path: string, handler: TRouteHandler): void;
  listen(port: number, node_env: string): void;
}
