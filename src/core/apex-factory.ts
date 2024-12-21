import { container } from "tsyringe";

import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { ApexCoreApplication, ApexCore } from "@core";
import { ApexConfigurationService } from "@config";
import { DatabaseConfigParameters, DatabaseService } from "@database";
import { ParserService } from "@parser";
import { LoggerService } from "@logger";
import { Router } from "@router";

export class ApexFactory {
  private logger: LoggerService;

  constructor(private dependencies: any[] = [ApexConfigurationService, MiddlewareManager, ParserService, Router]) {}

  public async initializeApplication(parameters: DatabaseConfigParameters): Promise<ApexCore> {
    this.logger = this.resolveDependency(LoggerService);
    this.logger.log("Initializing application...");

    await this.initializeDatabase(parameters);
    this.resolveDependencies();

    const application = this.resolveDependency(ApexCoreApplication);
    application.useMiddleware(jsonResponseMiddleware);

    this.logger.log("Application initialized.");
    return application;
  }

  private async initializeDatabase(parameters: DatabaseConfigParameters): Promise<void> {
    try {
      const databaseService = this.resolveDependency(DatabaseService);
      await databaseService.initialize(parameters);
      this.logger.log("Database initialized successfully.");
    } catch (error) {
      this.logger.error("Failed to initialize database:");
      throw error;
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
      this.logger.error(`Failed to resolve dependency: ${dependency.name}`);
      throw error;
    }
  }
}