import { parse, UrlWithParsedQuery } from 'url'
import { HttpMethods } from '../Http/HttpMethods'
import { Params, Routes, Handler, Request, Response } from '../types'
import { IRouter } from './Router.interface'
import { Parser } from '../Parsing/Parser'

export class Router implements IRouter {
	private routes: Routes = {}
	private parser: Parser

	constructor() {
		this.parser = new Parser()
	}

	public get(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.GET, path, handler)
	}

	public post(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.POST, path, handler)
	}

	public delete(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.DELETE, path, handler)
	}

	public put(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.PUT, path, handler)
	}

	public patch(path: string, handler: Handler): void {
		this.addRoute(HttpMethods.PATCH, path, handler)
	}

	private addRoute(
		method: string,
		path: string,
		handler: Handler
	): void {
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

	public handleRequest(req: Request, res: Response): void {
		const parsedUrl: UrlWithParsedQuery = parse(req.url || '/', true);
		const path: string = parsedUrl.pathname || '/';
		const method: string = req.method || 'GET';

		req.query = parsedUrl.query;

		/* 
		If the HTTP method is different from POST and PUT
		we call the resolveRoute method and then we do an early return
		to skip the parseBody call 
		*/
		if (method !== 'POST' && method !== 'PUT') {
			this.resolveRoute(req, res, path, method);
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

	private resolveRoute(req: Request, res: Response, path: string, method: string): string {
		for (const registeredPath in this.routes) {
			const handler: Handler = this.routes[registeredPath]?.[method];

			if (!handler) {
				throw new Error('')
			}

			const params = this.matchRoute(path, registeredPath)

			if (!params) {
				continue
			}

			req.params = params
			handler(req, res);
			return 'Handler called'
		}

		res.statusCode = 404
		res.statusMessage = 'HttpNotFoundException'
		res.end('Route not found')
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