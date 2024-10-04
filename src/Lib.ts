import { IncomingMessage, METHODS, ServerResponse } from 'http'
import { HttpMethods } from './Http/HttpMethods'
import { parse } from 'url'
import { RouteHandler } from './types'

const http = require('node:http')

export class FastFramework {
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
		const parsedUrl = parse(req.url || '/', true)
		const pathname = parsedUrl.pathname || '/'
		const method = req.method || 'GET'
		const handler = this.routes[pathname]?.[method]

		if (handler) {
			if (method === 'POST' || method === 'PUT') {
				let body = '';
				req.on('data', (chunk) => {
					body += chunk.toString();
				});
				req.on('end', () => {
					try {
						req.body = JSON.parse(body);
					} catch (e) {
						req.body = body;
					}
					handler(req, res);
				});
			} else {
				handler(req, res);
			}
		} else {
			res.statusCode = 404;
			res.end('404 Not Found');
		}
	}

	public listen(port: number, callback: () => void) {
		const server = http.createServer((req, res) => this.handleRequest(req, res))
		server.listen(port, callback)
	}
}
