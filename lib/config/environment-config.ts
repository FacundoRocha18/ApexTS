import dotenv from "dotenv";
import {
  IEnvironmentConfiguration,
  IEnvironmentVariables,
} from "./environment-config.interface";

dotenv.config();

class EnvironmentConfiguration {
  private static instance: EnvironmentConfiguration;
  private environmentConfiguration: IEnvironmentVariables;
  private validatedEnvironmentConfiguration: IEnvironmentConfiguration;

  private constructor() {
    this.environmentConfiguration = this.loadEnvironmentConfiguration();
  }

  public static getInstance(): EnvironmentConfiguration {
    if (!EnvironmentConfiguration.instance) {
      EnvironmentConfiguration.instance = new EnvironmentConfiguration();
    }

    return EnvironmentConfiguration.instance;
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

    return this.validatedEnvironmentConfiguration;
  }

  public getConfiguration(): IEnvironmentConfiguration {
    return this.validateEnvironmentConfiguration();
  }
}

const validatedEnvironmentConfiguration: IEnvironmentConfiguration =
  EnvironmentConfiguration.getInstance().getConfiguration();

export { validatedEnvironmentConfiguration as environmentConfiguration };
