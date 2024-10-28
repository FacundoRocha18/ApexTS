import http from "http";
import { IFramework } from "./framework.interface";
import { IRouter } from "../router/router.interface";
import { IMiddlewareManager } from "../middlewares/middleware-manager.interface";
import { IRequestHandler } from "../http/request/request-handler.interface";
import { TMiddlewareFunction } from "../middlewares/middleware.types";
import { TRouteHandler } from "../router/router.types";

export class Framework implements IFramework {
  public router: IRouter;

  constructor(
    router: IRouter,
    private middlewareManager: IMiddlewareManager,
    private requestHandler: IRequestHandler,
  ) {
    this.router = router;
  }

  public use(middleware: TMiddlewareFunction): void {
    this.middlewareManager.use(middleware);
  }

  public get(path: string, HandlerType: TRouteHandler): void {
    this.router.get(path, HandlerType);
  }

  public post(path: string, HandlerType: TRouteHandler): void {
    this.router.post(path, HandlerType);
  }

  public put(path: string, HandlerType: TRouteHandler): void {
    this.router.put(path, HandlerType);
  }

  public del(path: string, HandlerType: TRouteHandler): void {
    this.router.del(path, HandlerType);
  }

  public patch(path: string, HandlerType: TRouteHandler): void {
    this.router.patch(path, HandlerType);
  }

  public listen(port: number, node_env: string): void {
    const server = http.createServer((req, res) =>
      this.requestHandler.handleRequest(req, res),
    );

    server.listen(port, () => {
      console.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }
}
