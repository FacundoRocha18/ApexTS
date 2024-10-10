import { IncomingMessage, ServerResponse } from 'node:http';
import { Router } from './Routing/Router';

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

export type Params = { [key: string]: string }

export type Routes = { [key: string]: { [method: string]: RouteHandler } }