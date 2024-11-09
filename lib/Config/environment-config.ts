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

  public getConfiguration(): IConfiguration {
    return this.validateEnvironmentConfiguration();
  }
}

const validatedEnvironmentConfiguration: IConfiguration =
  EnvironmentConfiguration.getInstance().getConfiguration();

export { validatedEnvironmentConfiguration as environmentConfiguration };
