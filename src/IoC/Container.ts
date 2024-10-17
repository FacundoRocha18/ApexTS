import "reflect-metadata"; // Import this to use the reflect-metadata package

import { Constructor, Lifecycle, ServiceOptions } from "../types";
import { IContainer, INewContainer } from "../Interfaces/Container.interface";

export class Container implements IContainer {
	private services: Map<string, ServiceOptions<any>> = new Map();

	/**
	 * Registers a service in the container.
	 * @param name Unique name of the service.
	 * @param service Constructor of the service class.
	 * @param lifecycle Service lifecycle (Singleton or Transient).
	 */
	register<T>(
		name: string,
		service: Constructor<T>,
		lifecycle: Lifecycle = Lifecycle.Transient,
	): void {
		this.services.set(name, {
			constructor: service,
			lifecycle,
			instance: null,
		});
	}

	/**
	 * Resolves a service instance.
	 * @param name Name of the service to resolve.
	 * @type T Type of the service to resolve.
	 * @returns Instance of the service.
	 * @throws Error if the service is not registered in the container.
	 * @throws Error if the service is not injectable.
	 * @throws Error if the token is invalid.
	 */
	resolve<T>(name: string): T {
		if (typeof name !== "string") {
			throw new Error(
				`Expected a string for the service name, but got ${typeof name}`,
			);
		}

		const target = this.services.get(name);
		console.log("[Service name]", name, "[Type of name]", typeof name);
		console.log("[Target service]", target);
		console.log("[Service options]", this.services.get(name));
		console.log(
			"=============================================================",
		);

		if (!target) {
			throw new Error(`Service ${name} not registered in the container.`);
		}

		const isInjectable = Reflect.getMetadata(
			"isInjectable",
			target.constructor,
		);

		if (!isInjectable) {
			throw new Error(`Service ${name} is not injectable.`);
		}

		if (target.lifecycle === Lifecycle.Singleton && target.instance) {
			return target.instance;
		}

		const tokens: any[] =
			Reflect.getMetadata("design:paramtypes", target.constructor) || [];
		const injections: any[] = [];

		for (let i = 0; i < tokens.length; i++) {
			if (typeof tokens[i] !== "function") {
				throw new Error("Invalid token");
			}

			injections.push(this.resolve(tokens[i].name));
		}

		const instance = new target.constructor(...injections);

		if (target.lifecycle === Lifecycle.Singleton) {
			target.instance = instance;
		}

		return instance;
	}
}

export class NewContainer implements INewContainer {
	dependencies = [];

	constructor() {
		this.dependencies = [];
	}

	init(deps: any[]) {
		deps.forEach((target) => {
			const isInjectable = Reflect.getMetadata('isInjectable', target);
			if (!isInjectable) return;

			// Get the constructor parameter types
			const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];

			// Resolve dependencies recursively
			const childrenDep = paramTypes.map((paramType) => {
				if (!this.dependencies[paramType.name]) {
					console.log("Resolving: ", paramType.name);
					this.init([paramType]);
					this.dependencies[paramType.name] = new paramType();
				}
				
				console.log("Resolving: ", paramType.name);
				return this.dependencies[paramType.name];
			});

			// Create the target instance if not already resolved
			if (!this.dependencies[target.name]) {
				this.dependencies[target.name] = new target(...childrenDep);
			}
		});

		return this;
	}

	public get<T extends new (...args: any[]) => any>(
		serviceClass: T,
	): InstanceType<T> {
		return this.dependencies[serviceClass.name];
	}
}
