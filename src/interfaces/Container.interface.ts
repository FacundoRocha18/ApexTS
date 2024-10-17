import { Constructor, Lifecycle } from "../types";

export interface IContainer {
  register<T>(
    name: string,
    constructor: Constructor<T>,
    lifecycle: Lifecycle,
  ): void;
  resolve<T>(name: string): T;
}

export interface INewContainer {
  init(deps: any[]): INewContainer;
  get<T extends new (...args: any[]) => any>(serviceClass: T): InstanceType<T>;
}
