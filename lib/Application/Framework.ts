import http from "http";
import { IFramework } from "../interfaces/framework.interface";
import { IRouter } from "../interfaces/router.interface";
import { IMiddlewareManager } from "../interfaces/middleware-manager.interface";
import { IRequestHandler } from "../interfaces/request-handler.interface";
import { MiddlewareFunction } from "../types/middlewares";
import { RouteHandler } from "../types/router";

export class Framework implements IFramework {
  public router: IRouter;

  constructor(
    router: IRouter,
    private middlewareManager: IMiddlewareManager,
    private requestHandlerTypeService: IRequestHandler,
  ) {
    this.router = router;
  }

  public use(middleware: MiddlewareFunction): void {
    this.middlewareManager.use(middleware);
  }

  public get(path: string, HandlerType: RouteHandler): void {
    this.router.get(path, HandlerType);
  }

  public post(path: string, HandlerType: RouteHandler): void {
    this.router.post(path, HandlerType);
  }

  public put(path: string, HandlerType: RouteHandler): void {
    this.router.put(path, HandlerType);
  }

  public del(path: string, HandlerType: RouteHandler): void {
    this.router.del(path, HandlerType);
  }

  public patch(path: string, HandlerType: RouteHandler): void {
    this.router.patch(path, HandlerType);
  }

  public listen(port: number, node_env: string): void {
    const server = http.createServer((req, res) =>
      this.requestHandlerTypeService.handleRequest(req, res),
    );

    server.listen(port, () => {
      console.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }
}
