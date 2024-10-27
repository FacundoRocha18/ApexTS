import { HttpMethods } from "../Http/HttpMethods";
import { PathVariables, Routes, Handler, Request, Response, QueryParams } from "../Types/main";
import { IRouter } from "../Interfaces/Router.interface";

export class Router implements IRouter {
	private routes: Routes = {};

	constructor() { }

	public use(method: HttpMethods, path: string, handler: Handler): void {
		this.addRoute(method, path, handler);
	}

	public get(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.GET, path, handler);
	}

	public post(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.POST, path, handler);
	}

	public del(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.DELETE, path, handler);
	}

	public put(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.PUT, path, handler);
	}

	public patch(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.PATCH, path, handler);
	}

	private addRoute(method: HttpMethods, path: string, handler: Handler): void {
		if (!method) {
			throw new Error("Method must be a non-empty string");
		}

		if (!path || path === "") {
			throw new Error("Path must be a non-empty string");
		}

		if (!handler) {
			throw new Error("Handler must be a function");
		}

		if (!this.routes[path]) {
			// we set the path key to an empty object
			this.routes[path] = {};
		}
		
		// We assign the handler function to the method key
		this.routes[path][method] = handler;
	}

	public resolveRoute(
		req: Request,
		res: Response,
		path: string,
		method: string,
	): void {
		const { pathname, searchParams } = new URL(path, "http://localhost");

		let routeFound = false;

		for (const registeredPath in this.routes) {
			if (!this.comparePaths(path, registeredPath)) {
				continue;
			}
			routeFound = true;

			const handler: Handler = this.routes[registeredPath]?.[method];
			if (!handler) {
				continue;
			}

			const queryParams = this.extractQueryParamsFromURL(searchParams);
			const pathVariables = this.extractPathVariablesFromURL(pathname, registeredPath);

			if (!queryParams || !pathVariables) {
				continue;
			}

			req.queryParams = queryParams;
			req.pathVariables = pathVariables;

			handler(req, res);
			return;
		}

		if (!routeFound) {
			console.error(`No handler found for ${method} ${path}`);
			res.statusCode = 404;
			res.end("Not Found");
		}
	}

	private comparePaths(requestPath: string, registeredPath: string): boolean {
		const registeredPathSegments: string[] = registeredPath.split("/");
		const requestPathSegments: string[] = requestPath.split("/");

		if (registeredPathSegments.length !== requestPathSegments.length) {
			return false;
		}

		return true;
	}

	private extractQueryParamsFromURL(searchParams: URLSearchParams): QueryParams {
		const queryParams: QueryParams = {};

		searchParams.forEach((value, key) => {
			queryParams[key] = value;
		});

		return queryParams;
	}

	private extractPathVariablesFromURL(requestPath: string, registeredPath: string): PathVariables {
		const registeredPathSegments: string[] = registeredPath.split("/");
		const requestPathSegments: string[] = requestPath.split("/");
		const pathVariables: PathVariables = {};

		for (let i = 0; i < registeredPathSegments.length; i++) {
			const registeredPart = registeredPathSegments[i];
			const requestPart = requestPathSegments[i];

			if (!registeredPart.startsWith(":")) {
				continue;
			}

			const paramName = registeredPart.slice(1);
			pathVariables[paramName] = requestPart;
		}

		return pathVariables;
	}
}
