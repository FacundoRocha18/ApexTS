import { Handler } from "../Types/main";
import { IRouter } from "./Router.interface";

export interface IFramework {
  router: IRouter;

  use(handler: Handler): void;
  get(path: string, handler: Handler): void;
  post(path: string, handler: Handler): void;
  put(path: string, handler: Handler): void;
  del(path: string, handler: Handler): void;
  patch(path: string, handler: Handler): void;

  listen(port: number, node_env: string): void;
}
