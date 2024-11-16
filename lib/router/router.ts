import { HttpRequest, Controller } from "../types";
import { Route, IRouter } from "../router";
import { HttpResponse } from "../types";
import { HttpMethods } from "../http";
import { inject, injectable, singleton } from "tsyringe";
import { IParserService, ParserService } from "../parser";

@singleton()
@injectable()
export class Router implements IRouter {
	private routes: Route = {};

	constructor(
		@inject(ParserService)
		private parser: IParserService
	) { }

	public use(httpMethod: HttpMethods, url: string, controller: Controller): void {
		this.addRoute(httpMethod, url, controller);
	}

	public get = this.addRoute.bind(this, HttpMethods.GET);
	public post = this.addRoute.bind(this, HttpMethods.POST);
	public del = this.addRoute.bind(this, HttpMethods.DELETE);
	public put = this.addRoute.bind(this, HttpMethods.PUT);
	public patch = this.addRoute.bind(this, HttpMethods.PATCH);

	private addRoute(httpMethod: HttpMethods, url: string, controller: Controller): void {
		this.validateRouteParams(httpMethod, url, controller);

		if (!this.routes[url]) {
			this.routes[url] = {};
		}

		this.routes[url][httpMethod] = controller;
	}

	public resolveRoute(req: HttpRequest, res: HttpResponse, url: string, httpMethod: string): void {
		const { pathname, searchParams } = new URL(url, "http://localhost");

		const registeredPath = this.findMatchingPath(pathname);

		if (!registeredPath) {
			this.handleNotFound(res, httpMethod, url);
			return;
		}

		const handler = this.findRouteHandler(pathname, httpMethod);

		if (!handler) {
			this.handleNotFound(res, httpMethod, url);
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

	private findMatchingPath(pathname: string): string | undefined {
		return Object.keys(this.routes).find((route) => this.comparePaths(pathname, route));
	}

	public async processRoute(req: HttpRequest, res: HttpResponse, url: string, method: string): Promise<void> {
		if (!url || !method) {
			this.handleInvalidRequest(res, "Invalid request");
			return;
		}

		if (["POST", "PUT"].includes(method.toUpperCase())) {
			await this.parser.convertRequestBodyToJson(req, res);
		}

		this.resolveRoute(req, res, url, method);
	}

	private findRouteHandler(pathname: string, method: string): Controller | undefined {
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

	private validateRouteParams(httpMethod: HttpMethods, url: string, controller: Controller): void {
		if (!httpMethod || !url || !controller) {
			throw new Error("Invalid parameters: method, path, and handler are required.");
		}
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

	private handleInvalidRequest(res: HttpResponse, message: string): void {
		res.statusCode = 400;
		res.statusMessage = message;
		res.end(message);
	}

	private handleNotFound(res: HttpResponse, httpMethod: string, url: string): void {
		console.error(`[Router] No handler found for ${httpMethod} ${url}`);
		res.statusCode = 404;
		res.json({
			statusCode: 404,
			message: "Not found",
			method: httpMethod,
			url,
		});
	}
}
