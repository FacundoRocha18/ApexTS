import { inject, injectable } from "tsyringe";
import http from "http";

import type { HttpRequest, HttpResponse } from "@http";
import { IMiddlewareManager, MiddlewareManager } from "@middleware";
import { IRouter, Router } from "@router";

@injectable()
export class HttpServer {
  constructor(
    @inject(MiddlewareManager) private middlewareManager: IMiddlewareManager,
    @inject(Router) public router: IRouter
  ) {}

  private startHttpServer(): http.Server {
    const server = http.createServer((req: HttpRequest, res: HttpResponse) => {
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
      console.info(`[Apex.ts]: Server running on port: ${port} on ${node_env} mode.`);
    });
  }
}
