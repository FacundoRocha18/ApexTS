import { parse, UrlWithParsedQuery } from 'url'
import { HttpMethods } from '../Http/HttpMethods'
import { Params, Routes, Handler, Request, Response, Middleware } from '../types'
import { IRouter } from './Router.interface'
import { IParser } from '../Parsing/Parser.interface'

export class Router implements IRouter {
	private parser: IParser
	private routes: Routes = {}
	private middlewares: Middleware[] = []

	constructor(parser: IParser) {
		this.parser = parser
	}

	public use(middleware: Middleware): void {
		this.middlewares.push(middleware)
	}

	public get(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.GET, path, handler)
	}

	public post(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.POST, path, handler)
	}

	public del(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.DELETE, path, handler)
	}

	public put(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.PUT, path, handler)
	}

	public patch(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.PATCH, path, handler)
	}

	public handleRequest(req: Request, res: Response): void {
		const parsedUrl: UrlWithParsedQuery = parse(req.url || '/', true)
		const path: string = parsedUrl.pathname || '/'
		const method: string = req.method || 'GET'

		req.query = parsedUrl.query

		this.executeMiddlewares(0, req, res, path, method)
	}

	private executeMiddlewares(
		index: number,
		req: Request,
		res: Response,
		path: string,
		method: string
	): void {
		if (index < this.middlewares.length) {
			const middleware = this.middlewares[index];
			try {
				middleware(req, res, () => this.executeMiddlewares(index + 1, req, res, path, method));
			} catch (error) {
				this.handleMiddlewareError(error, req, res);
			}
		} else {
			this.processRoute(req, res, path, method);
		}
	}

	private processRoute(req: Request, res: Response, path: string, method: string): void {
		if (method !== 'POST' && method !== 'PUT') {
			this.resolveRoute(req, res, path, method)
			return null
		}

		this.parser.parseBody({
			req,
			res,
			path,
			method,
			callback: () => this.resolveRoute(req, res, path, method)
		})
	}

	private addRoute(
		method: string,
		path: string,
		handler: Handler
	): void {
		// If the path is empty, throw an error
		if (!path || path === '') {
			throw new Error('Path must be a non-empty string')
		}

		// If the path does not exist 
		if (!this.routes[path]) {
			// we set path to an empty object
			this.routes[path] = {}
		}

		// We assign the handler function to the method tuple
		this.routes[path][method] = handler
	}

	private resolveRoute(req: Request, res: Response, path: string, method: string): string {
		for (const registeredPath in this.routes) {
			const handler: Handler = this.routes[registeredPath]?.[method];

			const params = this.matchRoute(path, registeredPath)

			if (!params) {
				continue
			}

			req.params = params
			handler(req, res);
			return 'Handler called'
		}

		return res.statusCode + res.statusMessage
	}

	private matchRoute(path: string, registeredPath: string): Params | null {
		const registeredParts: string[] = registeredPath.split('/')
		const requestParts: string[] = path.split('/')

		if (registeredParts.length !== requestParts.length) {
			return null
		}

		const params: Params = {}

		for (let i = 0; i < registeredParts.length; i++) {
			const registeredPart = registeredParts[i]
			const requestPart = requestParts[i]

			/* 
			check possible refactor of this code
			*/
			
			if (!registeredPart.startsWith(':') && registeredPart !== requestPart) {
				return null
			}
 
			const paramName = registeredPart.slice(1)
			params[paramName] = requestPart
		}

		return params
	}

	private handleMiddlewareError(error: any, req: Request, res: Response): void {
		console.error('Middleware error:', error);
		res.statusCode = 500;
		res.end('Internal Server Error');
	}
}