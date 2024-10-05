import { IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { HttpMethods } from '../Http/HttpMethods'
import { IParams, RouteHandler } from '../types'

export class Router {
	private routes: { [key: string]: { [method: string]: RouteHandler } } = {}

	public get(path: string, handler: RouteHandler): void {
		this.addRoute(HttpMethods.GET, path, handler)
	}

	public post(path: string, handler: RouteHandler): void {
		this.addRoute(HttpMethods.POST, path, handler)
	}

	public delete(path: string, handler: RouteHandler): void {
		this.addRoute(HttpMethods.DELETE, path, handler)
	}

	public put(path: string, handler: RouteHandler): void {
		this.addRoute(HttpMethods.PUT, path, handler)
	}

	public patch(path: string, handler: RouteHandler): void {
		this.addRoute(HttpMethods.PATCH, path, handler)
	}

	private addRoute(method: string, path: string, handler: RouteHandler): void {
		if (!this.routes[path]) {
			this.routes[path] = {}
		}

		this.routes[path][method] = handler
	}

	public handleRequest(req: IncomingMessage, res: ServerResponse): void {
		const parsedUrl = parse(req.url || '/', true);
		const pathname = parsedUrl.pathname || '/';
		const method = req.method || 'GET';

		req.query = parsedUrl.query;

		if (method !== 'POST' && method !== 'PUT') {
			this.processRoute(req, res, pathname, method);
			return
		}

		this.parseBody(req, res, pathname, method)
	}

	private processRoute(req: IncomingMessage, res: ServerResponse, pathname: string, method: string): void {
		for (const registeredPath in this.routes) {
			const handler = this.routes[registeredPath]?.[method];

			if (handler) {
				const params = this.matchRoute(pathname, registeredPath);
				if (params) {
					req.params = params;
					handler(req, res);
					return;
				}
			}
		}

		res.statusCode = 404;
		res.end('404 Not Found');
	}

	private parseBody(req: IncomingMessage, res: ServerResponse, pathname: string, method: string): void {
		let body: string = ''

		req.on('data', (chunk) => {
			body += chunk.toString();
		});

		req.on('end', () => {
			try {
				req.body = JSON.parse(body);
			} catch (e) {
				req.body = body;
			}
			this.processRoute(req, res, pathname, method);
		});
	}

	private matchRoute(pathname: string, registeredPath: string): { [key: string]: string } | null {
		const registeredParts: string[] = registeredPath.split('/')
		const requestParts: string[] = pathname.split('/')

		if (registeredParts.length !== requestParts.length) {
			return null
		}

		const params: IParams = {}

		for (let i = 0; i < registeredParts.length; i++) {
			const registeredPart = registeredParts[i]
			const requestPart = requestParts[i]

			if (registeredPart.startsWith(':')) {
				const paramName = registeredPart.slice(1)
				params[paramName] = requestPart

			} else if (registeredPart !== requestPart) {
				return null
			}
		}

		return params
	}
}