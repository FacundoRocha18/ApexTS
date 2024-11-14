import { IHttpRequest, TRequestHandler } from "../types";
import { Route, IRouter } from "../router";
import { IHttpResponse } from "../types";
import { HttpMethods } from "../http";
import { inject, injectable, singleton } from "tsyringe";
import { IParserService, ParserService } from "../parser";
import { request } from 'http';

@singleton()
@injectable()
export class Router implements IRouter {
	private routes: Route = {};

	constructor(
		@inject(ParserService)
		private parser: IParserService
	) { }

	public use(method: HttpMethods, path: string, handler: TRequestHandler): void {
		this.addRoute(method, path, handler);
	}

	public get = this.addRoute.bind(this, HttpMethods.GET);
	public post = this.addRoute.bind(this, HttpMethods.POST);
	public del = this.addRoute.bind(this, HttpMethods.DELETE);
	public put = this.addRoute.bind(this, HttpMethods.PUT);
	public patch = this.addRoute.bind(this, HttpMethods.PATCH);

	private validateRouteParams(method: HttpMethods, path: string, handler: TRequestHandler): void {
		if (!method || !path || !handler) {
			throw new Error("Invalid parameters: method, path, and handler are required.");
		}
	}

	private addRoute(method: HttpMethods, path: string, handler: TRequestHandler): void {
		this.validateRouteParams(method, path, handler);

		if (!this.routes[path]) {
			this.routes[path] = {};
		}

		this.routes[path][method] = handler;
	}

	public resolveRoute(req: IHttpRequest, res: IHttpResponse, path: string, method: string): void {
		const { pathname, searchParams } = new URL(path, "http://localhost");
		const handler = this.findRouteHandler(pathname, method);

		const registeredPath = Object.keys(this.routes).find((route) => this.comparePaths(pathname, route));

		if (!registeredPath) {
			this.handleNotFound(res, method, path);
			return;
		}

		if (!handler) {
			this.handleNotFound(res, method, path);
			return;
		}

		const queryParams = this.parser.extractQueryParamsFromURL(searchParams);

		if (!queryParams) {
			console.log("No query params found");
			return;
		}

		req.queryParams = queryParams;

		const pathVariables = this.parser.extractPathVariablesFromURL(pathname, registeredPath);

		if (!pathVariables) {
			console.log("No path variables found");
			return;
		}

		req.pathVariables = pathVariables;

		handler(req, res);
	}

	private ensureIsValidUrl(url: string) {
		if (url !== undefined || url !== "" || url !== null) {
			return true;
		}
	}

	private ensureIsValidMethod(method: string) {
		if (method !== undefined || method !== "" || method !== null) {
			return true;
		}
	}

	private handleInvalidRequest(res: IHttpResponse, message: string): void {
		res.statusCode = 400;
		res.statusMessage = message;
		res.end(message);
	}

	public async processRoute(req: IHttpRequest, res: IHttpResponse, url: string, method: string): Promise<void> {
		if (!url || !method) {
			this.handleInvalidRequest(res, "Invalid request");
			return;
		}

		if (["POST", "PUT"].includes(method.toUpperCase())) {
			await this.parser.convertRequestBodyToJson(req, res);
		}

		this.resolveRoute(req, res, url, method);
	}

	private findRouteHandler(pathname: string, method: string): TRequestHandler | undefined {
		const normalizedMethod = method.toUpperCase();
		const registeredPath = Object.keys(this.routes).find((route) => this.comparePaths(pathname, route));
		
		if (!registeredPath) {
			return undefined;
		}

		return this.routes[registeredPath]?.[normalizedMethod];
	}

	private comparePaths(pathname: string, registeredPath: string): boolean {
		const requestParts = pathname.split("/");
		const registeredParts = registeredPath.split("/");

		if (!this.lengthsMatch(requestParts, registeredParts)) {
			return false;
		}

		return this.partsMatch(requestParts, registeredParts);
	}

	private lengthsMatch(requestParts: string[], registeredParts: string[]): boolean {
		return requestParts.length === registeredParts.length;
	}
	
	private partsMatch(requestParts: string[], registeredParts: string[]): boolean {
		for (let i = 0; i < registeredParts.length; i++) {
			if (!this.isPartMatching(requestParts[i], registeredParts[i])) {
				return false;
			}
		}
		return true;
	}
	
	private isPartMatching(requestPart: string, registeredPart: string): boolean {
		return registeredPart.startsWith(":") || registeredPart === requestPart;
	}

	private handleNotFound(res: IHttpResponse, method: string, path: string): void {
    console.error(`[Router] No handler found for ${method} ${path}`);
    res.statusCode = 404;
    res.end("Not Found");
}
}
