import http = require('node:http')
import { Router } from './Routing/Router'
import { RouteHandler } from './types'
import { IFastFramework } from './FastFramework.interface'

export class FastFramework implements IFastFramework {
	private router: Router

	constructor(router?: Router) {
		this.router = router || new Router()
	}

	public get(path: string, handler: RouteHandler): void {
		this.router.get(path, handler);
	}

	public post(path: string, handler: RouteHandler): void {
		this.router.post(path, handler);
	}

	public put(path: string, handler: RouteHandler): void {
		this.router.put(path, handler);
	}

	public delete(path: string, handler: RouteHandler): void{
		this.router.delete(path, handler);
	}

	public patch(path: string, handler: RouteHandler): void {
		this.router.patch(path, handler);
	}

	public listen(port: number): void {
		const server = http.createServer((req, res) => this.router.handleRequest(req, res))

		server.listen(port)
		console.log(`Server running on port: ${port}`)
	}
}
