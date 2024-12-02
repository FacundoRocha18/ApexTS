import dotenv from "dotenv";
import * as path from "path";

import { IEnvironmentConfiguration, IEnvironmentVariables } from "@config";

dotenv.config();

class EnvironmentConfiguration {
  private static instance: EnvironmentConfiguration;
  private environmentConfiguration: IEnvironmentVariables;
  private validatedEnvironmentConfiguration: IEnvironmentConfiguration;

  private constructor(envFilePath?: string) {
    this.loadDotEnvFile(envFilePath);
    this.environmentConfiguration = this.loadEnvironmentConfiguration();
  }

  public static getInstance(envFilePath?: string): EnvironmentConfiguration {
    if (!EnvironmentConfiguration.instance) {
      EnvironmentConfiguration.instance = new EnvironmentConfiguration(envFilePath);
    }

    return EnvironmentConfiguration.instance;
  }

  public getConfiguration(): IEnvironmentConfiguration {
    return this.validateEnvironmentConfiguration();
  }

  private loadDotEnvFile(envFilePath?: string): void {
    const envPath = envFilePath || `.env.${process.env.NODE_ENV || "development"}`;
    const fullPath = path.resolve(process.cwd(), envPath);

    dotenv.config({ path: fullPath });
    console.info(`Loaded environment variables from ${fullPath}`);
  }

  private loadEnvironmentConfiguration(): IEnvironmentVariables {
    return {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    };
  }

  private validateEnvironmentConfiguration(): IEnvironmentConfiguration {
    const { NODE_ENV, PORT } = this.environmentConfiguration;

    if (NODE_ENV === undefined) {
      throw new Error(`Missing key NODE_ENV in config.env`);
    }

    if (PORT === undefined) {
      throw new Error(`Missing key PORT in config.env`);
    }

    this.validatedEnvironmentConfiguration = {
      NODE_ENV: NODE_ENV as string,
      PORT: Number(PORT),
    };

    console.info(`Validated environment configuration: ${JSON.stringify(this.validatedEnvironmentConfiguration)}`);
    return this.validatedEnvironmentConfiguration;
  }
}

export const TsEnvironmentConfiguration: IEnvironmentConfiguration =
  EnvironmentConfiguration.getInstance().getConfiguration();
