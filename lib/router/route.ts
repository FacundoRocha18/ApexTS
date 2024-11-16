import { HttpMethods } from "../http";
import { Controller } from "../types";

export class Route {
	private controllers: { [key: string]: Controller } = {};

	constructor(private url: string) { }

	public addController(httpMethod: HttpMethods, controller: Controller): void {
		this.validateRouteParams(httpMethod, controller);

		if (this.isControllerAleadyRegistered(httpMethod, controller)) {
			throw new Error(`Controller already registered for this HTTP method: ${httpMethod}`);
		};

		this.controllers[httpMethod] = controller;
	}

	private isControllerAleadyRegistered(httpMethod: HttpMethods, controller: Controller): boolean {
		return this.controllers[httpMethod] !== undefined && this.controllers[httpMethod] === controller;
	}

	private validateRouteParams(httpMethod: HttpMethods, controller: Controller): void {
		if (!httpMethod || !controller) {
			throw new Error("Invalid parameters: method and handler are required.");
		}
	};

	public getController(httpMethod: HttpMethods): Controller | undefined {
		return this.controllers[httpMethod];
	}

	public getRegisteredMethods(): string[] {
		return Object.keys(this.controllers);
	}

	private normalizeUrl(url: string): string {
		if (url.length > 1 && url.endsWith("/")) {
			return url.slice(0, -1);
		};
		
		return url;
	}

	public isUrlRegistered(url: string): boolean {
		const normalizedUrl = this.normalizeUrl(url);
		const normalizedRoute = this.normalizeUrl(this.url);

		const requestParts = normalizedUrl.split("/");
		const registeredParts = normalizedRoute.split("/");

		if (requestParts.length !== registeredParts.length) {
			return false;
		}

		return registeredParts.every((part, index) => {
			const requestPart = requestParts[index];
			return part.startsWith(":") || part === requestPart;
		});
	}

	public get URL(): string {
		return this.url;
	}
}
