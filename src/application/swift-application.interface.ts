import { ErrorMiddleware, Middleware } from "../middleware/middleware.types";
import { Controller } from "../types";
import { IRouter } from "../router";
import { HttpMethods } from "../http";

/**
 * Public API for the Swift framework.
 */
export interface ISwiftApplication {
  router: IRouter;

  useRoute(method: HttpMethods, path: string, handler: Controller): void;
  useMiddleware(middleware: Middleware | ErrorMiddleware): void;
  useModule(module: any): void;
	
  get(path: string, handler: Controller): void;
  post(path: string, handler: Controller): void;
  put(path: string, handler: Controller): void;
  del(path: string, handler: Controller): void;
  patch(path: string, handler: Controller): void;
  options(path: string, handler: Controller): void;

	listen(port: number, node_env: string): void;
}
