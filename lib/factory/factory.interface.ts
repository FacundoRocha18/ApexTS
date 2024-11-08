import { Middleware } from "../middleware";

export interface IFactory {
  create({}, []): any;
}

export interface ISwiftFactory extends IFactory {
  withCustomMiddleware(middleware: Middleware): ISwiftFactory;
}

export type Constructor = new (...args: any[]) => any;