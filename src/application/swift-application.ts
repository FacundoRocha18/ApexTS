import { inject, injectable } from 'tsyringe';
import http from "http";

import type { IMiddlewareManager } from "../middleware/middleware-manager.interface";
import type { ISwiftApplication } from "./swift-application.interface";
import type { IRouter } from "../router/router.interface";
import type { HttpRequest } from '../types/request';
import type { HttpResponse } from '../types/response';

import { MiddlewareManager } from "../middleware/middleware-manager";
import { Router } from "../router/router";

@injectable()
export class SwiftApplication implements ISwiftApplication {
	constructor(
		@inject(Router) public router: IRouter,
		@inject(MiddlewareManager) private middlewareManager: IMiddlewareManager
  ) {}
	
  public useModule(module: any): void {
		module.routes.forEach((route) => {
			this.useRoute(route.method, route.path, route.handler);
    });
  }
	
	public useMiddleware = this.middlewareManager.use.bind(this.middlewareManager);
	public useRoute = this.router.use.bind(this.router);

	public get = this.router.get.bind(this.router);
	public post = this.router.post.bind(this.router);
	public put = this.router.put.bind(this.router);
	public del = this.router.del.bind(this.router);
	public patch = this.router.patch.bind(this.router);
	public options = this.router.options.bind(this.router);

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
