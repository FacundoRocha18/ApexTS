import { ErrorMiddleware, Middleware } from "@middleware";
import { Controller, HttpMethods } from "@http";
import { IRouter } from "@router";
import { ValidatedEnvironmentConfiguration } from '../config';

/**
 * Public API for the ApexTS framework.
 */
export interface ApexCore {
  router: IRouter;

  useMiddleware(middleware: Middleware | ErrorMiddleware): void;
  useModule(module: any): void;
  useRoute(method: HttpMethods, path: string, handler: Controller): void;

  get(path: string, handler: Controller): void;
  post(path: string, handler: Controller): void;
  put(path: string, handler: Controller): void;
  del(path: string, handler: Controller): void;
  patch(path: string, handler: Controller): void;
  options(path: string, handler: Controller): void;

	EnvConfig: ValidatedEnvironmentConfiguration;

  listen(port: number, node_env: string): void;
}
