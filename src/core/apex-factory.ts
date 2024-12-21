import { container } from "tsyringe";

import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { ApexCoreApplication, ApexCore } from "@core";
import { ApexConfigurationService } from "@config";
import { DatabaseConfigParameters, DatabaseEntity, DatabaseService } from "@database";
import { ParserService } from "@parser";
import { LoggerService } from "@logger";
import { Router } from "@router";

export class ApexFactory {
  private logger: LoggerService;

  constructor() {
    this.initializeFactory();
  }

  public async initializeApplication(parameters: DatabaseConfigParameters): Promise<ApexCore> {
    await this.initializeDatabase(parameters);

    const application = this.resolveAndLog(ApexCoreApplication);

    application.useMiddleware(jsonResponseMiddleware);

    return application;
  }

  private async initializeFactory(): Promise<void> {
    try {
      this.logger = container.resolve(LoggerService);
      this.logger.log("Initializing ApexFactory...");
      await this.bootstrap();
    } catch (error) {
      console.error("Failed to initialize ApexFactory:", error);
      throw error;
    }
  }

  private async bootstrap(): Promise<void> {
    this.resolveDependencies([ApexConfigurationService, MiddlewareManager, ParserService, Router]);
  }

  private async initializeDatabase(parameters: DatabaseConfigParameters): Promise<void> {
    try {
      const databaseService = container.resolve(DatabaseService);
      await databaseService.initialize(parameters);
      this.logger.log("Database initialized successfully.");
    } catch (error) {
      this.logger.error("Failed to initialize database:");
      throw error;
    }
  }

  private resolveDependencies(dependencies: any[]): void {
    dependencies.forEach((dependency) => this.resolveAndLog(dependency));
  }

  private resolveAndLog(dependency: any): any {
    try {
      const instance = container.resolve(dependency);
      this.logger.log(`Resolved dependency: ${dependency.name}`);
      return instance;
    } catch (error) {
      this.logger.error(`Failed to resolve dependency: ${dependency.name}`);
      throw error;
    }
  }
}
