import dotenv from "dotenv";
import * as path from "path";

import { EnvironmentVariables, ValidatedEnvironmentConfiguration } from "@config";
import { LoggerService } from '../logger';

dotenv.config();

class ApexEnvironmentConfiguration {
	private static instance: ApexEnvironmentConfiguration;
	private variables: EnvironmentVariables;
	private configuration: ValidatedEnvironmentConfiguration;
	private logger: LoggerService;

  private constructor(envFilePath?: string) {
		this.logger = new LoggerService("ApexEnvironmentConfiguration");
    this.loadDotEnvFile(envFilePath);
		this.variables = this.loadEnvironmentConfiguration();
  }

	public static getInstance(envFilePath?: string): ApexEnvironmentConfiguration {
		if (!ApexEnvironmentConfiguration.instance) {
			ApexEnvironmentConfiguration.instance = new ApexEnvironmentConfiguration(envFilePath);
    }

		return ApexEnvironmentConfiguration.instance;
  }

  public getConfiguration(): ValidatedEnvironmentConfiguration {
    return this.validateEnvironmentConfiguration();
  }

  private loadDotEnvFile(envFilePath?: string): void {
    const envPath = envFilePath || `.env.${process.env.NODE_ENV || "development"}`;
    const fullPath = path.resolve(process.cwd(), envPath);

    dotenv.config({ path: fullPath });
		this.logger.log(`Loaded environment variables from ${fullPath}.`);
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
}

export const ApexDotEnvConfig: ValidatedEnvironmentConfiguration =
	ApexEnvironmentConfiguration.getInstance().getConfiguration();
