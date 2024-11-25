import { IMiddlewareManager, MiddlewareManager } from "../middleware";
import { IRouter, Router } from "../router";
import { IParserService, ParserService } from "../parser";
import { ISwiftApplication, SwiftApplication } from "../application";
import { IFactory } from ".";
import { environmentConfiguration, IEnvironmentConfiguration } from "../config";
import { container } from "tsyringe";

/**
 * SwiftFactory creates a new instance of a Framework with the provided services.
 * @implements IFactory
 * @method create - Creates a new instance of a Framework with the provided services.
 * @property EnvironmentConfiguration - The environment configuration for the application.
 */
export class SwiftFactory implements IFactory {
	private middlewareManager: IMiddlewareManager;
	private parser: IParserService;
	private environmentConfiguration = environmentConfiguration;
	private router: IRouter;

	constructor() {
		this.initializeServices();
	}

	private initializeServices() {
		this.parser = container.resolve(ParserService);
		this.router = container.resolve(Router);
		this.middlewareManager = container.resolve(MiddlewareManager);
	}

	/**
	 * Creates a new instance of a Framework with the provided services.
	 * @returns A new instance of a Framework
	 */
	public create(): ISwiftApplication {
		const framework = SwiftApplication.getInstance(this.router, this.middlewareManager);

		return framework;
	}

	public get EnvironmentConfiguration(): IEnvironmentConfiguration {
		return this.environmentConfiguration;
	}
}
