import { container } from "tsyringe";

import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { DatabaseConfigParameters, DatabaseService } from "@database";
import { DependencyResolutionException } from "@exceptions";
import { DatabaseInitializationException } from "@database";
import { ApexCoreApplication, ApexCore } from "@core";
import { ApexConfigurationService } from "@config";
import { Module, ModuleLoader } from '@modules';
import { ParserService } from "@parser";
import { LoggerService } from "@logger";
import { Router } from "@router";

export class ApexFactory {
  private logger: LoggerService;

	constructor(
		private dependencies: any[] = [ApexConfigurationService, MiddlewareManager, ParserService, Router],
		private modules: Module[] = []
	) { }

  public async initializeApplication(parameters: DatabaseConfigParameters): Promise<ApexCore> {
    this.logger = this.resolveDependency(LoggerService);
    this.logger.log("Initializing application...");

		const { entities, routers, providers } = ModuleLoader.load(this.modules);

		await this.initializeDatabase({ ...parameters, entities });

		providers.forEach((provider) => container.register(provider, { useClass: provider }));

    this.resolveDependencies();

    const application = this.resolveDependency(ApexCoreApplication);

    application.useMiddleware(jsonResponseMiddleware);

		routers.forEach((router) => application.useRouter(router));

    this.logger.log("Application initialized.");
    return application;
  }

  private async initializeDatabase(parameters: DatabaseConfigParameters): Promise<void> {
    try {
      const databaseService = this.resolveDependency(DatabaseService);
      await databaseService.initialize(parameters);
      this.logger.log("Database initialized successfully.");
    } catch (error) {
      this.logger.error(error.message);
      throw new DatabaseInitializationException("Failed to initialize database.", 500, error.stack);
    }
  }

  private resolveDependencies(): void {
    this.dependencies.forEach((dependency) => this.resolveAndLog(dependency));
  }

  private resolveAndLog(dependency: any): any {
    const instance = this.resolveDependency(dependency);
    this.logger.log(`Resolved dependency: ${dependency.name}`);
    return instance;
  }

  private resolveDependency<T>(dependency: new (...args: any[]) => T): T {
    try {
      return container.resolve(dependency);
    } catch (error) {
      this.logger.error(error.message);
      throw new DependencyResolutionException(`Failed to resolve dependency: ${dependency.name}`, 500, error.stack);
    }
  }
}
