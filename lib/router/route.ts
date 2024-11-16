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

	private normalizeUrl(url: string): string[] {
		return url
			.replace(/\/+$/, "")
			.split("/")
			.filter(Boolean);
	}

	public isUrlRegistered(url: string): boolean {
		const requestParts = this.normalizeUrl(url);
  const registeredParts = this.normalizeUrl(this.url);

  if (requestParts.length !== registeredParts.length) {
    return false;
  }

  return requestParts.every((part, index) => {
    const registeredPart = registeredParts[index];
    return registeredPart.startsWith(":") || registeredPart === part;
  });
	}

	public get URL(): string {
		return this.url;
	}
}
