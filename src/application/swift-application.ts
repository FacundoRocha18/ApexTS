import { inject, injectable } from 'tsyringe';

import type { ErrorMiddleware, Middleware } from "../middleware/middleware.types";
import type { IMiddlewareManager } from "../middleware/middleware-manager.interface";
import type { ISwiftApplication } from "./swift-application.interface";
import type { IRouter } from "../router/router.interface";

import { MiddlewareManager } from "../middleware/middleware-manager";

import { Router } from "../router/router";
import { HttpServer } from '../http/http-server';

@injectable()
export class SwiftApplication implements ISwiftApplication {
	constructor(
		@inject(Router) public router: IRouter,
		@inject(MiddlewareManager) private middlewareManager: IMiddlewareManager,
		@inject(HttpServer) private server: HttpServer,
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

	public listen(port: number, node_env: string): void {
		this.server.listen(port, node_env);
	}
}
