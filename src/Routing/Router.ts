import { parse, UrlWithParsedQuery } from 'url'
import { HttpMethods } from '../Http/HttpMethods'
import { Params, Routes, Handler, Request, Response } from '../types'
import { IRouter } from './Router.interface'

export class Router implements IRouter {
	private routes: Routes = {}

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

	private addRoute(method: string, path: string, handler: Handler): void {
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
		const pathname: string = parsedUrl.pathname || '/';
		const method: string = req.method || 'GET';

		req.query = parsedUrl.query;

		/* 
		If the HTTP method is different from POST and PUT
		we call the resolveRoute method and then we do an early return
		to skip the parseBody call 
		*/
		if (method !== 'POST' && method !== 'PUT') {
			this.resolveRoute(req, res, pathname, method);
			return null
		}

		this.parseBody(req, res, pathname, method)
	}

	private resolveRoute(req: Request, res: Response, path: string, method: string): void {
		for (const registeredPath in this.routes) {
			const handler = this.routes[registeredPath]?.[method];
			
			if (!handler) {
				continue
			}

			const params = this.matchRoute(path, registeredPath)
			
			if (!params) {
				continue
			}

			req.params = params
			handler(req, res);
			return null
		}

		res.statusCode = 404
		res.statusMessage = 'HttpNotFoundException'
		console.log('Error:', res.statusCode, res.statusMessage)
		res.end('Route not found')
	}

	/* 
	check possible refactor of this method
	*/
	private parseBody(req: Request, res: Response, path: string, method: string): void {
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
			this.resolveRoute(req, res, path, method);
		});
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