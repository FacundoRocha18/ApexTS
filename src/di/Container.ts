import 'reflect-metadata'; // Import this to use the reflect-metadata package

import { Constructor, Lifecycle, ServiceOptions } from '../types';
import { IContainer } from '../interfaces/Container.interface';

export class Container implements IContainer {
	private services = new Map<string, ServiceOptions<any>>();

	/**
		 * Registers a service in the container.
		 * @param name Unique name of the service.
		 * @param constructor Constructor of the service class.
		 * @param lifecycle Service lifecycle (Singleton or Transient).
		 */
	register<T>(name: string, constructor: Constructor<T>, lifecycle: Lifecycle = Lifecycle.Transient): void {
		this.services.set(name, { constructor, lifecycle });
	}

	/**
		 * Resolves a service instance.
		 * @param name Name of the service to resolve.
		 * @returns Instance of the service.
		 */
	resolve<T>(name: string): T {
		console.log('[Services]', this.services);
		const target = this.services.get(name);

		// If target is null, throw an error
		console.log('[Target]', target);
		if (!target) {
			throw new Error(`Service '${name}' not registered in the container.`);
		}

		const isInjectable = Reflect.getMetadata('isInjectable', target.constructor);
		if (!isInjectable) {
			throw new Error(`Service '${name}' is not injectable.`);
		}

		// If the service is a singleton and the instance is already created, return it
		if (target.lifecycle === Lifecycle.Singleton && target.instance) {
			return target.instance;
		}

		// Get the constructor parameters
		const tokens: any[] = Reflect.getMetadata('design:paramtypes', target.constructor) || [];
		const injections: any[] = [];

		for (const token of tokens) {
			// Check for invalid tokens and throw an error
			if (typeof token !== 'function') {
				throw new Error('Invalid token');
			}

			injections.push(this.resolve(token.name));
		}

		const instance = new target.constructor(...injections);

		if (target.lifecycle === Lifecycle.Singleton) {
			target.instance = instance;
		}

		return instance;
	}
}