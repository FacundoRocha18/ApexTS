import { IncomingMessage, METHODS, ServerResponse } from 'http'
import { HttpMethods } from './Http/HttpMethods'

const http = require('node:http')

type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void

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
		const url = req.url || '/'
		const method = req.method || 'GET'
		const handler = this.routes[url]?.[method]

		if (handler) {
			handler(req, res)
		} else {
			res.statusCode = 404
			res.end('404 Not found')
		}

	}

	public listen(port: number, callback: () => void) {
		const server = http.createServer((req, res) => this.handleRequest(req, res))
		server.listen(port, callback)
	}
}
