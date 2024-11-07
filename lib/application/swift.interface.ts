import { Middleware } from "../middleware/middleware.types";
import { TRequestHandler } from '../types';
import { IRouter } from "../router";

export interface ISwiftApplication {
  router: IRouter;

  use(middleware: Middleware): void;
  get(path: string, handler: TRequestHandler): void;
  post(path: string, handler: TRequestHandler): void;
  put(path: string, handler: TRequestHandler): void;
  del(path: string, handler: TRequestHandler): void;
  patch(path: string, handler: TRequestHandler): void;
  listen(port: number, node_env: string): void;
}
