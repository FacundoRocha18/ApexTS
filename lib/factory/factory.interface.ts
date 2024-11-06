import { Middleware } from "../middlewares";
import { FrameworkFactory } from "../factory";

export interface IFactory {
  create({}, []): any;
}

export interface IFrameworkFactory extends IFactory {
  withCustomMiddleware(middleware: Middleware): FrameworkFactory;
}

export type Constructor = new (...args: any[]) => any;
