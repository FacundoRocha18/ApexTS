import dotenv from "dotenv";

dotenv.config();

interface IEnvironmentVariables {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

interface IConfiguration {
  NODE_ENV: string;
  PORT: number;
}

class EnvironmentConfiguration {
  private static instance: EnvironmentConfiguration;
	private readonly rawEnvironmentConfiguration: IEnvironmentVariables;
  private validatedEnvironmentConfiguration: IConfiguration;

  private constructor() {
    this.rawEnvironmentConfiguration = this.loadEnvironmentConfiguration();
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

  private validateEnvironmentConfiguration(): IConfiguration {
    for (const [key, value] of Object.entries(this.rawEnvironmentConfiguration)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }

    return this.validatedEnvironmentConfiguration;
  }

  public getConfiguration(): IConfiguration {
    return this.validateEnvironmentConfiguration();
  }
}

const environmentConfiguration: IConfiguration =
  EnvironmentConfiguration.getInstance().getConfiguration();

export { environmentConfiguration };
