import { container } from "tsyringe";

import { ApexCoreApplication, ApexCore } from "@core";
import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { ParserService } from "@parser";
import { LoggerService } from '@logger';
import { Router } from "@router";
import { ApexConfigurationService } from '@config';
import { DatabaseService } from '@database';

export class ApexFactory {
	private logger: LoggerService;

	constructor() {
    this.bootstrap();
  };

  public create(): ApexCore {
    const application = this.resolveAndLog(ApexCoreApplication);

    application.useMiddleware(jsonResponseMiddleware);

    return application;
  };

	private async bootstrap() {
		await this.resolveDependencies();
	};
	
	private async initializeDatabase() {
		const databaseService = container.resolve(DatabaseService);
    await databaseService.initialize();
  };
	
  private async resolveDependencies() {
		this.logger = container.resolve(LoggerService);
		await this.initializeDatabase();
		const dependencies = [
			ApexConfigurationService,
			MiddlewareManager,
			ParserService,
			Router,
		];

		dependencies.forEach(dependency => this.resolveAndLog(dependency));
  };

	private resolveAndLog(dependency: any): any {
		const instance = container.resolve(dependency);
		this.logger.log(`Resolved dependency: ${dependency.name}`);

		return instance;
	};
};
