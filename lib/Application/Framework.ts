import http from "http";
import { IMiddlewareManager, Middleware } from "../middlewares";
import { IFramework } from ".";
import { IHttpRequest, IHttpResponse, TRequestHandler } from "../types";
import { IRouter } from "../router";

export class Framework implements IFramework {
  constructor(
    public router: IRouter,
    private middlewareManager: IMiddlewareManager,
  ) {}

  public use(middleware: Middleware): void {
    this.middlewareManager.use(middleware);
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
    const server = http.createServer(
      (req: IHttpRequest, res: IHttpResponse) => {
        const path: string = req.url || "/";
        const method: string = req.method || "GET";

        this.middlewareManager.executeMiddlewares(req, res, () => {
          this.router.resolveRoute(req, res, path, method);
        });
      },
    );

    return server;
  }

  public listen(port: number, node_env: string): void {
    const server = this.startHttpServer();

    server.listen(port, () => {
      console.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }
}
