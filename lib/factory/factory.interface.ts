import { TMiddlewareFunction } from '../middlewares';
import { FrameworkFactory } from '../factory';

export interface IFactory {
	create({}, []): any;
}

export interface IFrameworkFactory extends IFactory {
	withCustomMiddleware(middleware: TMiddlewareFunction): FrameworkFactory;
}

export type Constructor = new (...args: any[]) => any;

