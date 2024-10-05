import { IncomingMessage, ServerResponse } from 'node:http';

export interface IRoute {
	uri: string
	action: TAction
	matches(uri: string): boolean 
}


declare module 'http' {
	interface IncomingMessage {
		body?: any;
		params?: { [key: string]: string }
		query?: { [key: string]: string | string[] };
  }
}

export type TAction = ((request: Request) => void) | [object, string];

export type TRouteHandler = (req: IncomingMessage, res: ServerResponse) => void

export type TParams = { [key: string]: string }

export type TRoutes = { [key: string]: { [method: string]: TRouteHandler } }