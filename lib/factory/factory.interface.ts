import { Middleware } from "../middleware";

export interface IFactory {
  create(serviceConstructor: Constructor, dependencies: any[]): any;
}

export interface ISwiftFactory extends IFactory {
  withCustomMiddleware(middleware: Middleware): ISwiftFactory;
}

export type Constructor = new (...args: any[]) => any;
