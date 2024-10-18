import { Handler, Middleware, Request, Response } from "../Types/main";
export interface IRouter {
  use(middleware: Middleware): void;
  get(path: string, handler: Handler): void;
  post(path: string, handler: Handler): void;
  put(path: string, handler: Handler): void;
  del(path: string, handler: Handler): void;
  patch(path: string, handler: Handler): void;

  handleRequest(req: Request, res: Response): void;
}
