import http from "http";
import { inject, injectable } from 'tsyringe';

import type { ErrorMiddleware, Middleware } from "../middleware/middleware.types";
import type { IMiddlewareManager } from "../middleware/middleware-manager.interface";
import type { ISwiftApplication } from "./swift-application.interface";
import type { HttpRequest, Controller } from "../types/request";
import type { IRouter } from "../router/router.interface";
import type { HttpResponse } from "../types/response";

import { MiddlewareManager } from "../middleware/middleware-manager";
import { HttpMethods } from "../http";

import { Router } from "../router/router";

@injectable()
export class SwiftApplication implements ISwiftApplication {
	constructor(
		@inject(Router) public router: IRouter,
		@inject(MiddlewareManager) private middlewareManager: IMiddlewareManager
  ) {}

  public useMiddleware(middleware: Middleware | ErrorMiddleware): void {
    this.middlewareManager.use(middleware);
  }

  public useModule(module: any): void {
    module.routes.forEach((route) => {
      this.useRoute(route.method, route.path, route.handler);
    });
  }

  public useRoute(method: HttpMethods, path: string, handler: Controller): void {
    this.router.use(method, path, handler);
  }

  public get(path: string, handler: Controller): void {
    this.router.get(path, handler);
  }

  public post(path: string, handler: Controller): void {
    this.router.post(path, handler);
  }

  public put(path: string, handler: Controller): void {
    this.router.put(path, handler);
  }

  public del(path: string, handler: Controller): void {
    this.router.del(path, handler);
  }

  public patch(path: string, handler: Controller): void {
    this.router.patch(path, handler);
  }

  public options(path: string, handler: Controller): void {
    this.router.options(path, handler);
  }

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
