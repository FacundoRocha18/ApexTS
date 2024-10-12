import { IncomingMessage, ServerResponse } from 'node:http';

declare module 'http' {
	interface IncomingMessage {
		body?: any;
		params?: Params
		query?: { [key: string]: string | string[] };
  }
}

export type Params = { [key: string]: string }

export type Routes = { [path: string]: { [method: string]: Handler } }

export type Request = IncomingMessage

export type Response = ServerResponse

export type Handler = (req: Request, res: Response) => void | Promise<void>

export type Middleware = (req: Request, res: Response, next: () => void) => void | Promise<void>;