import { inject, injectable } from 'tsyringe'
import http from "http";

import type { IMiddlewareManager } from '../middleware/middleware-manager.interface';
import type { IRouter } from '../router/router.interface';
import type { HttpResponse } from '../types/response';
import type { HttpRequest } from '../types/request';

import { MiddlewareManager } from '../middleware/middleware-manager';
import { Router } from '../router/router';

@injectable()
export class HttpServer {
	constructor(
		@inject(MiddlewareManager) private middlewareManager: IMiddlewareManager,
		@inject(Router) public router: IRouter,
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
      console.log(`Server running on port: ${port} on ${node_env} mode`);
    });
  }
}