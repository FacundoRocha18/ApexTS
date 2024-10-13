import { IncomingMessage, ServerResponse } from "node:http";

export interface Request extends IncomingMessage {
	body?: any;
	params?: Params;
	query?: { [key: string]: string | string[] };
}

export interface ParserParams {
	req: Request;
	res: Response;
	path: string;
	method: string;
	callback: (req: Request, res: Response, path: string, method: string) => void;
}

export type Response = ServerResponse;

export type Route = string | RegExp;

export type Params = { [key: string]: string };

export type Routes = { [path: string]: { [method: string]: Handler } };

export type Handler = (req: Request, res: Response) => void | Promise<void>;

export type Middleware = (
	req: Request,
	res: Response,
	next: () => void,
) => void | Promise<void>;

export type Constructor<T> = new (...args: any[]) => T;

export enum Lifecycle {
	Singleton,
	Transient
}

export interface ServiceOptions<T> {
	constructor: Constructor<T>;
	lifecycle: Lifecycle;
	instance?: T;
}
