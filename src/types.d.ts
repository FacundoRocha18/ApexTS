import { IncomingMessage, ServerResponse } from 'node:http';

declare module 'http' {
	interface IncomingMessage {
		body?: any;
		params?: Params
		query?: { [key: string]: string | string[] };
  }
}

export type Handler = (req: IncomingMessage, res: ServerResponse) => void

export type Params = { [key: string]: string }

export type Routes = { [path: string]: { [method: string]: Handler } }

export type Request = IncomingMessage

export type Response = ServerResponse