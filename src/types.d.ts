import { IncomingMessage, ServerResponse } from 'node:http';

export interface IRoute {
	uri: string
	action: Action
	matches(uri: string): boolean 
}

declare module 'http' {
  interface IncomingMessage {
    body?: any;
		params?: { [key: string]: string }
		query?: { [key: string]: string | string[] };
  }
}

export type Action = ((request: Request) => void) | [object, string];

export type RouteHandler = (req: IncomingMessage, res: ServerResponse) => void