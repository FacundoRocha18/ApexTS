import { container } from "tsyringe";

import { ApexCoreApplication, ApexCore } from "@core";
import { jsonResponseMiddleware, MiddlewareManager } from "@middleware";
import { ParserService } from "@parser";
import { LoggerService } from '@logger';
import { Router } from "@router";
import { ApexConfigurationService } from '../config/apex-configuration-service';

export class ApexFactory {
	private logger: LoggerService;

	constructor() {
    this.resolveDependencies();
  }

  public create(): ApexCore {
    const application = this.resolveAndLog(ApexCoreApplication);

    application.useMiddleware(jsonResponseMiddleware);

    return application;
  };

  private resolveDependencies() {
		this.logger = container.resolve(LoggerService);
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
}
