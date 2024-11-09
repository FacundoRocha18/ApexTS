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
	private environmentConfiguration: IEnvironmentVariables;
  private validatedEnvironmentConfiguration: IConfiguration;

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

  private validateEnvironmentConfiguration(): IConfiguration {
    for (const [key, value] of Object.entries(this.environmentConfiguration)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }

		return this.validatedEnvironmentConfiguration = {
			NODE_ENV: this.environmentConfiguration.NODE_ENV as string,
			PORT: this.environmentConfiguration.PORT as number,
		};
  }

  public getConfiguration(): IConfiguration {
    return this.validateEnvironmentConfiguration();
  }
}

const validatedEnvironmentConfiguration: IConfiguration =
  EnvironmentConfiguration.getInstance().getConfiguration();

export { validatedEnvironmentConfiguration as environmentConfiguration };
