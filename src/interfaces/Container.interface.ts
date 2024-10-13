import { Constructor, Lifecycle } from '../types';

export interface IContainer {
	register<T>(name: string, constructor: Constructor<T>, lifecycle: Lifecycle): void;
	resolve<T>(name: string): T;
}