import { TRequestHandler } from '../lib/types';
import { HttpMethod } from '../lib/types';

export type Route = {
	method: HttpMethod;
	path: string;
	handler: TRequestHandler;
}
