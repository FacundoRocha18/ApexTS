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
		this.initialize();
	}

	public async initialize(): Promise<void> {
		try {
			this.logger = container.resolve(LoggerService);
			this.logger.log("Initializing ApexFactory...");
			await this.bootstrap();
		} catch (error) {
			console.error("Failed to initialize ApexFactory:", error);
			throw error;
		}
	}

  public create(): ApexCore {
    const application = this.resolveAndLog(ApexCoreApplication);

    application.useMiddleware(jsonResponseMiddleware);

    return application;
	}

	private async bootstrap(): Promise<void> {
		await this.initializeDatabase();
		this.resolveDependencies([
			ApexConfigurationService,
			MiddlewareManager,
			ParserService,
			Router,
		]);
	}

	private async initializeDatabase(): Promise<void> {
		try {
			const databaseService = container.resolve(DatabaseService);
			await databaseService.initialize();
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
