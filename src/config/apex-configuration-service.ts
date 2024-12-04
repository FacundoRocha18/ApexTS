import { inject, injectable, singleton } from 'tsyringe';
import dotenv from "dotenv";

import { EnvironmentVariables, ValidatedEnvironmentConfiguration } from "@config";
import { LoggerService } from '@logger';

dotenv.config();

@singleton()
@injectable()
export class ApexConfigurationService {
	private variables: EnvironmentVariables;
	private configuration: ValidatedEnvironmentConfiguration;

  constructor(
		@inject(LoggerService) 
		private logger: LoggerService,
	) {
		this.variables = this.loadEnvironmentConfiguration();
  }

  public getConfiguration(): ValidatedEnvironmentConfiguration {
    return this.validateEnvironmentConfiguration();
  }

  private loadEnvironmentConfiguration(): EnvironmentVariables {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    };
  }

  private validateEnvironmentConfiguration(): ValidatedEnvironmentConfiguration {
		const { NODE_ENV, PORT } = this.variables;

    if (NODE_ENV === undefined) {
      throw new Error(`Missing key NODE_ENV in config.env`);
    }

    if (PORT === undefined) {
      throw new Error(`Missing key PORT in config.env`);
    }

		this.configuration = {
      NODE_ENV: NODE_ENV as string,
      PORT: Number(PORT),
    };

		this.logger.log(`Validated environment configuration: ${JSON.stringify(this.configuration)}`);
		return this.configuration;
  }
};
