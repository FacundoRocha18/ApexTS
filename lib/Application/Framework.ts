import http from "http";
import { IMiddlewareManager, TMiddlewareFunction } from "../middlewares";
import { IRouter, TRouteHandler } from "../router";
import { IFramework } from "../application";
import { IRequestHandler } from "../http";

export class Framework implements IFramework {
  constructor(
    public router: IRouter,
    private middlewareManager: IMiddlewareManager,
    private requestHandler: IRequestHandler,
  ) {}

  public use(middleware: TMiddlewareFunction): void {
    this.middlewareManager.use(middleware);
  }

  public get(path: string, handler: TRouteHandler): void {
    this.router.get(path, handler);
  }

  public post(path: string, handler: TRouteHandler): void {
    this.router.post(path, handler);
  }

  public put(path: string, handler: TRouteHandler): void {
    this.router.put(path, handler);
  }

  public del(path: string, handler: TRouteHandler): void {
    this.router.del(path, handler);
  }

  public patch(path: string, handler: TRouteHandler): void {
    this.router.patch(path, handler);
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
