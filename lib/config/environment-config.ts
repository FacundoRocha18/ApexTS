// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

interface IEnvironmentVariables {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
}

interface IConfiguration {
  NODE_ENV: string;
  PORT: number;
}

const loadEnvironmentConfiguration = (): IEnvironmentVariables => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
  };
};

const validateEnvironmentConfiguration = (
  config: IEnvironmentVariables,
): IConfiguration => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }

  return config as IConfiguration;
};

const configuration: IConfiguration = loadEnvironmentConfiguration();

const validatedEnvironmentConfiguration: IConfiguration =
  validateEnvironmentConfiguration(configuration);

export { validatedEnvironmentConfiguration as environmentConfiguration };
