import { IncomingMessage, ServerResponse } from 'http'

export interface IFastFramework {
	get(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void
	
	post(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void
	
	put(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void
	
	delete(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void
	
	patch(path: string, handler: (req: IncomingMessage, res: ServerResponse) => void): void

	listen(port: number): void
}