import { HttpMethods } from '../Http/HttpMethods'
import { HttpNotFoundException } from '../Http/HttpNotFoundException'
import { Action, IRoute } from '../types'
import { Route } from './Route'

export class Router {
	protected routes: { [method: string]: IRoute[] } = {}

	constructor() {
		const methods = Object.keys(HttpMethods)

		methods.forEach(method => {
			this.routes[method.valueOf()] = []
		})
	}

	public resolveRoute(request): IRoute {
		const method = request.method
		const routesForMethod = this.routes[method]

		for (const route of routesForMethod) {
			if (route.matches(request.uri())) {
				return route
			}
		}

		throw new HttpNotFoundException()
	}

	protected registerRoute(uri: string, method: HttpMethods, action: Action): IRoute {
		
		return new Route(uri, action);
	}

	public get(uri: string, action: Action): IRoute {
		return this.registerRoute(uri, HttpMethods.GET, action);
	}
}