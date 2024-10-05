import http = require('node:http')
import { IncomingMessage, ServerResponse } from 'http'
import { Router } from './Routing/Router'

export class FastFramework {
	private router: Router

	constructor() {
		this.router = new Router()
	}

	public get(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
		this.router.get(path, handler);
	}

	public post(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
		this.router.post(path, handler);
	}

	public put(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
		this.router.put(path, handler);
	}

	public delete(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
		this.router.delete(path, handler);
	}

	public patch(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void {
		this.router.patch(path, handler);
	}

	public handleRequest(req: IncomingMessage, res: ServerResponse): void {
		this.router.handleRequest(req as any, res);
	}

	public listen(port: number, callback: () => void) {
		const server = http.createServer((req, res) => this.router.handleRequest(req, res))
		server.listen(port, callback)
	}
}
