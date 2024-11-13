import http from "http";
import { ErrorMiddleware, IMiddlewareManager, Middleware } from "../middleware";
import { ISwiftApplication } from ".";
import { IHttpRequest, IHttpResponse, TRequestHandler } from "../types";
import { IRouter } from "../router";
import { HttpMethods } from "../http";

export class SwiftApplication implements ISwiftApplication {
  private static instance: SwiftApplication;

  private constructor(
    public router: IRouter,
    private middlewareManager: IMiddlewareManager
  ) {}

  public static getInstance(router: IRouter, middlewareManager: IMiddlewareManager): SwiftApplication {
    if (!SwiftApplication.instance) {
      SwiftApplication.instance = new SwiftApplication(router, middlewareManager);
    }

    return SwiftApplication.instance;
  }

  public useMiddleware(middleware: Middleware | ErrorMiddleware): void {
    this.middlewareManager.use(middleware);
  }

  public useModule(module: any): void {
    module.routes.forEach((route) => {
      this.useRoute(route.method, route.path, route.handler);
    });
  }

  public useRoute(method: HttpMethods, path: string, handler: TRequestHandler): void {
    this.router.use(method, path, handler);
  }

  public get(path: string, handler: TRequestHandler): void {
    this.router.get(path, handler);
  }

  public post(path: string, handler: TRequestHandler): void {
    this.router.post(path, handler);
  }

  public put(path: string, handler: TRequestHandler): void {
    this.router.put(path, handler);
  }

  public del(path: string, handler: TRequestHandler): void {
    this.router.del(path, handler);
  }

  public patch(path: string, handler: TRequestHandler): void {
    this.router.patch(path, handler);
  }

  private startHttpServer(): http.Server {
    const server = http.createServer((req: IHttpRequest, res: IHttpResponse) => {
      const path: string = req.url || "/";
      const method: string = req.method || "GET";

      this.middlewareManager.executeMiddlewares(req, res, () => {
        this.router.resolveRoute(req, res, path, method);
      });
    });

    return server;
  }

  public listen(port: number, node_env: string): void {
    const server = this.startHttpServer();

    server.listen(port, () => {
      console.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }
}
